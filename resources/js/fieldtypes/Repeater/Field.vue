<template>
    <div v-if="selectNumber">
        <ui-select-group :label="label" v-model="model.count" :options="selectNumberOptions()" ></ui-select-group>
        <div v-for="i in selectedInteger" :key="i">
            <div class="card border border-solid border-slate-500 p-2">
                <component
                    v-for="field in fields"
                    :is="field.name"
                    v-bind="field"
                    v-model="model.records[i]" :key="field.handle + '_' + i"></component>
            </div>
        </div>

    </div>
    <div v-else >
        <vue-repeater v-model="model"></vue-repeater>
    </div>
</template>

<style lang="scss" scoped>
	@import '~vue-repeater/dist/lib/vue-repeater.css'
</style>
<script>
import VueRepeater from './Repeater';
// import '~vue-repeater/dist/lib/vue-repeater.css'

export default {
    components: {
        VueRepeater,
    },
    props: {
        handle: {

        },
        value: {
            default: {},
        },
        label: {

        },
        selectNumber: {
            default: false,
        },
        max: {
            default: 10,
        },
        min: {
            default: 0,
        },
        fields: {
            
        }
    },
    watch: {
        model: {
            deep: true,
            handler(value) {
                this.$emit('input', value)
            }
        }
    },
    data() {
        return {
            model: this.value ? this.value : { count: null, records: {} },
        }
    },
    computed: {
        selectedInteger() {
            if (this.model.count) {
                return parseInt(this.model.count)
            }      
        }
    },
    methods: {
        selectNumberOptions() {
            let options = [];
            for (let i = this.min; i <= this.max; i++) {
                options.push(i.toString());
            }
            return options;
        }
    },
}
</script>