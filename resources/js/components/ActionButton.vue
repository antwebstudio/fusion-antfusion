<template>
    <fragment>
        <ui-dropdown-link v-bind="$props" v-if="asDropdown" @click="openModalForm()">{{ text }}</ui-dropdown-link>
        <ui-button v-else :variant="variant" @click.prevent="openModalForm()">{{ text }}</ui-button>

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
                }
            })
            this.form = new Form(fields)
        },
        openModalForm() {
            this.openModal(this.modalName)
        },
        submit() {
            this.loading = true
            let params = this.form.formdata()
            params.append('route', this.route)
            if (this.record.id) {
                params.append('resourceIds[]', this.record.id)
            }
            this.form.submit('post', this.url, params).then((response) => {
                this.loading = false
                this.$emit('submitted')
                this.closeModal(this.modalName)

                if (response.data.message) {
                    toast(response.data.message, 'success')
                }
                if (response.data.redirect) {
                    if (response.data.target) {
                        window.open(response.data.redirect, response.data.target)
                    } else {
                        // location.href = response.data.redirect
                        this.$router.push(response.data.redirect)
                    }
                }
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