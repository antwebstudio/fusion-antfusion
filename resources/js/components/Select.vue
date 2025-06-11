<template>
    <Dropdown v-if="newVersion" v-model="model" :options="options" optionLabel="label" optionValue="value" :filterable="filterable" />

    <ui-select-group v-else
        v-model="model"
        :label="label"
        :id="id"
        :multiple="multiple"
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
import Dropdown from 'primevue/dropdown';

export default {
    components: {
        Dropdown,
    },
    props: {
        id: {

        },
        label: {

        },
        multiple: {
            default: false,
        },
        newVersion: {
            default: false,
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