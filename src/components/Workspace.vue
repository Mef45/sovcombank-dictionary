<template>
    <div class="workspace">
        <div class="container">
            <div class="row">
                <div class="column col-3">
                    <s-text-field
                            v-model="searchCondition"
                            label="Поиск"
                            placeholder="Введите значение"
                            icon="search"
                            :loading="loading"
                            @submit="search"
                    ></s-text-field>
                </div>

                <div class="column col-9">
                    <s-list>
                        <s-list-item
                                v-for="(word, index) in words"
                                :key="`word-${index}`"
                        >
                            <!--<template v-slot:prepend-icon>
                                <font-awesome-icon
                                        icon="grip-lines"
                                        @click="addWordToFavorites($event, item.word)"
                                ></font-awesome-icon>
                            </template>-->

                            <span class="dictionary-word">
                                {{ word.word }}
                            </span>

                            <span class="dictionary-part">
                                {{ word.mainPart }}
                            </span>

                            <span class="dictionary-definition">
                                {{ word.mainDefinition }}
                            </span>

                            <template v-slot:append-icon>
                                <font-awesome-icon
                                        :icon="['far', 'bookmark']"
                                        @click="addWordToFavorites($event, word.word)"
                                ></font-awesome-icon>
                            </template>

                            <template v-slot:content>
                                <!-- затрудняюсь сказать, насколько эти произношения имеют отношение к реальности,
                                      но выбирать не приходится-->
                                <span style="font-style: italic">/{{ word.pronunciation }}/</span>
                                <template v-for="(defs, part) in word.definitions">
                                    <div :key="`${part}-${index}`">
                                        <span style="font-style: italic">{{ part }}</span>
                                        <p
                                                v-for="(def, defIndex) in defs"
                                                :key="defIndex"
                                                style="margin-left: 10px; padding-right: 10px;"
                                        >
                                            {{ defIndex + 1 }}. {{ def }}
                                        </p>
                                    </div>
                                </template>
                            </template>
                        </s-list-item>
                    </s-list>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    import { Getter, namespace } from 'vuex-class';
    import { Word } from '@/store/dictionary';

    import STextField from './ui/STextField.vue';
    import SList from './ui/SList.vue';
    import SListItem from './ui/SListItem.vue';

    const dictionary = namespace('dictionary');

    @Component({
        components: {
            STextField,
            SList,
            SListItem,
        },
    })
    export default class Workspace extends Vue {
        @Prop() private msg!: string;

        public searchCondition: string | null = null;

        public searchResults: IDictionary | null = null;

        @Getter('loading')
        public loading!: boolean;

        @dictionary.Getter('words')
        public words!: Word[];

        @dictionary.Action('search')
        public search!: (searchCondition: string) => Promise<void>;

        public addWordToFavorites(event: MouseEvent, word: string): void {
            event.preventDefault();
            event.stopPropagation();
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .dictionary-word {
        font-weight: bold;
        margin-right: 40px;
    }

    .dictionary-part {
        font-style: italic;
        margin-right: 40px;
    }
</style>
