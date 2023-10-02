let todoInput, errorInfo, addBtn, ulList
let newTask
let box, popup, popupInfo, taskToEdit, popupInput, popupAddBtn, popupCloseBtn
let bg;

const main = () => {
    prepareDomElements()
    prepareDOMEvents()
}

const prepareDomElements = () => {
    todoInput = document.querySelector('.todo-input')
    errorInfo = document.querySelector('.error-info')
    addBtn = document.querySelector('.btn-add')
    ulList = document.querySelector('.box-list ul')
    popup = document.querySelector('.popup')
    box = document.querySelector('.box')
    popupInfo = document.querySelector('.popup-info')
    popupInput = document.querySelector('.popup-input')
    popupAddBtn = document.querySelector('.accept')
    popupCloseBtn = document.querySelector('.cancel')
    bg = document.querySelector('.bgUnderPopup')
}

const prepareDOMEvents = () => {
    addBtn.addEventListener('click', addNewTask)
    ulList.addEventListener('click', checkClick)
    popupCloseBtn.addEventListener('click', closePopup)
    popupAddBtn.addEventListener('click', changeTaskText)
    todoInput.addEventListener('keyup', enterKeyCheck)
}

let taskIndex = 0;

const addNewTask = () => {
    if (todoInput.value !== '') {
        newTask = document.createElement('li')
        newTask.textContent = todoInput.value;

        ulList.append(newTask);

        createIconsArea();

        errorInfo.textContent = '';
        todoInput.value = '';
    } else {
        errorInfo.textContent = 'Enter a new task text'
    }
}


const createIconsArea = () => {
    const iconsArea = document.createElement('div')
    iconsArea.classList.add('icons')
    newTask.append(iconsArea);

    const completeBtn = document.createElement('button')
    completeBtn.classList.add('complete')
    completeBtn.classList.add('compl')
    completeBtn.innerHTML = '<i class="fa-solid fa-check compl"></i>'

    const editBtn = document.createElement('button')
    editBtn.classList.add('edit')
    editBtn.classList.add('ed')
    editBtn.innerHTML = '<i class="fa-solid fa-pen ed"></i>'

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete')
    deleteBtn.classList.add('del')
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark del"></i>'

    iconsArea.append(completeBtn, editBtn, deleteBtn)

}

const showPopup = () => {
    bg.style.display = 'block';
    popup.style.display = 'block';
}

const closePopup = () => {
    bg.style.display = 'none';
    popup.style.display = 'none';
    popupInfo.textContent = '';
}

const checkClick = e => {
    if (e.target.matches('.compl')) {
        console.log('complete')
        e.target.closest('li').classList.toggle('completed')
    } else if (e.target.matches('.ed')) {
        showPopup()
        editTask(e)
        console.log('edit')
    } else if (e.target.matches('.del')) {
        console.log('delete')
        e.target.closest('li').remove();
    }
}

const editTask = e => {
    taskToEdit = e.target.closest('li')
    popupInput.value = taskToEdit.firstChild.textContent
}

const changeTaskText = () => {
    if (popupInput.value !== '') {
        taskToEdit.firstChild.textContent = popupInput.value;
        bg.style.display = 'none';
        popup.style.display = 'none';
        popupInfo.textContent = ''
    } else {
        popupInfo.textContent = 'You should enter some text'
    }
}

const enterKeyCheck = e => {
    if (e.key === 'Enter') {
        console.log('enter');
        addNewTask();
    }
}

document.addEventListener('DOMContentLoaded', main)