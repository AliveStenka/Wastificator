// ==UserScript==
// @name        Wastificator
// @namespace   ru.tirefitting.wastificator
// @include     *
// @version     1
// @grant       none
//
// @author      RecursivePie
// ==/UserScript==

if (!("contextMenu" in document.documentElement && "HTMLMenuItemElement" in window)) {
	alert("No context menu");
}

var state = {
	currentTextarea : null,
}

var elements = {
	button : null,
	contextMenu : null,
}

var consts = {
	prefix : "wastifcator-"
}

var wastificationStyles = {
	"ps1" : {
		upperCase : true,
		replaces : {
			'А' : 'A',
			'Б' : '6',
			'В' : 'B',
			'Г' : '7',
			'Д' : 'D',
			'Е' : 'E',
			'Ё' : 'E',
			'Ж' : 'X',
			'З' : '3',
			'И' : 'N',
			'Й' : 'N',
			'К' : 'K',
			'Л' : 'JI',
			'М' : 'M',
			'Н' : 'H',
			'О' : '0',
			'П' : 'II',
			'Р' : 'P',
			'С' : 'C',
			'Т' : 'T',
			'У' : 'Y',
			'Ф' : '9P',
			'Х' : 'X',
			'Ц' : 'U',
			'Ч' : '4',
			'Ш' : 'W',
			'Щ' : 'W',
			'Ь' : 'b',
			'Ы' : 'bI',
			'Ъ' : 'b',
			'Э' : '3',
			'Ю' : 'I0',
			'Я' : '9'
		}
	},
	"vc" : {
		upperCase : false,
		replaces : {
			'м' : "m",
			"п" : "n",
			"и" : "u",
			"г" : "s",
			"д" : "g"
		}
	},
	"sa_caps" : {
		upperCase : true,
		replaces : {
			"Э" : "3",
			"Щ" : "Ш",
			"Ъ" : "Ь",
			"S" : "Ы",
			"R" : "Я",
		}
	}

}

function attachToTextarea(ta) {
	state.currentTextarea = ta;
	ta.parentNode.insertBefore(elements.button, ta.nextSibling);
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
		console.log("Hotkey wastification is now off");
	}
}

function wastifyTextarea(ta, styleName) {
	var style = wastificationStyles[styleName];
	var val = ta.value;
	var ans = '';
	for (var i = 0; i < val.length; i++) {
		var c = val[i];
		if (style.upperCase) {
			c = c.toUpperCase();
		}
		var rc = style.replaces[c];
		console.log(rc);
		if (rc !== null && rc !== undefined) {
			ans += rc;
		} else {
			ans += c;
		}
	}
	console.log(ans);
	ta.value = ans;
}

function initMenu(evt) {
	var tg = evt.target;
}

function showContextMenu(evt) {
	evt.preventDefault();
	elements.button.parentNode.insertBefore(elements.contextMenu,
			elements.button.nextSibling);
	console.log(evt);
	elements.contextMenu.style.left = evt.clientX + "px";
	elements.contextMenu.style.top = evt.clientY + "px";
	elements.contextMenu.style.display = "block";
	console.log(elements.contextMenu);
}

function styleClicked(evt) {
	var target = evt.srcElement || evt.originalTarget;
	wastifyTextarea(state.currentTextarea, target.textContent);
	closeContextMenu();
}

function closeContextMenu() {
	elements.contextMenu.style.display = "none";
}

function init() {

	state.activeStyle = "vc";
	
	elements.button = document.createElement('button');
	elements.button.innerHTML = "N";
	
	elements.button.addEventListener("click", showContextMenu, true);

	elements.contextMenu = document.createElement("div");
	elements.contextMenu.style.border = "solid 1px red";
	elements.contextMenu.style.position = "absolute";
	elements.contextMenu.style.display = "none";
	elements.contextMenu.style.backgroundColor = "white";
	elements.contextMenu.style.padding = "0px";
	elements.contextMenu.style.margin = "0px";
	var styleList = document.createElement("ol");
	for ( var prop in wastificationStyles) {
		var entry = document.createElement("li");
		var link = document.createElement("a");
		link.href = "#";
		link.appendChild(document.createTextNode(prop));
		link.addEventListener("click", styleClicked, true);
		entry.appendChild(link);
		styleList.appendChild(entry);
	}
	var closeEntry = document.createElement("li");
	var link = document.createElement("a");
	link.href = "#";
	link.appendChild(document.createTextNode("Закрыть"));
	link.style.color = "red";
	link.addEventListener("click", closeContextMenu, true);
	console.log("lel");
	closeEntry.appendChild(link);
	styleList.appendChild(closeEntry);
	elements.contextMenu.appendChild(styleList);

	document.addEventListener('focus', onAnyElementFocused, true);
	window.addEventListener('keypress', onKeyPress, true);
}

init();
