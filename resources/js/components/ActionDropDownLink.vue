<template>
    <div>
        <ui-dropdown-link @click.prevent="performAction" v-bind="$props" :class="cssClass">
            {{ text }}
        </ui-dropdown-link>

        <portal to="modals" v-if="needConfirmation">
            <ui-modal :name="modalName" :title="modalTitle" :key="modalName">
                <p>{{ confirmText }}</p>

                <template v-slot:footer="entry">
                    <ui-button :disabled="loading" @click="confirm()" variant="danger" class="ml-3">{{ confirmButtonText }}</ui-button>
                    <ui-button :disabled="loading" @click="closeModal(modalName)" variant="secondary">{{ cancelButtonLabel }}</ui-button>
                </template>
            </ui-modal>
        </portal>
    </div>
</template>

<script>
import actionResponse from "../mixins/action-response"
export default {
    mixins: [actionResponse],
    props: {
        cssClass: {

        },
        url: {

        },
        confirmButtonText: {
            default: "Confirm",
        },
        cancelButtonLabel: {
            default: "Cancel",
        },
        title: {

        },
        record: {

        },
        blob: {
            default: true,
        },
        form: {

        },
        resourceId: {

        },
        resourceHandle: {

        },
        actionHandle: {

        },
        confirmTitle: {

        },
        confirmText: {

        },
        to: {

        },
        text: {

        }
    },
    data() {
        return {
            loading: false,
        }
    },
    computed: {
        needConfirmation() {
            return this.confirmText
        },
        modalTitle() {
            if (this.confirmTitle) {
                return this.confirmTitle
            }
            return this.title
        },
        modalName() {
            return 'action-link-confirmation-' + this._uid
        }
    },
    methods: {
        toggle() {
            if (this.$parent && this.$parent.toggle) {
                this.$parent.toggle()
            }
        },
        performAction() {
            if (!this.to) {
                if (this.needConfirmation) {
                    this.askConfirmation()
                } else {
                    this.confirm()
                }
            }
        },
        askConfirmation() {
            this.openModal(this.modalName)
        },
        confirm() {
            this.loading = true

            // this.record is null when action standalone
            let params = this.record ? [this.record.id] : []

            let options = this.blob ? { responseType: 'blob' } : {}

            axios.post(this.url, { resourceIds: params, form: this.form }, options).then((response) => {
                this.loading = false
                
                this.$emit('submitted')
                this.$emit('refreshed')
                
                console.log('action button', response)
                this.closeModal(this.modalName)

                this.processBlobResponse(response).then((response) => {
                    console.log('next')
                });
            }).catch((error) => {
                this.loading = false
                this.processActionError(error);
            })
        },
        closeModal(name, value) {
            this.$bus.$emit('toggle-modal-' + name, value)
        },
        openModal(name, value) {
            this.$bus.$emit('toggle-modal-' + name, value)
        },
    }
}
</script>

<style></style>