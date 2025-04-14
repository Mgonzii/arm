/* eslint-disable require-jsdoc */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import {sendDataToSerial} from '/src/terminal.ts';
function calc2D(){
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

    const n = y - l3*Math.sin(a*(Math.PI / 180));
    const m = x - l3*Math.cos(a*(Math.PI / 180));

    const l = Math.sqrt(n * n + m * m);
    theta1 = 180 - ((Math.atan(n/m) +
    Math.acos((l2*l2 - l1*l1 - l*l)/(-2*l*l1))))*(180 / Math.PI);

    theta2 = Math.acos((l*l - l2*l2 - l1*l1)/(-2*l2*l1))*(180 / Math.PI) - 90;

    theta3 = 180 - (360 + (a - theta1 - theta2));

    theta1 = theta1.toFixed(0);
    theta2 = theta2.toFixed(0);
    theta3 = theta3.toFixed(0);

    // Converst to string and sends to serial
    const String2D = `0, ${theta1}, ${theta2}, 0, ${theta3}, 0, 0`;

    sendDataToSerial(String2D);
}
