/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/**
 * Returns an array the 6 joint lengths.
  * @return {number} array length of joints. neg = flip
  */
export function getJlen() {
  const j1input = document.getElementById('J1');
  let j1len = 0;
  const j1f= document.getElementById('J1f');
  if (j1f.checked == true) {
    j1len = -1*j1len;
  }
  j1len = Number(j1input.value);


  const j2input = document.getElementById('J2');
  let j2len = 0;
  const j2f= document.getElementById('J2f');
  if (j2f.checked == true ) {
    j2len = -1*j2len;
  }
  j2len = Number(j2input.value);

  const j3input = document.getElementById('J3');
  let j3len = 0;
  const j3f= document.getElementById('J3f');
  if (j3f.checked == true ) {
    j3len = -1*j3len;
  }
  j3len = Number(j3input.value);

  const j4input = document.getElementById('J4');
  let j4len = 0;
  const j4f= document.getElementById('J4f');
  if (j4f.checked == true ) {
    j4len = -1*j4len;
  }
  j4len = Number(j4input.value);

  const j5input = document.getElementById('J5');
  let j5len = 0;
  const j5f= document.getElementById('J5f');
  if (j5f.checked == true ) {
    j5len = -1*j5len;
  }
  j5len = Number(j5input.value);

  const j6input = document.getElementById('J6');
  let j6len = 0;
  const j6f= document.getElementById('J6f');
  if (j6f.checked == true ) {
    j6len = -1*j6len;
  }
  j6len = Number(j6input.value);

  return [j1len, j2len, j3len, j4len, j5len, j6len];
}
