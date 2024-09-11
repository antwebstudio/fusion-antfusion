<template>
    <fragment>
        <ui-dropdown-link v-bind="$props" :class="classes" v-if="asDropdown" @click="performAction()"><slot>{{ text }}</slot></ui-dropdown-link>
        <ui-button v-bind="$props" :class="classes" v-else :variant="variant" @click.prevent="performAction()"><slot>{{ text }}</slot></ui-button>

        <portal to="modals">
            <ui-modal :name="modalName" :title="modalTitle" :key="modalName" @input="modalChanged">
                <span v-if="initializedForm">
                    <component v-model="initializedForm[field.handle]" v-for="field, index in fields" :key="field.handle" :is="field.component" v-bind="field"
                        :parent="componentData"
                        :record="record"
                        :has-error="initializedForm.errors.has(field.handle)"
                        :error-message="initializedForm.errors.get(field.handle)"
                        :errors="initializedForm.errors"
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

            <ui-modal v-if="needConfirmation" :name="confirmationModalName" :title="confirmTitle" :key="confirmationModalName">
                <p>{{ confirmText }}</p>

                <template v-slot:footer="entry">
                    <ui-button :disabled="loading" @click="confirm()" variant="danger" class="ml-3">{{ confirmButtonText }}</ui-button>
                    <ui-button :disabled="loading" @click="closeModal(confirmationModalName)" variant="secondary">{{ cancelButtonLabel }}</ui-button>
                </template>
            </ui-modal>
        </portal>
    </fragment>
</template>

<script>
import Form from "../services/Form"
import _ from "lodash"
import actionResponse from "../mixins/action-response"

export default {
    mixins: [actionResponse],
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
        cancelButtonLabel: {
            default: 'Cancel',
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
        form: {
            default: null,
        },
        record: {
            default: {}
        },
        load_record: {
            default: {}
        },
        confirmTitle: {

        },
        confirmText: {

        },
        classes: {

        },
        path: { // Path to get the action object at backend

        },
    },
    data() {
        return {
            loading: false,
            initializedForm: this.form,
            modalOpened: false,
            confirmationModalOpened: false,
        }
    },
    watch: {
        form(value) {
            this.initializedForm = value
        }
    },
    computed: {
        needConfirmation() {
            return this.confirmText
        },
        confirmationModalName() {
            return 'actio-confirmtion-' + this._uid  
        },
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

            if (this.form) {
                this.initializedForm = this.form
            } else {
                this.initializedForm = new Form(fields)
            }
        },
        performAction() {
            if (this.fields.length) {
                this.openModalForm()
            } else if (this.needConfirmation) {
                this.askConfirmation()
            } else {
                this.submit()
            }
        },
        askConfirmation() {
            this.confirmationModalOpened = true
            this.openModal(this.confirmationModalName)
        },
        confirm() {
            this.confirmationModalOpened = false
            this.closeModal(this.confirmationModalName)
            this.submit()
        },
        submitActionWithoutForm() {
            alert('deprecated, please use submit instead');
            if (this.record) {
                let params = this.record.formdata()
                params.append('route', this.route)
                params.append('path', this.path)
                this.record.submit(this.formMethod, this.url, params).then((response) => {
                    console.log(response);
                    this.processActionResponse(response)
                });
            } else {
                this.submit()
            }
        },
        openModalForm() {
            this.modalOpened = true
            this.openModal(this.modalName)
        },
        submit() {
            this.loading = true
            let params = {
                route: this.route,
                path: this.path,
                resourceIds: this.record.id ? [this.record.id] : null,
            }
            let options = this.blob ? {responseType: 'blob'} : {};

            this.initializedForm.post(this.url, params, options).then((response) => {
                this.loading = false
                this.$emit('submitted')
                this.$emit('refreshed')

                if (this.modalOpened) {
                    this.closeModal(this.modalName)
                }
                if (this.confirmationModalOpened) {
                    this.closeModal(this.confirmationModalName)
                }

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