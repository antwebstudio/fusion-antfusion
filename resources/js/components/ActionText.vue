<template>
    <div>
        <ui-label>{{ name }}</ui-label>
        <input class="field field--input" v-focus @keyup.enter="submit" v-model="model" />
    </div>
</template>
<script>
import action from "../mixins/action"
import field from "../mixins/field"

export default {
    mixins: [action, field],
    props: {
        name: {

        },
        clearOnSubmit: {
            default: true,
        },
    },
    data() {
        return {
        }
    },
    methods: {
        submit() {
            if (this.clearOnSubmit) {
                this.model = null;
            }
            this.$emit('submitting')
            return this.performAction({
                value: this.model,
            }).then(() => {
                this.$emit('submitted')
            }).catch(() => {
                this.$emit('failed');
            });
        },
    },
}
</script>