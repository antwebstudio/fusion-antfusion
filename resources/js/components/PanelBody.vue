<template>
    <div class="card__body" :class="{ 'card-col': label }">
        <div v-if="label" class="section-card__header card-col__header">
            <h2>{{ label }}</h2>
        </div>
        <div :class="{ 'section-card__body card-col__body' : label }">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            label: {

            }
        },
        name: 'panel-body',
    }
</script>