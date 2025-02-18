# JavaScript 1 уровень заметки по языку javascript и проекту Код и Магия

Здесь заметки по основам языка javascipt и примеры на учебом демо-проекте от HTML Academy для 29 потока профессионального онлайн‑курса «JavaScript. Профессиональная разработка веб-интерфейсов».

## 0. Начальные настройки, репозиторий , подключение SHH-ключей и пр.

Первый вариант, это изучать коммиты [в веб-интерфейсе GitHub в master-ветке потока](https://github.com/htmlacademy/code-and-magic-demo).

### Установка SSH-ключей

Вводим `cd ~/.ssh`, чтобы перейти в нужный каталог.
Используем `ls`, чтобы увидеть список всех файлов в каталоге. Ищем пару файлов с названиями вида имя и имя.pub. Обычно имя — `id_rsa`, `id_dsa`, `id_ecdsa` или `id_ed25519`. Файл с расширением .pub — ваш публичный ключ, а второй — ваш приватный, секретный ключ.
Генерируем пару ключей командой:
```bash
ssh-keygen -t ed25519 -C your_mail@example.com
```

Если у вас Linux, может понадобится переназначить для `~/.ssh` права доступа командой `chmod 700 ~/.ssh/`.
После того как создан ключ, его нужно добавить на GitHub.

- если вы на Windows — `clip < ~/.ssh/id_ed25519.pub`;
- для пользователей macOS — `pbcopy < ~/.ssh/id_ed25519.pub`;
- на Linux используйте `sudo apt install xclip`, чтобы установить необходимый для копирования пакет `xclip`, а затем введите `xclip ~/.ssh/id_ed25519.pub`. Или введите команду `cat ~/.ssh/id_ed25519.pub`, контент документа появится прямо в консоли и вы сможете скопировать ключ оттуда.

Можно пойти другим путём: открыть файл `id_ed25519.pub` прямо в папке и просто скопировать содержимое оттуда.
Переходим на GitHub в Настройки и SSH и GPG keys и добавляем новый ключ.

Убедимся, что связь с GitHub установлена. Для этого введём в терминале:
```bash
ssh -T git@github.com
```

В ответ получим что-то вроде:
```bash
The authenticity of host 'github.com (IP ADDRESS)' can't be established.
ED25519 key fingerprint is SHA256:+DiY3wvvV6TuJJhbpZisF/zLDA0zPMSvHdkr4UvCOqU.
Are you sure you want to continue connecting (yes/no)?
```
Соглашаемся, набрав yes:
```bash
The authenticity of host 'github.com (IP ADDRESS)' can't be established.
ED25519 key fingerprint is SHA256:+DiY3wvvV6TuJJhbpZisF/zLDA0zPMSvHdkr4UvCOqU.
Are you sure you want to continue connecting (yes/no)? yes
```
На это GitHub отправит сообщение:
```bash
Hi <ваш логин на GitHub>! You've successfully authenticated, but GitHub does not provide shell access.
```
Конец.



## 7. Манипуляции с DOM
### 3 варианта как заполнить шаблон данными

```html
<!DOCTYPE html>
<html lang="ru">

<head>
  <meta charset="utf-8">
  <title>Нюансы заполнения шаблонов данными</title>
  <style>
    .emojis {
      display: inline-flex;
      margin: 0.5em 1em;
      padding: 0.1em 0.2em 0.25em;
      list-style: none;
      font-size: 2em;
      box-shadow: 0 1px 5px rgba(0,0,0,0.5);
      border-radius: 1em;
    }
  </style>
</head>

<body>
  <ul class="emojis">
    <li class="emoji emoji--smile">🙂</li>
    <li class="emoji emoji--neutral">😐</li>
    <li class="emoji emoji--frowning">🙁</li>
    <li class="emoji emoji--angry">😠</li>
    <li class="emoji emoji--crying">😭</li>
  </ul>

  <script src="script.js"></script>
</body>

</html>
```

### 1 вариант
```js
const userEmotions = [
  'smile',
  'crying',
];

const emojiImage = {
  smile: '🙂',
  neutral: '😐',
  frowning: '🙁',
  angry: '😠',
  crying: '😭',
};

const emojiContainer = document.querySelector('.emojis');

emojiContainer.innerHTML = '';

userEmotions.forEach((userEmotion) => {
  const emojiListItem = document.createElement('li');

  emojiListItem.classList.add('emoji');
  emojiListItem.classList.add('emoji--' + userEmotion);
  emojiListItem.textContent = emojiImage[userEmotion];

  emojiContainer.append(emojiListItem)
});
```
### 2 вариант
```js
const userEmotions = [
  'smile',
  'crying',
];

const emojiContainer = document.querySelector('.emojis');
const emojiListFragment = document.createDocumentFragment();

userEmotions.forEach((userEmotion) => {
  const emojiListItem = emojiContainer.querySelector('.emoji--' + userEmotion);

  if (emojiListItem) {
    emojiListFragment.append(emojiListItem);
  }
});

emojiContainer.innerHTML = '';
emojiContainer.append(emojiListFragment);
```

### 3 вариант
```js
const userEmotions = [
  'smile',
  'crying',
];

const emojiContainer = document.querySelector('.emojis');
const emojiList = emojiContainer.querySelectorAll('.emoji');

emojiList.forEach((emojiListItem) => {
  const isNecessary = userEmotions.some(
    (userEmotion) => emojiListItem.classList.contains('emoji--' + userEmotion),
  );

  if (!isNecessary) {
    emojiListItem.remove();
  }
});

# или без some, через modifiers

const userEmotions = [
  'smile',
  'crying',
];

const emojiContainer = document.querySelector('.emojis');
const emojiList = emojiContainer.querySelectorAll('.emoji');
const modifiers = userEmotions.map((userEmotion) => 'emoji--' + userEmotion);

emojiList.forEach((emojiListItem) => {
  const modifier = emojiListItem.classList[1]; // 1 - это индекс нужного класса в атрибуте class

  if (!modifiers.includes(modifier)) {
    emojiListItem.remove();
  }
});
```

## 9. Внешние API и сторонние библиотеки

Для формы указываем `method`, `action`, если передаются файлы, то `enctype="multipart/form-data"`, предотвращаем автозаполнение данных `autocomplete="off"`, для полей `input` указываем `name="first_name"(в них придут данные), атрибут обязательности `required`.
Можно добавить minlength="2" maxlength="25" для ограничения мин и макс длинны
```html
<form class="setup-wizard-form" method="post" enctype="multipart/form-data" action="https://32.javascript.htmlacademy.pro/code-and-magick" autocomplete="off">
  <label>
    <input type="text" class="setup-user-name" value="Синий Пендальф" name="username" required>
  </label>
</form>
```

### Pristine.js комментарии к коду прямо в разметке
Чтобы описать валидации в JavaScript, нужно вызвать метод `.addValidator()`.
Метод принимает несколько аргументов. Первый — элемент формы, который мы хотим валидировать.
Вторым аргументом в .addValidator() нужно передать функцию проверки. Можно передавать по месту, но удобнее объявить функцию выше и передать по ссылке. Функция проверки обязательно должна возвращать true или false, в зависимости от того, валидно ли поле. Третьим аргументом нужно передать сообщение об ошибке.

```html
<!DOCTYPE html>
<html lang="ru">

<head>
  <meta charset="utf-8">
  <title>Валидация формы с помощью PristineJS</title>
  <link rel="stylesheet" href="https://htmlacademy.github.io/console.js/latest/css/style.css">
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <form class="form" autocomplete="off">
    <h3>Доставка Кексокорма</h3>

    <p class="form__item">
      <label for="nickname">Имя питомца для открытки:</label>
      <br>
      <input
        type="text"
        name="nickname"
        id="nickname"
        placeholder="Кексик"
      >
    </p>

    <p>
      Размер:
      <label><input type="radio" name="unit" value="s" checked>S</label>
      <label><input type="radio" name="unit" value="m">M</label>
    </p>

    <p class="form__item">
      <label for="amount">Количество:</label>
      <br>
      <input
        type="number"
        name="amount"
        id="amount"
        placeholder="10"
      >
    </p>

    <p class="form__item">
      <select name="delivery">
        <option value="Доставка" selected>Доставка</option>
        <option value="Самовывоз">Самовывоз</option>
      </select>
      <select name="date">
        <option value="Сегодня" selected>Сегодня</option>
        <option value="Завтра">Завтра</option>
        <option value="На выходных">На выходных</option>
      </select>
    </p>

    <p>
      <button>Заказать</button>
    </p>
  </form>

  <script src="https://htmlacademy.github.io/console.js/latest/js/index-silent.js"></script>
  <script src="vendor/pristine.min.js"></script>
  <script src="script.js"></script>
</body>

</html>
```

```js
const orderForm = document.querySelector('.form');


const pristine = new Pristine(orderForm, {
  classTo: 'form__item', // Элемент, на который будут добавляться классы
  errorClass: 'form__item--invalid', // Класс, обозначающий невалидное поле
  successClass: 'form__item--valid', // Класс, обозначающий валидное поле
  errorTextParent: 'form__item', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'span', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'form__error' // Класс для элемента с текстом ошибки
});


orderForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

function validateNickname (value) {
  return value.length >= 2 && value.length <= 50;
}

pristine.addValidator(
  orderForm.querySelector('#nickname'),
  validateNickname,
  'От 2 до 50 символов'
);


const amountField = orderForm.querySelector('#amount');
const maxAmount = {
  's': 10,
  'm': 5
};

function validateAmount (value) {
  const unit = orderForm.querySelector('[name="unit"]:checked');
  return value.length && parseInt(value) <= maxAmount[unit.value];
}

function getAmountErrorMessage () {
  const unit = orderForm.querySelector('[name="unit"]:checked');
  return `Не больше ${maxAmount[unit.value]} штук в одни руки`;
}

pristine.addValidator(amountField, validateAmount, getAmountErrorMessage);

function onUnitChange () {
  amountField.placeholder = maxAmount[this.value];
  pristine.validate(amountField);
}

orderForm
  .querySelectorAll('[name="unit"]')
  .forEach((item) => item.addEventListener('change', onUnitChange));


const deliveryField = orderForm.querySelector('[name="delivery"]');
const dateField = orderForm.querySelector('[name="date"]');
const deliveryOption = {
  'Доставка': ['Завтра', 'На выходных'],
  'Самовывоз': ['Сегодня', 'Завтра']
};

function validateDelivery () {
  return deliveryOption[deliveryField.value].includes(dateField.value);
}

function getDeliveryErrorMessage () {
  return `
    ${deliveryField.value}
    ${dateField.value.toLowerCase()}
    ${deliveryField.value === 'Доставка' ? 'невозможна' : 'невозможен'}
  `;
}

pristine.addValidator(deliveryField, validateDelivery, getDeliveryErrorMessage);
pristine.addValidator(dateField, validateDelivery, getDeliveryErrorMessage);


orderForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

```

### NoUISlider - библиотека слайдера на JS
[Документация](https://refreshless.com/nouislider/slider-values/)

```html
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <title>Слайдер для выбора значения</title>
    <link rel="stylesheet" href="https://htmlacademy.github.io/console.js/latest/css/style.css">
    <link rel="stylesheet" href="https://unpkg.com/nouislider@14.6.3/distribute/nouislider.min.css">
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <form class="level-form">
      <div class="level-form__slider" id="slider"></div>
      <p class="level-form__field">
        <label class="level-form__label">Цена</label>
        <input class="level-form__value" type="text">
      </p>
      <p class="level-form__field">
        <label>
          <input class="level-form__special" type="checkbox"> Я оптовик
        </label>
      </p>
    </form>
    <script src="https://unpkg.com/nouislider@14.6.3/distribute/nouislider.min.js"></script>
    <script src="https://htmlacademy.github.io/console.js/latest/js/index-silent.js"></script>
    <script src="index.js"></script>
  </body>
</html>
```
```js
/* global noUiSlider:readonly */
const sliderElement = document.querySelector('.level-form__slider');
const valueElement = document.querySelector('.level-form__value');
const specialElement = document.querySelector('.level-form__special');

valueElement.value = 80;

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  valueElement.value = sliderElement.noUiSlider.get();
});

specialElement.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 10
      },
      start: 8,
      step: 0.1
    });
  } else {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      step: 1
    });
    sliderElement.noUiSlider.set(80);
  }
});

sliderElement.setAttribute('disabled', true); // Заблокироват слайдер
// sliderElement.removeAttribute('disabled'); Добавление и удаление атрибута

sliderElement.noUiSlider.destroy(); // Удаление слайдера
```

Удаление концевых пробелов
`trimStart()` удаляет пробелы в начале строки
`trimEnd()` удаляет пробелы в конце строки
`trim()` удаляет и с начала и с конца

```js
const greet = '    Привет, Мир!    ';

const trimmedGreet= greet.trim();

console.log(trimmedGreet); // 'Привет, Мир!'
```

### Обработчики

`onchange` срабатывает, если значение поля ввода изменилось и пользователь закончил ввод. Например, если пользователь передвинул ползунок и отпустил его. Или ввёл что-то в текстовое поле и убрал из него курсор.

`oninput` срабатывает на каждое изменение значения, независимо от того, завершил пользователь ввод или нет. Например, он сработает на каждое изменение положения ползунка, даже если пользователь продолжает его двигать. И на каждый новый символ в текстовом поле, даже если пользователь продолжает вводить текст.


## 10 Сети

HTTP — это сетевой протокол прикладного уровня, то есть для «общения» между программами. HTTPS — это расширение протокола HTTP, а не самостоятельный протокол.

HTTP-запрос состоит из нескольких частей: строка запроса, заголовки (служебная информация) и тело запроса (body). Обязательной является первая часть. Заголовки и тело запроса могут отсутствовать.

### Строка запроса
Строка запроса начинается с определения HTTP-метода. Метод позволяет понять серверу, как следует обрабатывать запрос.
```
HEAD /posts HTTP/1.1
```
### Заголовки (Headers)
После строки запроса можно указать дополнительную информацию, которая может пригодиться серверу для обработки запроса. Спецификация протокола определяет множество заголовков (Content-Type, Content-Length, Host и другие), но есть возможность описывать собственные заголовки.

```
HEAD /post HTTP/1.1
User-Agent: Google Chrome
X-Token: secret token

```
### Заголовок Host
```
HEAD /posts HTTP/1.1
Host: jsonplaceholder.typicode.com
```
### Тело запроса (Body)
```
POST /posts HTTP/1.1
Host: jsonplaceholder.typicode.com
Content-Type: application/json
Content-Length: 88

{
    "title": "Новая публикация",
    "body": "Текст публикации",
    "userId": 31337
}
```
Мы привели пример запроса POST к ресурсу /posts сервиса jsonplaceholder.typicode.com. На этот ресурс сервер ожидает получить данные в формате JSON, поэтому дополнительно указываем стандартный заголовок Content-Type. В нём определяем тип содержимого (application/json).

### HTTP-ответ

Коды состояний:
- 1 — информационные (informational);
- 2 — успешно (success);
- 3 — перенаправление (redirection);
- 4 — ошибка клиента (client error);
- 5 — ошибка сервера (server error).

## JSON
JSON (JavaScript Object Notation) — открытый текстовый формат для обмена данными. Содержимое JSON — это коллекция из пар ключ/значение. Ключи определяются слева, а значение отделяется символом двоеточия (:). Синтаксически это выглядит так, как если описать обычный JavaScript-объект.

Важная особенность, что ключи должны быть обрамлены в двойные кавычки.

```json
{
    "first_name": "Ivan",
    "last_name": "Sidorov"
}
```
Значение в формате JSON может быть одним из шести типов: объект, строка, массив, число, булево и null.
```json
{
    "band": "Bon Jovi",
    "title": "Slippery when wet",
    "year": 1986,
    "tracks": [
        "Let it rock",
        "You give love a bad name",
        "Livin'on a prayer",
        "Social Disease"
    ],
    "members": [
        {
            "name": "Jon Bon Jovi",
            "role": "singer",
            "active": true
        },
        {
            "name": "Richie Sambora",
            "role": "guitar player",
            "active": false
        }
    ],
    "relatedGroups": null
}
```
Форматирование и проверка JSON, также позволяет привести строку JSON к читабельному виду [JSON Formatter & Validator.](https://jsonformatter.curiousconcept.com)


JSON в JS предоставляет два метода объекта JSON: stringify (для получения JSON строки, соответствующей переданному значению) и parse (для разбора JSON строки и получения значения).
```js
const albumJSON = `{
    "band": "Bon Jovi",
    "title": "Slippery when wet",
    "year": 1986,
    "tracks": [
        "Let it rock",
        "You give love a bad name",
        "Livin'on a prayer",
        "Social Disease"
    ]
}`;

// Преобразуем JSON объект в объект
const albumObject = JSON.parse(albumJSON);

// Получим объект
// {band: "Bon Jovi", title: "Slippery when wet",
//  year: 1986, tracks: Array(4) }
console.log(albumObject);
```

```js
const albumJSON = `{
    "band": "Bon Jovi",
    "title": "Slippery when wet",
    "year": 1986,
    "tracks": [
        "Let it rock",
        "You give love a bad name",
        "Livin'on a prayer",
        "Social Disease"
    ]
}`;

// Преобразуем JSON объект в объект
const albumObject = JSON.parse(albumJSON);

// Получим объект
// {band: "Bon Jovi", title: "Slippery when wet",
//  year: 1986, tracks: Array(4) }
console.log(albumObject);
```

### Ошибки
Код, который потенциально может привести к исключению, оборачивается в блок try.
После него добавляется блок catch, код в котором будет выполнен, если произойдёт исключение.
```js
import getData from 'api.js';

try {
  const dataFromServer = getData(); // (1)
  const parsedData = JSON.parse(dataFromServer); // (2)
  console.log(parsedData); // (3)
  console.log('Удалось загрузить и прочесть загруженный JSON!'); // (4)
} catch (err) {
  console.log('Что-то пошло не так...'); // (5)
}

// Остальной код программы...
console.log('Я выполнюсь в любом случае'); // (6)

```
Если файл вообще не получится загрузить (строка (1)), то выполнение кода в блоке try остановится, и JavaScript сразу перейдёт к выполнению строки (5) внутри блока catch, а после к строке (6). Если файл загрузился, но его не удалось распарсить, то отработают строки (1), (2), (5) и (6). Если же с разбором JSON проблем не возникло, то выполнятся строки c (1) по (4), а также (6). Код внутри catch будет проигнорирован.


Error
```js
function produceError() {
  catchme
}

try {
  produceError();
} catch(err) {
  console.log('Свойство name: ', err.name);
  console.log('Свойство message: ', err.message);
  console.log('Свойство stack: ', err.stack);
}
```

`name` — имя ошибки. Как правило, соответствует её типу, то есть SyntaxError, TypeError и так далее.
`message`— описание ошибки. Например, undefined is not a function.
`stack` — нестандартизированное свойство, которое тем не менее есть во многих современных браузерах. В нём содержится стек вызовов, который привёл к ошибке.

Однако обрабатывать все внештатные ситуации удобно в одном месте — например, в одном блоке catch. Но как туда попасть, если формально ошибки нет?

Для этого выбрасывают собственное исключение. Делается это с помощью оператора throw («бросить», англ.), которому передаётся новый объект ошибки: `throw new Error('Описание ошибки')`;
```js
import getData from 'api.js';

try {
  const parsedData = JSON.parse(getData());

  if (!parsedData.name) {
    throw new Error('Не удалось найти свойство name');
  } else {
    console.log(parsedData);
  }
} catch (err) {
    console.log(err.message);
}
```

Чтобы обработать исключение, нужно потенциально небезопасный код или код, в котором мы сами при некоторых условиях бросаем исключения, обернуть конструкцией try...catch:

```js
// Что если имя не будет введено?
const names = ['Keks', 'Bob', 'Marley', '', 'Jack'];

function getName (name) {
  if (!name) {
    throw new Error('Имя неизвестно');
  }
  return `Привет, ${name}!`;
};

names.forEach((name) => {
  try {
    console.log(getName(name));
  } catch (error) {
    console.log('Введите имя') // В случае ошибки, попросим ввести имя
  }
})

```
[Base64 Decoder](https://www.blitter.se/utils/base64-decoder-and-encoder/)
