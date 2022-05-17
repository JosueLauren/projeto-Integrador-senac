// Referência ao Cloud Firestore
var dbFirestore = firebase.firestore().collection('empresas')


// Função para cadastrar uma nova empresa
function cadastrarEmpresas(){
    
    let inputEmpresa = document.querySelector('#input-empresa')
    let inputCnpj = document.querySelector('#input-cnpj')
    let inputEndereço = document.querySelector('#input-endereço')
    let inputCep= document.querySelector('#input-cep')
    let inputUf = document.querySelector('#input-uf')
    let inputMunicipio = document.querySelector('#input-municipio')
    let inputTelefone = document.querySelector('#input-tel')
    let inputEmail = document.querySelector('#input-email')
    let inputSenha = document.querySelector('#input-senha')
    let inputConfirmSenha = document.querySelector('#input-confirmaSenha')

    if(inputEmpresa.value.trim() == ''){
        alert('Campo Empresa obrigatório')
        inputEmpresa.focus()
        return
    }

    if(inputEndereço.value.trim() == ''){
        alert('Campo Endereço obrigatório')
        inputEndereço.focus()
        return
    }

    if(inputUf.value.trim() == ''){
        alert('Campo Uf obrigatório')
        inputUf.focus()
        return
    }

    if(inputMunicipio.value.trim() == ''){
        alert('Campo Municipio obrigatório')
        inputMunicipio.focus()
        return
    }

    if(inputEmail.value.trim() == ''){
        alert('Campo Email obrigatório')
        inputEmail.focus()
        return
    }

    if(inputCnpj.value.trim() == ''){
        alert('Campo Cnpj obrigatório')
        inputCnpj.focus()
        return
    }

    if(inputCep.value.trim() == ''){
        alert('Campo CEP obrigatório')
        inputCep.focus()
        return 
    }

    if(inputTelefone.value.trim() == ''){
        alert('Campo Telefone obrigatório')
        inputTelefone.focus()
        return
    }

    if(inputSenha.value.trim() == ''){
        alert('Campo Senha obrigatório')
        inputSenha.focus()
        return
    }

    if(inputConfirmSenha.value.trim() == ''){
        alert('Campo Confirmar senha obrigatório')
        inputConfirmSenha.focus()
        return
    }

    if(inputSenha.value !== inputConfirmSenha.value ) {
        alert('As senhas precisam serem iguais')
        inputConfirmSenha.focus()
        return 
    }

    let DadosEmpresa = {
        nome: inputEmpresa.value,
        CNPJ: inputCnpj.value,
        Endereço: inputEndereço.value,
        CEP: inputCep.value,
        UF: inputUf.value,
        Municipio: inputMunicipio.value,
        Telefone: inputTelefone.value,
        Email: inputEmail.value,
        Senha: inputSenha.value
    }

    firebase.auth().createUserWithEmailAndPassword(DadosEmpresa.Email, DadosEmpresa.Senha)
            .then(() =>{
                    dbFirestore.doc(firebase.auth().currentUser.uid).set(DadosEmpresa)
                    .then(() => {
                        alert('Cadastrado com sucesso!')
                        location.assign("http://127.0.0.1:5500/pages/dashboard.html");
                    })
                    .catch(erro => console.log(erro))
                    
                })
            .catch(err => alert('Erro ao cadastrar ' + err))

   
}


// Função logar e authenticar a Empresa
function authEmpresa(){
    let inputEmail = document.querySelector('#input-auth-email')
    let inputSenha = document.querySelector('#input-auth-senha')

    if(inputEmail.value.trim() == '' || inputSenha.value.trim() == ''){
        alert('Digite seu email e sua senha!')
        return
    }

    firebase.auth().signInWithEmailAndPassword(inputEmail.value, inputSenha.value)
        .then(result => {
            alert('Logado com sucesso')
            location.assign("http://127.0.0.1:5500/pages/dashboard.html");
        })
        .catch(error => alert('Login não autorizado') )
}


// Função de deslogar Empresa
function signout(){
  firebase.auth().signOut()
        .then(() => {
            location.assign("http://127.0.0.1:5500/pages/login.html");
        })
        .catch(function (error) {
        console.log('Falha ao sair da conta: ', error)
     })
}


// Função que centraliza e trata a autenticação
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log('logado')
    } else {
      console.log('deslogado')
    }
  })



function buscarDadosEmpresa(){
   setTimeout(() => {
        dbFirestore.doc(firebase.auth().currentUser.uid).get()
        .then(doc => {
            if(doc.exists) {
                carregarInputs(doc.data())
            }
        }).catch(err => {
            console.log(err)
        })
   }, 1000)
}

function carregarInputs(dados){
    let inputEmpresa = document.querySelector('#input-empresa').value = dados.nome
    let inputCnpj = document.querySelector('#input-cnpj').value = dados.CNPJ
    let inputEndereço = document.querySelector('#input-endereço').value = dados.Endereço
    let inputCep= document.querySelector('#input-cep').value = dados.CEP
    let inputUf = document.querySelector('#input-uf').value = dados.UF
    let inputMunicipio = document.querySelector('#input-municipio').value = dados.Municipio
    let inputTelefone = document.querySelector('#input-tel').value = dados.Telefone
    let inputEmail = document.querySelector('#input-email').value = dados.Email
    let inputSenha = document.querySelector('#input-senha').value = dados.Senha
    let inputConfirmSenha = document.querySelector('#input-confirmaSenha').value = dados.Senha


    console.log(dados)
}

function atualizardadosEmpresa(){
    let inputEmpresa = document.querySelector('#input-empresa')
    let inputCnpj = document.querySelector('#input-cnpj')
    let inputEndereço = document.querySelector('#input-endereço')
    let inputCep= document.querySelector('#input-cep')
    let inputUf = document.querySelector('#input-uf')
    let inputMunicipio = document.querySelector('#input-municipio')
    let inputTelefone = document.querySelector('#input-tel')
    let inputEmail = document.querySelector('#input-email')
    let inputSenha = document.querySelector('#input-senha')
    let inputConfirmSenha = document.querySelector('#input-confirmaSenha')

    if(inputEmpresa.value.trim() == ''){
        alert('Campo Empresa obrigatório')
        inputEmpresa.focus()
        return
    }

    if(inputEndereço.value.trim() == ''){
        alert('Campo Endereço obrigatório')
        inputEndereço.focus()
        return
    }

    if(inputUf.value.trim() == ''){
        alert('Campo Uf obrigatório')
        inputUf.focus()
        return
    }

    if(inputMunicipio.value.trim() == ''){
        alert('Campo Municipio obrigatório')
        inputMunicipio.focus()
        return
    }

    if(inputEmail.value.trim() == ''){
        alert('Campo Email obrigatório')
        inputEmail.focus()
        return
    }

    if(inputCnpj.value.trim() == ''){
        alert('Campo Cnpj obrigatório')
        inputCnpj.focus()
        return
    }

    if(inputCep.value.trim() == ''){
        alert('Campo CEP obrigatório')
        inputCep.focus()
        return 
    }

    if(inputTelefone.value.trim() == ''){
        alert('Campo Telefone obrigatório')
        inputTelefone.focus()
        return
    }

    if(inputSenha.value.trim() == ''){
        alert('Campo Senha obrigatório')
        inputSenha.focus()
        return
    }

    if(inputConfirmSenha.value.trim() == ''){
        alert('Campo Confirmar senha obrigatório')
        inputConfirmSenha.focus()
        return
    }

    if(inputSenha.value !== inputConfirmSenha.value ) {
        alert('As senhas precisam serem iguais')
        inputConfirmSenha.focus()
        return 
    }

    let DadosEmpresa = {
        nome: inputEmpresa.value,
        CNPJ: inputCnpj.value,
        Endereço: inputEndereço.value,
        CEP: inputCep.value,
        UF: inputUf.value,
        Municipio: inputMunicipio.value,
        Telefone: inputTelefone.value,
        Email: inputEmail.value,
        Senha: inputSenha.value
    }

    dbFirestore.doc(firebase.auth().currentUser.uid).set(DadosEmpresa)
    .then(() => {
        alert('Atualizado com sucesso!')
        location.assign("http://127.0.0.1:5500/pages/dashboard.html");
    })
    .catch(erro => console.log(erro))

}

