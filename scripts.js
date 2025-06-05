// Seleciona os elementos do formulário.
const form = document.querySelector("form")
const inputNumbers = document.querySelectorAll(".input-numbers")
const amountInput = document.getElementById("amount")
const fromInput = document.getElementById("from")
const toInput = document.getElementById("to")
const fields = document.getElementsByClassName("fields")
const optionButton = document.getElementsByClassName("option")
const submitButton = document.getElementsByClassName("submit-button")
const returnButton = document.getElementsByClassName("return-button")

// Seleciona título do formulário.
const resultTitle = document.getElementsByClassName("raffle-result")[0]
const raffleTitle = document.getElementsByClassName("raffle")[0]

// Cria a div que vai comportar os resultados
const resultsDiv = document.querySelector(".results")

let lista = []

// Aplica o tratamento para todos inputs aceitarem apenas números válidos e respeitar o max
inputNumbers.forEach(input => {
  input.addEventListener("input", () => {
    let value = input.value.replace(/\D/g, "");
    const max = input.max ? parseInt(input.max) : null;

    if (max && parseInt(value) > max) {
      value = max;
    }

    input.value = value;
  });
});

// Atualiza dinamicamente o valor máximo permitido para "amount"
fromInput.addEventListener("input", updateMaxAmount);
toInput.addEventListener("input", updateMaxAmount);

function updateMaxAmount() {
  const from = parseInt(fromInput.value);
  const to = parseInt(toInput.value);

  if (!isNaN(from) && !isNaN(to) && to > from) {
    const range = to - from + 1;
    amountInput.max = range;
  }
}

// Captura o evento de submit do formulário para obter os valores.
form.onsubmit = (event) => {
  event.preventDefault();

  const amount = parseInt(amountInput.value);
  const from = parseInt(fromInput.value);
  const to = parseInt(toInput.value);

  if (!validarCampos(amount, from, to)) return;

  lista = sortearNumeros(amount, from, to);

  showResults();
  changeTitle();
}

function validarCampos(amount, from, to) {
  if (isNaN(amount) || isNaN(from) || isNaN(to)) {
    alert("Preencha todos os campos corretamente.");
    return false;
  }

  if (from >= to) {
    alert("O valor inicial deve ser menor que o final.");
    return false;
  }

  const rangeSize = to - from + 1;
  if (amount > rangeSize) {
    alert(`Não é possível sortear ${amount} números únicos entre ${from} e ${to}.`);
    return false;
  }

  return true;
}

function sortearNumeros(amount, from, to) {
  const numerosSorteados = new Set();

  while (numerosSorteados.size < amount) {
    const numero = Math.floor(Math.random() * (to - from + 1)) + from;
    numerosSorteados.add(numero);
  }

  return Array.from(numerosSorteados).sort((a, b) => a - b);
}

// Coloca e tira display none nas tags.
function changeTitle() {
  const displayRaffleTitle = window.getComputedStyle(raffleTitle).display;

  if (displayRaffleTitle === "none") {
    raffleTitle.style.display = "block";
    resultTitle.style.display = "none";

    fields[0].style.display = "flex";
    optionButton[0].style.display = "block";
    submitButton[0].style.display = "flex";
    returnButton[0].style.display = "none";

    resultsDiv.style.display = "none";

    formClear();
  } else {
    raffleTitle.style.display = "none";
    resultTitle.style.display = "flex";

    fields[0].style.display = "none";
    optionButton[0].style.display = "none";
    submitButton[0].style.display = "none";
    returnButton[0].style.display = "flex";

    resultsDiv.style.display = "flex";
  }
}

function showResults() {
  resultsDiv.innerHTML = "";

  lista.forEach(numero => {
    const span = document.createElement("span");
    span.textContent = numero;
    resultsDiv.appendChild(span);
  });

  resultsDiv.style.display = "flex";
}

function formClear(){
  amountInput.value = "";
  fromInput.value = "";
  toInput.value = "";

  amountInput.max = 5;
  amountInput.focus();
}

amountInput.addEventListener("input", () => {
  const max = parseInt(amountInput.max);
  if (parseInt(amountInput.value) > max) {
    amountInput.value = max;
  }
});

returnButton[0].addEventListener("click", () => {
  changeTitle();
});
