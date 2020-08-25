<template>
    <div id="app">
        <s-header title="Potato Dictionary">
            <template v-slot:right>
                <span
                        style="cursor: pointer;"
                        @click="toggleBookmarks"
                >
                    Bookmarks
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
        public currentComponent: 'workspace' | 'bookmarks' = 'workspace';

        public toggleBookmarks(): void {
            this.currentComponent = this.currentComponent === 'bookmarks' ? 'workspace' : 'bookmarks';
        }
    }
</script>

<style lang="scss">
</style>
