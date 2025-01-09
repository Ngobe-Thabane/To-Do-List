
export default class TodoApp{

  #taskList = [];

  constructor(){}

  getTasks(){
    return this.#taskList;
  }

  searchTask(searchString){
    return this.#taskList.filter(task => task.getDescription().includes(searchString));
  }

  getTask(taskId){
    return this.#taskList.filter((task) => task.getId() === taskId)[0];
  }

  addTask(task){
    this.#taskList.push(task);
  }

  deleteTask(taskId){
    this.#taskList.forEach((task, index)=>{

      if(task.getId() === taskId){
        this.#taskList.splice(index, 1);
        return;
      }
    })
  }

  updateTask(task, taskDescription){
    this.#taskList[task].updateDescription(taskDescription);
  }

  /**
   * 
   * @param {boolean} taskStatus  
   * @returns {Array}
   */
  filterTasksByStatus(taskStatus){
    return this.#taskList.filter((task) => task.getStatus() === taskStatus);
  }

  getTotalTasks(){
    return this.#taskList.length;
  }
}