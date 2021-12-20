const cardTotal = document.querySelector(".card.total");

const healthyWallet = {
  green: "",
};

const negativeWallet = {
  green: "",
};

const isDarkMode = () => {
  switch (Storage.get("theme")) {
    case "light":
      healthyWallet.green = "#49aa26";
      negativeWallet.green = "#e92929";
      break;
    case "dark":
      healthyWallet.green = "#349a9e";
      negativeWallet.green = "#f46c3f";
      break;

    default:
      break;
  }
};

const isNegative = () => {
  isDarkMode();

  let colors = "";

  Transaction.total() < 0
    ? (colors = negativeWallet)
    : (colors = healthyWallet);

  Object.keys(colors).map((key) => {
    cardTotal.style.setProperty(transformKey(key), colors[key]);
  });
};