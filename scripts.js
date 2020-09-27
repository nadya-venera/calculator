const displayInput = document.querySelector('[data-calc-display]');

const VALUE_ZERO = '0';

let leftOperandValue = null;
let selectedOperator = null;

let currentInputValue = displayInput.value;

const handleNumberPress = (number) => {
  currentInputValue = currentInputValue === VALUE_ZERO ? number : currentInputValue + number;
  refreshDisplayValue();
};

const handleOperatorPress = (operator) => {
  if (selectedOperator) {
    applyOperation();
  }
  leftOperandValue = currentInputValue;
  currentInputValue = VALUE_ZERO;
  selectedOperator = operator;
};

const handleResultPress = () => {
  if (selectedOperator) {
    applyOperation();
  }
};

const applyOperation = () => {
  currentInputValue = computeResult(leftOperandValue, currentInputValue, selectedOperator).toString();
  leftOperandValue = null;
  selectedOperator = null;
  refreshDisplayValue();
};

const computeResult = (leftOperand, rightOperand, operator) => {
  switch (operator) {
    case '/':
      return Number(leftOperand) / Number(rightOperand);
    case '*':
      return Number(leftOperand) * Number(rightOperand);
    case '-':
      return Number(leftOperand) - Number(rightOperand);
    case '+':
      return Number(leftOperand) + Number(rightOperand);
    case 'power':
      return Math.pow(Number(leftOperand), Number(rightOperand));
  }
};

const clear = () => {
  currentInputValue = VALUE_ZERO;
  refreshDisplayValue();
};

const reset = () => {
  currentInputValue = VALUE_ZERO;
  leftOperandValue = null;
  selectedOperator = null;
  refreshDisplayValue();
};

const squareRoot = () => {
  let operand;
  if (selectedOperator) {
    operand = leftOperandValue;
    selectedOperator = null;
    leftOperandValue = null;
  } else {
    operand = currentInputValue;
  }
  currentInputValue = Math.sqrt(operand);
  refreshDisplayValue();
};

const negate = (number) => {
  if (number === VALUE_ZERO) {
    return number;
  }
  return number.startsWith('-') ? number.slice(1) : '-' + number;
}

const negative = () => {
  if (selectedOperator && currentInputValue === VALUE_ZERO) {
    leftOperandValue = negate(leftOperandValue);
    displayInput.value = leftOperandValue;
  } else {
    currentInputValue = negate(currentInputValue);
    refreshDisplayValue();
  }
};

const decimal = () => {
  currentInputValue = currentInputValue.includes('.') ? currentInputValue : currentInputValue + '.';
  refreshDisplayValue();
};

const refreshDisplayValue = () => {
  displayInput.value = currentInputValue;
};

const numberButtons = document.querySelectorAll('[data-calc-number]');

for (let i = 0; i < numberButtons.length; i++) {
  numberButtons[i].addEventListener('click', () => {
    handleNumberPress(numberButtons[i].dataset.calcNumber);
  });
}

const operatorButtons = document.querySelectorAll('[data-calc-operator]');

for (let i = 0; i < operatorButtons.length; i++) {
  operatorButtons[i].addEventListener('click', () => {
    handleOperatorPress(operatorButtons[i].dataset.calcOperator);
  });
}

const resultButton = document.querySelector('[data-calc-result]');
resultButton.addEventListener('click', handleResultPress);

const resetButton = document.querySelector('[data-calc-reset]');
resetButton.addEventListener('click', reset);

const clearButton = document.querySelector('[data-calc-clear]');
clearButton.addEventListener('click', clear);

const squareRootButton = document.querySelector('[data-calc-sqrt]');
squareRootButton.addEventListener('click', squareRoot);

const negativeButton = document.querySelector('[data-calc-negative]');
negativeButton.addEventListener('click', negative);

const decimalButton = document.querySelector('[data-calc-decimal]');
decimalButton.addEventListener('click', decimal);
