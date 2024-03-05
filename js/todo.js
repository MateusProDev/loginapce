// Trata a submissão do formulário de autenticação
todoForm.onsubmit = function (event) {
  event.preventDefault() // Evita o redirecionamento da página
  if (todoForm.name.value != '') {
    var data = {
      name: todoForm.name.value
    }

    dbRefUsers.child(firebase.auth().currentUser.uid).push(data).then(function () {
      console.log('Post "' + data.name + '" adicionado com sucesso')
    }).catch(function (error) {
      showError('Falha ao adicionar post: ', error)
    })
  } else {
    alert('O campo não pode ser em branco para criar post!')
  }
}

// Exibe a lista de tarefas do usuário
function fillTodoList(dataSnapshot) {
  ulTodoList.innerHTML = ''
  var num = dataSnapshot.numChildren()
  todoCount.innerHTML = num + (num > 1 ? ' tarefas' : ' tarefa') + ':' // Exibe na interface o número de tarefas
  dataSnapshot.forEach(function (item) { // Percorre todos os elementos
    var value = item.val()
    var li = document.createElement('li') // Cria um elemento do tipo li
    var spanLi = document.createElement('span') // Cria um elemento do tipo span
    spanLi.appendChild(document.createTextNode(value.name)) // Adiciona o elemento de texto dentro da nossa span
    li.appendChild(spanLi) // Adiciona o span dentro do li
    ulTodoList.appendChild(li) // Adiciona o li dentro da lista de tarefas
  })
}