/* eslint-disable require-jsdoc */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import {sendDataToSerial} from '/src/terminal.ts';
import {getJlen} from '/src/options.ts';
function calc2D() {
    // gets User XYA input
    const Xinput = document.getElementById('X2D');
    let x = 0;
    x = Number(Xinput.value);

    const Yinput = document.getElementById('Y2D');
    let y = 0;
    y = Number(Yinput.value);

    const Ainput = document.getElementById('A2D');
    let a = 0;
    a = Number(Ainput.value);

    // gets lengths
    const Jlens = getJlen();

    const l1 = Jlens[1];
    const l2 = Jlens[2]+Jlens[3];
    const l3 = Jlens[4]+Jlens[5];

    // Inverse Kinematics Computation
    let theta1 = 0;
    let theta2 = 0;
    let theta3 = 0;

    let theta2f = 0;
    let theta3f = 0;

    const n = y - l3*Math.sin(a*(Math.PI / 180));
    const m = x - l3*Math.cos(a*(Math.PI / 180));

    const l = Math.sqrt(n * n + m * m);
    theta1 = ((Math.atan(n/m) +
    Math.acos((l2*l2 - l1*l1 - l*l)/(-2*l*l1))))*(180 / Math.PI);

    theta2 = Math.acos((l*l - l2*l2 - l1*l1)/(-2*l2*l1))*(180 / Math.PI);

    theta2f = 270 - theta2;

    theta3 = (360 + (a - theta1 - theta2));

    theta3f = 270 - theta3;

    theta1 = theta1.toFixed(0);
    theta2f = theta2f.toFixed(0);
    theta3f = theta3f.toFixed(0);

    // Converst to string and sends to serial
    const String2D = `90,${theta1},${theta2f},90,${theta3f},90`;

    sendDataToSerial(String2D);
}

document.getElementById('2DI')?.addEventListener('click', calc2D);

