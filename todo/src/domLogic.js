import { list } from './listLogic'
import { filterLists } from './filterLogic'
import { isToday, isThisWeek, format, parse} from 'date-fns'

const controller = (() => {
    let tempList = [];
    let listHead = '';
    let dateOrder = true;
    let priorityOrder = true;

    function clickListener() {
        const link = document.querySelectorAll('.link');
        link.forEach(element => element.addEventListener('click', clickController));
    };

    function enterListener() {
        document.addEventListener("keydown", function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                enterKey();
            }
        });
    }

    function clickController(event) {
        const clickType = event.target.getAttribute('data-click');
        
        console.log(event.target.getAttribute('data-click'));//

        if (clickType === 'all') {

            dateOrder = true;
            priorityOrder = true;
            tempList = filterLists.byAll();
            listHead = 'All';
            contentUpdater.refreshContent(tempList, listHead);
            clickListener();

        } else if (clickType === 'today') {

            dateOrder = true;
            priorityOrder = true;
            tempList = filterLists.byToday();
            listHead = 'Today';
            const sortedList = contentUpdater.sortByUnchecked(tempList);
            contentUpdater.refreshContent(sortedList, listHead);
            clickListener();

        } else if (clickType === 'week') {

            dateOrder = true;
            priorityOrder = true;
            tempList = filterLists.byWeek();
            listHead = 'Week';
            const sortedList = contentUpdater.sortByUnchecked(tempList);
            contentUpdater.refreshContent(sortedList, listHead);
            clickListener();

        } else if (clickType === 'comp') {

            dateOrder = true;
            priorityOrder = true;
            tempList = filterLists.byCompleted()
            listHead = 'Completed';
            contentUpdater.refreshContent(tempList, listHead);
            clickListener();
            
        } else if (clickType === 'proj') {

            dateOrder = true;
            priorityOrder = true;
            const projName = event.target.textContent;
            tempList = filterLists.byProject(projName);
            listHead = projName;
            const sortedList = contentUpdater.sortByUnchecked(tempList);
            contentUpdater.refreshContent(sortedList, projName);
            clickListener();

        } else if (clickType === 'add-proj') {

            if (!!document.getElementById('project-add-form')) {
                contentUpdater.toggleProjForm(true);
            } else {
                contentUpdater.toggleProjForm(false);
                contentUpdater.toggleTodoForm(true);
                clickListener();
                //disable all other buttons except add/cancel??
            }

        } else if (clickType === 'sort-priority') {

            priorityOrder = !priorityOrder;
            tempList.sort(function(a,b){
                return (priorityOrder ? priorityScore(a.todoPriority) - priorityScore(b.todoPriority) : priorityScore(b.todoPriority) - priorityScore(a.todoPriority));
            });
            contentUpdater.refreshContent(tempList, listHead);
            clickListener();

        } else if (clickType === 'sort-date') {

            dateOrder = !dateOrder;
            tempList.sort(function(a,b){
                return (dateOrder ? parse(b.todoDate, 'dd/MM/yyyy', new Date()) - parse(a.todoDate, 'dd/MM/yyyy', new Date()) : parse(a.todoDate, 'dd/MM/yyyy', new Date()) - parse(b.todoDate, 'dd/MM/yyyy', new Date()));
            });
            contentUpdater.refreshContent(tempList, listHead);
            clickListener();

        } else if (clickType === 'add-todo') {

            if (!!document.getElementById('todo-add-form')) {
                contentUpdater.toggleTodoForm(true);
            } else {
                contentUpdater.toggleTodoForm(false);
                contentUpdater.toggleProjForm(true);
                clickListener();
                //disable all other buttons except add/cancel??
            }        

        } else if (clickType === 'check-box') {


            
        } else if (clickType === 'todo') {


            
        } else if (clickType === 'edit') {


            
        } else if (clickType === 'delete') {


            
        } else if (clickType === 'submit-proj') {

            submitProjValue();
            
        } else if (clickType === 'cancel-proj') {

            contentUpdater.toggleProjForm(true);

        } else if (clickType === 'submit-todo') {

            submitTodoValues();
            
        } else if (clickType === 'cancel-todo') {

            contentUpdater.toggleTodoForm(true);
            
        } else {

            console.log(event.target.getAttribute('data-click')); //

        }

    }

    function enterKey() {

        if (!!document.getElementById('project-add-form')) {
            submitProjValue();
        } else if (!!document.getElementById('todo-add-form')) {
            submitTodoValues();
        }

    }

    function submitProjValue() {

        const inputValue = document.getElementById('project-name').value;
        if (inputValue === '') {
            contentUpdater.emptyWarning();
        } else {
            list.addProject(inputValue);
            contentUpdater.refreshProjList();
            contentUpdater.toggleProjForm(true);
        }
        clickListener();

    }

    function submitTodoValues() {

        const nameValue = document.getElementById('todo-name').value;
        const noteValue = document.getElementById('todo-note').value;
        const projNameValue = document.getElementById('todo-proj-name').value;
        const priorityValue = document.getElementById('todo-priority').value;
        const tempDate = new Date(document.getElementById('todo-date').value);
        let dateValue = '';
        
        if (!isNaN(tempDate)) {
        dateValue = format(new Date(document.getElementById('todo-date').value), 'dd/MM/yyyy');
        }

        if (nameValue === '') {
            contentUpdater.emptyWarning();
        } else {
            list.addTodo(nameValue, noteValue, projNameValue, priorityValue, dateValue, false);

            if (listHead === 'All') {
                tempList = filterLists.byAll();
            } else if (listHead === 'Today' ){
                const dayList = filterLists.byToday();
                tempList = contentUpdater.sortByUnchecked(dayList);
            } else if (listHead === 'Week' ){
                const weekList = filterLists.byWeek();
                tempList = contentUpdater.sortByUnchecked(weekList);
            } else if (listHead === 'Completed' ){
                tempList = filterLists.byCompleted();
            } else {
               const projList = filterLists.byProject(listHead);
               tempList = contentUpdater.sortByUnchecked(projList);
            }

            contentUpdater.refreshContent(tempList, listHead);
            contentUpdater.toggleTodoForm(true);
        }
        clickListener();

    }

    function firstLoad() {
        tempList = filterLists.byAll();
        listHead = 'All';
        contentUpdater.refreshContent(tempList, listHead);
        clickListener();
        enterListener();
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

    function refreshContent(tempList, header) {
        document.getElementById('project-content').innerHTML = '';
        document.getElementById('cat-header').textContent = '';
        document.getElementById('todo-content').innerHTML = '';

        document.getElementById('cat-header').textContent = header;

        const todoListElem = document.createElement('div');
        todoListElem.setAttribute('class', 'todo-list');

        tempList.map(todoObj => {
            todoListElem.appendChild(newTodoElement(todoObj, tempList))
        });
        document.getElementById('todo-content').appendChild(todoListElem);
        refreshProjList();
    }

    function sortByUnchecked(tempList) {
        const incompList = tempList.filter(todoObj => !todoObj.todoStatus);
        const compList = tempList.filter(todoObj => todoObj.todoStatus);
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
        document.getElementById('project-content').innerHTML = '';

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
                    <input type="text" id="project-name">
                    <div id="warning"></div>
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
                    <label for="todo-name">Todo Name:</label><input type="text" id="todo-name">
                    <div id="warning"></div>
                    <label for="todo-note">Notes:</label><textarea id="todo-note" rows="3"></textarea>
                    <label for="todo-proj-name">Project:</label><input type="text" id="todo-proj-name">
                    <label for="todo-priority">Priority:</label>
                    <select id="todo-priority">
                        <option disabled selected value></option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    <label for="todo-date">Due Date:</label><input type="date" id="todo-date">
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

    function emptyWarning() {
        document.getElementById('warning').textContent = '*Name cannot be empty*'
    }

    return{
        refreshContent,
        refreshProjList,
        sortByUnchecked,
        toggleProjForm,
        toggleTodoForm,
        emptyWarning,
    }
})();

controller.firstLoad();