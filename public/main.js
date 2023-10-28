const inputEl = document.getElementById("input")
const listEl = document.getElementById("list");
const countEl = document.getElementById("count");
const toggleAllEl = document.getElementById("toggle-all");
const clearCompletedEl = document.getElementById('clear-completed');

let TODOS = sessionStorage.getItem('todos') ? JSON.parse(sessionStorage.getItem('todos')) : [];

function createTodoItemEl(todo){
    const li = document.createElement('li')
    li.dataset.id = todo.id
    li.className = "group border-b flex justify-between border-b-gray-300 p-4"
    li.insertAdjacentHTML(
        'afterbegin',
        `
        <div class="flex gap-3 items-center">
        <svg data-todo="toggle" class="${todo.checked ? 'text-green-500' : ''}" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle">
        ${todo.checked ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle-2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>' : '<circle cx="12" cy="12" r="10"/>'}
        </svg>
        <div contenteditable="true" data-todo="value" class="text-2xl p-2 ${todo.checked ? 'line-through' : ''}">${todo.value}</div>
        </div>
        <svg data-todo="delete" class="cursor-pointer hidden group-hover:block" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
        `
    )
    return li;
}

function renderTodos(){
    const filter = document.location.hash.replace(/^#\//, '');
    let filterTodos = [...TODOS];
    if (filter === 'active') filterTodos = TODOS.filter(todo => !todo.checked)
    else if (filter === 'completed') filterTodos = TODOS.filter((todo) => todo.checked);

    listEl.replaceChildren(...filterTodos.map(todo => createTodoItemEl(todo)));
    const check = 0;
    TODOS.forEach(item => {
        if (item.checked) {
            check++;
        }
    })
    countEl.innerText = TODOS.length - check;
    if(check === TODOS.length && TODOS.length !== 0){
        toggleAllEl.classList.add('text-black', 'cursor-pointer');
    }else{
        toggleAllEl.classList.remove('text-black', 'cursor-pointer');
    }
    const haveOneCompletedItem = TODOS.some(item => item.checked);
    if (haveOneCompletedItem) {
    clearCompletedEl.classList.toggle('invisible');
    }
}

clearCompletedEl.onclick = (e) => {
    TODOS = TODOS.filter(item => !item.checked);
    sessionStorage.setItem('todos', JSON.stringify(TODOS));
    renderTodos()
  }


toggleAllEl.onclick = (e) => {
    if(e.target.classList.contains('text-black')){
       TODOS.forEach(item => item.checked = false);
    }
    sessionStorage.setItem('todos', JSON.stringify(TODOS));
    renderTodos()
}

inputEl.onkeyup = (e) => {
    if(e.key === 'Enter'){
        
        TODOS.push({
            id: Date.now(),
            value: inputEl.value,
            checked: false
        })
        sessionStorage.setItem('todos', JSON.stringify(TODOS));
        renderTodos();
        inputEl.value = '';
    }
}

listEl.onclick = (e) => {
    if(e.target.getAttribute('data-todo')==='toggle'){ 
        const id = parseInt(e.target.parentElement.parentElement.dataset.id);
        TODOS = TODOS.map(item => {
            if(item.id === id){
                item.checked = !item.checked
            }
            return item
        })
        sessionStorage.setItem('todos', JSON.stringify(TODOS));
        renderTodos();
    }
    if(e.target.getAttribute('data-todo')==='delete'){
        TODOS = TODOS.filter(item => item.id !== parseInt(e.target.parentElement.dataset.id));
        sessionStorage.setItem('todos', JSON.stringify(TODOS));
        renderTodos();
    }
};

listEl.onkeydown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (e.target.getAttribute('data-todo') === 'value') {
        const id = parseInt(e.target.parentElement.parentElement.dataset.id);
        TODOS = TODOS.map((item) => {
          if (item.id === id) {
            item.value = e.target.innerText;
          }
          return item;
        });
        sessionStorage.setItem('todos', JSON.stringify(TODOS));
        renderTodos();
      }
    }
  }

window.addEventListener('hashchange', () => {
    renderTodos();
  });

  renderTodos()