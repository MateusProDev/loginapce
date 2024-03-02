// função que trata a submissão do form de autenticação
authForm.onsubmit = (event) => {
    event.preventDefault()
    if (authForm.submitAuthForm.innerHTML == 'Acessar'){
        firebase.auth().signInWithEmailAndPassword(authForm.email.value, authForm.password.value).catch((error) =>{
            console.log('Falha no acesso')
            console.log(error)
        })
    } else {
        firebase.auth().createUserWithEmailAndPassword(authForm.email.value, authForm.password.value).catch((error) =>{
            console.log('Falha no acesso')
            console.log(error)
        })
    }
 }
//  função que centraliza e trataa autenticação
firebase.auth().onAuthStateChanged((user) =>{
    hideItem(loading)
    if (user){
        showUserContent(user)
    } else {
        showAuth()
    }
})
// funçaõ que permite o usuario sair da conta dele
function signOut(){
    firebase.auth().signOut().catch((error) =>{
        console.log('Falha ao sair da conta')
        console.log(error)
    })
}
