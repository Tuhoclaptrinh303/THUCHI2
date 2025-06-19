let balance = 0;

function formatCurrency(number) {
  return Number(number).toLocaleString("vi-VN");
}

function addRow() {
  const date = document.getElementById("dateInput").value;
  const name = document.getElementById("nameInput").value;
  const type = document.getElementById("typeInput").value;
  const amount = parseFloat(document.getElementById("amountInput").value);
  const category = document.getElementById("categoryInput").value;

  if (!date || !type || isNaN(amount)) {
    alert("Vui lòng nhập đầy đủ thông tin.");
    return;
  }

  const table = document
    .getElementById("transactionTable")
    .getElementsByTagName("tbody")[0];
  const row = table.insertRow(-1);

  if (category === "Thu") {
    balance += amount;
  } else {
    balance -= amount;
  }

  row.innerHTML = `
      <td>${date}</td>
      <td>${name}</td>
      <td>${type}</td>
      <td class="currency">${formatCurrency(amount)}</td>
      <td>${category}</td>
      <td class="currency">${formatCurrency(balance)}</td>
      <td></td>
      <td><button onclick="deleteRow(this, ${
        category === "Thu" ? "-" : "+"
      }${amount})">Xóa</button></td>
    `;

  clearInputs(); // clear sau khi thêm
}

function clearInputs() {
  document.getElementById("dateInput").value = "";
  document.getElementById("nameInput").value = "Phượng";
  document.getElementById("typeInput").value = "";
  document.getElementById("amountInput").value = "";
  document.getElementById("categoryInput").value = "Thu";
}

function deleteRow(button, adjustAmount) {
  const row = button.parentNode.parentNode;
  row.remove();
  balance += adjustAmount;
  updateBalances();
}

function updateBalances() {
  const table = document.getElementById("transactionTable");
  const rows = table.rows;
  balance = 0;
  for (let i = 2; i < rows.length; i++) {
    const amount = parseFloat(
      rows[i].cells[3].innerText.replace(/\./g, "").replace(/,/g, "")
    );
    const category = rows[i].cells[4].innerText;
    balance += category === "Thu" ? amount : -amount;
    rows[i].cells[5].innerText = formatCurrency(balance);
  }
  document.getElementById("startingBalance").innerText = formatCurrency(0);
}
