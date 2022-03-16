import { list, sortList } from './listLogic'
import { filterLists } from './filterLogic'
import { contentUpdater } from './contentLogic'
import { format, add } from 'date-fns'

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

        //only 1 ID attribute required at wrapping div of todo
        //searchID can be found and used for any child element-------------
        const searchID = parseInt(event.target.getAttribute('data-index'));

        console.log(event.target.getAttribute('data-click'));//--------

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
            const sortedList = sortList.sortByUnchecked(tempList);
            contentUpdater.refreshContent(sortedList, listHead);
            clickListener();

        } else if (clickType === 'week') {

            dateOrder = true;
            priorityOrder = true;
            tempList = filterLists.byWeek();
            listHead = 'Week';
            const sortedList = sortList.sortByUnchecked(tempList);
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
            const sortedList = sortList.sortByUnchecked(tempList);
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
            tempList = sortList.sortPriority(tempList, priorityOrder);
            contentUpdater.refreshContent(tempList, listHead);
            clickListener();

        } else if (clickType === 'sort-date') {

            dateOrder = !dateOrder;
            tempList = sortList.sortDate(tempList, dateOrder);
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

            list.completeTodo(searchID);
            currList();
            contentUpdater.refreshContent(tempList, listHead)
            clickListener();
            
        } else if (clickType === 'todo') {

            const todoObj = list.viewTodo(searchID);
            contentUpdater.detailElement(searchID, todoObj);
            
        } else if (clickType === 'edit-todo') {

            //refresh current list content on click
            currList(); 
            contentUpdater.refreshContent(tempList, listHead)
            clickListener();

            //bring up detail card of todo
            const todoObj = list.viewTodo(searchID);
            contentUpdater.detailElement(searchID, todoObj);
            //add submit and cancel buttons
            const todoForm = document.querySelector(`[data-index="${searchID}"][class="detail-border"]`);
            const buttonElem = `
                <div class="submit-buttons">
                    <span class="material-icons link" data-click="submit-proj">add_circle_outline</span>
                    <span class="material-icons link" data-click="cancel-proj">highlight_off</span>
                </div>
            `;
            todoForm.insertAdjacentHTML('beforeend', buttonElem);

            //disable all other buttons except those on detail card - clicklistener

            //replace elements with inputs
            const nameElem = document.querySelector(`[data-click="todo"][data-index="${searchID}"]`);
            const nameInput = document.createElement('input');
            nameElem.setAttribute('id', 'nameEdit');
            nameElem.setAttribute('data-index', searchID);
            nameElem.setAttribute('value', nameElem.textContent);
            nameElem.parentNode.replaceChild(nameInput, nameElem);

            const priorityElem = document.querySelector(`[data-index="${searchID}"] .sort`);
            console.log(priorityElem)

            //if cancel action - refresh current list
            //if submit, then mod todo and refresh list

            
        } else if (clickType === 'delete-todo') {

            list.deleteTodo(searchID);
            currList();
            contentUpdater.refreshContent(tempList, listHead);
            clickListener();
            
        } else if (clickType === 'submit-proj') {

            submitProjValue();
            
        } else if (clickType === 'cancel-proj') {

            contentUpdater.toggleProjForm(true);

        } else if (clickType === 'submit-todo') {

            submitTodoValues();
            
        } else if (clickType === 'cancel-todo') {

            contentUpdater.toggleTodoForm(true);
            
        } else if (clickType === 'submit-edit') {

            
            
        } else if (clickType === 'cancel-edit') {

            
            
        } else {

            console.log('unknown: ' + event.target.getAttribute('data-click')); //---------

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
        } else if (!list.viewProjList().indexOf(inputValue)) {
            contentUpdater.duplicateWarning();
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
            currList();
            contentUpdater.refreshContent(tempList, listHead);
            contentUpdater.toggleTodoForm(true);
        }
        clickListener();

    }

    function currList() {

        if (listHead === 'All') {
            tempList = filterLists.byAll();
        } else if (listHead === 'Today' ){
            const dayList = filterLists.byToday();
            tempList = sortList.sortByUnchecked(dayList);
        } else if (listHead === 'Week' ){
            const weekList = filterLists.byWeek();
            tempList = sortList.sortByUnchecked(weekList);
        } else if (listHead === 'Completed' ){
            tempList = filterLists.byCompleted();
        } else {
           const projList = filterLists.byProject(listHead);
           tempList = sortList.sortByUnchecked(projList);
        }
        
    }

    function firstLoad() {
        tempList = filterLists.byAll();
        listHead = 'All';
        contentUpdater.refreshContent(tempList, listHead);
        clickListener();
        enterListener();
    }
    
    return {
        clickListener,
        firstLoad,
    };

})();

function demoValues() {
    const a = format(add(Date.now(), {days: 0}), 'dd/MM/yyyy');
    const b = format(add(Date.now(), {days: 0}), 'dd/MM/yyyy');
    const c = format(add(Date.now(), {days: 2}), 'dd/MM/yyyy');
    const d = format(add(Date.now(), {days: 3}), 'dd/MM/yyyy');
    const e = format(add(Date.now(), {days: 4}), 'dd/MM/yyyy');
    const f = format(add(Date.now(), {days: 10}), 'dd/MM/yyyy');

    list.addProject('Demo');
    list.addTodo('Something', '', 'Demo', '', '', false);
    list.addTodo('Laundry', '2x loads', 'Demo', 'High', a, true);
    list.addTodo('Tidy up', 'Kitchen and living room', 'Demo', 'Medium', b, false);
    list.addTodo('Vacuum House', 'Whole house', 'Demo', 'Low', c, false);
    list.addTodo('Go running', '5km', 'Demo', 'Low', d, false);
    list.addTodo('Update CV', '', 'Demo', 'High', e, true);
    list.addTodo('Cut grass', '', 'Demo', 'Medium', f, false);
}

demoValues();
controller.firstLoad();
