// DOM Elements
const totalBillInput = document.getElementById("bill-input");
const numberOfPeopleInput = document.getElementById("people-input");
const errorMessage = document.querySelector(".error-message");
const tipAmountPerPerson = document.getElementById("tip-amount");
const totalAmountPerPerson = document.getElementById("total-amount");
const resetBtn = document.getElementById("reset-btn");
const tipRadios = document.querySelectorAll("input[name='tip']");
const customTipInput = document.getElementById("tip-custom");

// Event Listeners
const addEventListeners = () => {
  tipRadios.forEach((radio) => {
    radio.addEventListener("change", handleTipRadioChange);
  });

  customTipInput.addEventListener("input", handleCustomTipInput);
  totalBillInput.addEventListener("input", calculateTip);
  numberOfPeopleInput.addEventListener("input", calculateTip);
  resetBtn.addEventListener("click", resetCalculator);
};

// Handlers
const handleTipRadioChange = (event) => {
  if (event.target.checked) {
    customTipInput.value = ""; // Clear custom input
    calculateTip();
  }
};

const handleCustomTipInput = () => {
  tipRadios.forEach((radio) => (radio.checked = false)); // Uncheck all radios
  calculateTip();
};

// Utility Functions
const getTipPercentage = () => {
  let tipPercentage = 0;

  tipRadios.forEach((radio) => {
    if (radio.checked) {
      tipPercentage = parseFloat(radio.value);
    }
  });

  if (customTipInput.value) {
    tipPercentage = parseFloat(customTipInput.value) / 100;
  }

  return tipPercentage;
};

const validateInputs = (numberOfPeopleValue) => {
  if (numberOfPeopleValue === "0") {
    errorMessage.style.display = "block";
    numberOfPeopleInput.classList.add("error");
    numberOfPeopleInput.blur();
    updateDisplay("$0.00", "$0.00");
    return false;
  }

  errorMessage.style.display = "none";
  numberOfPeopleInput.classList.remove("error");
  return true;
};

const updateDisplay = (tipAmount, totalAmount) => {
  tipAmountPerPerson.textContent = tipAmount;
  totalAmountPerPerson.textContent = totalAmount;
};

// Main Functions
const calculateTip = () => {
  const bill = parseFloat(totalBillInput.value) || 0;
  const numberOfPeopleValue = numberOfPeopleInput.value.trim();
  const numberOfPeople = parseInt(numberOfPeopleValue, 10);
  const tipPercentage = getTipPercentage();

  if (!validateInputs(numberOfPeopleValue) || !numberOfPeopleValue) {
    updateDisplay("$0.00", "$0.00");
    return;
  }

  const tipAmount = (bill * tipPercentage) / numberOfPeople;
  const totalAmount = (bill + bill * tipPercentage) / numberOfPeople;

  updateDisplay(`$${tipAmount.toFixed(2)}`, `$${totalAmount.toFixed(2)}`);
  resetBtn.disabled = false;
};

const resetCalculator = () => {
  totalBillInput.value = "";
  numberOfPeopleInput.value = "";
  customTipInput.value = "";
  tipRadios.forEach((radio) => (radio.checked = false));
  updateDisplay("$0.00", "$0.00");
  errorMessage.style.display = "none";
  numberOfPeopleInput.classList.remove("error");
  resetBtn.disabled = true;
};

// Initialize
const initiateCalculator = () => {
  addEventListeners();
  resetCalculator();
};

initiateCalculator();
