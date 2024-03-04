
// Traduz para português brasileiro a autenticação do Firebase
firebase.auth().languageCode = 'pt-BR'

// Função que trata a submissão do formulário de autenticação
authForm.onsubmit = function (event) {
  showItem(loading)
  event.preventDefault()
  if (authForm.submitAuthForm.innerHTML == 'Acessar') {
    firebase.auth().signInWithEmailAndPassword(authForm.email.value, authForm.password.value).catch(function (error) {
      console.log('Falha no acesso')
      console.log(error)
      hideItem(loading)
    })
  } else {
    firebase.auth().createUserWithEmailAndPassword(authForm.email.value, authForm.password.value).catch(function (error) {
      console.log('Falha no cadastro')
      console.log(error)
      hideItem(loading)
    })
  }
}

// Função que centraliza e trata a autenticação
firebase.auth().onAuthStateChanged(function (user) {
  hideItem(loading)
  if (user) {
    showUserContent(user)
  } else {
    showAuth()
  }
})

// Função que permite ao usuário sair da conta dele
function signOut() {
  firebase.auth().signOut().catch(function (error) {
    console.log('Falha ao sair da conta')
    console.log(error)
  })
}

// Função que permite o usuário fazer a verificação do e-mail dele
function sendEmailVerification() {
  showItem(loading)
  var user = firebase.auth().currentUser
  user.sendEmailVerification(actionCodeSettings).then(function () {
    alert('E-mail de verificação foi enviado para ' + user.email + '! Verifique a sua caixa de entrada')
  }).catch(function (error) {
    alert('Houve um erro ao enviar o e-mail de verificação')
    console.log(error)
  }).finally(function () {
    hideItem(loading)
  })
}
