// status.js
export const toggleStatus = (items, index) => {
  items[index].completed = !items[index].completed;
};

export const clearCompleted = (items) => items.filter((item) => !item.completed);
