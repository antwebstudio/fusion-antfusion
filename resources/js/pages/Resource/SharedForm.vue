<template>
    <div>
        <portal to="actions">
            <div>
                <component :parent="$parent" v-on="action.events" v-for="action, index in actions" :key="index" :is="action.component" v-bind="action">
                    {{ action.text }}
                </component>
            </div>
        </portal>

        <section-card title="Loading..." v-show="loading"></section-card>

        <div v-show="! loading">
            <div v-for="field, index in meta.children" :key="index">
                <component v-if="field.is_panel" v-model="form" :is="field.component" v-bind="field" 
                    :form="form"
                    >
                    {{ field.text }}
                </component>

                <component v-else v-model="form[field.field.handle]" :is="field.component" v-bind="field" 
                    :form="form"
                    :has-error="form.errors.has(field.field.handle)"
                    :error-message="form.errors.get(field.field.handle)"
                    >
                    {{ field.text }}
                </component>
            </div>
        </div>
    </div>
</template>

<script>
import Flatpickr from '@/ui/Flatpickr/Flatpickr.vue'
    export default {
        props: {
            entry: {
                required: false
            },

            actions: {
                
            },

            resource: {
                required: true,
            },

            meta: {
                required: true,
            },

            form: {
                type: Object,
                required: true,
            },

            loading: {
                type: Boolean,
                required: false,
            }
        },

        data() {
            return {
                editSlug: false,
                slugValue: '',
            }
        },

        computed: {
            fields() {
                return this.meta.fields
            }
        },

        methods: {
        },
    }
</script>