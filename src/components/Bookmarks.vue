<template>
    <div class="bookmarks">
        <div class="container">
            <div class="row">
                <div class="column col-3">
                    <s-text-field
                            v-model="searchCondition"
                            label="Поиск"
                            placeholder="Введите значение"
                            icon="search"
                    ></s-text-field>
                </div>

                <div class="column col-9">
                    <s-list>
                        <s-list-item
                                v-for="(bookmark, index) in bookmarks"
                                :key="`bookmark-${index}`"
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
                    </s-list>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { namespace } from 'vuex-class';

    import STextField from '@/components/ui/STextField.vue';
    import SList from '@/components/ui/SList.vue';
    import SListItem from '@/components/ui/SListItem.vue';

    import { Bookmark } from '@/store/bookmarks';

    const bookmarks = namespace('bookmarks');

    @Component({
        components: {
          STextField,
          SList,
          SListItem,
        },
    })
    export default class Bookmarks extends Vue {
        @bookmarks.Action('removeBookmark')
        public removeBookmark!: (word: Word | Bookmark) => Promise<void>;

        @bookmarks.Action('getBookmarks')
        public getBookmarks!: () => Promise<void>;

        @bookmarks.Getter('bookmarks')
        public bookmarks!: Bookmarks[];

        public searchCondition: string | null = null;

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
  .dictionary-word {
    font-weight: bold;
    margin-right: 40px;
  }

  .dictionary-part {
    font-style: italic;
    margin-right: 40px;
  }
</style>
