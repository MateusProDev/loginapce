// Definindo referências para elementos da página
var todoForm = document.getElementById('todoForm');
var todoCount = document.getElementById('todoCount');
var ulTodoList = document.getElementById('ulTodoList');

// Trata a submissão do formulário de autenticação
todoForm.onsubmit = function (event) {
    event.preventDefault(); // Evita o redirecionamento da página
    if (todoForm.name.value !== '') {
        var data = {
            name: todoForm.name.value
        };

        dbRefUsers.child(firebase.auth().currentUser.uid).push(data).then(function () {
            console.log('Tarefa "' + data.name + '" adicionada com sucesso');
        }).catch(function (error) {
            showError('Falha ao adicionar tarefa: ', error);
        });
    } else {
        alert('O nome da tarefa não pode ser em branco para criar a tarefa!');
    }
};

// Exibe a lista de tarefas do usuário
function fillTodoList(dataSnapshot) {
    ulTodoList.innerHTML = '';
    var num = dataSnapshot.numChildren();
    todoCount.innerHTML = num + (num > 1 ? ' tarefas' : ' tarefa') + ':'; // Exibe na interface o número de tarefas
    dataSnapshot.forEach(function (item) { // Percorre todos os elementos
        var value = item.val();
        var li = document.createElement('li'); // Cria um elemento do tipo li
        var spanLi = document.createElement('span'); // Cria um elemento do tipo span
        spanLi.appendChild(document.createTextNode(value.name)); // Adiciona o elemento de texto dentro da nossa span
        li.appendChild(spanLi); // Adiciona o span dentro do li
        ulTodoList.appendChild(li); // Adiciona o li dentro da lista de tarefas
    });
}
