var digitsString = "";

	document.getElementById("reset").onclick = function reset() {
		updateDisplay(digitsString = "");
		return;
	}

	function visualFX(keyPressed) {
		if (keyPressed == "Enter") {
			var btn = document.querySelector('input[value="="]');
		} else if (keyPressed == ",") {
			var btn = document.querySelector('input[value="."]');
		} else {
			var btn = document.querySelector('input[value="' + keyPressed + '"]');
		}
		// timed class toggle
		if (btn != null) {
			btn.classList.add('pressed');
			window.setTimeout(function() {
				btn.classList.remove('pressed');
			}, 150);
		}
		return;
	}

	// catch mouseclicked interactions
	var clickedDigit = document.getElementsByClassName('btn');
	for (var i = 0; i < clickedDigit.length; i++) {
		clickedDigit[i].onclick = function() {
			appendOnlyDigitsToString(this.value);
		};
	}

	// catch keyboard numfield interactions
	document.onkeydown = function updateDisplay(event) {
		var key = event.key,
			code = event.keyCode;
		if (!isNaN(key)) {
			// is numeric key
			appendOnlyDigitsToString(key);
		} else if (
			code == 106 || // '*'
			code == 107 || // '+'
			code == 109 || // '-'
			code == 111 || // '/'
			code == 110 || // ',' Numblock
			code == 188 || //','Keyboard
			code == 190 || // '.'Keyboard
			code == 13 || // Enter
			code == 8 // Backspace
		) {
			switch (code) {
				// enter
				case 13:
					cutOffLeftOverSigns();
					break;
					// comma/dot
				case 110:
				case 188:
				case 190:
					setDot();
					break;
					//backspace
				case 8:
					deleteLast(digitsString);
					break;
				default:
					// + - * /
					addMath(key);
			}
		} else {
			// easter egg
			console.log(document.getElementById("display").value = "This is not a chat, dude !");
		}
		// assign key effect
		visualFX(key);
		return;
	}

	function appendOnlyDigitsToString(number) {
		// adding digits
		updateDisplay(digitsString += number);
		return;
	}

	function setDot(dot) {
		// adds a dot for , or .
		dot = ".";
		updateDisplay(digitsString += dot);
		return;
	}

	function addMath(symbol) {
		// adds + or - or * or /
		updateDisplay(digitsString += symbol);
		return;
	}

	function deleteLast() {
		// convert back to string enables complete backspacing here
		digitsString = digitsString.toString().slice(0, -1);
		updateDisplay(digitsString);
		return;
	}

	function cutOffLeftOverSigns() {
		//  loop leftover deletion  e.g. '5+++'
		var lastSymbol = String(digitsString).substr(String(digitsString).length - 1);
		// delete anything but numbers
		if (isNaN(lastSymbol)) {
			console.log("string=> " + String(digitsString) + " leftOver: " + lastSymbol);
			digitsString = digitsString.slice(0, -1);
			cutOffLeftOverSigns();
		} else {
			calcString()
		}
		return
	}

	function calcString() {
		// take the string as an math operation via eval; octalnumber problem
		digitsString = eval(digitsString);
		updateDisplay(digitsString);
		return;
	}

	function updateDisplay(number) {
		//updates the display area
		document.getElementById("display").value = number;
		return;
	}

	window.onresize = startHere;
	var maxWidth = "50%";

	function startHere() {
		var root = document.getElementsByTagName("html")[0],
			wrapper = document.getElementById("centerMe");
		root.style.position = "relative", root.style.height = "100%";
		wrapper.style.position = "absolute";
		wrapper.style.maxWidth = maxWidth;
		var rootHeight = Math.round(root.clientHeight),
			rootWidth = Math.round(root.clientWidth),
			wrapperHeight = Math.round(wrapper.clientHeight),
			wrapperWidth = Math.round(wrapper.clientWidth);

		// stop calculating for equal dimensions  
		if (rootHeight <= wrapperHeight) {} else {
			var calcTop = (rootHeight - wrapperHeight) / 2;
		}
		if (rootWidth <= wrapperWidth) {} else {
			var calcLeft = (rootWidth - wrapperWidth) / 2;
		}

		wrapper.style.top = String(Math.round(calcTop)) + "px";
		wrapper.style.left = String(Math.round(calcLeft)) + "px";

		return
	};

	startHere()