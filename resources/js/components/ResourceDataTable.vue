<template>
    <div>
        <span v-for="filter in filters" :key="filter.handle">
            <component v-if="!filter.builtin" :is="filter.component" v-bind="filter" v-model="filterValues[filter.handle]" />
        </span>
        <antfusion-datatable v-bind="$props" :filters="filterValues">
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
        
    },
    data() {
        return {
            filterValues : {}
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
        reload() {
            bus().$emit('refresh-datatable-' + this.id)
        }
    }
}
</script>

<style>

</style>