<template>
    <ui-dropdown noArrow borderless :id="id" right>
        <div class="p-1 text-gray-600" @click="$emit('click')">
            <fa-icon v-if="loading" icon="spinner" spin class="fa-fw"></fa-icon>
            <fa-icon v-else icon="ellipsis-h" class="fa-fw"></fa-icon>
            <span class="sr-only">Actions</span>
        </div>

        <template v-slot:menu>
            <slot></slot>
        </template>
    </ui-dropdown>
</template>

<script>
    export default {
        name: 'datatable-actions',

        props: {
            id: {
                required: true
            },
            loading: {
                type: Boolean,
                default: false
            }
        }
    }
</script>