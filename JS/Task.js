
export default class Task{

  #description;
  #status;
  #taskId

  /**
   * 
   * @param {string} description 
   * @param {boolean} status 
   * @param {number} taskId 
   */
  constructor(description, status, taskId){
    
    this.#description = description;
    this.#status = status;
    this.#taskId = taskId;
  }

  getStatus() {
    return this.#status;
  }

  getDescription(){
    return this.#description;
  }

  getId(){
    return this.#taskId;
  }

  updateDescription(description){
    this.#description = description;
  }

  updateStatus( newStatus){
    this.#status = newStatus;
  }
  
}