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
        
		<!-- NOTE: use v-if here will cause the form value incorrect after/when there is validation failed when submitting the form - all value of taxonomy field will become nulls -->
        <div v-show="! loading">
            <portal to="sidebar-left">
                <div v-for="field, index in sections.sidebarLeft" :key="index">
                    <component v-if="field.is_panel" :is="field.component" v-bind="field" 
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
            </portal>

            <div class="flex flex-wrap">
                <fragment v-for="field, index in sections.body" :key="index">
                    <component v-if="field.is_panel" :is="field.component" v-bind="field" 
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
                </fragment>
            </div>

            <portal to="sidebar-right">
                <div v-for="field, index in sections.sidebarRight" :key="index">
                    <component v-if="field.is_panel" :is="field.component" v-bind="field" 
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
            </portal>
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
            sections() {
                let body = _.filter(this.children, (field) =>
                    !field.section || field.section == 'body')

                let sidebarRight = _.filter(this.children, (field) =>
                    field.section == 'sidebar' || field.section == 'sidebar-right')

                let sidebarLeft = _.filter(this.children, (field) =>
                    field.section == 'sidebar-left')
                    
                return { body, sidebarRight, sidebarLeft }
            },
            children() {
                return this.meta.children
            },
            fields() {
                return this.meta.fields
            },
        },

        methods: {
        },
    }
</script>