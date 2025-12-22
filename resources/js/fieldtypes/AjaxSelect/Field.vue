<template>
  <div>
    <label :for="field.handle" class="form__label label">{{ field.name }}</label>
    
    <multiselect 
        :id="field.id"
        v-model="selected" 
        :track-by="field.settings.track_by" 
        :label="field.settings.label" 
        @search-change="asyncFind" 
        @tag="addTag"
        :options="options" 
        :loading="loading"
        :internal-search="false" 
        :clear-on-select="true"
        :placeholder="field.settings.placeholder"
        :taggable="field.settings.true"
        :multiple="field.settings.multiple"
    >
        <!-- Don't comment this or else cannot overwrite the slot in ajax-select-fieldtype -->
        <template v-slot:option="{ option, search }">
            <slot name="option" :option="option" :search="search"></slot>
        </template>

        <template v-slot:noOptions>
            No result.
        </template>

        <template v-slot:afterList>
            <div style="position: sticky; bottom: 0px;">
                <component @submitted="reload" @updated="reload" v-for="action, index in actions" :key="index" :is="action.component" v-bind="action">
                    {{ action.text }}
                </component>
            </div>
        </template>

        <!-- <template v-slot:selection="{ values, search, isOpen }">
            <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span>
        </template> -->
        
    </multiselect>
  </div>
</template>

<script>
import datatable from 'fusioncms-helper-js/mixins/datatable'
import Multiselect from 'vue-multiselect'
export default {
    mixins: [datatable],
    components: { Multiselect },
    directives: {
        focus: {
            inserted(el, binding) {
                el.focus()
            }
        }
    },
    props: {
        actions: {

        },
        field: {
            type: Object,
            required: true,
        },

        value: {
            required: false,
            default: function() {
                return []
            },
        },
    },
    watch: {
        value(value) {
            if (this.field.settings.object_as_value) {
                this.selected = value
            } else if (value.substr(0, 4) != 'new_' && value.length > 0) {
                this.selected = null
                this.loadSavedData(value)
            }
        },
        selected() {
            if (this.field.settings.multiple || this.field.settings.object_as_value) {
                this.$emit('input', this.selected)
            } else {
                this.$emit('input', this.selected ? this.selected.id : null)
            }
            if (this.field.settings.clear_selected_on_select) {
                this.selected = null
            }
            if (this.field.settings.clear_options_on_select) {
                this.clearOptions()
            }
        }
    },
    data() {
        return {
            loading: false,
            selected: this.value,
            options: [],
            delayTimer: null,
        }
    },
    computed: {
        sort() {
            return this.field.settings.sort ? this.field.settings.sort : 'id'
        },
        endpoint() {
            return this.field.settings.endpoint
        }
    },
    mounted() {
        if (!this.field.settings.object_as_value) {
            this.loadSavedData(this.value)
        }
    },
    methods: {
        clearOptions() {
            this.options = []
        },
        select() {
            
        },
        remove() {

        },
        loadSavedData(savedValue) {
            if (savedValue && this.field.settings.saved_data_endpoint) {
                let url = this.field.settings.saved_data_endpoint.replace('{value}', savedValue)

                axios.get(url, {params: {resourceId: savedValue}}).then((response) => {
                    this.options = [response.data.data] // changed from response.data to response.data.data
                    this.selected = response.data.data; // changed from response.data to response.data.data
                    // console.log('loaded options', this.options)
                }).catch((error) => {
                    // this.selected = null
                })
            } else if (this.field.settings.multiple && savedValue) {
                savedValue.forEach((value) => {
                    this.options.push(value)
                })
            } else {
                this.selected = null
            }
        },
        addTag(newTag) {
            this.selected.push({
                [this.field.settings.label]: newTag,
            })
        },
        asyncFind(query, id) {
            if (query.length > this.field.settings.query_min_length) {
                this.search = query
                this.loading = true
                this.pagination.perPage = 10

                let labelAttribute = this.field.settings.label
                
                clearTimeout(this.delayTimer)

                this.delayTimer = setTimeout(() => {
                    this.getRecords(this.field.settings.query_params).then(response => {
                        // this.options = response.data.records.data.map(this.itemMap)
                        this.options = response.data.records.data

                        if (this.field.settings.allow_auto_new) {
                            this.options.push({
                                id: 'new_' + query,
                                [labelAttribute ? labelAttribute : 'name']: '[NEW]: ' + query,
                                real_name: query,
                            })
                        }
                        this.loading = false
                    })
                }, 1000);
            }
        },
    }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>