<template>
    <ui-select-group
        v-model="model"
        :label="label"
        :filterable="filterable"
        :options="options">
        <template v-slot:footer>
             <component @submitted="reload" @updated="reload" v-for="action, index in actions" :key="index" :is="action.component" v-bind="action">
                {{ action.text }}
            </component>
        </template>
    </ui-select-group>
</template>

<script>
export default {
    props: {
        label: {

        },
        value: {
            required: false,
            default: null
        },
        actions: {

        },
        filterable: {
            default: true,
        },
        options: {
            default: [],
        },
    },
    computed: {
        model: {
            get() {
                return this.value
            },

            set(value) {
                this.$emit('input', value)
            }
        }
    },
    methods: {
        addNew() {

        }
    }
}
</script>

<style>

</style>