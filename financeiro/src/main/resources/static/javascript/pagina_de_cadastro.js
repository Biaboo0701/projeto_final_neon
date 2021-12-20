/*MENSAGEM PREENCHIMENTO CAMPOS*/

var sessoesReq = document.querySelectorAll('requisito')

function validaFormulario() {
  let contador = 0
  for (var i = 0; i < sessoesReq.length; i++) {
    if (sessoesReq[i].value == '') {
      contador += 1
    }
  }
  if (
    contador == 0 &&
    validaEmail(document.getElementById('email').value) &&
    validaSenha(
      document.getElementById('senha1').value,
      document.getElementById('senha2').value
    )
  ) {
    let toastLive = document.getElementById('toast-confimacao')
    let toast = new bootstrap.Toast(toastLive)
    toast.show()
    limpaTodosCampos()
    document.getElementById('botaoContinuar').value = 'Continuar'
  } else {
    let toastLive = document.getElementById('toast-erro')
    let toast = new bootstrap.Toast(toastLive)
    toast.show()
  }
}

function validaEmail(email) {
  if (email.toString().includes('@') == true) {
    return true
  } else {
    return false
  }
}

function validaSenha(senha1, senha2) {
  if (senha1 == senha2) {
    return true
  } else {
    return false
  }
}

function mensagemSenha() {
  if (
    validaSenha(
      document.getElementById('senha1').value,
      document.getElementById('senha2').value
    ) == false
  ) {
    let toastLive = document.getElementById('toast-erro-senha')
    let toast = new bootstrap.Toast(toastLive)
    toast.show()
  }
}

var todosCampos = document.querySelectorAll('input')

function limpaTodosCampos() {
  for (var i = 0; i < todosCampos.length; i++) {
    todosCampos[i].value = ''
  }
}

/* CHAMADAS */

document.getElementById('senha2').addEventListener('focusout', mensagemSenha)
document
  .getElementById('botaoContinuar')
  .addEventListener('click', validaFormulario)

/*API VIACEP*/

const limparFormulario = endereco => {
  document.getElementById('rua').value = ''
  document.getElementById('bairro').value = ''
  document.getElementById('cidade').value = ''
  document.getElementById('estado').value = ''
}

const preencheFormulario = endereco => {
  document.getElementById('rua').value = endereco.logradouro
  document.getElementById('bairro').value = endereco.bairro
  document.getElementById('cidade').value = endereco.localidade
  document.getElementById('estado').value = endereco.uf
}

const cepValido = cep => cep.length == 8 && isNaN(cep) == false

const pesquisaCep = async () => {
  limparFormulario()
  const cep = document.getElementById('cep').value.replace('-', '')
  const url = `http://viacep.com.br/ws/${cep}/json/`
  // fetch(url).then(response => response.json()).then(console.log);

  if (cepValido(cep)) {
    const dados = await fetch(url)
    const endereco = await dados.json()
    if (endereco.hasOwnProperty('erro')) {
      let toastLive = document.getElementById('toast-erro-cep')
      let toast = new bootstrap.Toast(toastLive)
      toast.show()
    } else {
      preencheFormulario(endereco)
    }
  } else {
    let toastLive = document.getElementById('toast-erro-cep')
    let toast = new bootstrap.Toast(toastLive)
    toast.show()
  }
}

document.getElementById('cep').addEventListener('focusout', pesquisaCep)
