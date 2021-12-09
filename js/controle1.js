class Produto {
  constructor() {
    this.id = 1
    this.arrayProdutos = []
    this.editId = null
  }

  salvar() {
    let produto = this.lerDados()

    if (this.validaCampos(produto)) {
      if (this.editId == null) {
        this.adicionar(produto)
      } else {
        this.atualizar(this.editId, produto)
      }
    }

    this.listaTabela()
    this.cancelar()
  }

  listaTabela() {
    let tbody = document.getElementById('tbody')
    tbody.innerText = ''

    for (let i = 0; i < this.arrayProdutos.length; i++) {
      let tr = tbody.insertRow()

      let td_id = tr.insertCell()
      let td_produto = tr.insertCell()
      let td_valor = tr.insertCell()
      let td_data = tr.insertCell()
      let td_acoes = tr.insertCell()

      td_id.innerText = this.arrayProdutos[i].id
      td_produto.innerText = this.arrayProdutos[i].nomeProduto
      td_valor.innerText = this.arrayProdutos[i].preco
      td_data.innerText = this.arrayProdutos[i].data

      td_id.classList.add('center')

      let imgEdit = document.createElement('img')
      imgEdit.src = 'img/editar.png'
      imgEdit.setAttribute(
        'onclick',
        'produto.preparaEditacao(' + JSON.stringify(this.arrayProdutos[i]) + ')'
      )

      let imgDelete = document.createElement('img')
      imgDelete.src = 'img/delete.png'
      imgDelete.setAttribute(
        'onclick',
        'produto.deletar(' + this.arrayProdutos[i].id + ')'
      )

      td_acoes.appendChild(imgEdit)
      td_acoes.appendChild(imgDelete)

      console.log(this.arrayProdutos)
    }
  }

  adicionar(produto) {
    produto.preco = parseInt(produto.preco)
    this.arrayProdutos.push(produto)
    this.id++
  }

  atualizar(id, produto) {
    for (let i = 0; i < this.arrayProdutos.length; i++) {
      if (this.arrayProdutos[i].id == id) {
        this.arrayProdutos[i].nomeProduto = produto.nomeProduto
        this.arrayProdutos[i].preco = produto.preco
        this.arrayProdutos[i].data = produto.data
      }
    }
  }

  preparaEditacao(dados) {
    this.editId = dados.id

    document.getElementById('produto').value = dados.nomeProduto
    document.getElementById('preco').value = dados.preco
    document.getElementById('data').value = dados.data

    document.getElementById('btn1').innerText = 'Atualizar'
  }

  lerDados() {
    let produto = {}

    produto.id = this.id
    produto.nomeProduto = document.getElementById('produto').value
    produto.preco = document.getElementById('preco').value
    produto.data = document.getElementById('data').value

    return produto
  }

  validaCampos(produto) {
    let msg = ''

    if (produto.nomeProduto == '') {
      msg <= '- Informe o Nome do produto \n'
    }
    if (produto.preco == '') {
      msg <= '- Informe o Preço do produto \n'
    }
    if (produto.data == '') {
      msg <= '- Informe a data de lançamento \n'
    }

    if (msg != '') {
      alert(msg)
      return false
    }
    return true
  }
  cancelar() {
    document.getElementById('produto').value = ''
    document.getElementById('preco').value = ''
    document.getElementById('data').value = ''

    document.getElementById('btn1').value = 'Salvar'
    this.editId = null
  }

  deletar(id) {
    if (confirm('Deseja realmente deletar o produto do ID' + id)) {
      let tbody = document.getElementById('tbody')

      for (let i = 0; i < this.arrayProdutos.length; i++) {
        if (this.arrayProdutos[i].id == id) {
          this.arrayProdutos.splice(i, 1)
          tbody.deleteRow(i)
        }
      }
    }
    console.log(this.arrayProdutos)
  }
}

document.querySelector('form').addEventListener('submit', () => {
  produto.salvar()
})

var produto = new Produto()
