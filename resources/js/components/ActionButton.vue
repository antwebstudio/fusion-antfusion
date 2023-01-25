<template>
    <span>
        <ui-button v-modal:[modalName]>{{ text }}</ui-button>

        <portal to="modals">
            <ui-modal :name="modalName" :title="title" :key="modalName" @input="modalChanged">
                
                <span v-if="form">
                    <component v-model="form[field.handle]" v-for="field, index in fields" :key="field.handle" :is="field.component" v-bind="field"
                        :parent="componentData"
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
    </span>
</template>

<script>
import Form from "@/services/Form"

export default {
    props: {
        parent: {

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

        }
    },
    data() {
        return {
            loading: false,
            form: null,
        }
    },
    computed: {
        modalName() {
            return 'action'
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
                fields[field.handle] = null
            })
            this.form = new Form(fields)
        },
        submit() {
            this.loading = true
            this.form.post(this.url).then((response) => {
                this.loading = false
                this.$emit('submitted')
                this.closeModal(this.modalName)
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
        }
    }
}
</script>

<style>

</style>