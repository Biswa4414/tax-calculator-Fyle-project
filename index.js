const errorIcons = document.querySelectorAll(".error-icon");

errorIcons.forEach((icon) => {
  icon.addEventListener("mouseover", function () {
    const tooltipText = this.getAttribute("data-tooltip");
    alert(tooltipText);
  });
});

const questionIcons = document.querySelectorAll(".question-icon");

questionIcons.forEach((icon) => {
  icon.addEventListener("mouseover", function () {
    const tooltipText = this.getAttribute("data-tooltip");
    alert(tooltipText);
  });
});

const taxForm = document.getElementById("taxForm");

taxForm.addEventListener("submit", function (event) {
  event.preventDefault();
  hideErrorIcons();

  const age = taxForm.age.value;
  const income = parseFloat(taxForm.income.value);
  const deductions = parseFloat(taxForm.deductions.value);

  if (!age) {
    showErrorIcon(taxForm.age);
    return;
  }

  if (isNaN(income)) {
    showErrorIcon(taxForm.income);
    return;
  }

  if (isNaN(deductions)) {
    showErrorIcon(taxForm.deductions);
    return;
  }

  const tax = calculateTax(income, deductions, age);
  const overallIncome = calculateOverallIncome(income, deductions);
  showModalResult(tax, overallIncome);
});

function calculateTax(income, deductions, age) {
  const taxableIncome = Math.max(income - deductions, 0);

  if (taxableIncome <= 800000) {
    return 0;
  }

  let taxRate;
  if (age === "<40") {
    taxRate = 0.3;
  } else if (age === "≥ 40 & < 60") {
    taxRate = 0.4;
  } else {
    taxRate = 0.1;
  }

  return (taxableIncome - 800000) * taxRate;
}

function calculateOverallIncome(income, deductions) {
  return income - deductions;
}

function showModalResult(tax, overallIncome) {
  const modal = document.getElementById("modal");
  const modalContent = modal.querySelector(".modal-content");
  modalContent.innerHTML = `
    <span class="close">&times;</span>
    <div id="result">
    <p>Overall Income after deductions: ${overallIncome.toFixed(2)} Lakhs</p>
      <p>Tax to be paid: ${tax.toFixed(2)} Lakhs</p>
    </div>
  `;
  modal.style.display = "block";
}

function showErrorIcon(element) {
  const icon = element.nextElementSibling;
  icon.style.display = "inline";
}

function hideErrorIcons() {
  errorIcons.forEach((icon) => {
    icon.style.display = "none";
  });
}

const modal = document.getElementById("modal");
const modalContent = document.querySelector(".modal-content");

modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

const closeButton = document.querySelector(".modal-content .close");
closeButton.addEventListener("click", function () {
  console.log("click");
  modal.style.display = "none";
});
