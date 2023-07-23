<template>
    <div class="w-full">
        <portal to="actions">
            <span v-if="actions && actions.length" class="print:hidden">
                <component @load="$emit('load')" @loaded="$emit('loaded')" @submitted="submitted" @refreshed="refreshed" :loading="loading" :record="form" :parent="componentData" v-for="action, index in actions" :key="index" :is="action.component" v-bind="action">
                    {{ action.text }}
                </component>
            </span>
        </portal>

        <div v-if="debug">{{ form }}</div>
        
        <div :class="classes">
            <template v-for="field in children">
            <component :key="field.id" v-if="!field.is_panel" v-show="!field.hide" @refreshed="refreshed" @load="$emit('load')" @loaded="$emit('loaded')" :loading="loading" :parent="componentData" v-model="form[field.handle]" :is="field.component" v-bind="field" 
                :form="form"
                :has-error="form.errors.has(field.handle)"
                :error-message="form.errors.get(field.handle)"
                >
                {{ field.text }}
            </component>

            <component :key="field.id" v-else v-show="!field.hide" :is="field.component" v-bind="field" 
                @refreshed="refreshed" 
                :form="form"
                :sync-dependant-field-url="syncDependantFieldUrl"
                >
                {{ field.text }}
            </component>
            </template>
        </div>

        <input type="hidden" :name="name" :value="JSON.stringify(this.form)" />
    </div>
</template>

<script>
import Form from '@/services/Form'
import DependantField from '../mixins/dependant-field'

export default {
    mixins: [DependantField],
    props: {
        classes: {
            
        },
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
        },
        refreshed() {
            bus().$emit('refresh-form', this.form)
        }
    },
    mounted() {
        let form = {}
        _.each(this.fields, (field) => {
            form[field.handle] = this.values[field.handle] || field.default
            // console.log('field', field)
            // console.log('set '+field.handle, this.values[field.handle], field.default)
            // console.log('value', form[field.handle])
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