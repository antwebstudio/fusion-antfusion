<template>
    <tr v-if="content" v-html="content">
    </tr>
    <tr v-else >
        <slot></slot>
    </tr>
</template>

<script>
// import field from '../mixins/field'
export default {
    // mixins: [field],
    props: {
        /*form: {

        },*/
        content: {

        },
        children: {

        }
    },
    watch: {
    },
    data() {
        return {
        }
    },
}
</script>