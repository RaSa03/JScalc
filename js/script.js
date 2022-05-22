'use strict'
const log = console.log
const arr = [
  //массив значений кнопок
  'ce',
  '(',
  ')',
  '&#8617',
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
const answerDis = document.querySelector('#answer')

const display = document.querySelector('#display')

const buttons = document.querySelector('#buttons')

const history = document.querySelector('#history')

const historyList = document.querySelector('#list')

const button = document.createElement('div')

let displayContent = '' //дисплей

for (let i = 0; i < arr.length; i++) {
  //циферки и кнопки
  button.setAttribute('id', `${i}`)
  button.innerHTML = arr[i]
  buttons.append(button.cloneNode(true))
}
const children = [...buttons.children] //конпки в массив

//Входные данные математического примера
for (const child of children) {
  if (child.id == '0')
    //для очистки всего
    child.addEventListener('click', function () {
      displayContent = display.innerText = answerDis.innerText = ''
      // display.innerText = displayContent
      display.setAttribute('class', 'display')
    })
  else if (child.id == '3')
    //для удаления последнего элемента
    child.addEventListener('click', function () {
      let str = displayContent
      displayContent = str.slice(0, str.length - 1)
      display.innerText = displayContent
      if (displayContent.length == 0 && answerDis.innerText.length != 0) {
        displayContent = display.innerText = answerDis.innerText
        answerDis.innerText = ''
      }
    })
  else if (child.id != '18')
    // для всех кроме знака равно
    child.addEventListener('click', function () {
      if (displayContent.length < 30) {
        displayContent = displayContent + child.innerText
        display.innerText = displayContent
      }
    })
  else child.addEventListener('click', MathCenter) // для знака равно
  if (isNaN(parseInt(child.innerText))) child.setAttribute('class', 'button')
  else child.setAttribute('class', 'button number')
}

let historyArr = []
const historyItem = document.querySelector('.item')
history.addEventListener('click', function () {
  history.classList.toggle('history-body')
  historyList.classList.toggle('display-none')
  // historyList.innerHTML = ''
  // for (let i = 0; i < historyArr.length; i++) {
  // }
})

let k = 0
let historyVal = ''
function MathCenter() {
  //центр решения ======================== =============== =============== =============
  displayContent = ChekMinus(displayContent)
  if (!chekTask(displayContent)) {
    display.innerText = 'incorrect task!'
  } else {
    let arr = valuArrCreator(displayContent)
    let answer = Solver(arr)
    answerDis.innerText = displayContent
    display.innerText = '=' + answer.toString()
    historyVal = displayContent + display.innerText
    historyItem.innerHTML = historyVal
    historyList.append(historyItem.cloneNode(true))
    displayContent = answer.toString()
  }
}

function ChekMinus(cont) {
  for (let j = 0; j < cont.length; j++) {
    if (cont[j] == '-' && (isNaN(parseInt(cont[j - 1])) || j == 0)) {
      let str1 = cont.slice(0, j)
      let str2 = cont.slice(j, cont.length)
      cont = str1 + '0' + str2
    }
  }
  return cont
}

function chekTask(displayCntnt) {
  //функция валидности примера
  let OpBracket = 0,
    ClBracket = 0
  for (let i = 0; i < displayCntnt.length; i++) {
    if (displayCntnt[i] == '(') OpBracket++
    if (displayCntnt[i] == ')') ClBracket++
    if (ClBracket > OpBracket) return false
    if (
      isNaN(parseInt(displayCntnt[i])) &&
      isNaN(parseInt(displayCntnt[i - 1]))
    )
      if (displayCntnt[i] != '(' && displayCntnt[i - 1] != ')') return false
  }
  if (
    ClBracket != OpBracket ||
    (displayCntnt[displayCntnt.length - 1] != ')' &&
      isNaN(parseInt(displayCntnt[displayCntnt.length - 1])))
  )
    return false
  return true
}

function valuArrCreator(disCon) {
  //разбиение чисел и операции
  const a = []
  let i = 0,
    l = 0,
    j = 0
  while (i < disCon.length) {
    if (isNaN(parseInt(disCon[i]))) {
      a[l] = disCon.slice(i, i + 1)
      i++
      l++
    } else {
      j = i
      while (!isNaN(parseInt(disCon[j])) || disCon[j] == '.') {
        j++
      }
      a[l] = parseFloat(disCon.slice(i, j))
      l++
      i = j
    }
  }
  return a
}
function calc(num1, num2, operation) {
  switch (operation) {
    case '+':
      return num1 + num2
    case '-':
      return num1 - num2
    case '×':
      return num1 * num2
    case '÷':
      return num1 / num2
  }
}

const priority = {
  '(': 0,
  ')': 0,
  '+': 1,
  '-': 1,
  '×': 2,
  '÷': 2,
}

function Solver(Stack) {
  let numL = -1,
    operatL = -1,
    numStack = [],
    operatStack = ['']
  for (let i = 0; i <= Stack.length; i++) {
    if (Number.isFinite(Stack[i])) {
      numL++
      numStack[numL] = Stack[i]
    } else if (
      operatL == -1 ||
      priority[operatStack[operatL]] < priority[Stack[i]] ||
      Stack[i] == '('
    ) {
      operatL++
      operatStack[operatL] = Stack[i]
    } else {
      let sum = calc(numStack[numL - 1], numStack[numL], operatStack[operatL])
      numL--
      numStack = numStack.slice(0, numL)
      numStack[numL] = sum
      operatStack = operatStack.slice(0, operatL)
      operatL--
      if (Stack[i] == ')') {
        operatStack = operatStack.slice(0, operatL)
        operatL--
      } else i--
      // log(i, numStack, operatStack)
    }
  }
  return numStack[0]
  // log(numStack, operatStack)
}
