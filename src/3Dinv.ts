/* eslint-disable object-curly-spacing */
/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable require-jsdoc */
/* eslint-disable indent */

import {sendDataToSerial} from '/src/terminal.ts';
import { inverseKinematics } from "ts-kinematics";

document.addEventListener("DOMContentLoaded", () => {
  const posSliders = ['3DX', '3DY', '3DZ'];
  const posLabels = ['valX', 'valY', 'valZ'];

  const rotSliders = ['r1', 'r2', 'r3'];
  const rotLabels = ['valR1', 'valR2', 'valR3'];

  [...posSliders, ...rotSliders].forEach((id, index) => {
    const slider = document.getElementById(id) as HTMLInputElement;
    const label = document.getElementById(
      index < 3 ? posLabels[index] : rotLabels[index - 3]
    );
    if (!slider || !label) return;

    slider.addEventListener('input', () => {
      label.textContent = slider.value + (index >= 3 ? '°' : '');
      calculateIK();
    });
  });

  calculateIK(); // Initial run
});

function calculateIK() {
  const outputDiv = document.getElementById("anglesOutput");
  if (!outputDiv) return;


  const x = parseFloat((document.getElementById('3DX') as HTMLInputElement).value);
  const y = parseFloat((document.getElementById('3DY') as HTMLInputElement).value);
  const z = parseFloat((document.getElementById('3DZ') as HTMLInputElement).value);

  // Convert degrees to radians
  const r1 = degToRad(parseFloat((document.getElementById('r1') as HTMLInputElement).value));
  const r2 = degToRad(parseFloat((document.getElementById('r2') as HTMLInputElement).value));
  const r3 = degToRad(parseFloat((document.getElementById('r3') as HTMLInputElement).value));

  const config = {
    base: 47,
    v1: 22,
    v2: 105,
    v3: 30,
    v4: 80,
    v5: 20,
    v6: 30,
    flip: false,
  };

  const angles = inverseKinematics({
    x, y, z,
    r1, r2, r3,
    config,
  });

  angles[0] = 90 + angles[0] * (180 / Math.PI);
  angles[1] = angles[1] * (180 / Math.PI) + 90;
  angles[2] = 270 - angles[2] * (180 / Math.PI);
  angles[3] = 90 + angles[3] * (180 / Math.PI);
  angles[4] = 270 - angles[4] * (180 / Math.PI);
  angles[5] = angles[5] * (180 / Math.PI) + 90;

  for (let i = 0; i < 6; i++) {
    if (angles[i] > 180) angles[i] = 180;
    else if (angles[i] < 0 || angles[i] == null) angles[i] = 0;
  }

  outputDiv.innerText =
    "Inverse Kinematics Joint Angles:\n" +
    angles.map((a, i) => `Joint ${i + 1}: ${a.toFixed(2)}°`).join('\n');
  for (let i = 0; i < 6; i++) {
    angles[i] = angles[i].toFixed(0);
  }
    const angleSTR = angles.join(',');
    sendDataToSerial(angleSTR);
}

function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}
