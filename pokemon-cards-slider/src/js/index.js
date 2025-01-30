const BTN_AVANCAR = document.getElementById("btn-avancar");
const BTN_VOLTAR = document.getElementById("btn-voltar");
const CARTOES = document.querySelectorAll(".cartao");
let cartaoAtual = 0;

function esconderCartaoSelecionado() {
  const CARTAO_SELECIONADO = document.querySelector(".selecionado");
  CARTAO_SELECIONADO.classList.remove("selecionado");
}

function mostrarCartao(indiceCartao) {
  CARTOES[indiceCartao].classList.add("selecionado");
}

BTN_AVANCAR.addEventListener("click", function () {
  if (cartaoAtual === CARTOES.length - 1) return;

  esconderCartaoSelecionado();

  cartaoAtual++;
  mostrarCartao(cartaoAtual);
});

BTN_VOLTAR.addEventListener("click", function () {
  if (cartaoAtual === 0) return;

  esconderCartaoSelecionado();

  cartaoAtual--;
  mostrarCartao(cartaoAtual);
});
