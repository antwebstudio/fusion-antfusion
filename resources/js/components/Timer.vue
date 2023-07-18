<template>
    <div>
        Time Remaining: 
        <span v-if="days">{{ days }} days, </span>
        <span v-if="hours || days">{{ hours }} hours, </span>
        <span v-if="minutes || hours || days">{{ minutes }} minutes, </span>
        <span v-if="seconds || minutes || hours || days">{{ seconds }} seconds.</span>

        <button v-show="false" ref="submitButton">Submit</button>
    </div>
</template>

<script>
    import VueCountdown from 'vue-countdown';

    const MILLISECONDS_SECOND = 1000;
    const MILLISECONDS_MINUTE = 60 * MILLISECONDS_SECOND;
    const MILLISECONDS_HOUR = 60 * MILLISECONDS_MINUTE;
    const MILLISECONDS_DAY = 24 * MILLISECONDS_HOUR;

    export default {
        components: { VueCountdown },
        props: {
            value: {

            },
            record: {

            }
        },
        data() {
            return {
                timeLeft: null,
            }
        },
        computed: {
            days() {
                return Math.floor(this.timeLeft / MILLISECONDS_DAY);
            },
            hours() {
                return Math.floor((this.timeLeft % MILLISECONDS_DAY) / MILLISECONDS_HOUR);
            },
            minutes() {
                return Math.floor((this.timeLeft % MILLISECONDS_HOUR) / MILLISECONDS_MINUTE);
            },
            seconds() {
                return Math.floor((this.timeLeft % MILLISECONDS_MINUTE) / MILLISECONDS_SECOND);
            },
            endTime() {
                return new Date(this.value)
            }
        },
        mounted() {
            this.timeLeft = this.endTime - new Date

            setInterval(() => {
                this.timeLeft = this.endTime - new Date
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