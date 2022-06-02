/* Entrada de Dados */
const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sFuncao = document.querySelector('#m-funcao')
const sSalario = document.querySelector('#m-salario')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id
     /* Funçôes do Sistema de Items */
function openModal(edit = false, index = 0) {
    modal.classList.add('active')

    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
            modal.classList.remove('active')
        }
    }

    if (edit) { //Sistema de edição 
        sNome.value = itens[index].nome
        sFuncao.value = itens[index].funcao
        sSalario.value = itens[index].salario
        id = index
    } else {
        sNome.value = ''
        sFuncao.value = ''
        sSalario.value = ''
    }
}

function editItem(index){ //Função de Adicionar os Items
    
    openModal(true, index)
}

function deleteItem(index) { //Função de Deletar os Items
    itens.splice(index, 1)
    setItensBD()
    loadItens()
}

function loadItens() { // Executado Assim que a tela for carregada
    itens = getItensBD()
    tbody.innerHTML = ''

  itens.forEach((item, index) => { //um For em cada dados, para ser criado em cada Linha
      insertItem(item, index)
  })

}

function insertItem(item, index) {
    let tr = document.createElement('tr')
  
    tr.innerHTML = `
      <td>${item.nome}</td>
      <td>${item.funcao}</td>
      <td>R$ ${item.salario}</td>
      <td class="acao">
        <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button> 
      </td>
      <td class="acao">
        <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
      </td>
    `
    tbody.appendChild(tr) // Cada items que for carregado 

  }
  /* Evento de Onclick Do bottom Salvar */
  btnSalvar.onclick = e => {
      if (sNome.value == '' || sFuncao.value == '' || sSalario.value == '') {
          return
      }

      e.preventDefault();

      if (id !== undefined) {
          itens[id].nome = sNome.value
          itens[id].funcao = sFuncao.value
          itens[id].salario = sSalario.value
      } else {
          itens.push({'nome': sNome.value, 'funcao': sFuncao.value, 'salario': sSalario.value})
      }

      setItensBD()

      modal.classList.remove('active')
      loadItens()
      id = undefined
  }

  
/* Saida de Dados */
  const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? [] //Pegar os Itens do banco, Atravez do getItens 'dbfunc'
  const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens)) //Função Senta os items Dentro do Banco

  loadItens()