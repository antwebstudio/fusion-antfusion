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
    const MILLISECONDS_SECOND = 1000;
    const MILLISECONDS_MINUTE = 60 * MILLISECONDS_SECOND;
    const MILLISECONDS_HOUR = 60 * MILLISECONDS_MINUTE;
    const MILLISECONDS_DAY = 24 * MILLISECONDS_HOUR;

    export default {
        props: {
            value: {

            },
            record: {

            },
            allowNegative: {
                default: false,
            },
        },
        data() {
            return {
                timeLeft: null,
            }
        },
        computed: {
            days() {
                let value = this.timeLeft / MILLISECONDS_DAY;
                return this.timeLeft > 0 ? Math.floor(value) : Math.ceil(value);
            },
            hours() {
                let value = (this.timeLeft % MILLISECONDS_DAY) / MILLISECONDS_HOUR;
                return this.timeLeft > 0 ? Math.floor(value) : Math.ceil(value);
            },
            minutes() {
                let value = (this.timeLeft % MILLISECONDS_HOUR) / MILLISECONDS_MINUTE;
                return this.timeLeft > 0 ? Math.floor(value) : Math.ceil(value);
            },
            seconds() {
                let value = (this.timeLeft % MILLISECONDS_MINUTE) / MILLISECONDS_SECOND;
                return this.timeLeft > 0 ? Math.floor(value) : Math.ceil(value);
            },
            endTime() {
                return new Date(this.value)
            }
        },
        mounted() {
            this.updateTime()
            
            setInterval(() => {
                this.updateTime()
                
                if (this.timeLeft <= 0) {
                    this.submit()
                }
            }, 1000)
        },
        methods: {
            updateTime() {
                if (this.allowNegative) {
                    this.timeLeft = this.endTime - new Date
                } else {
                    Math.max(0, this.timeLeft = this.endTime - new Date)
                }
            },
            submit() {
                this.$refs.submitButton.click()
            }
        }
    }
</script>