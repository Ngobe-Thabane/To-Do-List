
let task_list = [];

function getTaskName(){
  const task_name = document.getElementById('task_name');
  task_list.push({name: task_name.value, status : 'Not Started'});
  task_name.value = "";
  displayTasks();
}


function displayTasks(){
  const task_list_container = document.getElementById('task_list');
  task_list_container.innerText = "";
  task_list.forEach((task,index)=>{
    let task_div = createTaskContainer('task', task.name, 'div');
    let del = createTaskContainer('del', 'X', 'button');
    del.id = index;
    del.addEventListener('click', (event)=>{
      removeTask(event.target.id);
    })
    task_div.appendChild(del);
    task_list_container.appendChild(task_div);
  });
 
}

function removeTask(index){
  task_list.splice(index, 1);
  displayTasks();
}

function createTaskContainer(class_name, content, element){

  const div_container = document.createElement(element);
  div_container.className = class_name;
  div_container.innerText = content;
  return div_container;

}