import { Module, GetterTree, MutationTree, ActionTree } from 'vuex';

import { RootState } from '@/store/types';
import { Word } from '@/store/dictionary';

import idb from '@/api/idb';

const namespaced: boolean = true;

export const state: IBookmarksState = {
    bookmarks: [],
};

export const getters: GetterTree<IBookmarksState, RootState> = {
    bookmark(state): (word: string) => Bookmark | undefined {
        return (word: string): Bookmark | undefined => state.bookmarks.find(bookmark => bookmark.word === word);
    },
    bookmarks(state): (searchCondition: string, parts: string[]) => Bookmark[] {
        return (searchCondition: string, parts: string[]): Bookmark[] => {
            let result = state.bookmarks;
            if (searchCondition) {
                result = result.filter(bookmark => bookmark.word.includes(searchCondition));
            }

            if (parts.length !== 0) {
                result = result.reduce((acc: Bookmark[], bookmark: Bookmark) =>
                    parts.some(p => p === bookmark.mainPart) ?
                        acc.concat(bookmark) : acc, []);
            }

            return result;
        };
    },
};

export const mutations: MutationTree<IBookmarksState> = {
    saveBookmark(state, payload: Bookmark): void {
        state.bookmarks.push(payload);
    },
    removeBookmark(state, payload: Bookmark): void {
        const index = state.bookmarks.findIndex((bookmark: Bookmark) => bookmark.id === payload.id);

        if (index != -1) {
            state.bookmarks.splice(index, 1);
        }
    },
    setBookmarks(state, payload: Bookmark[]): void {
        state.bookmarks = payload;
    },
};

export const actions: ActionTree<IBookmarksState, RootState> = {
    async saveBookmark({ state, commit }, word: Word): Promise<void> {
        const bookmark = {
            pos: state.bookmarks.length + 1,
            ...word,
        };

        commit('saveBookmark', bookmark);
        await idb.addBookmark(bookmark);
    },
    async removeBookmark({ state, commit }, word: Word | Bookmark): Promise<void> {
        const bookmark = state.bookmarks.find(bookmark => bookmark.word === word.word);
        if (bookmark) {
            commit('removeBookmark', bookmark);
            await idb.removeBookmark(bookmark);
        }
    },
    async getBookmarks({ commit }): Promise<void> {
        const bookmarks = await idb.getBookmarks();
        commit('setBookmarks', bookmarks.sort((a, b) => a.pos - b.pos));
    },
    async updateBookmarks({ commit }, bookmarks: Bookmark[]): Promise<void> {
        bookmarks.map((bookmark, index) => bookmark.pos = index + 1);

        commit('setBookmarks', bookmarks);
        await idb.setBookmarks(bookmarks);
    },
};

export const bookmarks: Module<IBookmarksState, RootState> = {
    namespaced,
    state,
    getters,
    mutations,
    actions,
};

export interface Bookmark {
    id: number;
    word: string;
    mainPart: string;
    mainDefinition: string;
    definitions: { [key: string]: string[] };
    pronunciation: string;
    pos: number;
}

export interface IBookmarksState {
    bookmarks: Bookmark[];
}
