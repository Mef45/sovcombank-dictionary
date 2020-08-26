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
        @Prop({ type: String, default: null })
        public title!: string;
    }
</script>

<style lang="scss" scoped>
</style>
