'use strict'
const log = console.log
const arr = [
  'ce',
  '(',
  ')',
  'C',
  '7',
  '8',
  '9',
  '/',
  '4',
  '5',
  '6',
  '*',
  '1',
  '2',
  '3',
  '-',
  '.',
  '0',
  '=',
  '+',
]

const display = document.querySelector('#display')

const buttons = document.querySelector('#buttons')

const button = document.createElement('div')

for (let i = 0; i < arr.length; i++) {
  button.setAttribute('id', `${i}`)
  button.innerText = arr[i]
  buttons.append(button.cloneNode(true))
}
const buttoncl = document.querySelectorAll('.button')

const children = [...buttons.children]
log(children)

let s = ''
for (const child of children) {
  if (child.id == '0')
    child.addEventListener('click', function () {
      s = ''
      display.innerText = s
      display.setAttribute('class', 'display')
    })
  else if (child.id == '3')
    child.addEventListener('click', function () {
      let str = s
      s = str.slice(0, str.length - 1)
      display.innerText = s
      display.setAttribute('class', 'display')
    })
  else
    child.addEventListener('click', function () {
      if (s.length < 50) {
        s = s + child.innerText
        display.innerText = s
      }
      if (s.length > 20) display.setAttribute('class', 'display fz40')
    })
  if (isNaN(parseInt(child.innerText))) child.setAttribute('class', 'button')
  else child.setAttribute('class', 'button number')
}
