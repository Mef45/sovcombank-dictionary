<template>
    <div id="app">
        <s-header title="Potato Dictionary">
            <template v-slot:right>
                Starred Words
            </template>
        </s-header>

        <Workspace></Workspace>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    import Workspace from './components/Workspace.vue';
    import SHeader from './components/ui/SHeader.vue';

    @Component({
        components: {
            Workspace,
            SHeader,
        },
    })
    export default class App extends Vue {}
</script>

<style lang="scss">
</style>
