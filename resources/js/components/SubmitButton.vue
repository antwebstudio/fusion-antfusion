<template>
    <span>
        <ui-button v-bind="$props" @click="parent.submit">{{ text }}</ui-button>
    </span>
</template>

<script>
export default {
    props: {
        text: {

        },
        parent: {
            
        },
        variant: {

        }
    }
}
</script>

<style>

</style>