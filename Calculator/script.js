// Select elements
const displayInputs = document.querySelectorAll('.ins');
const buttons = document.querySelectorAll('button');

let currentInput = ''; // To store the current input
let previousInput = ''; // To store the previous input
let operator = ''; // To store the selected operator

// Function to update the display
function updateDisplay() {
  displayInputs[0].value = previousInput + (operator ? ` ${operator}` : ''); // Show previous input with operator
  displayInputs[1].value = currentInput; // Show current input
}

// Function to handle button clicks
function handleButtonClick(event) {
  const value = event.target.innerText;

  if (!isNaN(value) || value === '.') {
    // If the button is a number or a decimal point
    currentInput += value;
  } else if (value === 'AC') {
    // Clear all inputs
    currentInput = '';
    previousInput = '';
    operator = '';
  } else if (value === 'DEL') {
    // Delete the last character from the current input
    currentInput = currentInput.slice(0, -1);
  } else if (value === '=') {
    // Perform calculation
    if (previousInput && currentInput && operator) {
      const result = calculate(Number(previousInput), Number(currentInput), operator);
      currentInput = result.toString();
      previousInput = '';
      operator = '';
    }
  } else {
    // Operator buttons
    if (currentInput) {
      if (previousInput) {
        previousInput = calculate(Number(previousInput), Number(currentInput), operator).toString();
      } else {
        previousInput = currentInput;
      }
      currentInput = '';
      operator = value; // Store the selected operator
    }
  }

  updateDisplay();
}

// Function to perform calculations
function calculate(num1, num2, operator) {
  switch (operator) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      return num2 !== 0 ? num1 / num2 : 'Error';
    case '%':
      return num1 % num2;
    default:
      return num2;
  }
}

// Attach event listeners to buttons
buttons.forEach(button => {
  button.addEventListener('click', handleButtonClick);
});

// Initialize the display
updateDisplay();
