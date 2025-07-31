let accounts = [];

document.getElementById("bankForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const accNo = document.getElementById("accNo").value.trim();
  const age = parseInt(document.getElementById("age").value.trim());
  const init = parseFloat(document.getElementById("initBalance").value.trim());

  if (!name || !accNo || isNaN(age) || isNaN(init)) {
    return alert("Please fill all fields correctly.");
  }

  if (age < 18) return alert("You must be 18+ to create an account.");
  if (init < 0) return alert("Initial balance must be 0 or more.");

  const account = {
    id: Date.now(),
    name,
    accNo,
    balance: init,
  };

  accounts.push(account);
  renderAccounts();
  e.target.reset();
});

function renderAccounts() {
  const container = document.getElementById("cardContainer");
  container.innerHTML = "";

  accounts.forEach((acc) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${acc.name}</h3>
      <p><strong>Account No:</strong> ${acc.accNo}</p>
      <p><strong>Balance:</strong> ₹<span id="bal-${acc.id}">${acc.balance.toFixed(2)}</span></p>
      <button class="btn" onclick="deposit(${acc.id})">Deposit</button>
      <button class="btn" onclick="withdraw(${acc.id})">Withdraw</button>
      <button class="btn" onclick="deleteAccount(${acc.id})">Delete Account</button>
    `;
    container.appendChild(card);
  });
}

function deposit(id) {
  const amount = parseFloat(prompt("Enter amount to deposit:"));
  if (isNaN(amount) || amount < 0) return alert("Invalid amount.");

  const acc = accounts.find((a) => a.id === id);
  acc.balance += amount;
  updateBalance(acc);
}

function withdraw(id) {
  const amount = parseFloat(prompt("Enter amount to withdraw:"));
  if (isNaN(amount) || amount < 0) return alert("Invalid amount.");

  const acc = accounts.find((a) => a.id === id);
  if (amount > acc.balance) return alert("Insufficient balance!");

  acc.balance -= amount;
  updateBalance(acc);
}

function deleteAccount(id) {
  accounts = accounts.filter((a) => a.id !== id);
  renderAccounts();
}

function updateBalance(acc) {
  const balEl = document.getElementById(`bal-${acc.id}`);
  if (balEl) balEl.textContent = acc.balance.toFixed(2);
}
