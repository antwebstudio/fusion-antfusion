<template>
    <table v-bind="$props">
        <slot></slot>
    </table>
</template>

<script>
export default {
    props: {
        children: {

        },
    },
    watch: {
    },
    data() {
        return {
        }
    },
}
</script>