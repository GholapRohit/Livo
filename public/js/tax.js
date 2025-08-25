const taxToggle = document.getElementById("switchCheckDefault");
taxInfo = document.querySelectorAll(".tax-info");
taxToggle.addEventListener("change", () => {
  if (taxToggle.checked) {
    taxInfo.forEach((tax) => {
      const price = parseInt(tax.innerText.substring(1).replace(/,/g, ""));
      const taxAmount = price * 0.18; // Assuming 18% tax
      const totalPrice = price + taxAmount;
      tax.innerHTML = `&#8377;${totalPrice.toLocaleString("en-IN")}/night`;
    });
  } else {
    taxInfo.forEach((tax) => {
      const price = parseInt(tax.innerText.substring(1).replace(/,/g, ""));
      const withoutTax = price / 1.18;
      tax.innerHTML = `&#8377;${withoutTax.toLocaleString("en-IN")}/night`;
    });
  }
});
