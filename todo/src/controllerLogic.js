import { list, sortList } from './listLogic'
import { filterLists } from './filterLogic'
import { contentUpdater } from './contentLogic'
import { listener } from './listenerLogic'
import { format, add} from 'date-fns'

const controller = (function () {
    let tempList = [];
    let listHead = '';
    let dateOrder = true;
    let priorityOrder = true;

    function click(event) {
        const clickType = event.target.getAttribute('data-type');
        const todoID = parseInt(event.target.parentNode.getAttribute('data-index'));

        console.log(event.target.getAttribute('data-type') + ' : ' + todoID); //--------

        if (clickType === 'all') {

            contentUpdater.toggleTodoForm(true);
            contentUpdater.toggleProjForm(true);
            dateOrder = true;
            priorityOrder = true;
            tempList = filterLists.byAll();
            listHead = 'All';
            contentUpdater.refreshContent(tempList, listHead);
            listener.clickAll();

        } else if (clickType === 'today') {

            contentUpdater.toggleTodoForm(true);
            contentUpdater.toggleProjForm(true);
            dateOrder = true;
            priorityOrder = true;
            tempList = filterLists.byToday();
            listHead = 'Today';
            const sortedList = sortList.sortByUnchecked(tempList);
            contentUpdater.refreshContent(sortedList, listHead);
            listener.clickAll();

        } else if (clickType === 'week') {

            contentUpdater.toggleTodoForm(true);
            contentUpdater.toggleProjForm(true);
            priorityOrder = true;
            tempList = filterLists.byWeek();
            listHead = 'Week';
            const sortedList = sortList.sortByUnchecked(tempList);
            contentUpdater.refreshContent(sortedList, listHead);
            listener.clickAll();

        } else if (clickType === 'comp') {

            contentUpdater.toggleTodoForm(true);
            contentUpdater.toggleProjForm(true);
            dateOrder = true;
            priorityOrder = true;
            tempList = filterLists.byCompleted();
            listHead = 'Completed';
            contentUpdater.refreshContent(tempList, listHead);
            listener.clickAll();

        } else if (clickType === 'proj') {

            contentUpdater.toggleTodoForm(true);
            contentUpdater.toggleProjForm(true);
            dateOrder = true;
            priorityOrder = true;
            const projName = event.target.textContent;
            tempList = filterLists.byProject(projName);
            listHead = projName;
            const sortedList = sortList.sortByUnchecked(tempList);
            contentUpdater.refreshContent(sortedList, projName);
            listener.clickAll();

        } else if (clickType === 'add-proj') {

            refreshCurrList(listHead);
            if (!!document.getElementById('project-add-form')) {
                contentUpdater.toggleProjForm(true);
            } else {
                contentUpdater.toggleProjForm(false);
                contentUpdater.toggleTodoForm(true);
                listener.clickProj();
            }

        } else if (clickType === 'sort-priority') {

            priorityOrder = !priorityOrder;
            tempList = sortList.sortPriority(tempList, priorityOrder);
            contentUpdater.refreshContent(tempList, listHead);
            listener.clickAll();

        } else if (clickType === 'sort-date') {

            dateOrder = !dateOrder;
            tempList = sortList.sortDate(tempList, dateOrder);
            contentUpdater.refreshContent(tempList, listHead);
            listener.clickAll();

        } else if (clickType === 'add-todo') {

            refreshCurrList(listHead);
            if (!!document.getElementById('todo-add-form')) {
                contentUpdater.toggleTodoForm(true);
            } else {
                contentUpdater.toggleTodoForm(false);
                contentUpdater.toggleProjForm(true);
                listener.clickTodo();
            }

        } else if (clickType === 'check-box') {

            list.completeTodo(todoID);
            refreshCurrList(listHead);

        } else if (clickType === 'todo') {

            if (!!document.querySelector('.detail-border') && parseInt(document.querySelector('.detail-border').getAttribute('data-index')) === todoID) {
                refreshCurrList(listHead);
            } else {
                refreshCurrList(listHead);
                const todoObj = list.viewTodo(todoID);
                contentUpdater.detailElement(todoID, todoObj);
            }

        } else if (clickType === 'edit-todo') {

            refreshCurrList(listHead);
            contentUpdater.toggleProjForm(true);
            contentUpdater.toggleTodoForm(true);

            const todoObj = list.viewTodo(todoID);
            contentUpdater.detailElement(todoID, todoObj);
            contentUpdater.editForm(todoID);
            listener.clickEdit();

        } else if (clickType === 'delete-todo') {

            list.deleteTodo(todoID);
            refreshCurrList(listHead);

        } else if (clickType === 'submit-proj') {

            submitProjValue();
            listener.clickAll();

        } else if (clickType === 'cancel-proj') {

            contentUpdater.toggleProjForm(true);
            listener.clickAll();

        } else if (clickType === 'submit-todo') {

            submitTodoValues();
            listener.clickAll();

        } else if (clickType === 'cancel-todo') {

            contentUpdater.toggleTodoForm(true)
            listener.clickAll();

        } else if (clickType === 'submit-edit') {

            submitEditValues(todoID);
            listener.clickAll();

        } else if (clickType === 'cancel-edit') {

            refreshCurrList(listHead);
            listener.clickAll();

        }
    }

    function editProjName(event) {
        const projName = event.target.textContent;
        console.log(projName)//-----------
    }

    function enterValues() {
        if (!!document.getElementById('project-add-form')) {
            submitProjValue();
        } else if (!!document.getElementById('todo-add-form')) {
            submitTodoValues();
        } else if (!!document.querySelector('.detail-border')) {
            const todoID = parseInt(document.querySelector('.detail-border').getAttribute('data-index'));
            submitEditValues(todoID);
        }
    }

    function submitProjValue() {
        const inputValue = document.getElementById('project-name').value
        if (!inputValue || !inputValue.trim()) {
            contentUpdater.emptyWarning();
        } else if (!list.viewProjList().indexOf(inputValue)) {
            contentUpdater.duplicateWarning();
        } else {
            list.addProject(inputValue)
            contentUpdater.refreshProjList();
            contentUpdater.toggleProjForm(true);
        }
    }

    function submitTodoValues() {
        const nameValue = document.getElementById('todo-name').value;
        const noteValue = document.getElementById('todo-note').value;
        const projNameValue = document.getElementById('todo-proj-name').value;
        const priorityValue = document.getElementById('todo-priority').value;
        const tempDate = new Date(document.getElementById('todo-date').value);
        let dateValue = '';

        if (!isNaN(tempDate)) {
            dateValue = format(new Date(tempDate), 'dd/MM/yyyy');
        }

        if (!nameValue || !nameValue.trim()) {
            contentUpdater.emptyWarning();
        } else {
            list.addTodo(nameValue, noteValue, projNameValue, priorityValue, dateValue, false);
            refreshCurrList(listHead);
            contentUpdater.toggleTodoForm(true);
        }
    }

    function submitEditValues(id) {

        const nameEditValue  = document.getElementById('name-edit').value;
        const noteEditValue = document.getElementById('note-edit').value;
        const projEditValue = document.getElementById('proj-edit').value;
        const priorityEditValue = document.getElementById('priority-edit').value;
        const dateEditValue = document.getElementById('date-edit').value;
        let dateValue = '';

        if (isNaN(dateEditValue)) {
            dateValue = format(new Date(dateEditValue), 'dd/MM/yyyy');
        }

        if (!nameEditValue || !nameEditValue.trim()) {
            contentUpdater.emptyWarning();
        } else {
            list.modTodo(id, nameEditValue, noteEditValue, projEditValue, priorityEditValue, dateValue);
            refreshCurrList(listHead);
        }
    }

    function currList(listHead) {
        if (listHead === 'All') {
            return filterLists.byAll();
        } else if (listHead === 'Today') {
            const dayList = filterLists.byToday();
            return sortList.sortByUnchecked(dayList);
        } else if (listHead === 'Week') {
            const weekList = filterLists.byWeek();
            return sortList.sortByUnchecked(weekList);
        } else if (listHead === 'Completed') {
            return filterLists.byCompleted();
        } else {
            const projList = filterLists.byProject(listHead);
            return sortList.sortByUnchecked(projList);
        }
    }

    function refreshCurrList(listHead) {
        tempList = currList(listHead);
        contentUpdater.refreshContent(tempList, listHead);
        listener.clickAll();
    }

    function firstLoad() {
        tempList = filterLists.byAll();
        listHead = 'All';
        contentUpdater.refreshContent(tempList, listHead);
        listener.clickAll();
        listener.enterKey();
    }

    return {
        click,
        editProjName,
        enterValues,
        firstLoad,
    }

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

export { controller }