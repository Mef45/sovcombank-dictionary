<template>
    <div class="bookmarks">
        <div class="container">
            <div class="row">
                <div class="column col-sm-3 col-12">
                    <s-text-field
                            v-model="searchCondition"
                            label="Поиск"
                            placeholder="Введите значение"
                            icon="search"
                    ></s-text-field>

                    <s-checkbox-group
                            v-model="parts"
                            :items="wordPartItems"
                    ></s-checkbox-group>
                </div>

                <div class="column col-sm-9 col-12">
                    <s-list>
                        <!-- Пришлось использовать готовое решение для drag&drop -->
                        <!-- Собственную реализацию не осилил -->
                        <draggable
                                v-model="bookmarksModel"
                                group="people"
                                v-bind="dragOptions"
                                @start="drag=true"
                                @end="drag=false"
                        >
                            <s-list-item
                                    v-for="(bookmark, index) in bookmarksModel"
                                    :key="bookmark.pos"
                            >
                                <template v-slot:prepend-icon>
                                    <font-awesome-icon
                                            icon="grip-lines"
                                    ></font-awesome-icon>
                                </template>

                                <span class="dictionary-word">
                                    {{ bookmark.word }}
                                </span>

                                <span class="dictionary-part">
                                    {{ bookmark.mainPart }}
                                </span>

                                <span class="dictionary-definition">
                                    {{ bookmark.mainDefinition }}
                                </span>

                                <template v-slot:append-icon>
                                    <font-awesome-icon
                                            :icon="['fas', 'bookmark']"
                                            @click="removeWordFromBookmarks($event, bookmark)"
                                    ></font-awesome-icon>
                                </template>

                                <template v-slot:content>
                                    <!-- затрудняюсь сказать, насколько эти произношения имеют отношение к реальности,
                              но выбирать не приходится-->
                                    <span style="font-style: italic">/{{ bookmark.pronunciation }}/</span>
                                    <template v-for="(defs, part) in bookmark.definitions">
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
                        </draggable>
                    </s-list>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { namespace } from 'vuex-class';
    import draggable from 'vuedraggable';

    import STextField from '@/components/ui/STextField.vue';
    import SList from '@/components/ui/SList.vue';
    import SListItem from '@/components/ui/SListItem.vue';
    import SCheckboxGroup from '@/components/ui/SCheckboxGroup.vue';

    import { Bookmark } from '@/store/bookmarks';
    import { Word } from '@/store/dictionary';

    const bookmarks = namespace('bookmarks');

    @Component({
        components: {
            draggable,
            SCheckboxGroup,
            STextField,
            SList,
            SListItem,
        },
    })
    export default class Bookmarks extends Vue {
        public readonly wordPartItems: { [key: string]: string } = {
            'n': 'noun',
            'v': 'verb',
            'adj': 'adjective',
            'adv': 'adverb',
        };

        public readonly dragOptions = {
            animation: 200,
            ghostClass: 'ghost',
        }

        @bookmarks.Action('removeBookmark')
        public removeBookmark!: (word: Word | Bookmark) => Promise<void>;

        @bookmarks.Action('getBookmarks')
        public getBookmarks!: () => Promise<void>;

        @bookmarks.Action('updateBookmarks')
        public updateBookmarks!: (bookmarks: Bookmark[]) => void;

        @bookmarks.Getter('bookmarks')
        public bookmarks!: (searchCondition: string, parts: string[]) => Bookmark[];

        public searchCondition: string = '';

        public parts: string[] = [];

        public draggedElement = null;

        public get bookmarksModel(): Bookmark[] {
            return this.bookmarks(this.searchCondition, this.parts);
        }

        public set bookmarksModel(bookmarks: Bookmark[]) {
            this.updateBookmarks(bookmarks);
        }

        public async created(): Promise<void> {
            await this.getBookmarks();
        }

        public removeWordFromBookmarks(event: MouseEvent, bookmark: Bookmark): void {
            event.preventDefault();
            event.stopPropagation();

            this.removeBookmark(bookmark);
        }
    }
</script>

<style lang="scss" scoped>
    @import "../styles/variables.scss";

    .dictionary-word {
        font-weight: bold;
        margin-right: 40px;
    }

    .dictionary-part {
        font-style: italic;
        margin-right: 40px;
    }

    .ghost {
        opacity: 0.1;
        background: $primary;
    }
</style>
