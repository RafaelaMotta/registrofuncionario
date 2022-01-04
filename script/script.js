let funcionarios = null

function loadFuncionarios() {
  funcionarios = JSON.parse(localStorage.getItem('funcionarios') || '[]')
  console.log(funcionarios, localStorage.getItem('funcionarios'))
}

loadFuncionarios()

function loadGrid() {
  document.querySelector('#funcionarios').innerHTML = null
  document.querySelector('#cargofuncionario').innerHTML = null
  funcionarios.forEach((funcionario) => {
    AddListaFuncionario(funcionario)
  })
}
loadGrid()

function inserirFuncionarios() {
  if (document.getElementById('text1').value == '') {
    alert('Verifique se os campos foram preenchidos!')
  } else {
    let novoFuncionario = addFuncionario(
      document.getElementById('text1').value,
      document.getElementById('text2').value,
    )
    AddListaFuncionario(novoFuncionario)
    limparFormulario()
  }
  
  localStorage.setItem('funcionarios', JSON.stringify(funcionarios))
  loadGrid()
  limparFormulario()
}

function limparFormulario() {
  document.getElementById('text1').value = ''
  document.getElementById('text2').value = ''
  document.getElementById('removeNome').value = ''
  document.getElementById('removeCargo').value = ''
  document.getElementById('buscarNome').value = ''
  document.getElementById('buscarCargo').value = ''
  document.getElementById('alterarCargo').value = ''
  document.getElementById('alterarNome').value = ''
}

function AddListaFuncionario(funcionario) {
  let ul = document.querySelector('#funcionarios')
  let li = document.createElement('li')

  li.appendChild(document.createTextNode(`${funcionario.nome}`))
  ul.appendChild(li)

  let ul2 = document.querySelector('#cargofuncionario')
  let li2 = document.createElement('li')

  li2.appendChild(document.createTextNode(`${funcionario.cargo}`))
  ul2.appendChild(li2)
}

function removeFuncionario() {
  let nome = document.getElementById('removeNome').value
  let cargo = document.getElementById('removeCargo').value
  let cargoRemovido = removeList('cargo', cargo)
  let nomeRemovido = removeList('nome', nome)

  if (cargoRemovido || nomeRemovido) {
    localStorage.setItem('funcionarios', JSON.stringify(funcionarios))
    loadGrid()
    limparFormulario()
  }
}

function removeList(prop, value) {
  if (value) {
    // let temp = funcionarios.map(function(e) {
    //   console.log(e[prop]);
    //   return e[prop];
    // }).indexOf(value)

    let temp = funcionarios.splice(
      funcionarios
        .map((item) => {
          return item[prop]
        })
        .indexOf(value),
      1,
    )

    console.log(['temp', temp])
    //if(!temp) return
    console.log(['length', funcionarios])
    //funcionarios.splice(temp, 1)

    return temp

    let i = 0
    for (i; i < funcionarios.length; i++) {
      if (funcionarios[i][prop] == value) break
    }
    funcionarios.splice(i, 1)
  }
}

function addFuncionario(nome, cargo) {
  let temp = { nome, cargo }
  funcionarios.push(temp)
  localStorage.setItem('funcionarios', JSON.stringify(funcionarios))
  return temp
}

function buscarFuncionario(nome = '', cargo = '') {
  let funcionario = []
  funcionarios.forEach((item) => {
    if (item.nome == nome || item.cargo == cargo) {
      funcionario.push({
        nome: item.nome,
        cargo: item.cargo,
      })
    }
  })

  return funcionario
}

function obterFuncionarios() {
  let nome = document.querySelector('#buscarNome').value
  let cargo = document.querySelector('#buscarCargo').value
  if (!nome && !cargo) {
    alert('Verifique se os campos foram preenchidos!')
  } else {
    let nome = document.querySelector('#buscarNome').value
    let funcionario = buscarFuncionario(nome, cargo)

    if (funcionario == null) {
      alert('Não encontrado')
      limparFormulario()
      return
    }

    console.log(funcionario)
    let cargos = '', nomes = ''
    for (let i = 0; i < funcionario.length; i++) {
      nomes += funcionario[i].nome + "<br>";
      cargos += funcionario[i].cargo + "<br>";
      
    }

    document.querySelector('#alterarNome').innerHTML = funcionario
    document.getElementById('resultadoaqui').innerHTML = cargos
    document.getElementById('alterarfuncionario').innerHTML = nomes
  }

  limparFormulario()
}

let resultado = document.getElementById('alterar')
function alterarCargo(nome, cargoNovo) {
  funcionarios.forEach((item) => {
    if (item.nome == nome) item.cargo = cargoNovo
  })
}

function loadAllFuncionarios() {
  console.log(funcionarios)
}

function modificarCargo() {
  let nomeFuncionario = document.querySelector('#alterarNome').value
  let cargoNovo = document.querySelector('#alterarCargo').value
  console.log(nomeFuncionario)
  alterarCargo(nomeFuncionario, cargoNovo)
  loadGrid()

  document.getElementById('resultadoaqui').innerHTML = cargoNovo
  document.getElementById('alterarfuncionario').innerHTML = nomeFuncionario

  limparFormulario()
  //   let result = funcionarios.filter((entry) => {
  //     if(entry.nome === nomeFuncionario)
  //         return entry
  //     return null
  //   })
}