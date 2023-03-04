<template>
    <div>
        <portal to="actions">
            <span class="print:hidden">
                <component @load="$emit('load')" @loaded="$emit('loaded')" @submitted="submitted" :loading="loading" :parent="componentData" v-for="action, index in actions" :key="index" :is="action.component" v-bind="action">
                    {{ action.text }}
                </component>
            </span>
        </portal>

        <div v-if="debug">{{ form }}</div>
        
        <div v-bind="$props" v-for="field in children" :key="field.id">
            <component v-if="!field.is_panel" v-show="!field.hide" @load="$emit('load')" @loaded="$emit('loaded')" :loading="loading" :parent="componentData" v-model="form[field.handle]" :is="field.component" v-bind="field" 
                :form="form"
                :has-error="form.errors.has(field.handle)"
                :error-message="form.errors.get(field.handle)"
                >
                {{ field.text }}
            </component>

            <component v-else v-model="form" v-show="!field.hide" :is="field.component" v-bind="field" 
                :form="form"
                :sync-dependant-field-url="syncDependantFieldUrl"
                >
                {{ field.text }}
            </component>
        </div>

        <input type="hidden" :name="name" :value="JSON.stringify(this.form.data())" />
    </div>
</template>

<script>
import Form from '@/services/Form'
import DependantField from '../mixins/dependant-field'

export default {
    mixins: [DependantField],
    props: {
        debug: {
            default: false,
        },
        name: {
            default: '_antfusion_form'
        },
        loading: {
            default: false
        },

        actions: {

        },
        children: {

        },
        fields: {

        },
        values: {
            default: {}
        },
        errors: {
            default: {}
        },
        syncDependantFieldUrl: {

        },
    },
    data() {
        return {
            // componentsByHandle: {},
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
            form[field.handle] = this.values[field.handle] || field.default
            console.log('field', field)
            console.log('set '+field.handle, this.values[field.handle], field.default)
            console.log('value', form[field.handle])
        })

        this.form = new Form(form, true)
        this.form.errors.record( { errors: this.errors } )

        // Register after the form is initialized
        this.registerComponentsDependency(this.children, this.form)
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