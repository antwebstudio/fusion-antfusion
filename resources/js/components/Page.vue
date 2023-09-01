<template>
    <div>
        <portal to="title">
            <page-title :icon="icon || 'layer-group'">{{ title }}</page-title>
        </portal>
        
        <portal to="actions">
            <span v-if="actions && actions.length" class="print:hidden">
                <component :route="route" :loading="loading" @load="onLoading" @loaded="onLoaded" @submitted="refresh" v-for="action, index in actions" :key="index" :is="action.component" v-bind="action">
                    {{ action.text }}
                </component>
            </span>
        </portal>

        <component-container :components="components" />
    </div>
</template>

<script>
export default {
    props: {
        title: {

        },
        icon: {

        },
        actions: {

        },
        components: {

        }
    }
}
</script>

<style>

</style>