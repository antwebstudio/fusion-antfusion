<template>
    <component :is="as" v-bind="props" :form="form" :errors="form.errors">
        {{ text }}
        <component v-if="children" v-model="form[childComponent.handle]" :form="form" :errors="form.errors" :record="record" @updated="$emit('updated')" v-for="childComponent, index in children" :key="index" :is="childComponent.component" v-bind="childComponent">
            {{ childComponent.text }}

            <component :form="form" :errors="form.errors" v-if="childComponent.children" :record="record" v-for="grandchild, index in childComponent.children" :key="index" :is="grandchild.component" v-bind="grandchild">
                {{ grandchild.text }}
            </component>
        </component>
    </component>
</template>

<script>
export default {
    props: {
        form: {

        },
        text: {

        },
        props: {

        },
        as: {

        },
        record: {

        },
        children: {

        }
    }
}
</script>

<style>

</style>