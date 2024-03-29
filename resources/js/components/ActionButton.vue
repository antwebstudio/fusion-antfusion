<template>
    <fragment>
        <ui-dropdown-link v-bind="$props" :class="classes" v-if="asDropdown" @click="performAction()"><slot>{{ text }}</slot></ui-dropdown-link>
        <ui-button v-bind="$props" :class="classes" v-else :variant="variant" @click.prevent="performAction()"><slot>{{ text }}</slot></ui-button>

        <portal to="modals">
            <ui-modal :name="modalName" :title="modalTitle" :key="modalName" @input="modalChanged">
                <span v-if="form">
                    <component v-model="form[field.handle]" v-for="field, index in fields" :key="field.handle" :is="field.component" v-bind="field"
                        :parent="componentData"
                        :record="record"
                        :has-error="form.errors.has(field.handle)"
                        :error-message="form.errors.get(field.handle)"
                        :errors="form.errors"
                    />
                </span>

                <template v-slot:footer="entry">
                    <ui-button :disabled="loading" @click="submit" class="ml-3 button--primary">
                        <spinner v-show="loading" />
                        {{ confirmButtonText }}
                    </ui-button>
                    <ui-button v-modal:[modalName]>Cancel</ui-button>
                </template>
            </ui-modal>
        </portal>
    </fragment>
</template>

<script>
import Form from "@/services/Form"
import _ from "lodash"

export default {
    props: {
        id: {

        },
        variant: {

        },
        route: {

        },
        parent: {

        },
        asDropdown: {
            default: false,
        },
        confirmButtonText: {
            default: 'OK',
        },
        resetWhenClose: {
            default: true,
        },
        url: {
            default: null,
        },
        formMethod: {
            default: 'post',
        },
        text:  {
            default: null,
        },
        title:  {
            default: null,
        },
        fields: {

        },
        record: {
            default: {}
        },
        load_record: {
            default: {}
        },
        classes: {

        },
        path: { // Path to get the action object at backend

        },
    },
    data() {
        return {
            loading: false,
            form: null,
        }
    },
    computed: {
        modalName() {
            return 'action-' + this._uid
        },
        modalTitle() {
            if (this.confirmTitle) {
                return this.confirmTitle
            }
            return this.title
        },
        componentData() {
            return {
                parent: this.parent
            }
        }
    },
    mounted() {
        this.initForm()
    },
    methods: {
        initForm() {
            let fields = {}
            this.fields.forEach((field) => {
                if (this.load_record[field.handle]) {
                    fields[field.handle] = _.get(this.record, this.load_record[field.handle])
                } else {
                    fields[field.handle] = null
                }
            })
            this.form = new Form(fields)
        },
        performAction() {
            if (this.fields.length) {
                this.openModalForm()
            } else {
                let params = this.record.formdata()
                params.append('route', this.route)
                params.append('path', this.path)
                this.record.submit(this.formMethod, this.url, params).then((response) => {
                    console.log(response);
                    this.processActionResponse(response)
                });
            }
        },
        openModalForm() {
            this.openModal(this.modalName)
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
            }
        },
        submit() {
            this.loading = true
            let params = this.form.formdata()
            params.append('route', this.route)
            params.append('path', this.path)
            if (this.record.id) {
                params.append('resourceIds[]', this.record.id)
            }
            this.form.submit('post', this.url, params).then((response) => {
                this.loading = false
                this.$emit('submitted')
                this.closeModal(this.modalName)

                this.processActionResponse(response)
            }).catch((error) => {
                this.loading = false
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
        },
        closeModal(name, value) {
            this.$bus.$emit('toggle-modal-' + name, value)
        },
        openModal(name, value) {
            this.$bus.$emit('toggle-modal-' + name, value)
        },
        modalChanged(isActive) {
            if (isActive && this.resetWhenClose) {
                this.initForm()
            }
        },
        toggle() { // Needed so that ui-dropdown-link can work normally
            this.$parent.toggle()
        },
    }
}
</script>

<style>

</style>