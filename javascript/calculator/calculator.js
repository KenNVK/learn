class Calculator {
  constructor(previousOperandElement, currentOperandElement) {
    this.previousOperandElement = previousOperandElement;
    this.currentOperandElement = currentOperandElement;
    this.clear();
  }

  clear() {
    this.currentOperand = '0'
    this.previousOperand = ''
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    if (this.currentOperand === '') return this.currentOperand = '0';
  }

  append(number) {
    if (typeof this.currentOperand === 'number') return
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  roundNumber(number, decimals) {
    const newNumber = number.toFixed(parseInt(decimals));
    return parseFloat(newNumber);
  }

  compute() {
    let result;
    const previous = Number(this.previousOperand);
    const current = Number(this.currentOperand);
    if (isNaN(previous) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        result = this.roundNumber(previous + current, 12);
        break;
      case '-':
        result = this.roundNumber(previous - current, 12);
        break;
      case '✕':
        result = this.roundNumber(previous * current, 12);
        break;
      case '÷':
        if (current == 0) return
        result = this.roundNumber(previous / current, 12);
        break;
      default:
        return;
    }
    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = '';
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integers = parseFloat(stringNumber.split('.')[0]);
    const decimals = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integers)) {
      integerDisplay = '';
    } else {
      integerDisplay = integers.toLocaleString('fi-FI', { maximumFractionDigits: 0 });
    }
    
    if (decimals !== undefined) {
      return `${integerDisplay}.${decimals}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandElement.textContent = this.getDisplayNumber(this.currentOperand);
    if (this.operation !== undefined) {
      this.previousOperandElement.textContent = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else {
      this.previousOperandElement.textContent = '';
    }
  }
}

const numberButtons = document.querySelectorAll('.number-btn');
const operatorButtons = document.querySelectorAll('.operation-btn');
const deleteButton = document.querySelector('.delete-btn');
const clearButton = document.querySelector('.all-clear-btn');
const equalsButton = document.querySelector('.equals-btn');
const previousOperandElement = document.querySelector('.previous-operand');
const currentOperandElement = document.querySelector('.current-operand');

const calculator = new Calculator(previousOperandElement, currentOperandElement);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.append(button.textContent);
    calculator.updateDisplay();
  });
});

operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.textContent);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
});

clearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});