<template>
    <component :is="as" v-bind="props" :form="form" :errors="form.errors">
        <div v-if="debug">{{ as }}</div>

        {{ text }}
        <component v-show="! childComponent.hide" v-if="children" v-model="fieldValues[childComponent.handle]" :form="form" :errors="form.errors" :record="Object.assign({}, record, childComponent.record)" v-on="$listeners" v-for="childComponent, index in children" :key="childComponent.handle + '_' + index" :is="childComponent.component" v-bind="childComponent">
            <div v-if="debug">{{ childComponent.component }}</div>

            {{ childComponent.text }}

            <component v-show="! grandchild.hide" v-model="fieldValues[grandchild.handle]" :form="form" :errors="form.errors" v-if="childComponent.children" :record="Object.assign({}, record, grandchild.record)" v-on="$listeners" v-for="grandchild, grandchildIndex in childComponent.children" :key="grandchild.handle + '_' + index + '_' + grandchildIndex" :is="grandchild.component" v-bind="grandchild">
                <div v-if="debug">{{ grandchild.component }}</div>

                {{ grandchild.text }}
            </component>
        </component>
    </component>
</template>

<script>
export default {
    props: {
        debug: {
            default: false,
        },
        form: {
            default: null,
        },
        text: {

        },
        props: {

        },
        as: {

        },
        record: {

        },
        value: {

        },
        children: {

        }
    },
    data() {
        return {
            fieldValues: this.form,
        }
    },
    
    watch: {
        form(value) {
            this.fieldValues = value
        },
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
}
</script>

<style>

</style>