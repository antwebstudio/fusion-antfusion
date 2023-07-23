<template>
    <div class="overflow-x-auto">
        <table v-bind="$props">
            <slot></slot>
        </table>
    </div>
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