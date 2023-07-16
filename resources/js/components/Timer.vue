<template>
    <div>
        {{  timeLeft  }}
        <button v-show="false" ref="submitButton">Submit</button>
    </div>
</template>

<script>
    export default {
        props: {
            value: {

            },
            record: {

            }
        },
        data() {
            return {
                timeLeft: this.value,
            }
        },
        mounted() {
            setInterval(() => {
                this.timeLeft--
                if (this.timeLeft <= 0) {
                    this.submit()
                }
            }, 1000)
        },
        methods: {
            submit() {
                this.$refs.submitButton.click()
            }
        }
    }
</script>