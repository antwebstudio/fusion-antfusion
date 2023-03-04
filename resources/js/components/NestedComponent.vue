<template>
    <component :is="as" v-bind="props" :form="form" :errors="form.errors">
        <span v-if="debug">{{ as }}</span>

        {{ text }}
        <component v-show="! childComponent.hide" v-if="children" v-model="form[childComponent.handle]" :form="form" :errors="form.errors" :record="record" v-on="$listeners" v-for="childComponent, index in children" :key="index" :is="childComponent.component" v-bind="childComponent">
            <span v-if="debug">{{ childComponent.component }}</span>

            {{ childComponent.text }}

            <component v-show="! grandchild.hide" v-model="form[grandchild.handle]" :form="form" :errors="form.errors" v-if="childComponent.children" :record="record" v-on="$listeners" v-for="grandchild, index in childComponent.children" :key="index" :is="grandchild.component" v-bind="grandchild">
                <span v-if="debug">{{ grandchild.component }}</span>

                {{ grandchild.text }}
            </component>
        </component>
    </component>
</template>

<script>
export default {
    props: {
        debug: {
            default: false,
        },
        form: {
            default: {},
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