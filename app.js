const calculator = document.querySelector(".calculator");
const calcKeys = calculator.querySelector(".calc-keys");
const calcDisplay = calculator.querySelector(".output-screen");

calcKeys.addEventListener("click", (e) => {
  // Target All Buttons
  if(e.target.matches('button')){
    // Define The Button Type
    const key = e.target;
    const action = key.dataset.action;
    const text = key.textContent;
    const display = calcDisplay.textContent;
    const prevKeyType = calculator.dataset.prevKeyType

    // Calculate Function
    const calculate = (n1, operator, n2) => {
      const firstNum = parseFloat(n1)
      const secondNum = parseFloat(n2)
      if (operator === 'add') return firstNum + secondNum
      if (operator === 'subtract') return firstNum - secondNum
      if (operator === 'multiply') return firstNum * secondNum
      if (operator === 'divide') return firstNum / secondNum
    }

    // Get The Number Key
    if(!action){
      if(display === '0' || prevKeyType === 'operator' || prevKeyType === 'calculate'){
        calcDisplay.textContent = text
      } else {
        calcDisplay.textContent = display + text
      }
      calculator.dataset.prevKeyType = 'number'
    }
    // Get The Operation Key
    if(
      action === 'add' ||
      action === 'divide' ||
      action === 'multiply' ||
      action === 'subtract'
      ){
      const firstValue = calculator.dataset.firstValue
      const operator = calculator.dataset.operator
      const secondValue = display

      if (firstValue && operator && prevKeyType !== 'operator' && prevKeyType !== 'calculate') {
        const calcValue = calculate(firstValue, operator, secondValue)
        calcDisplay.textContent = calcValue

        // Update calculated value as firstValue
        calculator.dataset.firstValue = calcValue
      } else {
        // If there are no calculations, set displayedNum as the firstValue
        calculator.dataset.firstValue = display
      }

      key.classList.add('is-depressed')
      calculator.dataset.prevKeyType = 'operator'
      calculator.dataset.firstVal = display
      calculator.dataset.operator = action
    }
    // If The Key Is Clear
    if(action === 'clear'){

      if (key.textContent === 'AC') {
        calculator.dataset.firstVal = ''
        calculator.dataset.modValue = ''
        calculator.dataset.operator = ''
        calculator.dataset.prevKeyType = ''
      } else {
        text.textContent = 'AC'
      }

      calcDisplay.textContent = 0
      text.textContent = 'CE'
      calculator.dataset.prevKeyType = 'clear'

      // If The Key Is Dicimal
    } else if(action === 'dicimal'){

      if(!display.includes('.')){
        calcDisplay.textContent = display + '.'
      } else if (prevKeyType === 'operator' || prevKeyType === 'calculate') {
        display.textContent = '0.'
      }
      calculator.dataset.prevKeyType = 'dicimal'

      // If The Key Is Calculate
    } else if(action === 'calculate'){

      const firstVal = calculator.dataset.firstVal
      const operator = calculator.dataset.operator
      const secondVal = display

      if (firstVal){
        if (prevKeyType === 'calculate') {
          firstVal = displayedNum
          secondVal = calculator.dataset.modValue
        }
        calcDisplay.textContent = calculate(firstVal, operator, secondVal)
      }
      calculator.dataset.modValue = secondVal
      calculator.dataset.prevKeyType = 'calculate'
    }
    Array.from(key.parentNode.children)
      .forEach(k => k.classList.remove('is-depressed'))
  }
});
