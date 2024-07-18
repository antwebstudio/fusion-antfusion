<template>
    <div class="w-full">
        <portal to="actions">
            <div>
                <span v-if="actions && actions.length" class="print:hidden">
                    <component v-if="!action.dropdown" @load="$emit('load')" @loaded="$emit('loaded')" @submitted="submitted" @refreshed="refreshed" :loading="loading" :record="record" :form="form" :parent="componentData" v-for="action, index in actions" :key="index" :is="action.component" v-bind="action">
                        {{ action.text }}
                    </component>
                </span>
                <ui-actions v-if="dropdownActions && dropdownActions.length" :id="'entry_actions'" :key="'entry_actions'">
                    <div v-for="action, index in dropdownActions" :key="index">
                        <component v-if="action.dropdown" :is="action.component" v-bind="action" @submitted="submitted" @refreshed="refreshed" :loading="loading" :record="record" :form="form">
                            {{ action.text }}
                        </component>
                    </div>
                </ui-actions>
            </div>
        </portal>

        <div v-if="debug">{{ form }}</div>
        
        <div :class="classes">
            <template v-for="field in children">
            <component :debug="debug" :key="field.id" v-if="!field.is_panel" v-show="!field.hide" @refreshed="refreshed" @load="$emit('load')" @loaded="$emit('loaded')" :loading="loading" :parent="componentData" v-model="form[field.handle]" :is="field.component" v-bind="field" 
                :form="form"
                :has-error="form.errors.has(field.handle)"
                :error-message="form.errors.get(field.handle)"
                >
                {{ field.text }}
            </component>

            <component :debug="debug" :key="field.id" v-else v-show="!field.hide" :is="field.component" v-bind="field" 
                @refreshed="refreshed" 
                :form="form"
                :sync-dependant-field-url="syncDependantFieldUrl"
                >
                {{ field.text }}
            </component>
            </template>
        </div>

        <input type="hidden" :name="name" :value="JSON.stringify(this.formData)" />
    </div>
</template>

<script>
import Form from '../services/Form'
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
            default() {
                return {}
            }
        },
        errors: {
            default() {
                return {}
            }
        },
        syncDependantFieldUrl: {

        },
        useFormData: {
            default: false,
        },
    },
    data() {
        return {
            // componentsByHandle: {},
            form: new Form(),
        }
    },
    watch: {
        values(value) {
            this.initForm()
        }
    },
    methods: {
        initForm() {
            console.log('init form', this.values)
            let form = {}
            _.each(this.fields, (field) => {
                form[field.handle] = this.values[field.handle] || field.default
                //console.log('register field', field.handle)
                // console.log('set '+field.handle, this.values[field.handle], field.default)
                // console.log('value', form[field.handle])
            })

            this.form = new Form(form, true)
            this.form.errors.record( { errors: this.errors } )

            // Register after the form is initialized
            this.registerComponentsDependency(this.children, this.form)
        },
        submitted() {
            this.$emit('submitted', this.form)
        },
        refreshed() {
            bus().$emit('refresh-form', this.form)
        }
    },
    mounted() {
        this.initForm()
    },
    computed: {
        dropdownActions() {
            return this.actions.filter(action => action.dropdown)
        },
        formData() {
            return this.useFormData ? this.form.data() : this.form
        },
        componentData() {
            return this.form
        },
    },
}
</script>

<style>

</style>