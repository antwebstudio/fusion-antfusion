<template>
    <div>
        <portal to="modals">
            <ui-modal v-if="action" v-bind="action" :name="modalName" :title="modalTitle" :key="modalName" @input="modalChanged">
                <span v-if="action && form">
                    <component v-model="form[field.handle]" v-for="field, index in action.fields" :key="field.handle" :is="field.component" v-bind="field"
                        :parent="componentData"
                        :record="record"
                        :has-error="form.errors.has(field.handle)"
                        :error-message="form.errors.get(field.handle)"
                        :errors="form.errors"
                    />
                </span>

                <template v-slot:footer="entry">
                    <ui-button :loading="loading" :disabled="loading" @click="submit" class="ml-3 button--primary">
                        {{ confirmButtonText }}
                    </ui-button>
                    <ui-button v-if="!action.hideCancelButton" v-modal:[modalName]>{{  cancelButtonText }}</ui-button>
                </template>
            </ui-modal>
        </portal>
    </div>
</template>
<script>
import Form from '@/services/Form'
import _ from "lodash"
export default {
    props: {
        action: null,
        record: null,
    },
    data() {
        return {
            modalAction: null,
            form: null,
            loading: false,
            errors: null,
        }
    },
    watch: {
        action(value) {
            if (value) {
                console.log('open modal');
                setTimeout(() => {
                    this.openModal(this.modalName);
                    this.initForm();
                }, 0)
            }
            console.log('action');
        }
    },
    
    computed: {
        confirmButtonText() {
            if (this.action && this.action.confirmButtonText) {
                return this.action.confirmButtonText
            }
            return 'OK';
        },
        cancelButtonText() {
            if (this.action && this.action.cancelButtonText) {
                return this.action.cancelButtonText
            }
            return 'Cancel';
        },
        modalName() {
            return 'action-' + this._uid
        },
        modalTitle() {
            if (this.action) {
                return this.action.confirmTitle
            }
        },
    },
    methods: {
        
        initForm() {
            let fields = {}
            this.action.fields.forEach((field) => {
                if (this.action.load_record && this.action.load_record[field.handle]) {
                    fields[field.handle] = _.get(this.action.record, this.action.load_record[field.handle])
                } else {
                    fields[field.handle] = null
                }
                if (this.action.fill_form && this.action.fill_form[field.handle]) {
                    fields[field.handle] = _.get(this.action.fill_form, field.handle)
                }
            })
            this.form = new Form(fields)
        },
        openModal(name, value) {
            this.$bus.$emit('toggle-modal-' + name, value)
        },
        modalChanged() {

        },
        processActionResponse(response) {
            if (response.message) {
                toast(response.message, 'success')
            }
            if (response.redirect) {
                if (response.target) {
                    window.open(response.redirect, response.target)
                } else {
                    // location.href = response.redirect
                    this.$router.push(response.redirect)
                }
            } else if (response.action) {
                this.modalAction = response.action
            }
        },
        submit() {
            this.loading = true;
            let method = this.action.action ? this.action.action : 'post';

            
            let params = this.form.formdata()
            // params.append('route', this.route)
            // params.append('path', this.path)
            if (this.record && this.record.id) {
                params.append('records[]', this.record.id)
                params.append('resourceIds[]', this.record.id)
            }
            this.form.submit(method, this.action.url, params).then((response) => {
                if (response) {
                    this.processActionResponse(response);
                } else {
                    toast('Entry saved successfully', 'success')
                    this.$router.push(`/resource/${this.resource.slug}`)
                }
                this.loading = false;
            }).catch((error) => {
                this.loading = false;
                if (error.errors) {
                    this.errors = error.errors
                    var message = Object.keys(error.errors).map((key) => {
                        return error.errors[key].join(' ');
                    }).join(' ')

                    toast(message, 'failed')
                } else {
                    toast(error.message, 'failed')
                }
            })
        }
    }
}
</script>