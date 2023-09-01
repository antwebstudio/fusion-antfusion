<template>
    <td v-if="content"  v-html="content">
    </td>
    <td v-else >
        <slot></slot>
    </td>
</template>

<script>
// import field from '@/mixins/fieldtypes/field'
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