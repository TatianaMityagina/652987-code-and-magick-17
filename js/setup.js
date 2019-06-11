'use strict';

// Покажем окно настроек пользователя
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

// Найдём элемент, в который мы будем вставлять похожих магов
var similarListElement = userDialog.querySelector('.setup-similar-list');

// Найдём шаблон персонажа
var wizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');


var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_NUMBER = 4;

// Генерация случайного номера массива
var getRandomItem = function (arr) {
  return arr[Math.floor((Math.random() * arr.length))];
};

// Создадим массив сгенерированных волшебников
var wizardsListRandom = [];
for (var i = 0; i < WIZARDS_NUMBER; i++) {
  var wizardRandom = {};

  wizardRandom.name = getRandomItem(WIZARD_NAMES) + ' ' + getRandomItem(WIZARD_SURNAMES);
  wizardRandom.coatColor = getRandomItem(WIZARD_COAT_COLOR);
  wizardRandom.eyesColor = getRandomItem(WIZARD_EYES_COLOR);

  wizardsListRandom.push(wizardRandom);
}

// Создадим волшебника
var createWizard = function (wizard) {
  var newWizard = wizardTemplate.cloneNode(true);
  newWizard.querySelector('.setup-similar-label').textContent = wizard.name;
  newWizard.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  newWizard.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return newWizard;
};

// В цикле создадим несколько волшебников
// Добавим их в разметку через элемент documentFragment
var fragment = document.createDocumentFragment();
for (var j = 0; j < wizardsListRandom.length; j++) {
  fragment.appendChild(createWizard(wizardsListRandom[j]));
}

similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');


