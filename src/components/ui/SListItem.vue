<template>
    <div class="s-list-item">
        <div class="s-list-item__text">
            <slot></slot>
        </div>

        <div class="s-list-item__icon">
            <font-awesome-icon icon="chevron-down"></font-awesome-icon>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SListItem extends Vue {

}
</script>

<style lang="scss" scoped>
</style>
