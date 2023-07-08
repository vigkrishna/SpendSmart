// Initialize an empty array to store expenses
let expenses = [];
let form_button = document.querySelector(".form_button");

form_button.addEventListener('click', event =>{
  addExpense();
})

// Get references to HTML elements
const expenseInput = document.getElementById('expense');
const amountInput = document.getElementById('amount');
const expenseList = document.getElementById('expenseList');
const totalSpending = document.getElementById('totalSpending');

// Function to add an expense
function addExpense() {
  // Get the expense and amount values
  const expense = expenseInput.value;
  const amount = parseFloat(amountInput.value);

  // Validate the expense and amount values
  if (expense === '' || isNaN(amount) || amount <= 0) {
    alert('Please enter a valid expense and amount.');
    return;
  }

  // Add the expense to the expenses array
  expenses.push({ expense, amount });

  // Clear the input fields
  expenseInput.value = '';
  amountInput.value = '';

  // Render the expenses list and total spending
  renderExpenses();
  renderTotalSpending();
}

// Function to render the expenses list
function renderExpenses() {
  // Clear the current list of expenses
  expenseList.innerHTML = '';

  // Loop through the expenses array and add each expense to the list
  expenses.forEach((expense, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${expense.expense}</span>
      <span>Rs.${expense.amount.toFixed(2)}</span>
      <button type="button"  onclick="deleteExpense(${index})">Delete</button>
    `;

    expenseList.appendChild(li);
    console.log(li);
  });
}

// Function to delete an expense
function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
  renderTotalSpending();
}

// Function to calculate the total spending
function calculateTotalSpending() {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
}

// Function to render the total spending
function renderTotalSpending() {
  const total = calculateTotalSpending();
  totalSpending.innerHTML = `
    <strong>Total Spending:</strong> Rs.${total.toFixed(2)}
  `;
}
