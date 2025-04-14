const totalBillInput = document.getElementById("bill-input");
const numberOfPeopleInput = document.getElementById("people-input");
const errorMessage = document.querySelector(".error-message");
const tipAmountPerPerson = document.getElementById("tip-amount");
const totalAmountPerPerson = document.getElementById("total-amount");
const resetBtn = document.getElementById("reset-btn");
const tipRadios = document.querySelectorAll("input[name='tip']");
const customTipInput = document.getElementById("tip-custom");

const initiateCalculator = () => {
  tipRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      customTipInput.value = ""; // Clear custom input when a radio button is selected
      calculateTip(); // Recalculate tip when a radio button is selected
    });
  });

  customTipInput.addEventListener("input", () => {
    tipRadios.forEach((radio) => {
      radio.checked = false; // Uncheck all radio buttons when custom input is used
    });
    calculateTip(); // Recalculate tip when custom input is used
  });

  totalBillInput.addEventListener("input", calculateTip);
  numberOfPeopleInput.addEventListener("input", calculateTip);
};

const calculateTip = () => {
  const bill = parseFloat(totalBillInput.value) || 0; // Default to 0 if input is empty
  const numberOfPeople = parseInt(numberOfPeopleInput.value) || 1; // Default to 1 if input is empty
  let tipPercentage = 0;

  // Get the selected tip percentage from radio buttons or custom input
  tipRadios.forEach((radio) => {
    if (radio.checked) {
      tipPercentage = parseFloat(radio.value);
    }
  });

  if (customTipInput.value) {
    tipPercentage = parseFloat(customTipInput.value) / 100;
  }

  // Validate inputs
  if (numberOfPeople <= 0) {
    errorMessage.style.display = "block";
    numberOfPeopleInput.classList.add("error");
    tipAmountPerPerson.textContent = "$0.00";
    totalAmountPerPerson.textContent = "$0.00";
    return; // Stop further calculations
  } else {
    errorMessage.style.display = "none";
    numberOfPeopleInput.classList.remove("error");
  }

  // Calculate tip and total amounts
  const tipAmount = (bill * tipPercentage) / numberOfPeople;
  const totalAmount = (bill + bill * tipPercentage) / numberOfPeople;

  tipAmountPerPerson.textContent = `$${tipAmount.toFixed(2)}`;
  totalAmountPerPerson.textContent = `$${totalAmount.toFixed(2)}`;
  resetBtn.disabled = false; // Enable reset button when inputs are valid
};

const resetCalculator = () => {
  totalBillInput.value = "";
  numberOfPeopleInput.value = "";
  customTipInput.value = "";
  tipRadios.forEach((radio) => {
    radio.checked = false;
  });
  tipAmountPerPerson.textContent = "$0.00";
  totalAmountPerPerson.textContent = "$0.00";
  errorMessage.style.display = "none";
  numberOfPeopleInput.classList.remove("error");
  resetBtn.disabled = true; // Disable reset button after reset
};

// Initialize the calculator
initiateCalculator();
resetBtn.addEventListener("click", resetCalculator);
