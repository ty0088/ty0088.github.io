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

const toDoController = (() => {

})();

list.addTodo('Laundry', '2x loads', 'Housework', 'High', '08/03/2020', true);
list.addTodo('Tidy up', 'Kitchen and living room', 'Housework', 'Medium', '10/03/2020', false);
list.addTodo('Vacuum House', 'Whole house', 'Housework', 'Low', '11/03/2020', false);
list.addTodo('Go running', '5km', 'Hobbies', 'Low', '15/03/2020', false);
list.addTodo('Update CV', '', 'Work', 'High', '09/03/2020', false);
list.addTodo('Cut grass', '', 'Garden', 'Medium', '12/03/2020', false);
list.addProject('Housework');
list.addProject('Hobbies');
list.addProject('Work');
list.addProject('Garden');

export {list};
