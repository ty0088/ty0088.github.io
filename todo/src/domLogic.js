import {list} from './todoLogic'

const showLists = (() => {

    function newTodoElement(todoObj, todoListArr) {
        const todoElem = document.createElement('div');
        todoElem.setAttribute('class', 'long-container todo');

        const statusClass = (todoObj.todoStatus) ? 'check_box' : 'check_box_outline_blank';

        todoElem.innerHTML = `
            <span class="material-icons link" data-click="check-box">${statusClass}</span>
            <span class="todo-title link" data-click="todo" data-index="${todoListArr.indexOf(todoObj)}">${todoObj.todoName}</span>
            <span class="sort ${todoObj.todoPriority}">${todoObj.todoPriority}</span>
            <span class="sort">${todoObj.todoDate}</span>
            <span class="material-icons link" data-click="edit">note_alt</span>
            <span class="material-icons link" data-click="delete">delete</span>
        `;
        return todoElem;
    }

    function byAll() {
        //remove DOM elements and move to domController
        const todoListElem = document.createElement('div'); //
        todoListElem.setAttribute('class', 'todo-list'); //

        const todoListArr = [...list.viewTodoList()]; 
        todoListArr.map(todoObj => {
            if (!todoObj.todoStatus) { //filter out completed todos
                todoListElem.appendChild(newTodoElement(todoObj, todoListArr));
            }
        });

        document.getElementById('todo-content').appendChild(todoListElem);
    }

    function byToday() {
        const todoListArr = [...list.viewTodoList()];
        //filter todoListArr by todays date
        //update DOM with filtered list
    }

    function byWeek() {
        //filter todoListArr by current week range
        //update DOM with filtered list
    }

    function byCompleted() {
        const todoListArr = [...list.viewTodoList()];

        const todoListElem = document.createElement('div');
        todoListElem.setAttribute('class', 'todo-list');

        todoListArr.map(todoObj => {
            if (todoObj.todoStatus) {
                todoListElem.appendChild(newTodoElement(todoObj, todoListArr));
            }
        });

        document.getElementById('todo-content').appendChild(todoListElem);
    }

    function byProject(projName) {
        //filter todoListArr by todos project
        //update DOM with filtered list
    }

    function projList() {
        const projListArr = [...list.viewProjList()];

        const projListElem = document.createElement('div');
        projListElem.setAttribute('class', 'project-list');
        const projHeader = document.createElement('div');
        projHeader.setAttribute('class', 'header');
        projHeader.textContent = 'Projects';

        projListElem.appendChild(projHeader);

        projListArr.map(proj => {
            const projElem = document.createElement('div');
            projElem.setAttribute('class', 'project-link')

            projElem.innerHTML = `
                <span class="material-icons">format_list_bulleted</span>
                <span class="project-title link" data-click="proj" data-index="${projListArr.indexOf(proj)}">${proj}</span>
            `;
            projListElem.appendChild(projElem);
        });

        document.getElementById('project-content').appendChild(projListElem);
    }

    return {
        byAll,
        byToday,
        byWeek,
        byCompleted,
        byProject,
        projList,
    };

})();

const domController = (() => {

    function clickController(event) {
        const clickType = event.target.getAttribute('data-click');
        const elemIndex = event.target.getAttribute('data-index');//

        console.log(clickType);

        if (clickType === 'all') {
            refreshContent(clickType);
        } else if (clickType === 'today') {
            refreshContent(clickType);
        } else if (clickType === 'week') {
            refreshContent(clickType);
        } else if (clickType === 'comp') {
            refreshContent(clickType);
        } else if (clickType === 'proj') {
            refreshContent(clickType, event.target.textContent);
        } else if (clickType === 'add-proj') {
            
        } else if (clickType === 'sort-priority') {
            
        } else if (clickType === 'sort-date') {
            
        } else if (clickType === 'add-todo') {
            
        } else if (clickType === 'check-box') {
            
        } else if (clickType === 'todo') {
            
        } else if (clickType === 'edit') {
            
        } else if (clickType === 'delete') {
            
        }

    }

    function clickListener() {
        const link = document.querySelectorAll('.link');
        link.forEach(element => element.addEventListener('click', clickController));
    };

    function showHeader(listType) {
        document.getElementById('cat-header').textContent = listType;
    }

    function refreshContent(listType, projName) {
        document.getElementById('project-content').innerHTML = '';
        document.getElementById('cat-header').textContent = '';
        document.getElementById('todo-content').innerHTML = '';

        if (listType === 'all') {
            //should contain DOM elements inside showLists.byAll
            showLists.byAll();
            showHeader('All');
        } else if (listType === 'today') {
            showLists.byToday();
            showHeader('Today');
        } else if (listType === 'week') {
            showLists.byWeek();
            showHeader('Week');
        } else if (listType === 'comp') {
            showLists.byCompleted();
            showHeader('Completed');
        } else if (listType === 'proj') {
            showLists.byProject(projName);
            showHeader(projName);
        }

        showLists.projList();
        clickListener();
    }

    function addTodoForm() {
    }

    function addProjForm() {
    }

    return {
        refreshContent,
    };

})();



domController.refreshContent('all');

//event listeners