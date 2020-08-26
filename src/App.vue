<template>
    <div id="app">
        <s-header title="Potato Dictionary">
            <template v-slot:right>
                <span
                        :class="{ 's-btn--active': isActive }"
                        class="s-btn"
                        @click="toggleBookmarks"
                >
                    <span class="s-btn__content">
                        <p>
                            Bookmarks
                        </p>
                    </span>
                </span>
            </template>
        </s-header>

        <component :is="currentComponent"></component>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    import Workspace from '@/components/Workspace.vue';
    import SHeader from '@/components/ui/SHeader.vue';
    import Bookmarks from '@/components/Bookmarks.vue';

    @Component({
        components: {
            Bookmarks,
            Workspace,
            SHeader,
        },
    })
    export default class App extends Vue {
        public isActive: boolean = false;

        public currentComponent: 'workspace' | 'bookmarks' = 'workspace';

        public toggleBookmarks(): void {
            this.isActive = !this.isActive;
            this.currentComponent = this.currentComponent === 'bookmarks' ? 'workspace' : 'bookmarks';
        }
    }
</script>

<style lang="scss">
.s-btn {
    cursor: pointer;
    height: 30px;
    padding: 0 10px;
    border-radius: 4px;
    position: relative;
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    user-select: none;

    &:hover:before {
        opacity: .05;
    }

    &:before {
        content: "";
        border-radius: inherit;
        background-color: #000000;
        opacity: 0;
        pointer-events: none;
        transition: opacity .2s cubic-bezier(.35, 0, .5, 1);
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    &__content {
        position: relative;
        font-size: 1rem;
    }
}

.s-btn--active:before,
.s-btn--active:hover:before {
    opacity: .1;
}
</style>
