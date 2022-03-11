import { format } from 'date-fns'

const list = (() => {
    let todoList = [];
    let projectList = [];

    function addTodo(todoName, todoNote, todoProjName, todoPriority, todoDate, todoStatus) {
        todoList.push({ todoName, todoNote, todoProjName, todoPriority, todoDate, todoStatus });
    }

    function modTodo() {
    }

    function deleteTodo() {
    }

    function addProject(newProjName) {
        projectList.push(newProjName);
    }

    function modProjectList() {
    }

    function viewTodoList() {
        const todoCopy = [...todoList];
        return todoCopy;
    }

    function viewProjList() {
        const projCopy = [...projectList];
        return projCopy;
    }

    return {
        addTodo,
        addProject,
        modTodo,
        deleteTodo,
        modProjectList,
        viewTodoList,
        viewProjList,
    };

})();

const seven = format(new Date(2022, 2, 7), 'dd/MM/yyyy');
const nine = format(new Date(2022, 2, 9), 'dd/MM/yyyy');
const ten = format(new Date(2022, 2, 10), 'dd/MM/yyyy');
const eleven = format(new Date(2022, 2, 11), 'dd/MM/yyyy');
const twelve = format(new Date(2022, 2, 12), 'dd/MM/yyyy');
const thirty = format(new Date(2022, 2, 30), 'dd/MM/yyyy');

list.addProject('Demo');
list.addTodo('Laundry', '2x loads', 'Demo', 'High', seven, true);
list.addTodo('Tidy up', 'Kitchen and living room', 'Demo', 'Medium', nine, false);
list.addTodo('Vacuum House', 'Whole house', 'Demo', 'Low', thirty, false);
list.addTodo('Go running', '5km', 'Demo', 'Low', eleven, false);
list.addTodo('Update CV', '', 'Demo', 'High', twelve, false);
list.addTodo('Cut grass', '', 'Demo', 'Medium', ten, false);

export { list };
