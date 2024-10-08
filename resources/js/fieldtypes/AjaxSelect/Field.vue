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
        <!-- Commented this or else option will shown as json -->
        <!-- But after comment, ajax-select-fieldtype in lbrary management project option shown as json string -->
        <template v-slot:option="{ option, search }">
            <slot name="option" :option="option" :search="search">{{ option }}</slot>
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
            this.loadSavedData(value)
        },
        selected() {
            if (this.field.settings.multiple || this.field.settings.allow_auto_new || this.field.settings.object_as_value) {
                this.$emit('input', this.selected)
            } else {
                this.$emit('input', this.selected.id)
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
        endpoint() {
            return this.field.settings.endpoint
        }
    },
    mounted() {
        this.loadSavedData(this.value)
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

                axios.get(url).then((response) => {
                    this.options = [response.data.data] // changed from response.data to response.data.data
                    this.selected = response.data.data; // changed from response.data to response.data.data
                    console.log(this.options)
                })
            } else if (this.field.settings.multiple) {
                savedValue.forEach((value) => {
                    this.options.push(value)
                })
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