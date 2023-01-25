<template>
    <ui-tabs>
        <ui-tab v-for="optionValue, name in options" :key="optionValue" :name="name" @activated="activated(optionValue)" />
    </ui-tabs>
</template>

<script>
export default {
    props: {
        value: {

        },
        options: {

        }
    },
    methods: {
        activated(value) {
            this.$emit('input', value)
        }
    }
}
</script>

<style>

</style>