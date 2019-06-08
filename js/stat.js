'use strict';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;

var renderRect = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

window.renderStatistics = function (ctx, names, times) {
  // Shadow rendering
  renderRect(ctx, 110, 20, 'rgba(0, 0, 0, 0.7)');

  // Cloud rendering
  renderRect(ctx, 100, 10, '#fff');
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  // Find the maximum element
  var maxTime = times[0];
  for (var i = 1; i < times.length; i++) {
    if (times[i] > maxTime) {
      maxTime = times[i];
    }
  }

  // Histogram rendering
  var HISTOGRAM_HEIGHT = 150;
  var WIDTH_COLUMN = 40;
  var INDENT = 50;
  var PADDING_TOP_COLUMNS = 120;
  var PADDING_TOP_TEXT_NAMES = PADDING_TOP_COLUMNS + HISTOGRAM_HEIGHT - 10;
  var leftColumn = 140;

  for (var i = 0; i < names.length; i++) {

    // Find percentage of number
    var time = Math.floor(times[i]);
    var percent = Math.floor((time * 100) / Math.floor(maxTime));

    // Find the height of the column
    var heightColumn = (HISTOGRAM_HEIGHT * percent) / 100;
    var currentPadding = PADDING_TOP_COLUMNS + (PADDING_TOP_COLUMNS - heightColumn);

    // Column rendering
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = ['rgb(0, 0, ', (Math.random() * 255).toFixed(0), ')'].join('');
    }

    ctx.fillRect(leftColumn, currentPadding, WIDTH_COLUMN, heightColumn);

    // Text time rendering
    ctx.fillStyle = '#000';
    ctx.fillText(time, leftColumn, currentPadding - 10);

    // Text name rendering
    ctx.fillText(names[i], leftColumn, PADDING_TOP_TEXT_NAMES);

    leftColumn += WIDTH_COLUMN + INDENT;
  }
};
