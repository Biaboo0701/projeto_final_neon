const toggle = (type = false, msg) => {
  msgOfAlert(msg);

  const containerToastify = document.querySelector(".toastify");

  switch (type) {
    case "error":
      document.querySelector(".toastify").classList.add("active-toastify");
      containerToastify.style.backgroundColor = "orange";
      break;

    case "sucess":
      document.querySelector(".toastify").classList.add("active-toastify");
      containerToastify.style.backgroundColor = "green";
      break;

    case "edited":
      document.querySelector(".toastify").classList.add("active-toastify");
      containerToastify.style.backgroundColor = "#2E8B57";
      break;

    case false:
      containerToastify.style = "none";
      containerToastify.classList.remove("active-toastify");
      break;

    default:
      break;
  }
};

const msgOfAlert = (msg) => {
  document.querySelector("#toastify-msg").textContent = msg;
};

const activeToastify = (type, msg) => {
  toggle(type, msg);

  setTimeout(() => {
    toggle();
  }, 3000);
};