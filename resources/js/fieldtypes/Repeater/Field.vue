<template>
    <div v-if="selectNumber">
        <ui-select-group name="repeater_count" :label="label" v-model="model.count" :options="selectNumberOptions()" ></ui-select-group>
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
        <ui-button @click="reset" v-if="!repeater_fields || repeater_fields.length == 0">Add</ui-button>
        <vue-repeater v-model="repeater_fields" :fields="repeater_fields"></vue-repeater>
        <pre v-if="debug">{{ value }}</pre>
    </div>
</template>

<style lang="scss" scoped>
	@import '~vue-repeater/dist/lib/vue-repeater.css'
</style>
<script>
import VueRepeater from './Repeater';
// import VueRepeater from 'vue-repeater'
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
            
        },
        debug: {
            default: false,
        },
    },
    watch: {
        value: {
            deep: true,
            handler(values) {
                console.log('value changes')
                if (!this.selectNumber) {
                    if (this.repeater_fields.length == values.length) {
                        this.repeater_fields.forEach((row, index) => {
                            let value = values[index];

                            if (row.value != value) {
                                row.value = value
                            }
                        })
                    } else {
                        // this.repeater_fields = null;
                        this.loadValuesToRepeater(values);
                    }
                }
            }
        },
        repeater_fields: {
            deep: true,
            handler(value) {
                console.log('fields changes')
                // if (this.initialized) {
                    let values = value.map((row) => {
                        return row.value;
                    })
                    this.$emit('input', values)
                // }
            }
        },
        model: {
            deep: true,
            handler(value) {
                
                console.log('model changes')
                this.$emit('input', value)
            }
        }
    },
    created() {
        this.loadValuesToRepeater(this.value);

        this.$nextTick(() => {
            // this.initialized = true;
        })
    },
    data() {
        return {
            initialized: false,
            repeater_fields: this.fields,
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
        loadValuesToRepeater(values) {
            let fields = null;
            if (values.length > this.fields.length) {
                fields = values.map((value, index) => {
                    return {
                        ...this.fields[0],
                        value: value ? value : {},
                    }
                })
            } else {
                fields = this.fields.map((row, index) => {
                    let returnValue = {
                        ...row,
                        value: values[index] ? values[index] : {},
                    };

                    return returnValue;
                })
            }

            this.repeater_fields = fields;
        },
        reset() {
            this.repeater_fields = {...this.fields}
        },
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