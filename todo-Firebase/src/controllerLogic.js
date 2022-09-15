import { list, sortList } from './listLogic'
import { contentUpdater } from './contentLogic'
import { listener } from './listenerLogic'
import { format } from 'date-fns'
import { firebase } from './fireBaseLogic'
import { filterLists } from './filterLogic'

const controller = (function () {
    let tempList = [];
    let listHead = '';
    let currProjName = '';
    let dateOrder = true;
    let priorityOrder = true;

    function click(event) {
        const clickType = event.target.getAttribute('data-type');
        const indexID = parseInt(event.target.parentNode.getAttribute('data-index'));

        if (clickType === 'all') {

            dateOrder = true;
            priorityOrder = true;
            tempList = filterLists.byAll();
            listHead = 'All';
            contentUpdater.refreshContent(tempList, listHead);
            listener.clickAll();

        } else if (clickType === 'today') {

            dateOrder = true;
            priorityOrder = true;
            tempList = filterLists.byToday();
            listHead = 'Today';
            const sortedList = sortList.sortByUnchecked(tempList);
            contentUpdater.refreshContent(sortedList, listHead);
            listener.clickAll();

        } else if (clickType === 'week') {

            priorityOrder = true;
            tempList = filterLists.byWeek();
            listHead = 'Week';
            const sortedList = sortList.sortByUnchecked(tempList);
            contentUpdater.refreshContent(sortedList, listHead);
            listener.clickAll();

        } else if (clickType === 'comp') {

            dateOrder = true;
            priorityOrder = true;
            tempList = filterLists.byCompleted();
            listHead = 'Completed';
            contentUpdater.refreshContent(tempList, listHead);
            listener.clickAll();

        } else if (clickType === 'proj') {

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
            contentUpdater.toggleProjForm(false);
            listener.clickProj();

        } else if (clickType === 'edit-proj') {

            const projList = list.viewProjList();
            currProjName = projList[indexID];
            refreshCurrList(currProjName);
            contentUpdater.editProjForm(indexID, currProjName);
            listener.clickEditProj();

        } else if (clickType === 'delete-proj') {

            const projList = list.viewProjList();
            currProjName = projList[indexID];
            refreshCurrList(currProjName);
            contentUpdater.deleteProjectForm(indexID, list.viewProjList()[indexID]);
            listener.clickDelProj();

        } else if (clickType === 'del-proj-name') {

            list.deleteProject(indexID);
            contentUpdater.refreshProjList();
            listHead  = 'All';
            refreshCurrList(listHead);
            document.getElementById('proj-del-form').remove();
            listener.clickAll();

        } else if (clickType === 'del-proj-todo') {

            list.deleteProjTodos(indexID);
            contentUpdater.refreshProjList();
            listHead  = 'All';
            refreshCurrList(listHead);
            document.getElementById('proj-del-form').remove();
            listener.clickAll();

        } else if (clickType === 'del-proj-cancel') {

            document.getElementById('proj-del-form').remove();
            listener.clickAll();

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
            contentUpdater.toggleTodoForm(false, listHead);
            listener.clickTodo();

        } else if (clickType === 'check-box') {

            list.completeTodo(indexID);
            refreshCurrList(listHead);

        } else if (clickType === 'todo') {

            if (!!document.querySelector('.detail-border') && parseInt(document.querySelector('.detail-border').getAttribute('data-index')) === indexID) {
                refreshCurrList(listHead);
            } else {
                refreshCurrList(listHead);
                const todoObj = list.viewTodo(indexID);
                contentUpdater.detailElement(indexID, todoObj);
            }

        } else if (clickType === 'edit-todo') {

            refreshCurrList(listHead);
            const todoObj = list.viewTodo(indexID);
            contentUpdater.detailElement(indexID, todoObj);
            contentUpdater.editTodoForm(indexID);
            listener.clickEditTodo();

        } else if (clickType === 'delete-todo') {

            contentUpdater.confirmDelTodo(indexID);
            listener.clickDelTodo();

        } else if (clickType === 'submit-del-todo') {

            list.deleteTodo(indexID);
            refreshCurrList(listHead);
            document.getElementById('todo-del-form').remove();
            listener.clickAll();

        } else if (clickType === 'cancel-del-todo') {

            document.getElementById('todo-del-form').remove();
            listener.clickAll();

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

        } else if (clickType === 'submit-edit-todo') {

            submitEditTodo(indexID);
            listener.clickAll();

        } else if (clickType === 'cancel-edit-todo') {

            refreshCurrList(listHead);
            listener.clickAll();

        } else if (clickType === 'submit-edit-proj') {

            submitEditProj(indexID, currProjName);
            listener.clickAll();

        } else if (clickType === 'cancel-edit-proj') {

            document.getElementById('proj-edit-form').remove();
            listener.clickAll();

        } else if (clickType === 'sign-in') {

            firebase.signIn();

        } else if (clickType === 'sign-out') {

            firebase.signOutUser();

        } else {
            console.log("Error: Unknown click");
        }
    }

    function enterValues() {
        if (!!document.getElementById('proj-add-form')) {
            submitProjValue();
            listener.clickAll();
        } else if (!!document.getElementById('todo-add-form')) {
            submitTodoValues();
            listener.clickAll();
        } else if (!!document.querySelector('.detail-border #name-edit')) {
            const indexID = parseInt(document.querySelector('.detail-border').getAttribute('data-index'));
            submitEditTodo(indexID);
            listener.clickAll();
        } else if (!!document.getElementById('proj-edit-form')) {
            const index = document.getElementById('proj-edit-form').getAttribute('data-index');
            submitEditProj(index, currProjName);
            listener.clickAll();
        }
    }

    function submitProjValue() {
        const nameValue = document.getElementById('proj-name').value.trim();
        if (!nameValue || !nameValue.trim()) {
            contentUpdater.emptyWarning();
        } else if (list.viewProjList().findIndex(projName => projName.toLowerCase() === nameValue.toLowerCase()) === -1) {
            list.addProject(nameValue);
            contentUpdater.refreshProjList();
            listHead = nameValue;
            refreshCurrList(listHead);
            contentUpdater.toggleProjForm(true);
        } else {
            contentUpdater.duplicateWarning();
        }
    }

    function submitEditProj(index, currProjName) {
        const nameValue = document.getElementById('edit-proj-name').value.trim();
        if (!nameValue || !nameValue.trim()) {
            contentUpdater.emptyWarning();
        } else if (list.viewProjList().findIndex(projName => projName.toLowerCase() === nameValue.toLowerCase()) === -1) {
            list.editProjectName(index, nameValue);
            updateTodoProjName(currProjName, nameValue)
            contentUpdater.refreshProjList();
            listHead = nameValue;
            refreshCurrList(listHead);
            document.getElementById('proj-edit-form').remove();
        } else {
            contentUpdater.duplicateWarning();
        }
    }

    function updateTodoProjName(oldName, newName) {
        let indexArray = list.viewTodoList()
        .filter(todoObj => todoObj.todoProjName === oldName)
        .map(todoObj => todoObj.todoID);
        indexArray.map(index => list.modTodo(index, newName, list.viewTodo(index).todoName, list.viewTodo(index).todoNote, list.viewTodo(index).todoPriority, list.viewTodo(index).todoDate));
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

    function submitEditTodo(id) {

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
            list.modTodo(id, projEditValue, nameEditValue, noteEditValue, priorityEditValue, dateValue);
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
        list.loadList();
        tempList = filterLists.byAll();
        listHead = 'All';
        contentUpdater.refreshContent(tempList, listHead);
        listener.clickAll();
        listener.enterKey();
    }

    return {
        click,
        enterValues,
        firstLoad,
    }

})();

firebase.initFirebaseAuth();
controller.firstLoad();

export { controller };