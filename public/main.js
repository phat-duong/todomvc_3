const inputEl = document.getElementById("input")
const listEl = document.getElementById("list");
const countEl = document.getElementById("count");
const toggleAllEl = document.getElementById("toggle-all");

let TODOS = []

function createTodoItemEl(todo){
    const li = document.createElement('li')
    li.dataset.id = todo.id
    li.className = "group border-b flex justify-between border-b-gray-300 p-4"
    li.insertAdjacentHTML(
        'afterbegin',
        `
        <div class="flex gap-3">
        <svg data-todo="toggle" class="${todo.checked ? 'text-green-500' : ''}" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle">
        ${todo.checked ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle-2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>' : '<circle cx="12" cy="12" r="10"/>'}
        </svg>
        <span class="text-2xl ${todo.checked ? 'line-through' : ''}">${todo.value}</span>
        </div>
        <svg data-todo="delete" class="cursor-pointer hidden group-hover:block" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
        `
    )
    return li;
}

function renderTodos(){
    listEl.replaceChildren(...TODOS.map(todo => createTodoItemEl(todo)));
    const check = 0;
    TODOS.forEach(item => {
        if (item.checked) {
            check++;
        }
    })
    countEl.innerText = TODOS.length - check;
    if(check === TODOS.length){
        toggleAllEl.classList.add('text-black', 'cursor-pointer');
    }else{
        toggleAllEl.classList.remove('text-black', 'cursor-pointer');
    }
}


toggleAllEl.onclick = (e) => {
    if(e.target.classList.contains('text-black')){
       TODOS.forEach(item => item.checked = false);
    }
    renderTodos()
}

inputEl.onkeyup = (e) => {
    if(e.key === 'Enter'){
        
        TODOS.push({
            id: Date.now(),
            value: inputEl.value,
            checked: false
        })
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
    }
    if(e.target.getAttribute('data-todo')==='delete'){
        TODOS = TODOS.filter(item => item.id !== parseInt(e.target.parentElement.dataset.id));
    }
    renderTodos();
};