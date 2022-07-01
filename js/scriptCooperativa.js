// Referência ao Cloud Firestore
var dbFirestore = firebase.firestore().collection('cooperativas')

function setarURL(){
    let tamanhoTotalUrl =  window.location.href.length
    let tamanhoCaminho = window.location.pathname.length
    let inicioCaminho = tamanhoTotalUrl - tamanhoCaminho

    let urlSemCaminho =  window.location.href.substring(0, inicioCaminho)

    return urlSemCaminho
}


/* modais  */
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
function cadastrarCooperativas(){
    
    let inputCooperativa = document.querySelector('#input-cooperativa')
    let inputCnpj = document.querySelector('#input-cnpj')
    let inputEndereço = document.querySelector('#input-endereço')
    let inputCep= document.querySelector('#input-cep')
    let inputUf = document.querySelector('#input-uf')
    let inputMunicipio = document.querySelector('#input-municipio')
    let inputTelefone = document.querySelector('#input-tel')
    let inputEmail = document.querySelector('#input-email')
    let inputSenha = document.querySelector('#input-senha')
    let inputConfirmSenha = document.querySelector('#input-confirmaSenha')

    if(inputCooperativa.value.trim() == ''){
        modalWarning('Campo Cooperativa obrigatório', () => {
            fecharModal()
        })
        inputCooperativa.focus()
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

    let DadosCooperativa = {
        Nome: inputCooperativa.value,
        CNPJ: inputCnpj.value,
        Endereço: inputEndereço.value,
        CEP: inputCep.value,
        UF: inputUf.value,
        Municipio: inputMunicipio.value,
        Telefone: inputTelefone.value,
        Email: inputEmail.value,
        Senha: inputSenha.value
    }
    

    firebase.auth().createUserWithEmailAndPassword(DadosCooperativa.Email, DadosCooperativa.Senha)
            .then(() =>{
                    dbFirestore.doc(firebase.auth().currentUser.uid).set(DadosCooperativa)
                    .then(() => {
                        modalSucesso('Cadastrado com sucesso!', () => {
                            location.assign(`${setarURL()}/pages/dashboardCooperativas.html`);
                        })
                        
                    })
                    .catch(erro => console.log(erro))
                    
                })
            .catch(err => modalError('Erro ao cadastrar ' + err, () => {
                fecharModal()
            }))
}

// Função logar e authenticar a Cooperativa
function authCooperativa(){
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
            modalSucesso('Logado com sucesso', () => {
                location.assign(`${setarURL()}/pages/dashboardCooperativas.html`);
            })
            
        })
        .catch(error => modalError('Login não autorizado', () => {
            fecharModal()
        }))
}


// Função de deslogar Cooperativa
function signout(){
    firebase.auth().signOut()
          .then(() => {
              location.assign(`${setarURL()}/pages/loginCooperativa.html`);
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


  function buscarDadosCooperativa(){
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
     document.querySelector('#input-cooperativa').value = dados.Nome
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


 function atualizardadosCooperativa(){
    let inputCooperativa = document.querySelector('#input-cooperativa')
    let inputCnpj = document.querySelector('#input-cnpj')
    let inputEndereço = document.querySelector('#input-endereço')
    let inputCep= document.querySelector('#input-cep')
    let inputUf = document.querySelector('#input-uf')
    let inputMunicipio = document.querySelector('#input-municipio')
    let inputTelefone = document.querySelector('#input-tel')
    let inputEmail = document.querySelector('#input-email')
    let inputSenha = document.querySelector('#input-senha')
    let inputConfirmSenha = document.querySelector('#input-confirmaSenha')

    if(inputCooperativa.value.trim() == ''){
        modalWarning('Campo Cooperativa obrigatório',() => {
            fecharModal()
        })
        inputCooperativa.focus()
        return
    }

    if(inputEndereço.value.trim() == ''){
        modalWarning('Campo Endereço obrigatório',() => {
            fecharModal()
        })
        inputEndereço.focus()
        return
    }

    if(inputUf.value.trim() == ''){
        modalWarning('Campo Uf obrigatório',() => {
            fecharModal()
        })
        inputUf.focus()
        return
    }

    if(inputMunicipio.value.trim() == ''){
        modalWarning('Campo Municipio obrigatório',() => {
            fecharModal()
        })
        inputMunicipio.focus()
        return
    }

    if(inputEmail.value.trim() == ''){
        modalWarning('Campo Email obrigatório',() => {
            fecharModal()
        })
        inputEmail.focus()
        return
    }

    if(inputCnpj.value.trim() == ''){
        modalWarning('Campo Cnpj obrigatório',() => {
            fecharModal()
        })
        inputCnpj.focus()
        return
    }

    if(inputCep.value.trim() == ''){
        modalWarning('Campo CEP obrigatório',() => {
            fecharModal()
        })
        inputCep.focus()
        return 
    }

    if(inputTelefone.value.trim() == ''){
        modalWarning('Campo Telefone obrigatório',() => {
            fecharModal()
        })
        inputTelefone.focus()
        return
    }

    if(inputSenha.value.trim() == ''){
        modalWarning('Campo Senha obrigatório',() => {
            fecharModal()
        })
        inputSenha.focus()
        return
    }

    if(inputConfirmSenha.value.trim() == ''){
        modalWarning('Campo Confirmar senha obrigatóro',() => {
            fecharModal()
        })
        inputConfirmSenha.focus()
        return
    }

    if(inputSenha.value !== inputConfirmSenha.value ) {
        modalWarning('As senhas precisam serem iguais',() => {
           fecharModal()
       })
       inputConfirmSenha.focus()
        return 
    }

    let DadosCooperativa = {
        Nome: inputCooperativa.value,
        CNPJ: inputCnpj.value,
        Endereço: inputEndereço.value,
        CEP: inputCep.value,
        UF: inputUf.value,
        Municipio: inputMunicipio.value,
        Telefone: inputTelefone.value,
        Email: inputEmail.value,
        Senha: inputSenha.value
    }

    dbFirestore.doc(firebase.auth().currentUser.uid).set(DadosCooperativa)
    .then(() => {
       const user = firebase.auth().currentUser
       user.updatePassword(inputSenha.value)
            .then(() => {
                modalSucesso('Atualizado com sucesso!', () => {
                    location.assign(`${setarURL()}/pages/dashboardCooperativas.html`);
                })
                
            }).catch(error => {
                console.log(error)
            })
    })
    .catch(erro => console.log(erro))

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
     pCoopetativa.innerText = `Requerente: ${agendamento.infoEmpresa.nome}`
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
    location.assign(`${setarURL()}/pages/infoAgendamentoCooperativa.html`);
 }


 function buscarAgendamentoUnico(){

  let idAgendamento = window.sessionStorage.getItem('id-Agendamento')
    setTimeout(() => {
        dbFirestore.doc(firebase.auth().currentUser.uid).collection('agendamentos').doc(idAgendamento).get()
        .then(result => {
                renderAgendamentoUnico(result.data())
                window.sessionStorage.setItem('infoAgendamento', JSON.stringify(result.data()))
        }).catch(err => {
            console.log(err)
        })
    }, 1000)
 }

 function renderAgendamentoUnico(agendamento){
    document.querySelector("#num-proto").innerText = 'PROTOCOLO: ' + agendamento.protocolo
    document.querySelector('#endereço').value = agendamento.infoEmpresa.endereço
    document.querySelector('#cep').value = agendamento.infoEmpresa.cep
    document.querySelector('#telefone').value = agendamento.infoEmpresa.telefone
    document.querySelector('#cnpj').value = agendamento.infoEmpresa.cnpj
    document.querySelector("#option-coop").innerText = agendamento.infoEmpresa.nome
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
                    <div class='qtd-material' style='margin-left: 20px'> 
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

 function atualizarStatus(){
    
    let infoAgendamento = JSON.parse(window.sessionStorage.getItem('infoAgendamento'))
    let idAgendamentoCooperativa = window.sessionStorage.getItem('id-Agendamento')
    
    let idEmpresa = infoAgendamento.infoEmpresa.idEmpresa
    let idAgendamentoEmpresa = infoAgendamento.idAgendamentoEmpresa

    let promiseCooperativa = dbFirestore.doc(firebase.auth().currentUser.uid).collection('agendamentos').doc(idAgendamentoCooperativa).update({ status: 'Finalizado'})
    let promiseEmpresa = firebase.firestore().collection('empresas').doc(idEmpresa).collection('agendamentos').doc(idAgendamentoEmpresa).update({ status: 'Finalizado'})

    Promise.all([promiseCooperativa, promiseEmpresa])
        .then(() => {
            modalSucesso('Status atualizado com sucesso!', () => {
                fecharModal()
            })
        })
        .catch(erro => {
            console.log(erro)
        })

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