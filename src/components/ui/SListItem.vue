<template>
    <div
            :class="{ 's-list-item__wrapper--active': isActive }"
            class="s-list-item__wrapper"
    >
        <div
                :class="{ 's-list-item--active': isActive }"
                class="s-list-item"
                @click="onListItemClick"
        >
            <div class="s-list-item__prepend-icon">
                <slot name="prepend-icon"></slot>
            </div>

            <div class="s-list-item__header">
                <slot></slot>
            </div>

            <div class="s-list-item__append-icon">
                <slot name="append-icon"></slot>
            </div>

            <div class="s-list-item__icon">
                <font-awesome-icon
                        class="icon"
                        icon="chevron-down"
                ></font-awesome-icon>
            </div>
        </div>

        <transition
                name="slide"
                @enter="onTransitionEnter"
                @afterEnter="afterTransitionEnter"
                @leave="onTransitionLeave"
        >
            <div
                    v-if="isActive"
                    class="s-list-item__content"
            >
                <slot name="content"></slot>
            </div>
        </transition>
    </div>
</template>

<!-- collapse/expand transition сделан по этому гайду:
     https://markus.oberlehner.net/blog/transition-to-height-auto-with-vue/ -->

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class SListItem extends Vue {
        public isActive: boolean = false;

        public onListItemClick(event: unknown): void {
            this.isActive = !this.isActive;
        }

        public onTransitionEnter(el: HTMLElement): void {
            el.style.height = 'auto';

            const height = getComputedStyle(el).height;

            el.style.height = '0';

            getComputedStyle(el).height;

            requestAnimationFrame(() => {
                el.style.height = height;
            });
        }

        public afterTransitionEnter(el: HTMLElement): void {
            el.style.height = 'auto';
        }

        public onTransitionLeave(el: HTMLElement): void {
            const height = getComputedStyle(el).height;

            el.style.height = height;

            getComputedStyle(el).height;

            requestAnimationFrame(() => {
                el.style.height = '0';
            })
        }
    }
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
    transition: height .3s ease-in-out;
    overflow: hidden;
}

.slide-enter,
.slide-leave-to {
    height: 0;
}
</style>
