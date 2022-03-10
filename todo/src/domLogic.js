import { list } from './listLogic'
import { filterLists } from './filterLogic'
import { isToday, isThisWeek, format, parse} from 'date-fns'

const controller = (() => {
    let list = [];
    let listHead = '';
    let dateOrder = true;
    let priorityOrder = true;

    function clickListener() {
        const link = document.querySelectorAll('.link');
        link.forEach(element => element.addEventListener('click', clickController));
    };

    function clickController(event) {
        const clickType = event.target.getAttribute('data-click');
        const elemIndex = event.target.getAttribute('data-index');//

        console.log(event.target.getAttribute('data-click'));//

        if (clickType === 'all') {
            dateOrder = true;
            priorityOrder = true;
            list = filterLists.byAll();
            listHead = 'All';
            contentUpdater.refreshContent(list, listHead);
            clickListener();
        } else if (clickType === 'today') {
            dateOrder = true;
            priorityOrder = true;
            list = filterLists.byToday();
            listHead = 'Today';
            const sortedList = contentUpdater.sortByUnchecked(list);
            contentUpdater.refreshContent(sortedList, listHead);
            clickListener();
        } else if (clickType === 'week') {
            dateOrder = true;
            priorityOrder = true;
            list = filterLists.byWeek();
            listHead = 'Week';
            const sortedList = contentUpdater.sortByUnchecked(list);
            contentUpdater.refreshContent(sortedList, listHead);
            clickListener();
        } else if (clickType === 'comp') {
            dateOrder = true;
            priorityOrder = true;
            list = filterLists.byCompleted()
            listHead = 'Completed';
            contentUpdater.refreshContent(list, listHead);
            clickListener();
        } else if (clickType === 'proj') {
            dateOrder = true;
            priorityOrder = true;
            const projName = event.target.textContent;
            list = filterLists.byProject(projName);
            listHead = projName;
            const sortedList = contentUpdater.sortByUnchecked(list);
            contentUpdater.refreshContent(sortedList, projName);
            clickListener();
        } else if (clickType === 'add-proj') {
            if (!!document.getElementById('project-add-form')) {
                contentUpdater.toggleProjForm(true);
                clickListener();
            } else {
                contentUpdater.toggleProjForm(false);
                //disable all other buttons except add/cancel??
            }
        } else if (clickType === 'sort-priority') {
            priorityOrder = !priorityOrder;
            list.sort(function(a,b){
                return (priorityOrder ? priorityScore(a.todoPriority) - priorityScore(b.todoPriority) : priorityScore(b.todoPriority) - priorityScore(a.todoPriority));
            });
            contentUpdater.refreshContent(list, listHead);
            clickListener();
        } else if (clickType === 'sort-date') {
            dateOrder = !dateOrder;
            list.sort(function(a,b){
                return (dateOrder ? parse(b.todoDate, 'dd/MM/yyyy', new Date()) - parse(a.todoDate, 'dd/MM/yyyy', new Date()) : parse(a.todoDate, 'dd/MM/yyyy', new Date()) - parse(b.todoDate, 'dd/MM/yyyy', new Date()));
            });
            contentUpdater.refreshContent(list, listHead);
            clickListener();
        } else if (clickType === 'add-todo') {
            if (!!document.getElementById('todo-add-form')) {
                contentUpdater.toggleTodoForm(true);
                clickListener();
            } else {
                contentUpdater.toggleTodoForm(false);
                //disable all other buttons except add/cancel??
            }            
        } else if (clickType === 'check-box') {
            
        } else if (clickType === 'todo') {
            
        } else if (clickType === 'edit') {
            
        } else if (clickType === 'delete') {
            
        } else {
            alert('unknown button!'); //
        }

    }

    function firstLoad() {
        list = filterLists.byAll();
        listHead = 'All';
        contentUpdater.refreshContent(list, listHead);
        clickListener();
    }

    function priorityScore(value) {
        if (value === 'High') {
            return 3;
        } else if (value === 'Medium') {
            return 2;
        } else if (value === 'Low') {
            return 1;
        }
    }

    return {
        clickListener,
        firstLoad,
    };

})();


const contentUpdater = (() => {

    function refreshContent(list, header) {
        document.getElementById('project-content').innerHTML = '';
        document.getElementById('cat-header').textContent = '';
        document.getElementById('todo-content').innerHTML = '';

        document.getElementById('cat-header').textContent = header;

        const todoListElem = document.createElement('div');
        todoListElem.setAttribute('class', 'todo-list');

        list.map(todoObj => {
            todoListElem.appendChild(newTodoElement(todoObj, list))
        });
        document.getElementById('todo-content').appendChild(todoListElem);
        refreshProjList();
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
            <span class="material-icons link" data-click="check-box" data-index="${todoListArr.indexOf(todoObj)}">${statusClass}</span>
            <span class="todo-title link" data-click="todo" data-index="${todoListArr.indexOf(todoObj)}">${todoObj.todoName}</span>
            <span class="sort ${todoObj.todoPriority}">${todoObj.todoPriority}</span>
            <span class="sort">${todoObj.todoDate}</span>
            <span class="material-icons link" data-click="edit" data-index="${todoListArr.indexOf(todoObj)}">note_alt</span>
            <span class="material-icons link" data-click="delete" data-index="${todoListArr.indexOf(todoObj)}">delete</span>
        `; //need correct way to index element list items
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

    function toggleProjForm(toggle) {

        if (!toggle) {
            const projContainer = document.createElement('div');
            projContainer.setAttribute('id', 'project-add-form');
            projContainer.innerHTML = `
                <form action="">
                    <label for="project-name">Project Name:</label>
                    <input type="text" id="project-name" name="projectName">
                    <div class="submit-buttons">
                        <span class="material-icons link" data-click="submit-proj">add_circle_outline</span>
                        <span class="material-icons link" data-click="cancel-proj">highlight_off</span>
                    </div>
                </form>
            `;
            document.getElementById('proj-form-container').appendChild(projContainer);
        } else {
            document.getElementById('proj-form-container').innerHTML = '';
        }

    }

    function toggleTodoForm(toggle) {

        if (!toggle) {
            const todoContainer = document.createElement('div');
            todoContainer.setAttribute('id', 'todo-add-form');
            todoContainer.innerHTML = `
                <form action="">
                    <label for="todo-name">Todo Name:</label><input type="text" id="todo-name" name="todoName">
                    <label for="todo-note">Notes:</label><textarea id="todo-note" name="todoNote" rows="3"></textarea>
                    <label for="todo-proj-name">Project:</label><input type="text" id="todo-proj-name" name="todoProjName">
                    <label for="todo-priority">Priority:</label>
                    <select name="todoPriority" id="todo-priority">
                        <option value="high">High</option>
                        <option value="med">Medium</option>
                        <option value="low">Low</option>
                    </select>
                    <label for="todo-date">Due Date:</label><input type="date" id="todo-date" name="todoDate">
                    <div class="submit-buttons">
                        <span class="material-icons link" data-click="submit-todo">add_circle_outline</span>
                        <span class="material-icons link" data-click="cancel-todo">highlight_off</span>
                    </div>
                </form>
            `;
            document.getElementById('todo-form-container').appendChild(todoContainer);
        } else {
            document.getElementById('todo-form-container').innerHTML = '';
        }

    }

    return{
        refreshContent,
        sortByUnchecked,
        toggleProjForm,
        toggleTodoForm,
    }
})();

controller.firstLoad();