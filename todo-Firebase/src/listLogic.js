import { format, parse, add } from 'date-fns'
import { firebase } from './fireBaseLogic';

const list = (function () {
    let todoList = [];
    let projectList = [];

    function saveData() {
        if (firebase.isUserSignedIn()) {
            console.log('write to firebase db');
            firebase.writeData('todo', todoList);
            firebase.writeData('project', (Object.assign({}, projectList)));
        } else {
            console.log('write to local storage');
            localStorage.setItem('todoList', JSON.stringify(todoList));
            localStorage.setItem('projectList', JSON.stringify(projectList));
        }
    }

    function loadList() {
        if (firebase.isUserSignedIn()) {
            console.log('load from firebase db');
            todoList = firebase.getTodoList();
            projectList = firebase.getProjList();
            if (todoList === null) {
                console.log('no db todo list data');
                todoList = [];
            }
            if (projectList === null) {
                console.log('no db proj list data');
                projectList = [];
            }
        } else if (localStorage.getItem('todoList') ===  null || localStorage.getItem('projectList') === null)  {
            console.log('load demo values');
            demoValues();
        } else {
            console.log('load from local storage');
            todoList = JSON.parse(localStorage.getItem('todoList'));
            projectList = JSON.parse(localStorage.getItem('projectList'));
        }
    }

    function newTodo(todoName, todoNote, todoProjName, todoPriority, todoDate, todoStatus, todoID) {
        return {todoName, todoNote, todoProjName, todoPriority, todoDate, todoStatus, todoID};
    }

    function addTodo(todoName, todoNote, todoProjName, todoPriority, todoDate, todoStatus) {
        const todoID = Math.floor(Date.now() * Math.random());
        todoList.push(newTodo(todoName, todoNote, todoProjName, todoPriority, todoDate, todoStatus, todoID));
        saveData();
    }

    function modTodo(id, projName, name, note, priority, date) {
        const index = todoList.findIndex(todoObj => todoObj.todoID === id);
        todoList[index].todoName = name;
        todoList[index].todoNote = note;
        todoList[index].todoProjName = projName;
        todoList[index].todoPriority = priority;
        todoList[index].todoDate = date;
        saveData();
    }

    function completeTodo(id) {
        const index = todoList.findIndex(todoObj => todoObj.todoID === id);
        if (todoList[index].todoStatus) {
            todoList[index].todoStatus = false;
        } else if (!todoList[index].todoStatus) {
            todoList[index].todoStatus = true;
        }
        saveData();
    }

    function deleteTodo(id) {
        const index = todoList.findIndex(todoObj => todoObj.todoID === id);
        todoList.splice(index, 1);
        saveData();
    }

    function addProject(newProjName) {
        projectList.push(newProjName);
        saveData();
    }

    function editProjectName(index, nameEdit) {
        projectList[index] = nameEdit;
        saveData();
    }

    function deleteProject(index) {
        const toDelete = projectList[index];
        projectList.splice(index, 1);
        todoList.map(todoObj => {
            if (todoObj.todoProjName === toDelete) {
                todoObj.todoProjName = '';
            }
        });
        saveData();
    }

    function deleteProjTodos(index) {
        let toDeleteList =  [];
        const toDeleteProj = projectList[index];
        projectList.splice(index, 1);
        todoList.map(todoObj => {
            if (todoObj.todoProjName === toDeleteProj) {
                toDeleteList.push(todoObj.todoID);
            }
        });
        toDeleteList.map(id => deleteTodo(id));
        saveData();
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
        editProjectName,
        deleteProject,
        deleteProjTodos,
        viewTodoList,
        viewProjList,
        viewTodo,
        loadList,
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

function demoValues() {
    const a = format(add(Date.now(), {days: 0}), 'dd/MM/yyyy');

    list.addProject('Demo List');
    list.addTodo('Demo Task', 'Demo Note', 'Demo', 'High', a, false);
}

export { list, sortList };
