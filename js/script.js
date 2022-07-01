// Referência ao Cloud Firestore
var dbFirestore = firebase.firestore().collection('empresas')


function setarURL(){
    let tamanhoTotalUrl =  window.location.href.length
    let tamanhoCaminho = window.location.pathname.length
    let inicioCaminho = tamanhoTotalUrl - tamanhoCaminho

    let urlSemCaminho =  window.location.href.substring(0, inicioCaminho)

    return urlSemCaminho
}


const modal = document.querySelector('.modal')
const imgModal = document.querySelector('.img-modal')
const paragrafoModal = document.querySelector('.p-modal')
const btnModal = document.querySelector('.btn-modal')
const backModal = document.querySelector('.back-modal')


function modalSucesso(text, cb){
  imgModal.src = './../images/ok.png'
  paragrafoModal.innerText = text
  paragrafoModal.style.color = '#47BC4C'
  btnModal.style.backgroundColor = '#47BC4C'
  modal.style.display = 'flex'
  backModal.style.display = 'block'
  document.body.style.overflow = 'hidden'
  btnModal.onclick = cb
}

function modalError(text, cb){
   imgModal.src = './../images/x-circle.png'
   paragrafoModal.innerText = text
   paragrafoModal.style.color = 'red'
   btnModal.style.backgroundColor = 'red'
   backModal.style.display = 'block'
   modal.style.display = 'flex'
   document.body.style.overflow = 'hidden'
   btnModal.onclick = cb 
}

function modalWarning(text, cb){
    imgModal.src = './../images/alert-circle.png'
    paragrafoModal.innerText = text
    paragrafoModal.style.color = '#F7D401'
    btnModal.style.backgroundColor = '#F7D401'
    backModal.style.display = 'block'
    modal.style.display = 'flex'
    document.body.style.overflow = 'hidden'
    btnModal.onclick = cb
}


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
        modalWarning('Campo Empresa obrigatório', ()=> {
            fecharModal()
        })
        inputEmpresa.focus()
        return
    }

    if(inputEndereço.value.trim() == ''){
        modalWarning('Campo Endereço obrigatório', ()=> {
            fecharModal()
        })
        inputEndereço.focus()
        return
    }

    if(inputUf.value.trim() == ''){
        modalWarning('Campo Uf obrigatório', ()=> {
            fecharModal()
        })
        inputUf.focus()
        return
    }

    if(inputMunicipio.value.trim() == ''){
        modalWarning('Campo Municipio obrigatório', ()=> {
            fecharModal()
        })
        inputMunicipio.focus()
        return
    }

    if(inputEmail.value.trim() == ''){
        modalWarning('Campo Email obrigatório', ()=> {
            fecharModal()
        })
        inputEmail.focus()
        return
    }

    if(inputCnpj.value.trim() == ''){
        modalWarning('Campo Cnpj obrigatório', ()=> {
            fecharModal()
        })
        inputCnpj.focus()
        return
    }

    if(inputCep.value.trim() == ''){
        modalWarning('Campo CEP obrigatório', ()=> {
            fecharModal()
        })
        inputCep.focus()
        return 
    }

    if(inputTelefone.value.trim() == ''){
        modalWarning('Campo Telefone obrigatório', ()=> {
            fecharModal()
        })
        inputTelefone.focus()
        return
    }

    if(inputSenha.value.trim() == ''){
        modalWarning('Campo Senha obrigatório', ()=> {
            fecharModal()
        })
        inputSenha.focus()
        return
    }

    if(inputConfirmSenha.value.trim() == ''){
        modalWarning('Campo Confirmar senha obrigatório', ()=> {
            fecharModal()
        })
        inputConfirmSenha.focus()
        return
    }

    if(inputSenha.value !== inputConfirmSenha.value ) {
        modalWarning('As senhas precisam serem iguais', () => {
            fecharModal()
        })
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
                        modalSucesso('Cadastrado com sucesso!', () => {
                            location.assign(`${setarURL()}/pages/dashboard.html`)
                        })
                    })
                    .catch(erro => console.log(erro))
                    
                })
            .catch(err => modalError('Erro ao cadastrar ' + err, () => {
                fecharModal()
            }))

   
}


// Função logar e authenticar a Empresa
function authEmpresa(){
    let inputEmail = document.querySelector('#input-auth-email')
    let inputSenha = document.querySelector('#input-auth-senha')

    if(inputEmail.value.trim() == '' || inputSenha.value.trim() == ''){
        modalWarning('Digite seu email e sua senha!', () => {
            fecharModal()
        })
        return
    }

    firebase.auth().signInWithEmailAndPassword(inputEmail.value, inputSenha.value)
        .then(result => {
            modalSucesso('Logado com Sucesso!',() => {
                location.assign(`${setarURL()}/pages/dashboard.html`)
            })
           
        })
        .catch((error) => modalError('Login não autorizado', () => {
            fecharModal()
        }))
}



// Função de deslogar Empresa
function signout(){
  firebase.auth().signOut()
        .then(() => {
            location.assign(`${setarURL()}/pages/login.html`);
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
        modalWarning('Campo Empresa obrigatório', () => {
            fecharModal()
        })
        inputEmpresa.focus()
        return
    }

    if(inputEndereço.value.trim() == ''){
        modalWarning('Campo Endereço obrigatório', () => {
            fecharModal()
        })
        inputEndereço.focus()
        return
    }

    if(inputUf.value.trim() == ''){
        modalWarning('Campo Uf obrigatório', () => {
            fecharModal()
        })
        inputUf.focus()
        return
    }

    if(inputMunicipio.value.trim() == ''){
        modalWarning('Campo Municipio obrigatório', () => {
            fecharModal()
        })
        inputMunicipio.focus()
        return
    }

    if(inputEmail.value.trim() == ''){
        modalWarning('Campo Email obrigatório', () => {
            fecharModal()
        })
        inputEmail.focus()
        return
    }

    if(inputCnpj.value.trim() == ''){
        modalWarning('Campo Cnpj obrigatório', () => {
            fecharModal()
        })
        inputCnpj.focus()
        return
    }

    if(inputCep.value.trim() == ''){
        modalWarning('Campo CEP obrigatório', () => {
            fecharModal()
        })
        inputCep.focus()
        return 
    }

    if(inputTelefone.value.trim() == ''){
        modalWarning('Campo Telefone obrigatório', () => {
            fecharModal()
        })
        inputTelefone.focus()
        return
    }

    if(inputSenha.value.trim() == ''){
        modalWarning('Campo Senha obrigatório', () => {
            fecharModal()
        })
        inputSenha.focus()
        return
    }

    if(inputConfirmSenha.value.trim() == ''){
        modalWarning('Campo Confirmar senha obrigatório', () => {
            fecharModal()
        })
        inputConfirmSenha.focus()
        return
    }

    if(inputSenha.value !== inputConfirmSenha.value ) {
        modalWarning('As senhas precisam serem iguais', () => {
            fecharModal()
        })
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
       const user = firebase.auth().currentUser
       user.updatePassword(inputSenha.value)
            .then(() => {
                modalSucesso('Atualizado com sucesso!', () => {
                    location.assign(`${setarURL()}/pages/dashboard.html`);
                })
                
            }).catch(error => {
                console.log(error)
            })
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
        modalWarning('Insira algum tipo de material', () => {
            fecharModal()
        })
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
        modalWarning('Informe a quantidade dos materiais!', () => {
            fecharModal()
        })
        return
    }

    window.sessionStorage.setItem('materiais', JSON.stringify(materiaisSlecionados))
    location.assign(`${setarURL()}/pages/dadosCooperativa.html`)
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
        option.setAttribute('data-id', doc.id)
        selectCooperativas.appendChild(option)
    })

        // console.log(selectCooperativas)
 }

 function selecionarCooperativa(event) {
   let idCooperativa = event.target.options[event.target.selectedIndex].getAttribute('data-id')
    firebase.firestore().collection('cooperativas').doc(idCooperativa).get()
         .then(doc => {
               carregarInputsCooperativa(doc.data(), idCooperativa)
         }).catch(err => {
             console.log(err)
         })
 }

 function carregarInputsCooperativa(doc, id){
    document.querySelector('#endereço').value = doc.Endereço
    document.querySelector('#cep').value = doc.CEP
    document.querySelector('#uf').value = doc.UF
    document.querySelector('#cidade').value = doc.Municipio


    dbFirestore.doc(firebase.auth().currentUser.uid).get()
    .then(doc => {
        if(doc.exists) {
           let infoEmpresaEIdCooperativa = {
               nome:  doc.data().nome,
               endereço:  doc.data().Endereço,
               telefone:  doc.data().Telefone,
               cep:  doc.data().CEP,
               cnpj:  doc.data().CNPJ,
               idEmpresa: doc.id,
               idCooperativa: id
           }

           window.sessionStorage.setItem('infoEmpresaEIdCooperativa', JSON.stringify(infoEmpresaEIdCooperativa))
        }
    }).catch(err => {
        console.log(err)
    })
 }

 function novoAgendamento(){
    let endereço = document.querySelector('#endereço').value
    let cep = document.querySelector('#cep').value
    let uf = document.querySelector('#uf').value
    let cidade = document.querySelector('#cidade').value
    let data = document.querySelector('#data').value
    let nome = document.querySelector("#id-select-cooperativa").value
    let periodo = document.querySelector("#periodo")

    let conteudoPeriodo = periodo.options[periodo.selectedIndex].textContent

    if(endereço == '' || cep == '' || uf == '' || cidade == '' || data == '' || nome == ''){
        
        modalWarning("Informe todos os dados necessários para o agendamento", () => {
            fecharModal()
        })
        return
    }

   let agendamento = {
       protocolo: gerarProtocolo(),
       status: 'aberto',
       data: data,
       periodo: conteudoPeriodo,
       deletado: false,
       cooperativa: {
            nome: nome,
            endereço: endereço,
            cep: cep,
            cidade: cidade,
            uf: uf
       },
       materiais: JSON.parse(window.sessionStorage.getItem('materiais')),
       infoEmpresa: JSON.parse(window.sessionStorage.getItem('infoEmpresaEIdCooperativa'))
   }

   let idCooperativa = agendamento.infoEmpresa.idCooperativa

    let promiseEmpresa = dbFirestore.doc(firebase.auth().currentUser.uid).collection('agendamentos').add(agendamento)
    
    promiseEmpresa
        .then((result) => {

       agendamento.idAgendamentoEmpresa = result.id

       firebase.firestore().collection('cooperativas').doc(idCooperativa).collection('agendamentos').add(agendamento)
            .then((result) => {

                agendamento.idAgendamentoCooperativa = result.id

                dbFirestore.doc(firebase.auth().currentUser.uid).collection('agendamentos').doc(agendamento.idAgendamentoEmpresa).set(agendamento)
                    .then(() => {
                        modalSucesso('Agendamento cadastrado com sucesso!', () => {
                            location.assign(`${setarURL()}/pages/dashboard.html`)
                        })
                        
                    })
            })
            .catch(erro => console.log(erro))
   
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
                if(!doc.data().deletado){
                    renderAgendamentos(doc.data(), doc.id)
                }
            })
        }).catch(err => {
            console.log(err)
        })
    }, 1000)
 }

 function renderAgendamentos(agendamento, id){
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

     let btnVerMais = document.createElement('button')
     btnVerMais.innerText = 'Ver mais'
     btnVerMais.setAttribute('onclick','setarIdAgendamentoNaSession(event)')
     btnVerMais.setAttribute('class','btn-verMais')
     btnVerMais.setAttribute('data-idAgendamento', id)

     agendamentoStatusDIV.appendChild(btnVerMais)
    
    agendamentosDIV.appendChild(agendamentoStatusDIV)
 }

 function setarIdAgendamentoNaSession(event){

    let valueIdAgendamento = event.target.getAttribute('data-idAgendamento')
    window.sessionStorage.setItem('id-Agendamento', valueIdAgendamento)
    location.assign(`${setarURL()}/pages/infoAgendamento.html`);
 }


 function buscarAgendamentoUnico(){

  let idAgendamento = window.sessionStorage.getItem("id-Agendamento")

    setTimeout(() => {
        dbFirestore.doc(firebase.auth().currentUser.uid).collection('agendamentos').doc(idAgendamento).get()
        .then(result => {
                renderAgendamentoUnico(result.data())
        }).catch(err => {
            console.log(err)
        })
    }, 1000)
 }

 function renderAgendamentoUnico(agendamento){

    let Ids = {
        idCooperativa: agendamento.infoEmpresa.idCooperativa,
        idAgendamentoCooperativa: agendamento.idAgendamentoCooperativa,
        idAgendamentoEmpresa: agendamento.idAgendamentoEmpresa
    }

    window.sessionStorage.setItem('Ids', JSON.stringify(Ids))

    document.querySelector("#num-proto").innerText = 'PROTOCOLO: ' + agendamento.protocolo
    document.querySelector('#endereço').value = agendamento.cooperativa.endereço
    document.querySelector('#cep').value = agendamento.cooperativa.cep
    document.querySelector('#uf').value = agendamento.cooperativa.uf
    document.querySelector('#cidade').value = agendamento.cooperativa.cidade
    document.querySelector("#option-coop").innerText = agendamento.cooperativa.nome
    document.querySelector("#data").value = agendamento.data
    document.querySelector("#option-periodo").innerText = agendamento.periodo
    
    let chaves = Object.keys(agendamento.materiais)
    let valores = Object.values(agendamento.materiais)

    let StringMateriais = ''

    for(let i = 0; i < chaves.length; i++){
        
        StringMateriais += `

            <div class='item-material'> 
                <div class='radio-material'>
                    <input type='radio' value=${chaves[i]} readonly disabled checked/>
                    <label>${chaves[i]}</label>
                </div>
                <div class='qtd-img-material'> 
                    <img class='img' src='./../images/${InserirImage(chaves[i])}' />
                    <div class='qtd-material' style=' padding: 10px'> 
                        <label>Quantidade:</label></br>
                        <input type='number' value=${valores[i]} readonly disabled/>
                    </div>
                </div>
            </div>

        `
    }

    document.querySelector('.materiais-container').innerHTML += StringMateriais
 }


 function InserirImage(material) {

    if(material === 'celular') {
        return 'celular-icon.png'
    } else if(material === 'papelao') {
        return 'img-papelao.png'
    } else if(material === 'pneu') {
        return 'pneu-icon.png'
    } else {
        return 'lixo-icon.png'
    }
 }

 function deletarAgendamento(confirmar) {
    let Ids = JSON.parse(window.sessionStorage.getItem('Ids'))

    if(confirmar){
        
        let promiseEmpresa = dbFirestore.doc(firebase.auth().currentUser.uid).collection('agendamentos').doc(Ids.idAgendamentoEmpresa).update({ deletado: true})
        let promiseCooperativa = firebase.firestore().collection('cooperativas').doc(Ids.idCooperativa).collection('agendamentos').doc(Ids.idAgendamentoCooperativa).update({ deletado: true})
        
        Promise.all([promiseCooperativa, promiseEmpresa])
            .then(() => {
                modalSucesso('Agendamento deletado com sucesso!', () => {
                    location.assign(`${setarURL()}/pages/dashboard.html`);
                })
                
            })
            .catch(erro => {
                console.log(erro)
            })
        
    }
 }

 function EnviarMsg(){
     let nome = document.querySelector('#nome')
     let email = document.querySelector('#email')
     let msg = document.querySelector('#msg')

     if(nome.value.trim() == '' || email.value.trim() == '' || msg.value.trim() == '' ){
         modalWarning('Campos obrigatórios!', () => {
             fecharModal()
         })
         return
     }

     firebase.firestore().collection('contatos').add({nome: nome.value, email: email.value, msg: msg.value })
        .then(() => {
         nome.value = ''; email.value = ''; msg.value = '';
         modalSucesso('Obrigado pela mensagem! Entraremos em contato via E-mail.', () => {
             fecharModal()
         })

     }).catch(error => {
         console.log(error)
     })
 }

 function pesquisar(){
     let valor = document.querySelector('#input-search').value

     window.location.href = `https://www.google.com/search?q=${valor}`
 }

 const menuMobile = document.querySelector('.menu-mobile')

 function abrirMenuMobile(){
    menuMobile.style.display = 'inline'
}

 function fecharMenuMobile(){
    menuMobile.style.display = 'none'
 }

 function fecharModal(){
    modal.style.display = 'none'
    backModal.style.display = 'none'
    document.body.style.overflow = 'initial' 
 }

 const modalConfirm = document.querySelector('.modalConfirm')
 const backModalConfirm = document.querySelector('.back-modal-confirm')

 function showConfirmModal(){
     modalConfirm.style.display = 'flex'
     backModalConfirm.style.display = 'block'
     document.body.style.overflow = 'hidden'
}

function confirmDeteleteAgendamento(event){
    let valorBtn = event.target.innerText
    modalConfirm.style.display = 'none'
    backModalConfirm.style.display = 'none'
    document.body.style.overflow = 'initial'

     valorBtn === 'Ok' ? deletarAgendamento(true) : deletarAgendamento(false)
}