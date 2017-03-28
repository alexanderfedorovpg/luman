# Как пользоваться сборкой.

Инициализируем tars с помощью одной из следующих команд:

**НОВЫЙ ПРОЕКТ**

```
mkdir src && cd src && tars init --exclude-html --exclude-css --silent --source 'http://gitlab.ddemo.ru/a.kosyanenko/tars/repository/archive.zip?ref=custom' && npm run init

```

**ИНТЕГРАЦИЯ В УЖЕ ФУНКЦИОНИРУЮЩИЙ ПРОЕКТ С ГИТОМ**

```javascript
mkdir src && cd src && tars init --exclude-html --exclude-css --silent --source 'http://gitlab.ddemo.ru/a.kosyanenko/tars/repository/archive.zip?ref=custom'
```

Создавать новый блок с помощью команды `tars add-component componentName -s`.

Создавать новую страницу с помощью команды `tars add-page pageName -s`.

Советую создать алиасы для этих команд, н-р, *tac* для `tars add-component`.
Тогда новый компонент можно будет создавать так: `tac header -s`.

## Как обновлять проект

При выходе новой версии Тарса, уже существующий проект надо обновлять с помощью такой команды

```javascript
tars update-project --exclude-html --exclude-css --source http://gitlab.ddemo.ru/a.kosyanenko/tars/repository/archive.zip?ref=custom
```

## Плюшки

### Миксины для scss

- **list-reset** - сбросить стили для списка
- **clearfix** - ну, думаю, понятно
- **align-justify** - выровнять блоки равномерно
- **hidden** - скрыть элемент, но оставить его доступным для скринридеров
- **hide-text** - замена текста изображением
- **font-face** - удобный миксин для подключения шрифтов
- **rem и em** - функции для перевода пикселей в rem и em
- миксины для медиазапросов:
  - **below** - уже указанной ширины
  - **above** - шире указанной ширины
  - **between** - в указанных пределах

### Миксины и переменные для jade

- в ссылках для заглушки вместо # лучше использовать переменную `jv0`, которая 
  скомпилируется в `javascript:void(0)`.
- добавлены миксины bemto по умолчанию.

### JavaScript

- в static/js добавлена папка helpers-js в которую будут добавляться полезные 
  функции, которые можно подключать в любой компонент. Для подключения можно 
  использовать алиас 'helpers-js'. 
  Например, `import { functionName } from 'helpers-js'`
- полифиллы добавлять в static/js/libraries/polyfills. Если он устновлен через
  npm, то просто импортируем в index.js и инициализируем, если требуется. Если
  в npm его нет, то создаем для него отдельный файл, а потом его импортируем в
  index.js
  
### Галп таски (tars/user-tasks)

Чтобы активировать любой пользовательский таск, нужно убрать в его названии
нижнее подчеркивание.

- в css есть таск _make-sprite. Если его активировать, то размеры для растровых
  спрайтов при использовании миксина bg будут задаваться не в пикселях, а в rem.
