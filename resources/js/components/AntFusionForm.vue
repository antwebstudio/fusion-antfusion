<template>
    <div>
        <portal to="actions">
            <span class="print:hidden">
                <component @load="$emit('load')" @loaded="$emit('loaded')" @submitted="submitted" :loading="loading" :parent="componentData" v-for="action, index in actions" :key="index" :is="action.component" v-bind="action">
                    {{ action.text }}
                </component>
            </span>
        </portal>
        
        <div v-for="field in componentsByHandle" :key="field.id">
            <component v-if="!field.is_panel" v-show="!field.hide" @load="$emit('load')" @loaded="$emit('loaded')" :loading="loading" :parent="componentData" v-model="form[field.handle]" :is="field.component" v-bind="field" 
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

export default {
    props: {
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
            componentsByHandle: {},
            form: new Form(),
        }
    },
    methods: {
        registerWatch(field) {
            field.dependsOn.forEach((attribute) => {
                // console.log('register watch for form ' + attribute)
                this.$watch('form.' + attribute, (value, oldValue) => {
                    this.syncDependantFields(field, attribute)
                }, { deep: true });
            })
        },
        syncDependantFields(fieldToBeUpdated, dependsOnAttribute) {
            let params = {
                field: fieldToBeUpdated.handle,
                path: fieldToBeUpdated.path,
                attribute: dependsOnAttribute,
                form: this.form.data(),
            }
            axios.patch(this.syncDependantFieldUrl, params).then((response) => {
                let field = response.data
                this.$set(this.componentsByHandle, field.id, field)
                // console.log(field)
            })
        },
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

        let components = this.children || this.fields
        _.each(components, (component) => {
            this.$set(this.componentsByHandle, component.id, component)
            if (component.dependsOn) {
                this.registerWatch(component)
            }
        })

        this.form = new Form(form, true)
        this.form.errors.record( { errors: this.errors } )
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