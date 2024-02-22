const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const todoFile = 'todo.txt';

function showTodos() {
  try {
    const todos = fs.readFileSync(todoFile, 'utf8').split('\n');
    if (todos.length === 1 && todos[0] === '') {
      console.log('No todos found.');
    } else {
      todos.forEach((todo, index) => {
        console.log(`${index + 1}. ${todo}`);
      });
    }
  } catch (err) {
    console.error('Error reading todos:', err);
  }
}

function addTodo(todo) {
  try {
    fs.appendFileSync(todoFile, `${todo}\n`);
    console.log('Todo added successfully.');
  } catch (err) {
    console.error('Error adding todo:', err);
  }
}

function deleteTodo(index) {
  try {
    const todos = fs.readFileSync(todoFile, 'utf8').split('\n');
    todos.splice(index - 1, 1); // Remove the todo at the specified index
    fs.writeFileSync(todoFile, todos.join('\n'));
    console.log('Todo deleted successfully.');
  } catch (err) {
    console.error('Error deleting todo:', err);
  }
}

function clearTodos() {
  try {
    fs.writeFileSync(todoFile, '');
    console.log('Todos cleared successfully.');
  } catch (err) {
    console.error('Error clearing todos:', err);
  }
}

function main() {
  rl.question('Enter your command (show/add/delete/clear/exit): ', (command) => {
    switch (command.trim().toLowerCase()) {
      case 'show':
        showTodos();
        break;
      case 'add':
        rl.question('Enter your todo: ', (todo) => {
          addTodo(todo.trim());
          main();
        });
        break;
      case 'delete':
        rl.question('Enter the index of the todo to delete: ', (index) => {
          deleteTodo(parseInt(index));
          main();
        });
        break;
      case 'clear':
        clearTodos();
        break;
      case 'exit':
        rl.close();
        break;
      default:
        console.log('Invalid command. Please try again.');
        main();
    }
  });
}

main();
