'use strict'
const log = console.log
const arr = [
  //массив значений кнопок
  'ce',
  '(',
  ')',
  '&#8592',
  '7',
  '8',
  '9',
  '&divide',
  '4',
  '5',
  '6',
  '&times',
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

let displayContent = '' //дисплей

for (let i = 0; i < arr.length; i++) {
  button.setAttribute('id', `${i}`)
  button.innerHTML = arr[i]
  buttons.append(button.cloneNode(true))
}
const children = [...buttons.children] //конпки в массив

for (const child of children) {
  //Входные данные математического примера
  if (child.id == '0')
    //для очистки всего
    child.addEventListener('click', function () {
      displayContent = ''
      display.innerText = displayContent
      display.setAttribute('class', 'display')
    })
  else if (child.id == '3')
    //для удаления последнего элемента
    child.addEventListener('click', function () {
      let str = displayContent
      displayContent = str.slice(0, str.length - 1)
      display.innerText = displayContent
      display.setAttribute('class', 'display')
    })
  else if (child.id != '18')
    // для всех кроме знака равно
    child.addEventListener('click', function () {
      if (displayContent.length < 50) {
        displayContent = displayContent + child.innerText
        display.innerText = displayContent
      }
      if (displayContent.length > 20)
        display.setAttribute('class', 'display fz40')
    })
  else child.addEventListener('click', mathDecision) // для знака равно
  if (isNaN(parseInt(child.innerText))) child.setAttribute('class', 'button')
  else child.setAttribute('class', 'button number')
}

function chekTask(string) {
  //функция валидности примера
  let OpBracket = 0,
    ClBracket = 0
  for (let i = 0; i < string.length; i++) {
    if (string[i] == '(') OpBracket++
    if (string[i] == ')') ClBracket++
    if (ClBracket > OpBracket) return false
    if (isNaN(parseInt(string[i])) && isNaN(parseInt(string[i - 1])))
      if (string[i] != '(' && string[i - 1] != ')') return false
  }
  if (ClBracket != OpBracket) return false
  return true
}

function mathDecision() {
  //само решение примера
  if (chekTask(displayContent)) log('OK!!!')
  else log('Not')
}
