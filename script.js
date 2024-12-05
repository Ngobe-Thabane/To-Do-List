
const task_list = [];

function getTaskName(){
  const task_name = document.getElementById('task_name');

  if (task_name.value !== '')
    task_list.push({name: task_name.value, completed : false});

  task_name.value = "";

  displayTasks(task_list);
}

function displayTasks(list_task){
  const task_list_container = document.getElementById('task_list');
  task_list_container.innerText = "";
  

  list_task.forEach((task,index)=>{

    let task_div = createTaskContainer('task','', 'div');
    let task_check_list = createTaskContainer('check-task', '', 'input');
    task_check_list.name = 'check';
    task_check_list.type = 'checkbox';
    task_check_list.checked = task.completed;
    let del = createTaskContainer('del', 'X', 'button');
    let decription = createTaskContainer('', task.name, 'p');
    decription.className = task.completed ? 'task-completed' : 'task-active';
    del.id = index;

    del.addEventListener('click', (event)=>{
      removeTask(event.target.id);
    })
    task_check_list.addEventListener('click', (event)=>{
      let descript = event.target.closest('.task').children[1];
      descript.className = 'task-completed';
      task_list.filter((task)=> {
        if(task.name === descript.innerText){
          task.completed = true;
        }
      })
    })
    task_div.appendChild(task_check_list);
    task_div.appendChild(decription);
    task_div.appendChild(del);

    task_list_container.appendChild(task_div);
  });
 
}

function removeTask(index){
  task_list.splice(index, 1);
  displayTasks(task_list);
}

function createTaskContainer(class_name, content, element){

  const div_container = document.createElement(element);
  div_container.className = class_name;
  div_container.innerText = content;
  return div_container;

}

function completedTasks( done){
  if (done == undefined){
    displayTasks(task_list);
    return;
  }

  let complete = done ? task_list.filter(task => task.completed == true) : task_list.filter(task => task.completed == false);
  displayTasks(complete);
}