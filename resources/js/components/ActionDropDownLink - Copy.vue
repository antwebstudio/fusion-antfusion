<template>
    <div>
        <ui-dropdown-link
            @click.prevent="performAction"
            v-bind="$props" :class="cssClass"
            >
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
import isNil from 'lodash/isNil'
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
                    if (response.data.target) {
                        window.open(response.data.redirect, response.data.target)
                    } else {
                        this.$router.push(response.data.redirect)
                    }
                } else {
                    // var blob = new Blob([response], {
                    //     type: 'application/pdf'
                    // });
                    // var url = window.URL.createObjectURL(blob)
                    this.postForm(this.url);

                    // this.handleActionResponse(blob, response.headers)

                    this.loading = false
                    toast(response.data.message, 'success')
                    this.closeModal(this.modalName)

                    this.$emit('updated')
                }
            })
            // .catch((error) => {
            //     this.loading = false
            //     toast(error.response.data.message, 'error')
            // })
        },
        closeModal(name, value) {
            this.$bus.$emit('toggle-modal-' + name, value)
        },
        openModal(name, value) {
            this.$bus.$emit('toggle-modal-' + name, value)
        },
        postForm(path, params, method='post') {

            // The rest of this code assumes you are not using a library.
            // It can be made less verbose if you use one.
            const form = document.createElement('form');
            form.method = method;
            form.action = path;

            for (const key in params) {
                if (params.hasOwnProperty(key)) {
                const hiddenField = document.createElement('input');
                hiddenField.type = 'hidden';
                hiddenField.name = key;
                hiddenField.value = params[key];

                form.appendChild(hiddenField);
                }
            }

            document.body.appendChild(form);
            form.submit();
        },

        
        emitResponseCallback(callback) {
            // this.$emit('actionExecuted')
            // Nova.$emit('action-executed')

            if (typeof callback === 'function') {
                callback()
            }
        },
        handleActionResponse(data, headers) {
            let contentDisposition = headers['content-disposition']

            if (
                data instanceof Blob &&
                isNil(contentDisposition) &&
                data.type === 'application/json'
            ) {
                data.text().then(jsonStringData => {
                    this.handleActionResponse(JSON.parse(jsonStringData), headers)
                })

                return
            }

            if (data instanceof Blob) {
                console.log('blob')

                this.emitResponseCallback(() => {
                    let fileName = 'unknown'
                    let url = window.URL.createObjectURL(new Blob([data]))
                    let link = document.createElement('a')
                    link.href = url

                    if (contentDisposition) {
                        let fileNameMatch = contentDisposition.match(/filename="(.+)"/)
                        if (fileNameMatch.length === 2) fileName = fileNameMatch[1]
                    }

                    link.setAttribute('download', fileName)
                    document.body.appendChild(link)
                    link.click()
                    link.remove()
                    window.URL.revokeObjectURL(url)
                })
            // } else if (data.modal) {
            //     this.actionResponseData = data
            //     this.showActionResponseModal = true
            // } else if (data.message) {
            //     this.emitResponseCallback(() => {
            //     Nova.success(data.message)
            //     })
            // } else if (data.deleted) {
            //     this.emitResponseCallback()
            // } else if (data.danger) {
            //     this.emitResponseCallback(() => {
            //     Nova.error(data.danger)
            //     })
            } else if (data.download) {
                console.log('data.download')
                
                this.emitResponseCallback(() => {
                    let link = document.createElement('a')
                    link.href = data.download
                    link.download = data.name
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                })
            // } else if (data.redirect) {
            //     window.location = data.redirect
            // } else if (data.visit) {
            //     Nova.visit({
            //     url: Nova.url(data.visit.path, data.visit.options),
            //     remote: false,
            //     })
            // } else if (data.openInNewTab) {
            //     this.emitResponseCallback(() => {
            //     window.open(data.openInNewTab, '_blank')
            //     })
            } else {
                console.log('others', data)
                // let message =
                // data.message || this.__('The action was executed successfully.')

                // this.emitResponseCallback(() => {
                //     Nova.success(message)
                // })
            }
        },
    }
}
</script>

<style>

</style>