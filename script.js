let accounts = [];

document.getElementById("bankForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const accNo = document.getElementById("accNo").value.trim();

  if (!name || !accNo) return alert("Please fill all fields.");

  const age = parseInt(prompt("Enter your age:"));
  if (isNaN(age) || age < 18) return alert("You must be 18+ to create an account.");

  const init = parseFloat(prompt("Enter initial balance:"));
  if (isNaN(init) || init < 0) return alert("Invalid initial balance.");

  const account = {
    id: Date.now(), // Unique ID
    name,
    accNo,
    balance: init,
  };

  accounts.push(account);
  renderAccounts();
  e.target.reset(); // Clear the form
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

function updateBalance(acc) {
  const balEl = document.getElementById(`bal-${acc.id}`);
  if (balEl) balEl.textContent = acc.balance.toFixed(2);
}
