'use strict';
(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var setup = document.querySelector('.setup');
  var dialogHandler = setup.querySelector('.upload');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupUserName = setup.querySelector('.setup-user-name');
  var setupWizardCoat = setup.querySelector('.wizard-coat');
  var setupWizardEyes = setup.querySelector('.wizard-eyes');
  var setupFireball = setup.querySelector('.setup-fireball-wrap');
  var setupUserNameFocus = false;
  var initialCoords = {
    x: getComputedStyle(setup).left,
    y: getComputedStyle(setup).top
  };

  // Окно закроется только в случае если оба условия true
  var onPopupEscPress = function (evt) {
    if (!setupUserNameFocus && evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  // Определяем функцию при которой имя пользователя в фокусе
  var onSetupUserNameFocus = function () {
    setupUserNameFocus = true;
  };

  // Определяем функцию при которой имя пользователя не в фокусе
  var onSetupUserNameFocusout = function () {
    setupUserNameFocus = false;
  };

  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    setupUserName.addEventListener('focus', onSetupUserNameFocus);
    setupUserName.addEventListener('focusout', onSetupUserNameFocusout);
    setupWizardCoat.addEventListener('click', window.onSetupWizardCoatClick);
    setupWizardEyes.addEventListener('click', window.onSetupWizardEyesClick);
    setupFireball.addEventListener('click', window.onSetupFireballClick);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    setup.style.top = initialCoords.y;
    setup.style.left = initialCoords.x;
    document.removeEventListener('keydown', onPopupEscPress);
    setupUserName.removeEventListener('focus', onSetupUserNameFocus);
    setupUserName.removeEventListener('focusout', onSetupUserNameFocusout);
    setupWizardCoat.removeEventListener('click', window.onSetupWizardCoatClick);
    setupWizardEyes.removeEventListener('click', window.onSetupWizardEyesClick);
    setupFireball.removeEventListener('click', window.onSetupFireballClick);
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });

  dialogHandler.addEventListener('mousedown', function (downEvt) {
    downEvt.preventDefault();

    var startCoords = {
      x: downEvt.clientX,
      y: downEvt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (evt) {
          evt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
