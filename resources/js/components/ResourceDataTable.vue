<template>
    <div>
        <div class="flex">
            <component v-for="card in metrics" :key="card.handle" :is="card.component" v-bind="card" v-model="metricValues[card.handle]" />
        </div>
        <span v-for="filter in filters" :key="filter.handle">
            <component v-if="!filter.builtin" :is="filter.component" v-bind="filter" v-model="filterValues[filter.handle]" />
        </span>
        <antfusion-datatable v-bind="$props" :filters="filterValues" @update-metrics="updateMetrics">
            <template v-slot:bulkActions="{ parent }">
                <div class="ml-auto">
                    <select name="bulk-actions" id="bulk-actions" class="field-select field-select--sm field-select--bordered" v-model="action" @change="initForm(parent); showBulkActionConfirmation = true">
                        <option selected disabled :value="null">Bulk Actions</option>

                        <option v-for="(action, index) in parent.allowedBulkActions" :key="action.name" :value="index">{{ action.name }}</option>
                    </select>
                </div>
                
                <portal to="modals">
                    <ui-modal v-if="action !== null" name="confirm-bulk-action" :title="'Confirm Bulk ' + parent.allowedBulkActions[action].name" v-model="showBulkActionConfirmation">
                        <div v-if="parent.allowedBulkActions[action].params && parent.allowedBulkActions[action].params.fields.length">
                            <span v-if="form">
                                <component v-model="form[field.handle]" v-for="field, index in parent.allowedBulkActions[action].params.fields" :key="field.handle" :is="field.component" v-bind="field"
                                    :parent="componentData"
                                    :record="record"
                                    :has-error="form.errors.has(field.handle)"
                                    :error-message="form.errors.get(field.handle)"
                                    :errors="form.errors"
                                />
                            </span>
                        </div>

                        <p v-else >Are you sure you want to perform this action against <b>{{ parent.selected.length }}</b> record{{parent.selected.length > 1 ? 's' : '' }}?</p>


                        <template v-slot:footer>
                            <ui-button @click.prevent="confirmBulkAction(parent)" :loading="working" class="ml-3" variant="primary">Confirm</ui-button>
                            <ui-button @click.prevent="cancelBulkAction(parent)" v-if="! working" variant="secondary">Cancel</ui-button>
                        </template>
                    </ui-modal>
                </portal>
            </template>
            <template v-slot:actions="table">
                <div class="flex" v-if="table.record.actions && table.record.actions.length">
                    <component :record="table.record" @submitted="reload" @updated="reload" v-for="action, index in table.record.actions" :key="index" :is="action.component" v-bind="action">
                        {{ action.text }}
                    </component>
                </div>

                <!-- <ui-actions :id="'entry_' + table.record.id + '_actions'" :key="'entry_' + table.record.id + '_actions'">
                    <ui-dropdown-link :to="{ name: 'collection.edit', params: {collection: collection.slug, id: table.record.id} }">Edit</ui-dropdown-link>

                    <ui-dropdown-divider></ui-dropdown-divider>

                    <ui-dropdown-link
                        @click.prevent
                        v-modal:delete-entry="table.record"
                        class="danger">
                        Delete
                    </ui-dropdown-link>
                </ui-actions> -->
            </template>
        </antfusion-datatable>
    </div>
</template>

<script>
import Form from "@/services/Form"

export default {
    props: {
        id: {
            required: true,
            type: String
        },
        bulk: {
            type: Boolean,
            default: true
        },
        metrics: {

        },
        filters: {

        },
        refresh: {
            type: Number|Boolean,
            default: false
        },
        noRecords: {
            type: String,
            default: 'No records to display'
        },
        endpoint: {
            required: true,
            type: String
        },
        sortBy: {
            type: String,
            default: 'id'
        },
        saveSortBy: {
            type: Boolean,
            default: true,
        },
        perPage: {
            type: Number,
            default: 10
        },
        sortIn: {
            type: String,
            default: 'asc'
        },
        noSearch: {
            type: Boolean,
            default: false
        },
        primaryKey: {
            required: false,
            type: String,
            default: 'id'
        },
        showPageStatus: {
            type: Boolean,
            default: false
        },
        showPageNumbers: {
            type: Boolean,
            default: false
        },
        showPageNav: {
            type: Boolean,
            default: false
        },
        showPageEnds: {
            type: Boolean,
            default: false
        },
        hidePageSelect: {
            type: Boolean,
            default: false
        },
        pageSelectLabel: {
            type: String,
            default: 'Page'
        },
        reorder_route: {
            type: String,
            default: ''
        },
        link_name: {
            type: String,
            default: ''
        },
        link_param: {
            type: String,
            default: ''
        },
        show_status: {
            type: Boolean,
            default: false
        },
        show_order: {
            type: Boolean,
            default: true
        },
        actions: {

        },
        default_filter_values: {
            default: {}
        },
    },
    watch: {
        showBulkActionConfirmation(value) {
            if (value == false) {
                this.action = null
            }
        },
    },
    data() {
        return {
            filterValues : this.default_filter_values,
            metricValues: {},
            form: null,
            action: null,
            fields: [],
            working: false,
            showBulkActionConfirmation: false,
        }
    },
    computed: {
    },
    mounted() {
        bus().$on('refresh', () => {
            this.reload()
        })
    },
    methods: {
        updateMetrics(metricValues) {
            this.metricValues = metricValues
        },
        cancelBulkAction(dataTable) {
            this.action = null
            this.showBulkActionConfirmation = false
        },
        confirmBulkAction(dataTable) {
            let action = dataTable.allowedBulkActions[this.action]
            let vm = this
            let formData = this.form.formdata()

            dataTable.selected.forEach((selected) => {
                formData.append('records[]', selected)
            })

            this.working = true

            this.form.submit('post', `${action.route}`, formData).then((response) => {
                toast('Bulk action completed successfully.', 'success')

                dataTable.selected = []
                
                vm.reload()

                vm.showBulkActionConfirmation = false
                vm.action = null
                vm.working = false
            }).catch((error) => {
                vm.working = false

                if (error.errors) {
                    // this.errors = error.errors
                    var message = Object.keys(error.errors).map((key) => {
                        return error.errors[key].join(' ');
                    }).join(' ')

                    toast(message, 'failed')
                } else {
                    toast(error.message, 'failed')
                }
            })
        },
        initForm(dataTable) {
            let action = dataTable.allowedBulkActions[this.action]

            if (action.params) {
                let fields = {}
                action.params.fields.forEach((field) => {
                    fields[field.handle] = null
                })
                this.form = new Form(fields)
            }
        },
        reload() {
            bus().$emit('refresh-datatable-' + this.id)
        }
    }
}
</script>

<style>

</style>