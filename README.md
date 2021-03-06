# Тестовое задание: Vue.js разработчик
Задача: Сделать приложение словарь с функционалом поиска и добавления в избранное.

Требования:

- [x] Поиск по первым и выдача первых 10 слов списком;
- [x] Сортировка списка в алфавитном порядке;
- [x] Обрезать обозначение слова, если оно не помещается;
- [x] При клике на слово отображать подробную информацию (больше обозначений, транскрипция);
- [x] Слова можно сохранять в избранное;
- [x] Сессия должна сохраняться при обновлении страницы/перезагрузке браузера;
- [x] Порядок избранных слов можно менять перетаскиванием (реализовано сторонней библиотекой [vue-draggable](https://github.com/SortableJS/Vue.Draggable));
- [x] Слова из избранного можно удалять при повторном нажатии на звездочку;
- [x] Поиск по словам должен работать и в списке избранных слов;
- [x] Должен быть фильтр по частям речи.

В качестве источника слов для словаря используется:

[<img src="https://www.datamuse.com/api/datamuse-logo-rgb.png" width="120" height="40">](https://www.datamuse.com/api/)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
