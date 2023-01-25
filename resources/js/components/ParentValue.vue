<template>
    <div class="form-group" >
        <ui-label>{{ name }}</ui-label>   
        <div>{{ value }}</div>
    </div>
</template>

<script>
import _ from 'lodash'

export default {
    props: {
        name: {

        },
        parent: {

        },
        attribute: {

        },
        label: {

        }
    },
    computed: {
        value() {
            if (this.parent && this.attribute) {
                let value = _.get(this.parent, this.attribute)
                this.$emit('input', value)
                return value
            }
        },
    },
}
</script>

<style>

</style>