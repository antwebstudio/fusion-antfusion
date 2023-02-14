<template>
    <div>
        <portal to="actions">
            <span class="print:hidden">
                <component @load="$emit('load')" @loaded="$emit('loaded')" @submitted="submitted" :loading="loading" :parent="componentData" v-for="action, index in actions" :key="index" :is="action.component" v-bind="action">
                    {{ action.text }}
                </component>
            </span>
        </portal>

        <div v-for="field in fields" :key="field.handle">
            <component @load="$emit('load')" @loaded="$emit('loaded')" :loading="loading" :parent="componentData" v-model="form[field.handle]" :is="field.component" v-bind="field" 
                :has-error="form.errors.has(field.handle)"
                :error-message="form.errors.get(field.handle)"
                >
                {{ field.text }}
            </component>
        </div>
    </div>
</template>

<script>
import Form from '@/services/Form'

export default {
    props: {
        loading: {
            default: false
        },

        actions: {

        },

        fields: {

        },
    },
    data() {
        return {
            form: new Form(),
        }
    },
    methods: {
        submitted() {
            this.$emit('submitted', this.form)
            bus().$emit('refresh-form', this.form)
        },
    },
    mounted() {
        let form = {}
        _.each(this.fields, (field) => {
            form[field.handle] = field.default
        })
        this.form = new Form(form, true)
    },
    computed: {
        componentData() {
            return this.form
        },
    },
}
</script>

<style>

</style>