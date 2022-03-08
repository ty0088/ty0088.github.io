import {list} from './todoLogic'

const filterLists = (() => {

    function byAll() {
        const listArr = [...list.viewTodoList()];
        const newListArr = listArr.filter(todoObj => !todoObj.todoStatus);
        return newListArr;  
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
        const listArr = [...list.viewTodoList()];
        const newListArr = listArr.filter(todoObj => todoObj.todoStatus);
        return newListArr;  
    }

    function byProject(projName) {
        const listArr = [...list.viewTodoList()];
        console.log(projName)
        const newListArr = listArr.filter(todoObj => todoObj.todoProjName === projName);
        return newListArr;
    }

    return {
        byAll,
        byToday,
        byWeek,
        byCompleted,
        byProject,
    };

})();

const domController = (() => {

    function clickController(event) {
        const clickType = event.target.getAttribute('data-click');
        const elemIndex = event.target.getAttribute('data-index');

        if (clickType === 'all') {
            refreshContent(filterLists.byAll());
            showHeader('All');
        } else if (clickType === 'today') {
            showHeader('Today');
        } else if (clickType === 'week') {
            showHeader('Week');
        } else if (clickType === 'comp') {
            refreshContent(filterLists.byCompleted());
            showHeader('Completed');
        } else if (clickType === 'proj') {
            const projName = event.target.textContent;
            let list = filterLists.byProject(projName); //move to filter list or separate out into other function
            let incompList = list.filter(todoObj => !todoObj.todoStatus); //
            let compList = list.filter(todoObj => todoObj.todoStatus); //
            let joinedList = incompList.concat(compList); //
            refreshContent(joinedList);
            showHeader(projName);
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

    function refreshContent(list) {
        document.getElementById('project-content').innerHTML = '';
        document.getElementById('cat-header').textContent = '';
        document.getElementById('todo-content').innerHTML = '';

        const todoListElem = document.createElement('div');
        todoListElem.setAttribute('class', 'todo-list');

        list.map(todoObj => {
            todoListElem.appendChild(newTodoElement(todoObj, list))
        });
        document.getElementById('todo-content').appendChild(todoListElem);

        refreshProjList()
        clickListener();
    }

    function refreshProjList() {
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

    function addTodoForm() {
    }

    function addProjForm() {
    }

    return {
        refreshContent,
        clickListener,
        refreshProjList,
    };

})();


domController.refreshProjList()
domController.clickListener();
