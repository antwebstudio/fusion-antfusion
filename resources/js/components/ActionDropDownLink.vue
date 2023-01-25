<template>
    <div>
        <ui-dropdown-link
            @click.prevent="performAction"
            v-bind="$props" :class="cssClass"
            >
            {{ text }}
        </ui-dropdown-link>
        
        <portal to="modals" v-if="needConfirmation">
            <ui-modal :name="modalName" :title="confirmTitle" :key="modalName">
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
export default {
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
            console.log('need ', this.needConfirmation)
            if (this.needConfirmation) {
                this.askConfirmation()
            } else {
                this.confirm()
            }
        },
        askConfirmation() {
            this.openModal(this.modalName)
        },
        confirm() {
            console.log('confirm', this)
            this.loading = true
            axios.post(this.url, { resourceIds: [this.record.id] }).then((response) => {
                console.log('action button', response)
                if (response.data.redirect) {
                    this.$router.push(response.data.redirect)
                } else {
                    this.loading = false
                    toast(response.data.message, 'success')
                    this.closeModal(this.modalName)

                    this.$emit('updated')
                }
            }).catch((error) => {
                this.loading = false
                toast(error.response.data.message, 'error')
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

<style>

</style>