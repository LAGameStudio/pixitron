"use strict";

/**
 * Some HTML helper functions
 */
let htmlLib = (function () {
	/**
	 * Wrapper around querySelector
	 */
	function qs(s, p) {
		if (p) {
			return p.querySelector(s);
		}
		return document.querySelector(s);
	}

	/**
	 * Clone an HTML template
	 */
	function template(id, attribs, subs) {
		let t = qs(id);
		let html = t.outerHTML;
		let key;

		// Do the substitutions in the HTML
		if (subs) for (key in subs) {
			let val = subs[key];
			html = html.replace(new RegExp(key, 'g'), val);
		}

		// Make a dummy element to hold the cloned HTML
		let wrapper = document.createElement('div');
		wrapper.innerHTML = html;
		let clone = wrapper.querySelector(id);

		// Set the new attributes
		if (attribs) for (key in attribs) {
			let val = attribs[key];
			clone.setAttribute(key, val);
		}

		return clone;
	}

	// Exports
	return {
		qs: qs,
		template: template
	};

}());


/**
 * Helper library for gamepads based on: https://github.com/beejjorgensen/jsgamepad/
 */
let gpLib = (function () {

	/**
	 * Test gamepad support
	 */
	function supportsGamepads() {
		return !!(navigator.getGamepads);
	}

	/**
	 * Test for new or removed connections
	 */
	let testForConnections = (function() {

		// Keep track of the connection count
		let connectionCount = 0;

		// Return a function that does the actual tracking
		//
		// The function returns a positive number of connections,
		// a negative number of disconnections, or zero for no
		// change.
		return function () {
			let gamepads = navigator.getGamepads();
			let count = 0;
			let rv;

			for (let i = gamepads.length - 1; i >= 0; i--) {
				let g = gamepads[i];

				// Make sure they're not null and connected
				if (g && g.connected) {
					count++;
				}
			}

			// Return any changes
			rv = count - connectionCount;

			connectionCount = count;

			return rv;
		}
	}());

	/**
	 * Clamp X and Y gamepad coordinates to length 1.0
	 *
	 * @param {Number} x
	 * @param {Number} y
	 *
	 * @return {Array} The clamped X and Y values
	 */
	function clamp(x, y) {
		let m = Math.sqrt(x*x + y*y); // Magnitude (length) of vector

		// If the length greater than 1, normalize it (set it to 1)
		if (m > 1) {
			x /= m;
			y /= m;
		}

		return [x, y];
	}

	/**
	 * Given a gamepad axis value, normalize it so there's a deadzone
	 *
	 * Run independently on X and Y axes.
	 *
	 * @param {Number} v
	 *
	 * @return {Number} The deadzone value of the axis
	 */
	function deadzone(v) {
		const DEADZONE = 0.2;

		if (Math.abs(v) < DEADZONE) {
			v = 0;
		} else {
			// Smooth
			v = v - Math.sign(v) * DEADZONE;
			v /= (1.0 - DEADZONE);
		}

		return v;
	}

	// Exports
	return {
		clamp: clamp,
		deadzone: deadzone,
		supportsGamepads: supportsGamepads,
		testForConnections: testForConnections
	};

}());


	// Imports
	let template = htmlLib.template;
	let qs = htmlLib.qs;

	// Currently visible controller
	let currentVisibleController = null;

	/**
	 * Show a certain controller
	 */
	function showController(n) {

		n = n | 0;

		console.log("Selecting gamepad " + n);

		let gamepads = document.querySelectorAll("#gamepad-container .gamepad");

		for (let i = 0; i < gamepads.length; i++) {
			let gp = gamepads[i];
			let index = gp.getAttribute("data-gamepad-index");

			index = index | 0;

			if (index == n) {
				gp.classList.remove('nodisp');
			} else {
				gp.classList.add('nodisp');
			}
		}

		currentVisibleController = n;
	}

	/**
	 * Reconstruct the UI for the current gamepads
	 */
	function rebuildUI() {

		// Handle gamepad selector button clicks
		function onButtonClick(ev) {
			let b = ev.currentTarget;
			let gpIndex = b.getAttribute('data-gamepad-index');

			showController(gpIndex);
		}

		let gp = navigator.getGamepads();

		let bbbox = qs("#button-bar-box");
		bbbox.innerHTML = '';

		let gpContainer = qs("#gamepad-container");
		gpContainer.innerHTML = '';

		let haveControllers = false, curControllerVisible = false, firstController = null;

		// For each controller, generate a button from the
		// button template, set up a click handler, and append
		// it to the button box
		for (let i = 0; i < gp.length; i++) {

			// Chrome has null controllers in the array
			// sometimes when nothing's plugged in there--ignore
			// them
			if (!gp[i] || !gp[i].connected) { continue; }

			let gpIndex = gp[i].index;

			// Clone the selector button
			let button = template("#template-button",
				{
					"id": "button-" + gpIndex,
					"data-gamepad-index": gpIndex,
					"value": gpIndex
				});

			bbbox.appendChild(button);

			// Add the selector click listener
			button.addEventListener('click', onButtonClick);

			// Clone the main holder
			let gamepad = template("#template-gamepad",
				{
					"id": "gamepad-" + gpIndex,
					"data-gamepad-index": gpIndex
				});

			gpContainer.appendChild(gamepad);

			qs(".gamepad-title", gamepad).innerHTML = "Gamepad " + gpIndex;
			qs(".gamepad-id", gamepad).innerHTML = gp[i].id;

			let mapping = gp[i].mapping;
			qs(".gamepad-mapping", gamepad).innerHTML = "mapping: " + (mapping && mapping !== ''? mapping: "[<i>unspecified</i>]");

			// Add the buttons for this gamepad
			let j;
			let buttonBox = qs(".gamepad-buttons-box", gamepad)

			for (j = 0; j < gp[i].buttons.length; j++) {
				let buttonContainer = template("#template-gamepad-button-container",
					{
						"id": "gamepad-" + gpIndex + "-button-container-" + j
					});

					qs(".gamepad-button", buttonContainer).setAttribute("id", "gamepad-" + gpIndex + "-button-" + j);
					qs(".gamepad-button-label", buttonContainer).innerHTML = j;

				buttonBox.appendChild(buttonContainer);
			}

			// Add the axes for this gamepad
			let axesBox = qs(".gamepad-axes-box", gamepad);
			let axesBoxCount = ((gp[i].axes.length + 1) / 2)|0; // Round up (e.g. 3 axes is 2 boxes)

			for (j = 0; j < axesBoxCount; j++) {
				let axisPairContainer = template("#template-gamepad-axis-pair-container",
					{
						"id": "gamepad-" + gpIndex + "-axis-pair-container-" + j
					});

				qs(".gamepad-axis-pair", axisPairContainer).setAttribute("id", "gamepad-" + gpIndex + "-axispair-" + j);

				let pairLabel;

				// If we're on the last box and the number of axes is odd, just put one label on there
				if (j == axesBoxCount - 1 && gp[i].axes.length % 2 == 1) {
					pairLabel = j*2;
				} else {
					pairLabel = (j*2) + "," + ((j*2)+1);
				}
				qs(".gamepad-axis-pair-label", axisPairContainer).innerHTML = pairLabel;

				axesBox.appendChild(axisPairContainer);
			}

			// And remember that we have controllers now
			haveControllers = true;

			if (i == currentVisibleController) {
				curControllerVisible = true;
			}

			if (firstController === null) {
				firstController = i;
			}
		}

		// Show or hide the "plug in a controller" prompt as
		// necessary
		if (haveControllers) {
			qs("#prompt").classList.add("nodisp");
			qs("#main").classList.remove("nodisp");
		} else {
			qs("#prompt").classList.remove("nodisp");
			qs("#main").classList.add("nodisp");
		}

		if (curControllerVisible) {
			showController(currentVisibleController);
		} else {
			currentVisibleController = firstController;
			showController(firstController);
		}
	}

	/**
	 * Update the UI components based on gamepad values
	 */
	 function updateUI() {

		let gamepads = navigator.getGamepads();

		let mode = qs("#mode-select").value; // raw, norm, clamp

		// For each controller, show all the button and axis information
		for (let i = 0; i < gamepads.length; i++) {
			let gp = gamepads[i];
			let j;

			if (!gp || !gp.connected) { continue; }

			let gpElem = qs("#gamepad-" + i);

			// Show button values
			let buttonBox = qs(".gamepad-buttons-box", gpElem);

			for (j = 0; j < gp.buttons.length; j++) {
				let buttonElem = qs("#gamepad-" + i + "-button-" + j, buttonBox)
				let button = gp.buttons[j];

				// Put the value in there
				buttonElem.innerHTML = button.value;

				// Change color if pressed or not
				if (button.pressed) {
					buttonElem.classList.add("pressed");
				} else {
					buttonElem.classList.remove("pressed");
				}
			}

			// Show axis values
			let axesBox = qs(".gamepad-axes-box", gpElem);
			let axesBoxCount = ((gp.axes.length + 1) / 2)|0; // Round up (e.g. 3 axes is 2 boxes)

			for (j = 0; j < axesBoxCount; j++) {
				let axisPairContainer = qs("#gamepad-" + i + "-axis-pair-container-" + j, axesBox);
				let axisPairValue = qs(".gamepad-axis-pair-value", axisPairContainer);
				let axisPip = qs(".gamepad-axis-pip", axisPairContainer);
				let axisCross = qs(".gamepad-axis-crosshair", axisPairContainer);
				let valueX, valueY, valueStr;
				let deadzoneActive = qs("#deadzone").checked;

				valueX = gp.axes[j*2];

				if (deadzoneActive) {
					valueX = gpLib.deadzone(valueX);
				}

				// Set the value label
				valueStr = valueX.toFixed(2);

				// Position the raw indicator
				axisCross.style.left = (valueX + 1) / 2 * 100 + '%';

				// Position the pip over the raw indicator for now
				axisPip.style.left = axisCross.style.left;

				// If we're not a single axis in the last box, show the second axis in this box.
				// This handles a last box with a single axis (odd number of axes total).
				if (!(j == axesBoxCount - 1 && gp.axes.length % 2 == 1)) {
					valueY = gp.axes[j*2+1];

					if (deadzoneActive) {
						valueY = gpLib.deadzone(valueY);
					}

					// Set the value label
					valueStr += ',' + valueY.toFixed(2);

					// Position the raw indicator
					axisCross.style.left = (valueX + 1) / 2 * 100 + '%';
					axisCross.style.top = (valueY + 1) / 2 * 100 + '%';

					// Position the pip, clamping if necessary
					let clampCircle = qs(".gamepad-circle", axisPairContainer);

					if (mode == 'clamp') {
						// Clamp
						let clampX, clampY;
						[clampX, clampY] = gpLib.clamp(valueX, valueY, mode);
						axisPip.style.left = (clampX + 1) / 2 * 100 + '%';
						axisPip.style.top = (clampY + 1) / 2 * 100 + '%';

						clampCircle.classList.remove("nodisp");

						// Overwrite the value string with clamped values
						valueStr = clampX.toFixed(2) + ',' + clampY.toFixed(2);

					} else {
						// Raw
						axisPip.style.left = axisCross.style.left;
						axisPip.style.top = axisCross.style.top;

						clampCircle.classList.add("nodisp");
					}
				}

				axisPairValue.innerHTML = valueStr;
			}
		}
	 }

	/**
	 * Render a frame
	 */
	function onFrame() {
		let conCheck = gpLib.testForConnections();

		// Check for connection or disconnection
		if (conCheck) {
			console.log(conCheck + " new connections");

			// And reconstruct the UI if it happened
			rebuildUI();
		}

		// Update all the UI elements
		updateUI();

		requestAnimationFrame(onFrame);
	}

	/**
	 * onload handler
	 */
	function onLoadGamepad() {
		if (gpLib.supportsGamepads()) {
			rebuildUI();
			requestAnimationFrame(onFrame);
		} else {
			qs("#sol").classList.remove("nodisp");
		}
	}

	// Initialization code
	window.addEventListener('load', onLoadGamepad);
