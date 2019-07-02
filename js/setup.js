'use strict';

(function () {

  // Покажем окно настроек пользователя
  var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARDS_NUMBER = 4;

  var setup = document.querySelector('.setup');
  var setupWizardCoat = setup.querySelector('.wizard-coat');
  var setupWizardEyes = setup.querySelector('.wizard-eyes');
  var setupFireball = setup.querySelector('.setup-fireball-wrap');

  // Найдём элемент, в который мы будем вставлять похожих магов
  var similarListElement = setup.querySelector('.setup-similar-list');

  // Найдём шаблон персонажа
  var wizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');


  window.onSetupFireballClick = function () {
    setupFireball.style.background = getRandomItem(FIREBALL_COLORS);
  };

  window.onSetupWizardCoatClick = function () {
    setupWizardCoat.style.fill = getRandomItem(WIZARD_COAT_COLOR);
  };

  window.onSetupWizardEyesClick = function () {
    setupWizardEyes.style.fill = getRandomItem(WIZARD_EYES_COLOR);
  };


  // Генерация случайного номера массива
  var getRandomItem = function (arr) {
    return arr[Math.floor((Math.random() * arr.length))];
  };

  // Создадим волшебника
  var createWizard = function (wizard) {
    var newWizard = wizardTemplate.cloneNode(true);
    newWizard.querySelector('.setup-similar-label').textContent = wizard.name;
    newWizard.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    newWizard.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return newWizard;
  };

  // В цикле создадим несколько волшебников
  // Добавим их в разметку через элемент documentFragment
  var onLoad = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < WIZARDS_NUMBER; i++) {
      fragment.appendChild(createWizard(wizards[i]));
    }
    document.querySelector('.setup-similar').classList.remove('hidden');
    similarListElement.appendChild(fragment);
  };

  var onError = function (errorMessage) {
    var message = document.createElement('div');
    message.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    message.style.position = 'absolute';
    message.style.left = 0;
    message.style.right = 0;
    message.style.fontSize = '30px';
    message.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', message);
  };


  window.backend.load(onLoad, onError);

})();
