const Filter = {
  toogle() {
    document.querySelector(".filter-overlay").classList.toggle("active");
  },
  isFilter: false,
};

const DateFilds = {
  initialDate: document.querySelector("#initial-date"),
  finalDate: document.querySelector("#final-date"),

  getValues() {
    return {
      initialDate: this.initialDate.value,
      finalDate: this.finalDate.value,
    };
  },

  validateFields() {
    const { initialDate, finalDate } = this.getValues();

    if (initialDate.trim() === "" || finalDate.trim() === "") {
      throw new Error("Por favor, preencha todos os campos");
    }

    if (initialDate > finalDate) {
      throw new Error("A primeira data não pode ser maior do que a ultima");
      alert("A data inical não pode ser maior do que a final");
    }
  },

  formatDate() {
    let { initialDate, finalDate } = this.getValues();

    initialDate = Utils.formatDate(initialDate);
    finalDate = Utils.formatDate(finalDate);

    return {
      initialDate,
      finalDate,
    };
  },

  clearFields() {
    this.initialDate.value = "";
    this.finalDate.value = "";
  },

  closeFilter() {
    Filter.toogle();
  },
};

const IconFilter = {
  tr: document.querySelector("#content-icons-filter"),

  addIconFilter() {
    this.tr.innerHTML = ` 
    <i
      id="filter_icon"
      class="fas fa-filter"
      onclick="Filter.toogle()"
    ></i>`;
  },

  addIconFilterRemove() {
    this.tr.innerHTML = `
      <img class="filter-remove" onClick="IconFilter.removeFilter()" src="./assets/filter_remove.svg" alt="Remove o filtro">
    `;
  },

  removeFilter() {
    Filter.isFilter = false;
    DateFilds.clearFields();
    App.reload();
  },
};

function convertDate(date) {
  const dateSplit = date.split("/");
  const newDate = new Date(
    parseInt(dateSplit[2], 10),
    parseInt(dateSplit[1], 10) - 1,
    parseInt(dateSplit[0], 10)
  );
  return newDate;
}

const filterTransactions = () => {
  Filter.isFilter = true;

  IconFilter.addIconFilterRemove();

  const transactions = Transaction.all;

  let transactionsFiltred = [];

  // Limpa todas transações da tela
  DOM.clearTransactions();

  let { initialDate, finalDate } = DateFilds.formatDate();

  initialDate = convertDate(initialDate);
  finalDate = convertDate(finalDate);

  const dateFiltred = transactions.filter((transaction) => {
    return (
      convertDate(transaction.date) >= initialDate &&
      convertDate(transaction.date) <= finalDate
    );
  });

  transactionsFiltred = dateFiltred;

  transactionsFiltred.forEach((transaction, index) => {
    DOM.addTransaction(transaction, index);
  });
};

const filtred = () => {
  try {
    DateFilds.validateFields();
    filterTransactions();
    DateFilds.closeFilter();
  } catch (error) {
    activeToastify("error", error.message);
    console.log(error.message);
  }
};
