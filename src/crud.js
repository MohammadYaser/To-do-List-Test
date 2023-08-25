import { clearCompleted } from './modules/status.js';

let listTasks = JSON.parse(localStorage.getItem('tasks')) || [];
const listCard = document.getElementById('list');
const insertInput = document.getElementById('insert');
const enterBtn = document.getElementById('enterBtn');

const updateIndexes = () => {
  listTasks.forEach((task, index) => {
    task.index = index + 1;
  });
};

const updateLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(listTasks));
};

const renderTasks = () => {
  listCard.innerHTML = '';
  listTasks.forEach((task, index) => {
    const taskElement = document.createElement('div');
    taskElement.innerHTML = `
      <div class="card-task">
        <input type="checkbox" ${task.completed ? 'checked' : ''}>
        <div class="card list">${task.description}</div>
        <button class="btn btn-delete" type="button"></button>
        <button class="btn btn-edit" type="button"></button>
      </div>`;
    const editButton = taskElement.querySelector('.btn-edit');
    const editTaskDescription = (index) => {
      const newDescription = prompt('Edit task description:', listTasks[index].description);
      if (newDescription !== null) {
        listTasks[index].description = newDescription;
        updateLocalStorage();
        renderTasks();
      }
    };
    const deleteTask = (index) => {
      listTasks.splice(index, 1);
      updateIndexes();
      updateLocalStorage();
      renderTasks();
    };
    editButton.addEventListener('click', () => {
      editTaskDescription(index);
    });
    const deleteButton = taskElement.querySelector('.btn-delete');
    deleteButton.addEventListener('click', () => {
      deleteTask(index);
    });
    taskElement.querySelector('input').addEventListener('change', () => {
      task.completed = !task.completed;
      updateLocalStorage();
      renderTasks();
    });
    listCard.appendChild(taskElement);
  });
};

const addTask = (newTask) => {
  listTasks.push(newTask);
  updateIndexes();
  updateLocalStorage();
  renderTasks();
};

enterBtn.addEventListener('click', () => {
  const newTaskDescription = insertInput.value.trim();
  const newTask = {
    description: newTaskDescription,
    completed: false,
    index: listTasks.length + 1,
  };
  if (newTaskDescription !== '') {
    addTask(newTask);
    insertInput.value = '';
  }
});

const clearCompletedButton = document.getElementById('btn-clear');
clearCompletedButton.addEventListener('click', () => {
  listTasks = clearCompleted(listTasks); // Remove completed tasks
  updateIndexes(); // Update task indexes
  updateLocalStorage(); // Store the updated tasks in local storage
  renderTasks(); // Refresh the task list
});

renderTasks();
