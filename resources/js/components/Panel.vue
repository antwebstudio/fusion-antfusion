<template>
    <div class="card">
        <div class="card__body" :class="{ 'card-col': label }">
            <div v-if="label" class="section-card__header card-col__header">
                <h2>{{ label }}</h2>
            </div>
            <div :class="{ 'section-card__body card-col__body' : label }">
                <component 
                    v-model="fieldValues[field.field.handle]"
                    v-for="field, index in children" :key="index"
                    :is="field.component" v-bind="field" 
                    :has-error="form.errors.has(field.field.handle)"
                    :error-message="form.errors.get(field.field.handle)"
                    >
                    {{ field.text }}
                </component>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        label: {

        },
        value: {

        },
        form: {

        },
        hasError: {

        },
        errorMessage: {

        },
        children: {

        },
        fields: {

        },
        actions: {

        },
    },
    watch: {
        fieldValues: {
            handler(value) {
                console.log(value)
                let form = {
                    ...this.form,
                    ...value,
                }
                this.$emit('input', form)
            },
            deep: true,
        }
    },
    data() {
        return {
            fieldValues: this.form,
        }
    }
}
</script>

<style>

</style>