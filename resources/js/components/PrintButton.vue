<template>
    <span> 
        <ui-button @click.prevent="print">{{ text }}</ui-button>
    </span>
</template>

<script>
export default {
    props: {
        text: {
            default: "Print"
        }
    },
    methods: {
        print() {
            window.print()
        }
    }
}
</script>

<style>

</style>