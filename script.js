const form = document.querySelector("form");
const buttonsSection = document.querySelector('.form_buttons')
const showFormBtn = document.querySelector("#add");
const hideFormBtn = document.querySelector("#cancel");
const addTodoBtn = document.querySelector("#send");

const mainLoading = document.querySelector(".main_loading");
const sendLoading = document.querySelector(".send_loading");

const todoTitle = document.querySelector("#form_title");
const todoBody = document.querySelector("#form_body");

const todoList = document.querySelector('.list');

showFormBtn.addEventListener('click', ()=>{
    form.classList.add('active');
    buttonsSection.classList.add('active');
    showFormBtn.classList.remove('active');
})

hideFormBtn.addEventListener('click', () => {
    form.classList.remove('active');
    buttonsSection.classList.remove('active');
    showFormBtn.classList.add('active');
})

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
 if (xhr.readyState === 4 && xhr.status === 200) {
   const todos = JSON.parse(xhr.responseText);
   mainLoading.classList.remove('active');
   todos.forEach(todo => {
        handelTodo(todo);
   });
 }
};
xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts', true);
xhr.send();

addTodoBtn.addEventListener('click', () => {
    if(todoTitle.value.trim() === '' || todoBody.value.trim() === ''){
        alert('The inputs must not be empty!\nPlease fill it and try again')
    }
    else {

        sendLoading.classList.add('active');
        form.classList.remove('active');
        buttonsSection.classList.remove('active');
        showFormBtn.classList.add('active');
            

        fetch('https://jsonplaceholder.typicode.com/posts',{
            method : 'post',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({
                "title" : todoTitle.value.trim(),
                "body" : todoBody.value.trim(),
                "userId" : 1,
                "id" : Math.floor(Math.random() * 20 + 1000000)
            })
        })
        .then (res => res.json())
        .then(todo => {
            handelTodo(todo);
            
            sendLoading.classList.remove('active');
        })
    }
})

function handelTodo (todo) {
    let box = document.createElement('li');
    let title = document.createElement('h3');
    let body = document.createElement('p');

    box.classList.add('list_item');
    title.classList.add('list_item_title');
    body.classList.add('list_item_body');

    box.setAttribute('data-userId', todo.userId);
    box.setAttribute('data-todoId', todo.id);
    title.textContent = todo.title;
    body.textContent = todo.body;

    box.append(title)
    box.append(body)

    todoList.prepend(box);
}
