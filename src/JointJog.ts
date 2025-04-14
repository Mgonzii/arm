/* eslint-disable require-jsdoc */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Function to update the comma-separated list of slider values
import {sendDataToSerial} from '/src/terminal.ts';
function updateSliderValues() {
  // Get values of all sliders
  const sliderValues = [
    document.getElementById('J1slide').value,
    document.getElementById('J2slide').value,
    document.getElementById('J3slide').value,
    document.getElementById('J4slide').value,
    document.getElementById('J5slide').value,
    document.getElementById('J6slide').value,
  ];

  // Join the slider values into a comma-separated string
  const sliderString = sliderValues.join(',');

  // Output the result as a string
  document.getElementById('sliderValues').textContent = sliderString;

  sendDataToSerial(sliderString);
}

// Function to update the value display next to each slider
function updateSliderValueDisplay(sliderId, displayId) {
  const slider = document.getElementById(sliderId);
  const display = document.getElementById(displayId);
  slider.addEventListener('input', function() {
    display.textContent = slider.value;
    updateSliderValues(); // Update the comma-separated list
  });
}

// Initialize sliders and display values
updateSliderValueDisplay('J1slide', 'value1');
updateSliderValueDisplay('J2slide', 'value2');
updateSliderValueDisplay('J3slide', 'value3');
updateSliderValueDisplay('J4slide', 'value4');
updateSliderValueDisplay('J5slide', 'value5');
updateSliderValueDisplay('J6slide', 'value6');
