<template>
    <component :is="as" v-bind="props" :form="form" :errors="form.errors">
        <span v-if="debug">{{ as }}</span>

        {{ text }}
        <component v-show="! childComponent.hide" v-if="children" v-model="fieldValues[childComponent.handle]" :form="form" :errors="form.errors" :record="record" v-on="$listeners" v-for="childComponent, index in children" :key="childComponent.handle + '_' + index" :is="childComponent.component" v-bind="childComponent">
            <span v-if="debug">{{ childComponent.component }}</span>

            {{ childComponent.text }}

            <component v-show="! grandchild.hide" v-model="fieldValues[grandchild.handle]" :form="form" :errors="form.errors" v-if="childComponent.children" :record="record" v-on="$listeners" v-for="grandchild, grandchildIndex in childComponent.children" :key="grandchild.handle + '_' + index + '_' + grandchildIndex" :is="grandchild.component" v-bind="grandchild">
                <span v-if="debug">{{ grandchild.component }}</span>

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
            default: {},
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