const display = document.querySelector('#display');
const equalBtn = document.getElementById('equal');
// ADD THIS: Select all buttons with numbers
const numberBtns = document.querySelectorAll('#numbers button');
// ADD THIS: Select specific operation buttons
const opBtns = document.querySelectorAll('#symbols button');
const clearBtn = document.getElementById('clear');

let inputString = '';
let firstNum;
let secondNum;
let op;
const displayInput = (inp) => {
  display.textContent = inp;
};

const calculator = () => {
  let val;
  if (op === '+') {
    val = firstNum + secondNum;
  } else if (op === '-') {
    val = firstNum - secondNum;
  } else if (op === '*') {
    val = firstNum * secondNum;
  } else {
    // Check for divide by zero
    if (secondNum === 0) {
      displayInput('Error');
      inputString = '';
      return;
    }
    val = firstNum / secondNum;
  }
  displayInput(val);
  // CRITICAL: Update inputString so if I press + again, it uses the result
  inputString = val;
};

numberBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    let val = e.target.innerText; // FIX: Use innerText, not value

    if (val === '=') {
      // Do nothing here, we will handle '=' separately
      return;
    }

    // Add the number to our string
    inputString += val;
    displayInput(inputString);
  });
});

opBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    // 1. Save the current number as the first number
    firstNum = Number(inputString);

    // 2. Save the operator (+, -, *, /)
    op = e.target.innerText;

    // 3. Clear the string so we can type the next number
    inputString = '';

    // Optional: Visual feedback (clears screen for next number)
    displayInput(op);
  });
});

equalBtn.addEventListener('click', () => {
  // 1. The inputString is now the SECOND number
  secondNum = Number(inputString);

  // 2. Run your calculator function
  calculator();

  // 3. Reset inputString to the result so we can keep doing math
  // (We do this inside your calculator function usually, or here)
});

clearBtn.addEventListener('click', () => {
  inputString = '';
  firstNum = null; // Assign null to reset it
  secondNum = null; // Assign null to reset it
  op = null; // Don't forget to clear the operator too!
  displayInput('0');
});
