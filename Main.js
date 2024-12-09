import Task from "./JS/Task.js";
import TodoApp from "./JS/TodoApp.js";

const TODO_APP = new TodoApp();
let taskId = 0;

document.querySelector('.btn-all').addEventListener('click', ()=> desplayTasks());
document.querySelector('.btn-active').addEventListener('click', ()=> desplayTasks(false));
document.querySelector('.btn-completed').addEventListener('click', ()=> desplayTasks(true));
document.querySelector('.btn-clear-complete').addEventListener('click', ()=> clearTasks());
document.querySelector('.add').addEventListener('click', () => addTask());

function addTask(){
  
  const description = document.getElementById('task-name');
  
  if(description.value !== ''){
    TODO_APP.addTask(new Task(description.value, false, taskId++));
    description.value = '';
    desplayTasks();
  }
}

function desplayTasks(filterValue){
  
  const tasks = document.getElementById('tasks');
  const taskList = filterValue !== undefined ? TODO_APP.filterTasksByStatus(filterValue) : TODO_APP.getTasks();
  
  tasks.innerText = "";
  
  taskList.forEach((task) => {
    
    const taskDiv = createDomElement('div', 'task-div',undefined, task.getId());
    const description = createDomElement('p', 'task', task.getDescription());
    const checkBox = createCheckBox(task.getStatus());
    const deleteButton = createDomElement('button', 'del-btn', 'x');  
    
    deleteButton.addEventListener('click', handleDelete);
    checkBox.addEventListener('click', handleComplete);
    
    taskDiv.appendChild(checkBox);
    taskDiv.appendChild(description);
    taskDiv.appendChild(deleteButton);
    tasks.appendChild(taskDiv);
    
  });
  updateItemList();
}

function updateItemList(){
  const itemsParagraph = document.querySelector('.items');
  itemsParagraph.innerHTML = `${TODO_APP.filterTasksByStatus(false).length} items left`;
}

function clearTasks(){

  TODO_APP.filterTasksByStatus(true).forEach(task => TODO_APP.deleteTask(task.getId()));
  desplayTasks();
}

function handleDelete(event){
  let taskDiv = event.target.closest('.task-div');
  TODO_APP.deleteTask(Number.parseInt(taskDiv.id));
  desplayTasks();
}

function handleComplete(event){

  let taskDiv = event.target.closest('.task-div');
  taskDiv.classList.add('task-completed');
  TODO_APP.getTask(Number.parseInt(taskDiv.id)).updateStatus(true);
  updateItemList();
}

/**
 * 
 * @param {boolean} checked 
 * @returns {Element}
 */
function createCheckBox(checked){

  const checkBox = createDomElement('input', 'check-box');
  checkBox.type = 'checkbox';
  checkBox.checked = checked;
  return checkBox;
}

/**
 * 
 * @param {string} tagName
 * @param {string} className 
 * @param {string} content 
 * @param {number} id 
 * @returns {Element}
 */
function createDomElement(tagName, classNname, content, id){

  const ELEMENT = document.createElement(tagName);
  ELEMENT.className = classNname;

  if(content !== undefined) ELEMENT.innerText = content;

  if(id !== undefined) ELEMENT.id = id;

  return ELEMENT;

}