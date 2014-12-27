// ==UserScript==
// @name        Wastificator
// @namespace   ru.tirefitting.wastificator
// @include     *
// @version     1
// @grant       none
//
// @author      RecursivePie
// ==/UserScript==
var state = {
  currentTextarea: null,
}
var wastificationStyles = {
  ps1: {
    'А': 'A',
    'Б': '6',
    'В': 'B',
    'Г': '7',
    'Д': 'D',
    'Е': 'E',
    'Ё': 'E',
    'Ж': 'X',
    'З': '3',
    'И': 'N',
    'Й': 'N',
    'К': 'K',
    'Л': 'JI',
    'М': 'M',
    'Н': 'H',
    'О': '0',
    'П': 'II',
    'Р': 'P',
    'С': 'C',
    'Т': 'T',
    'У': 'Y',
    'Ф': '9P',
    'Х': 'X',
    'Ц': 'U',
    'Ч': '4',
    'Ш': 'W',
    'Щ': 'W',
    'Ь': '',
    'Ы': 'bI',
    'Ъ': '',
    'Э': '3',
    'Ю': 'I0',
    'Я': '9'
  }
}
function attachToTextarea(ta) {
  state.currentTextarea = ta;
}
function onAnyElementFocused(evt) {
  console.log('focused');
  var target = evt.srcElement || evt.originalTarget;
  if (target && target.nodeName.toUpperCase() == 'TEXTAREA') {
    if (state.currentTextarea != target) {
      attachToTextarea(target);
    }
  }
}
function onKeyPress(evt) {
  if (state.currentTextarea && (evt.altKey && evt.key == 'w')) {
    wastifyTextarea(state.currentTextarea);
  }
}
function wastifyTextarea(ta) {
  var style = wastificationStyles.ps1;
  var val = ta.value;
  var ans = '';
  console.log('Wastify ' + val);
  for (var i = 0; i < val.length; i++) {
    var c = val[i].toUpperCase();
    console.log('\'' + c + '\'');
    console.log(style[c]);
    if (style[c]) {
      ans += style[c];
    } else {
      ans += val[i];
    }
  }
  console.log(val);
  ta.value = ans;
}
function onAnyElementBlurred(evt) {
  state.currentTextarea = undefined;
}
function init() {
  document.addEventListener('focus', onAnyElementFocused, true);
  document.addEventListener('blur', onAnyElementBlurred, true);
  window.addEventListener('keypress', onKeyPress, true);
}
init();
