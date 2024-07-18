export default {
    props: {
        value: {
            required: false,
            default: null
        },
        // errors: {
        //     type: Object,
        //     required: false,
        //     default: () => {}
        // }
    },
    computed: {
        model: {
            get() {
                return this.value
            },

            set(value) {
                this.$emit('input', value)
            }
        }
    },
}