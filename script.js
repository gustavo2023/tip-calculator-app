const totalBillInput = document.getElementById("bill-input");
const numberOfPeopleInput = document.getElementById("people-input");
const errorMessage = document.querySelector(".error-message");
const tipAmountPerPerson = document.getElementById("tip-amount");
const totalAmountPerPerson = document.getElementById("total-amount");
const resetBtn = document.getElementById("reset-btn");
const tipRadios = document.querySelectorAll("input[name='tip']");
const customTipInput = document.getElementById("tip-custom");

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
