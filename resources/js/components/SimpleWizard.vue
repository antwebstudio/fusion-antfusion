<template>
    <div>
        <div v-if="debug">{{ fieldValues }}</div>
        <div v-for="step, stepIndex in steps" :key="stepIndex">
            <div v-if="stepIndex == currentStep">
                <div v-for="field, fieldIndex in step.children" :key="stepIndex + '_' + field.handle + '_' + fieldIndex">
                    <component 
                        v-if="!field.is_panel" 
                        @input="saveForm"
                        v-show="!field.hide" 
                        v-model="fieldValues[field.field.handle]"
                        :is="field.component" v-bind="field" 
                        :errors="form.errors"
                        :hasError="form.errors.has(field.field.handle)"
                        :errorMessage="form.errors.get(field.field.handle)"
                        :key="field.handle"
                        >
                        {{ field.text }}
                    </component>

                    <component 
                        v-else
                        @input="saveForm"
                        v-show="!field.hide" 
                        :form="form"
                        :errors="form.errors"
                        :key="field.handle"
                        :is="field.component" v-bind="field" 
                        >
                        {{ field.text }}
                    </component>
                </div>
            </div>
        </div>

        <div v-bind="footer">
            <ui-button :disabled="loading" v-bind="prevButton" v-show="hasPreviousStep" @click.prevent="prev">{{ prevButton.text }}</ui-button>
            <ui-button :disabled="loading" v-bind="nextButton" v-show="hasNextStep" @click.prevent="next">{{ nextButton.text }}</ui-button>
            <ui-button :disabled="loading" v-bind="submitButton" v-show="!hasNextStep" @click.prevent="submit">{{ submitButton.text }}</ui-button>
            
            <!-- Hidden submit button used to trigger form submit -->
            <button v-show="false" ref="submit"></button>
        </div>
    </div>
</template>

<script>
import Form from '@/services/Form'
import DependantField from '../mixins/dependant-field'

export default {
    mixins: [DependantField],
    props: {
        id: {

        },
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
        saveStateExcept: {
            type: Array,
        },
        saveState: {
            default: false,
        },
        validateOnLastStep: {
            default: true,
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
        debug: {
            default: false,
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
            loadedSteps: this.steps,
            loading: false,
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
        localStorageName() {
            return 'simple_wizard_' + this.id
        }
    },
    created() {
        _.each(this.loadedSteps, (step) => {
            this.registerComponentsDependency(step.children, this.form)
            // _.each(step.children, (component, fieldKey) => {
            //     this.$set(this.componentsByHandle, component.id, component)
            //     if (component.dependsOn) {
            //         this.registerWatch(component, step.children, fieldKey)
            //     }
            // })
        })
        if (this.saveState) {
            this.loadForm()
        }
    },
    methods: {
        loadForm() {
            let form = JSON.parse(localStorage.getItem(this.localStorageName))
            if (form) {
                Object.keys(form).forEach((key) => {
                    if (key != 'errors' && !this.saveStateExcept.includes(key)) {
                        this.form[key] = form[key]
                    }
                })
            }
        },
        saveForm() {
            localStorage.setItem(this.localStorageName, JSON.stringify(this.form))
        },
        validate() {
            let params = {
                step: this.currentStep,
                path: this.path,
                form: this.form,
            }
            return axios.post(this.validateUrl, params)
        },
        submit() {
            this.next()
        },
        next() {
            if (this.hasNextStep || this.validateOnLastStep) {
                this.loading = true
                this.validate().then((response) => {
                    this.loading = false
                    this.form.errors.record({errors: {}})
                    if (this.hasNextStep) {
                        this.currentStep++
                        this.$nextTick(() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        })
                    } else {
                        this.$refs.submit.click()
                    }
                }).catch((error) => {
                    this.loading = false
                    // console.log('validation', error.response.data)
                    this.form.errors.record(error.response.data)
                    this.$nextTick(() => {
                        this.$el.querySelector('.help').scrollIntoView({behavior: 'smooth'})
                    })
                })
            } else {
                this.$refs.submit.click()
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