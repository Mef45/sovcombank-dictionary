<template>
    <div class="s-list">
        <slot></slot>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class SList extends Vue {
    }
</script>

<style lang="scss" scoped></style>
