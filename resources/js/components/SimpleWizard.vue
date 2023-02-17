<template>
    <div>
        wizard{{ syncDependantFieldUrl }}
        <!-- {{ steps }} -->
        <div v-for="step, index in steps" :key="index">
            <div v-if="index == currentStep">
                <component 
                    v-show="!field.hide" 
                    v-model="fieldValues[field.field.handle]"
                    v-for="field, index in step.children" :key="index"
                    :is="field.component" v-bind="field" 
                    :has-error="form.errors.has(field.field.handle)"
                    :error-message="form.errors.get(field.field.handle)"
                    >
                    {{ field.text }}
                </component>
            </div>
        </div>

        <div v-bind="footer">
            <ui-button v-bind="prevButton" v-show="hasPreviousStep" @click.prevent="prev">{{ prevButton.text }}</ui-button>
            <ui-button v-bind="nextButton" v-show="hasNextStep" @click.prevent="next">{{ nextButton.text }}</ui-button>
            <ui-button v-bind="submitButton" v-show="!hasNextStep">{{ submitButton.text }}</ui-button>
        </div>
    </div>
</template>

<script>
import Form from '@/services/Form'
export default {
    props: {
        validateUrl: {

        },
        syncDependantFieldUrl: {

        },
        path: {

        },
        steps: {

        },
        value: {

        },
        form: {

        },
        footer: {
            
        },
        nextButton: {
            default: {}
        },
        prevButton: {
            default: {}
        },
        submitButton: {
            default: {}
        },
    },
    watch: {
        fieldValues: {
            handler(value) {
                // let form = 
                Object.keys(value).forEach((key) => {
                    this.form[key] = value[key]
                })
                this.$emit('input', this.form)
            },
            deep: true,
        }
    },
    data() {
        return {
            componentsByHandle: {},
            currentStep: 0,
            fieldValues: this.form,
        }
    },
    computed: {
        hasPreviousStep() {
            return this.currentStep > 0
        },
        hasNextStep() {
            return this.currentStep < this.steps.length - 1
        },
    },
    mounted() {
        _.each(this.steps, (step) => {
            _.each(step.children, (component, fieldKey) => {
                this.$set(this.componentsByHandle, component.id, component)
                if (component.dependsOn) {
                    this.registerWatch(component, step.children, fieldKey)
                }
            })
        })
    },
    methods: {
        registerWatch(fieldToBeUpdated, fieldCollections, fieldKey) {
            fieldToBeUpdated.dependsOn.forEach((attribute) => {
                // console.log('register watch for form ' + attribute)
                this.$watch('form.' + attribute, (value, oldValue) => {
                    this.syncDependantFields(fieldToBeUpdated, attribute, fieldCollections, fieldKey)
                }, { deep: true });
            })
        },
        syncDependantFields(fieldToBeUpdated, dependsOnAttribute, fieldCollections, fieldKey) {
            let params = {
                field: fieldToBeUpdated.handle,
                path: fieldToBeUpdated.path,
                attribute: dependsOnAttribute,
                form: this.form.data(),
            }
            axios.patch(this.syncDependantFieldUrl, params).then((response) => {
                let field = response.data
                console.log('before', fieldCollections[fieldKey])
                this.$set(fieldCollections, fieldKey, field)
                console.log('after', fieldCollections[fieldKey])
                // this.$set(this.componentsByHandle, field.id, field)
                // console.log(field)
            })
        },
        validate() {
            let params = {
                step: this.currentStep,
                path: this.path,
                form: this.form.data(),
            }
            return axios.post(this.validateUrl, params)
        },
        next() {
            if (this.hasNextStep) {
                this.validate().then((response) => {
                    this.currentStep++
                }).catch((error) => {
                    console.log(error.response.data)
                    this.form.errors.record(error.response.data)
                })
            }
        },
        prev() {
            if (this.hasPreviousStep) {
                this.currentStep--
            }
        }
    }
}
</script>

<style>

</style>