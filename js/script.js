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
    document.querySelector('#input-empresa').value = dados.nome
    document.querySelector('#input-cnpj').value = dados.CNPJ
    document.querySelector('#input-endereço').value = dados.Endereço
    document.querySelector('#input-cep').value = dados.CEP
    document.querySelector('#input-uf').value = dados.UF
    document.querySelector('#input-municipio').value = dados.Municipio
    document.querySelector('#input-tel').value = dados.Telefone
    document.querySelector('#input-email').value = dados.Email
    document.querySelector('#input-senha').value = dados.Senha
    document.querySelector('#input-confirmaSenha').value = dados.Senha


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

function definirMateriais(){

    let todosInputsRadio = document.querySelectorAll('input[type=radio]')
    let qtdInputsChecados = 0

    todosInputsRadio.forEach(input => {
        if(input.checked) qtdInputsChecados++
    })

    if(qtdInputsChecados === 0){
        alert('Insira algum tipo de material')
        return
    }
    
    let inputsChecados = document.querySelectorAll('input[type=radio]:checked') 
    let materiaisSlecionados = {}
    let qtdMaterialVazia = false

    inputsChecados.forEach(input => {
        let nameMaterial = input.value
        let inputQTD = document.querySelector(`input[name=${nameMaterial}]`)
        

        if(inputQTD.value.trim() == '') qtdMaterialVazia = true

        materiaisSlecionados[nameMaterial] = inputQTD.value
        
    })

    if(qtdMaterialVazia) {
        alert('Informe a quantidade dos materiais!')
        return
    }

    window.sessionStorage.setItem('materiais', JSON.stringify(materiaisSlecionados))
    location.assign("http://127.0.0.1:5500/pages/dadosCooperativa.html")
}

function buscarDadosCooperativa(){
    setTimeout(() => {
        firebase.firestore().collection('cooperativas').get()
         .then(list => {
               carregarNomeCooperativa(list)
             
         }).catch(err => {
             console.log(err)
         })
    }, 1000)
 }
 
 function carregarNomeCooperativa(listCooperativas){

    let selectCooperativas = document.querySelector('#id-select-cooperativa')
        listCooperativas.forEach(doc => {

        let option =  document.createElement('option')
        option.innerText = doc.data().Nome
        
        selectCooperativas.appendChild(option)
          
        })

        // console.log(selectCooperativas)
 }

 function selecionarCooperativa(event) {

    firebase.firestore().collection('cooperativas').doc(event.target.value).get()
         .then(doc => {
               carregarInputsCooperativa(doc.data())
         }).catch(err => {
             console.log(err)
         })
 }

 function carregarInputsCooperativa(doc){

    document.querySelector('#endereço').value = doc.Endereço
    document.querySelector('#cep').value = doc.CEP
    document.querySelector('#uf').value = doc.UF
    document.querySelector('#cidade').value = doc.Cidade
 }

 function novoAgendamento(){
    let endereço = document.querySelector('#endereço').value
    let cep = document.querySelector('#cep').value
    let uf = document.querySelector('#uf').value
    let cidade = document.querySelector('#cidade').value
    let data = document.querySelector('#data').value
    let nome = document.querySelector("#id-select-cooperativa").value
    let periodo = document.querySelector("#periodo").innerText

    if(endereço == '' || cep == '' || uf == '' || cidade == '' || data == '' || nome == ''){
        
        alert("Informe todos os dados necessários para o agendamento")
        return
    }

   let agendamento = {
       protocolo: gerarProtocolo(),
       status: 'aberto',
       data: data,
       periodo: periodo,
       cooperativa: {
            nome: nome,
            endereço: endereço,
            cep: cep,
            cidade: cidade,
            uf: uf
       },
       materiais: JSON.parse(window.sessionStorage.getItem('materiais'))
   }

   console.log(agendamento)

   dbFirestore.doc(firebase.auth().currentUser.uid).collection('agendamentos').add(agendamento)
   .then(() => {
       alert('Agendamento cadastrado com sucesso!')
       location.assign("http://127.0.0.1:5500/pages/dashboard.html");
   })
   .catch(erro => console.log(erro))
 }


 function gerarProtocolo(){

    return (Math.random() * (10000 - 1) + 1).toString().split('.').join('')
 }


 function buscarAgendamentos(){
    
    setTimeout(() => {
        dbFirestore.doc(firebase.auth().currentUser.uid).collection('agendamentos').get()
        .then(result => {
            result.forEach(doc =>{
                renderAgendamentos(doc.data())
            })
        }).catch(err => {
            console.log(err)
        })
    }, 1000)
 }

 function renderAgendamentos(agendamento){
     let agendamentosDIV = document.querySelector('.agendamentos')

     let agendamentoStatusDIV = document.createElement('div')
     agendamentoStatusDIV.classList.add('agendamento-status')

     let pProtocolo = document.createElement('p')
     pProtocolo.innerText = `Proto: ${agendamento.protocolo}`
     agendamentoStatusDIV.appendChild(pProtocolo)
     let pStatus = document.createElement('p')
     pStatus.innerText = `Status: ${agendamento.status}`
     agendamentoStatusDIV.appendChild(pStatus)
     let pData = document.createElement('p')
     pData.innerText = `Data: ${agendamento.data}`
     agendamentoStatusDIV.appendChild(pData)
     let pCoopetativa = document.createElement('P')
     pCoopetativa.innerText = `Cooperativa: ${agendamento.cooperativa.nome}`
     agendamentoStatusDIV.appendChild(pCoopetativa)
    
    agendamentosDIV.appendChild(agendamentoStatusDIV)
 }

