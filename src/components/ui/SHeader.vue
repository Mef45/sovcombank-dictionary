<template>
    <header
            class="s-header"
    >
        <div class="s-header__content">
            <div class="s-header__title">
                {{ title }}
            </div>

            <span class="spacer"></span>

            <div class="s-header__right">
                <slot name="right"></slot>
            </div>
        </div>
    </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SHeader extends Vue {
    @Prop({type: String, default: null})
    public title!: string;
}
</script>

<style lang="scss" scoped>
@import '../../assets/variables.scss';

.s-header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 54px;
    background: $primary;
    box-shadow: 0 2px 4px -1px rgba(0,0,0,.2),
                0 4px 5px 0 rgba(0,0,0,.14),
                0 1px 10px 0 rgba(0,0,0,.12);

    &__content {
        height: 100%;
        align-items: center;
        display: flex;
    }

    &__title {
        font-size: 1.25rem;
        color: #fff;
        padding-left: 15px;
    }

    &__right {
        font-size: 1.25rem;
        color: #fff;
        padding-right: 15px;
    }
}

.spacer {
    flex-grow: 1 !important;
}
</style>
