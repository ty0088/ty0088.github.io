import { parse } from 'date-fns'

const list = (function () {
    let todoList = [];
    let projectList = [];

    function addTodo(todoName, todoNote, todoProjName, todoPriority, todoDate, todoStatus) {
        const todoID = Math.floor(Date.now() * Math.random());
        todoList.push({ todoName, todoNote, todoProjName, todoPriority, todoDate, todoStatus, todoID });
    }

    function modTodo(id, name, note, projName, priority, date) {
        const index = todoList.findIndex(todoObj => todoObj.todoID === id);
        todoList[index].todoName = name;
        todoList[index].todoNote = note;
        todoList[index].todoProjName = projName;
        todoList[index].todoPriority = priority;
        todoList[index].todoDate = date;
    }

    function completeTodo(id) {
        const index = todoList.findIndex(todoObj => todoObj.todoID === id);
        if (todoList[index].todoStatus) {
            todoList[index].todoStatus = false;
        } else if (!todoList[index].todoStatus) {
            todoList[index].todoStatus = true;
        }
    }

    function deleteTodo(id) {
        const index = todoList.findIndex(todoObj => todoObj.todoID === id);
        todoList.splice(index, 1);
    }

    function addProject(newProjName) {
        projectList.push(newProjName);
    }

    function modProjectList() {
    }

    function viewTodoList() {
        return [...todoList];
    }

    function viewTodo(id) {
        const index = todoList.findIndex(todoObj => todoObj.todoID === id);
        return { ...todoList[index] };
    }

    function viewProjList() {
        return [...projectList];
    }

    return {
        addTodo,
        addProject,
        completeTodo,
        modTodo,
        deleteTodo,
        modProjectList,
        viewTodoList,
        viewProjList,
        viewTodo,
    };

})();

const sortList = (function () {

    function priorityScore(value) {

        switch (value) {
            case 'High':
                return 3;
            case 'Medium':
                return 2;
            case 'Low':
                return 1;
        }

    }

    function sortPriority(tempList, priorityOrder) {
        const listNoPriority = tempList.filter(todoObj => todoObj.todoPriority.length === 0);
        const listWithPriority = tempList.filter(todoObj => todoObj.todoPriority.length > 0);
        listWithPriority.sort(function (a, b) {
            return (priorityOrder ? priorityScore(a.todoPriority) - priorityScore(b.todoPriority) : priorityScore(b.todoPriority) - priorityScore(a.todoPriority));
        });
        return listWithPriority.concat(listNoPriority);
    }

    function sortDate(tempList, dateOrder) {
        const listNoDate = tempList.filter(todoObj => todoObj.todoDate.length === 0);
        const listWithDate = tempList.filter(todoObj => todoObj.todoDate.length > 0);
        listWithDate.sort(function (a, b) {
            return (dateOrder ? parse(b.todoDate, 'dd/MM/yyyy', new Date()) - parse(a.todoDate, 'dd/MM/yyyy', new Date()) : parse(a.todoDate, 'dd/MM/yyyy', new Date()) - parse(b.todoDate, 'dd/MM/yyyy', new Date()));
        });
        return listWithDate.concat(listNoDate);
    }

    function sortByUnchecked(tempList) {
        const incompList = tempList.filter(todoObj => !todoObj.todoStatus);
        const compList = tempList.filter(todoObj => todoObj.todoStatus);
        return incompList.concat(compList);
    }

    return {
        sortPriority,
        sortDate,
        sortByUnchecked,
    };
})();

export { list, sortList };
