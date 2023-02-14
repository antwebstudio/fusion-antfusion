<template>
    <span> 
        <ui-button v-if="!loading" @click.prevent="print">{{ text }}</ui-button>
    </span>
</template>

<script>
export default {
    props: {
        loading: {
            default: false,
        },
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