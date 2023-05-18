<template>
    <ui-select-group
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
        actions: {

        },
        filterable: {
            default: true,
        },
        options: {
            default: [],
        },
    },
    methods: {
        addNew() {

        }
    }
}
</script>

<style>

</style>