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
