import { list } from './listLogic'
import { filterLists } from './filterLogic'
import { isToday, isThisWeek, format, parse} from 'date-fns'

const domController = (() => {

    function clickListener() {
        const link = document.querySelectorAll('.link');
        link.forEach(element => element.addEventListener('click', clickController));
    };

    function clickController(event) {
        const clickType = event.target.getAttribute('data-click');
        const elemIndex = event.target.getAttribute('data-index');//

        console.log(event.target.getAttribute('data-click'));//

        if (clickType === 'all') {
            refreshContent(filterLists.byAll());
            showHeader('All');
        } else if (clickType === 'today') {
            const list = filterLists.byToday();
            const sortedList = sortByUnchecked(list);
            refreshContent(sortedList);
            showHeader('Today');
        } else if (clickType === 'week') {
            const list = filterLists.byWeek();
            const sortedList = sortByUnchecked(list);
            refreshContent(sortedList);
            showHeader('Week');
        } else if (clickType === 'comp') {
            refreshContent(filterLists.byCompleted());
            showHeader('Completed');
        } else if (clickType === 'proj') {
            const projName = event.target.textContent;
            const list = filterLists.byProject(projName);
            const sortedList = sortByUnchecked(list);
            refreshContent(sortedList);
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

    function showHeader(listType) {
        document.getElementById('cat-header').textContent = listType;
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

    function sortByUnchecked(list) {
        const incompList = list.filter(todoObj => !todoObj.todoStatus);
        const compList = list.filter(todoObj => todoObj.todoStatus);
        const joinedList = incompList.concat(compList);
        return joinedList;
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
        showHeader,
        clickListener,
        refreshProjList,
    };

})();

domController.refreshContent(filterLists.byAll());
domController.showHeader('All');
domController.clickListener();
