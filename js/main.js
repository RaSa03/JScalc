"use strict"
const log = console.log;
const arr = ['ce','(', ')', 'C', '7','8','9','/','4','5','6','*','1','2','3','-','.','0','=','+',]

const display = document.querySelector('#display');

const buttons = document.querySelector('#buttons')

const button = document.createElement("div")

button.setAttribute('class', 'button')

for (let i = 0; i < arr.length; i++) {
    button.setAttribute('id',`${i}`);
    button.innerText = arr[i];
    buttons.append(button.cloneNode(true))
}
const buttoncl = document.querySelectorAll('.button');

const children = [...buttons.children]
log(children)

jugjjg