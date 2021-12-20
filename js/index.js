const Modal = {
  get toogle() {
    document.querySelector(".modal-overlay").classList.toggle("active");
    Form.clearFields();
  },
};

const Storage = {
  get(item) {
    return JSON.parse(localStorage.getItem(`dev.finance:${item}`)) || [];
  },

  set(transaction) {
    localStorage.setItem(
      "dev.finance:transactions",
      JSON.stringify(transaction)
    );
  },
};

const Transaction = {
  all: Storage.get("transactions"),

  //

  indexOfTransaction: 0,
  editTransaction: false,

  add(transaction, index) {
    if (this.editTransaction) {
      this.all[index] = transaction;
      activeToastify("edited", "Editado com sucesso");
    } else {
      this.all.push(transaction);
      activeToastify("sucess", "Salvo com sucesso");
    }

    this.editTransaction = false;

    App.reload();
  },

  remove(index) {
    this.all.splice(index, 1);
    App.reload();
  },

  edit(index) {
    Modal.toogle;
    this.editTransaction = true;

    const { description, amount, date } = this.all[index];

    Form.description.value = description;
    Form.amount.value = Number(amount) / 100;
    Form.date.value = date.split("/").reverse().join("-");
  },

  income() {
    let income = 0;

    this.all.forEach(({ amount }) => {
      if (amount > 0) {
        income += amount;
      }
    });

    return income;
  },

  expenses() {
    let expense = 0;

    this.all.forEach(({ amount }) => {
      if (amount < 0) {
        expense += amount;
      }
    });

    return expense;
  },

  total() {
    return this.income() + this.expenses();
  },
};

const DOM = {
  transactionContainer: document.querySelector("#data-table tbody"),

  addTransaction(transaction, index) {
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index);
    tr.dataset.index = index;

    DOM.transactionContainer.appendChild(tr);
  },

  innerHTMLTransaction(transaction, index) {
    const CSSclass = transaction.amount > 0 ? "income" : "expense";
    const amount = Utils.formatCurrency(transaction.amount);

    const html = `
            <td class="description edit" onclick="Transaction.edit(${index});
              Transaction.indexOfTransaction = ${index}" >${transaction.description}
             </td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td><img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação"></td>
    `;
    return html;
  },

  updateBalance() {
    document.querySelector("#incomeDisplay").innerHTML = Utils.formatCurrency(
      Transaction.income()
    );

    document.querySelector("#expenseDisplay").innerHTML = Utils.formatCurrency(
      Transaction.expenses()
    );

    document.querySelector("#totalDisplay").innerHTML = Utils.formatCurrency(
      Transaction.total()
    );
  },

  clearTransactions() {
    this.transactionContainer.innerHTML = "";
  },
};

const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : "";

    value = String(value).replace(/\D/g, "");

    value = Number(value) / 100;

    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return `${signal}${value}`;
  },

  formatAmount(value) {
    value = Number(value) * 100;

    return Math.round(value);
  },

  formatDate(date) {
    return date.split("-").reverse().join("/");
  },
};

const Form = {
  description: document.querySelector("input#description"),
  amount: document.querySelector("input#amount"),
  date: document.querySelector("input#date"),

  getValues() {
    return {
      description: this.description.value,
      amount: this.amount.value,
      date: this.date.value,
    };
  },

  validateFields() {
    const { description, amount, date } = this.getValues();

    if (
      description.trim() === "" ||
      amount.trim() === "" ||
      date.trim() === ""
    ) {
      throw new Error();
    }
  },

  formatData() {
    let { description, amount, date } = this.getValues();

    amount = Utils.formatAmount(amount);
    date = Utils.formatDate(date);

    return {
      description,
      amount,
      date,
    };
  },

  saveTransaction(transaction) {
    Transaction.add(transaction, Transaction.indexOfTransaction);
  },

  clearFields() {
    this.description.value = "";
    this.amount.value = "";
    this.date.value = "";
  },

  closeModal() {
    Modal.toogle;
  },

  submit(event) {
    event.preventDefault();

    try {
      this.validateFields();

      const transaction = this.formatData();

      this.saveTransaction(transaction);
      this.closeModal();
    } catch (error) {
      activeToastify("error", "Por favor, preencha todos os campos");
    }
  },
};

const App = {
  init() {
    IconFilter.addIconFilter();

    Filter.isFilter
      ? filterTransactions()
      : Transaction.all.forEach((transaction, index) => {
          DOM.addTransaction(transaction, index);
        });

    DOM.updateBalance();

    Storage.set(Transaction.all);

    loadTheme(Storage.get("theme"));

    // Coloca a cor de acordo com a saude da carteira
    isNegative();
  },

  reload() {
    DOM.clearTransactions();
    this.init();
  },
};

App.init();