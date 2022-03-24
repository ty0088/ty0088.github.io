import { list } from './listLogic'
import { format, parse } from 'date-fns'

const contentUpdater = (function () {

    function refreshContent(tempList, header) {
        document.getElementById('project-content').innerHTML = '';
        document.getElementById('cat-header').textContent = '';
        document.getElementById('todo-content').innerHTML = '';

        document.getElementById('cat-header').textContent = header;

        const todoListElem = document.createElement('div');
        todoListElem.setAttribute('class', 'todo-list');

        tempList.map(todoObj => {
            todoListElem.appendChild(newTodoElement(todoObj));
        });
        document.getElementById('todo-content').appendChild(todoListElem);
        refreshProjList();
    }

    function newTodoElement(todoObj) {
        const todoContainer = document.createElement('div');
        todoContainer.setAttribute('data-index', todoObj.todoID);
        todoContainer.setAttribute('class', 'todo-container');
        const todoElem = document.createElement('div');
        todoElem.setAttribute('class', 'todo');
        todoElem.setAttribute('data-index', todoObj.todoID);

        const statusClass = (todoObj.todoStatus) ? 'check_box' : 'check_box_outline_blank';

        todoElem.innerHTML = `
            <span class="material-icons link" data-type="check-box">${statusClass}</span>
            <span class="todo-title link" data-type="todo">${todoObj.todoName}</span>
            <span class="sort ${todoObj.todoPriority}" data-type="priority">${todoObj.todoPriority}</span>
            <span class="sort" data-type="date">${todoObj.todoDate}</span>
            <span class="material-icons link" data-type="edit-todo">note_alt</span>
            <span class="material-icons link" data-type="delete-todo">delete</span>
        `;
        todoContainer.appendChild(todoElem);
        return todoContainer;
    }

    function detailElement(id, todoObj) {

        const findElem = document.querySelector(`[data-index="${id}"][class="todo-container"]`);
        findElem.classList.add('detail-border');

        const detailElem = `
            <div id="warning"></div>
            <div class="detail"><span>Project: </span><span data-type="proj-name">${todoObj.todoProjName}</span></div>
            <div class="detail"><span>Notes: </span><span data-type="note">${todoObj.todoNote}</span></div>
        `;
        findElem.insertAdjacentHTML('beforeend', detailElem);

    }

    function refreshProjList() {
        const projListArr = list.viewProjList();
        document.getElementById('project-content').innerHTML = '';

        const projListElem = document.createElement('div');
        projListElem.setAttribute('class', 'project-list');
        const projHeader = document.createElement('div');
        projHeader.setAttribute('class', 'header');
        projHeader.textContent = 'Projects';
        projListElem.appendChild(projHeader);

        projListArr.map(proj => {
            const projElem = document.createElement('div');
            projElem.setAttribute('class', 'project-link');
            projElem.setAttribute('data-index', projListArr.indexOf(proj))
            projElem.innerHTML = `
                <span class="material-icons">format_list_bulleted</span>
                <span class="project-title link" data-type="proj">${proj}</span>
                <span class="material-icons link" data-type="edit-proj">note_alt</span>
                <span class="material-icons link" data-type="delete-proj">delete</span>
            `;
            projListElem.appendChild(projElem);
        });

        document.getElementById('project-content').appendChild(projListElem);
    }

    function editProjForm(index, projName) {
        const projLinkElem = document.querySelector(`.project-link[data-index="${index}"]`);
        const rectPos = projLinkElem.getBoundingClientRect();

        const editProjForm = document.createElement('div');
        editProjForm.setAttribute('id', 'proj-edit-form');
        editProjForm.setAttribute('data-index', index);
        editProjForm.style.top  = `${rectPos.top-25}px`;
        editProjForm.style.left  = `${rectPos.left+200}px`;
        editProjForm.innerHTML  = `
            <label for="edit-proj-name">Edit Project Name:</label>
            <input type="text" id="edit-proj-name" value="${projName}">
            <div id="warning"></div>
            <div class="submit-buttons" data-index="${index}">
                <span class="material-icons link" data-type="submit-edit-proj">add_circle_outline</span>
                <span class="material-icons link" data-type="cancel-edit-proj">highlight_off</span>
            </div>
        `;
        document.getElementById('main-container').appendChild(editProjForm);
    }

    function deleteProjectForm(index, projName) {
        const projLinkElem = document.querySelector(`.project-link[data-index="${index}"]`);
        const rectPos = projLinkElem.getBoundingClientRect();

        const delProjForm = document.createElement('div');
        delProjForm.setAttribute('id', 'proj-del-form');
        delProjForm.setAttribute('data-index', index);
        delProjForm.style.top  = `${rectPos.top-33}px`;
        delProjForm.innerHTML = `
            <span class="link" data-type="del-proj-name">Delete "${projName}" but keep Todos</span>
            <span class="link" data-type="del-proj-todo">Delete "${projName}" and Todos</span>
            <span class="material-icons link" data-type="del-proj-cancel">highlight_off</span>
        `;
        document.getElementById('main-container').appendChild(delProjForm);
    }

    function editTodoForm(indexID) {
        const todoForm = document.querySelector(`[data-index="${indexID}"].detail-border`);
        const buttonElem = `
             <div class="submit-buttons" data-index="${indexID}">
                 <span class="material-icons link" data-type="submit-edit-todo">add_circle_outline</span>
                 <span class="material-icons link" data-type="cancel-edit-todo">highlight_off</span>
             </div>
         `;
        todoForm.insertAdjacentHTML('beforeend', buttonElem);
        
        const nameElem = document.querySelector(`[data-index="${indexID}"] [data-type="todo"]`);
        const nameInput = document.createElement('input');
        nameInput.setAttribute('id', 'name-edit');
        nameInput.setAttribute('value', nameElem.textContent);
        nameElem.parentNode.replaceChild(nameInput, nameElem);
        
        const priorityElem = document.querySelector(`[data-index="${indexID}"] [data-type="priority"]`);
        const priorityInput = document.createElement('select');
        priorityInput.setAttribute('id', 'priority-edit');
        const noPriority = document.createElement('option');
        noPriority.setAttribute('value', '');
        priorityInput.appendChild(noPriority);
        const highPriority = document.createElement('option');
        highPriority.setAttribute('value', 'High');
        highPriority.innerText = 'High';
        priorityInput.appendChild(highPriority);
        const medPriority = document.createElement('option');
        medPriority.setAttribute('value', 'Medium');
        medPriority.innerText = 'Medium';
        priorityInput.appendChild(medPriority);
        const lowPriority = document.createElement('option');
        lowPriority.setAttribute('value', 'Low');
        lowPriority.innerText = 'Low';
        priorityInput.appendChild(lowPriority);
        priorityElem.parentNode.replaceChild(priorityInput, priorityElem);
        const currPriority = priorityElem.textContent;
        const priorityOption = document.querySelector(`#priority-edit option[value="${currPriority}"]`);
        priorityOption.setAttribute('selected', 'selected');
        
        const dateElem = document.querySelector(`[data-index="${indexID}"] [data-type="date"]`);
        const dateInput = document.createElement('input');
        dateInput.setAttribute('type', 'date');
        dateInput.setAttribute('id', 'date-edit');
        const currDate = dateElem.textContent;
        let newDate = '';
        if (isNaN(currDate)) {
            newDate = format(parse(dateElem.textContent, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd');
        }
        dateInput.setAttribute('value', newDate);
        dateElem.parentNode.replaceChild(dateInput, dateElem);
        
        const projElem = document.querySelector(`[data-index="${indexID}"] [data-type="proj-name"]`);
        const projInput = document.createElement('select');
        projInput.setAttribute('id', 'proj-edit');
        const blankOption = document.createElement('option');
        blankOption.setAttribute('value', '');
        projInput.appendChild(blankOption);
        let tempProjList = list.viewProjList();
        tempProjList.map(projName => {
            const projOption = document.createElement('option');
            projOption.setAttribute('value', projName);
            projOption.textContent = projName;
            projInput.appendChild(projOption);
        });
        projElem.parentNode.replaceChild(projInput, projElem);
        const currProj = projElem.textContent;
        const projOption = document.querySelector(`#proj-edit option[value="${currProj}"]`);
        projOption.setAttribute('selected', 'selected');
        
        const noteElem = document.querySelector(`[data-index="${indexID}"] [data-type="note"]`);
        const noteInput = document.createElement('textarea');
        noteInput.setAttribute('id', 'note-edit');
        noteInput.setAttribute('rows', '1');
        noteElem.parentNode.replaceChild(noteInput, noteElem);
        noteInput.value = noteElem.textContent;
    }

    function confirmDelTodo(index) {
        const LinkElem = document.querySelector(`[data-index="${index}"] [data-type="delete-todo"]`);
        const rectPos = LinkElem.getBoundingClientRect();

        const delTodoForm = document.createElement('div');
        delTodoForm.setAttribute('id', 'todo-del-form');
        delTodoForm.setAttribute('data-index', index);
        delTodoForm.style.top  = `${rectPos.top-15}px`;
        delTodoForm.style.left  = `${rectPos.left-160}px`;
        delTodoForm.innerHTML = `
            <span>Confirm delete?</span>
            <div data-index="${index}">
                <span class="material-icons link" data-type="submit-del-todo">add_circle_outline</span>
                <span class="material-icons link" data-type="cancel-del-todo">highlight_off</span>
            </div>
        `;
        document.getElementById('main-container').appendChild(delTodoForm);
    }

    function toggleProjForm(toggle) {
        if (!toggle) {
            const projContainer = document.createElement('div');
            projContainer.setAttribute('id', 'proj-add-form');
            projContainer.innerHTML = `
                <form action="">
                    <label for="proj-name">Project Name:</label>
                    <input type="text" id="proj-name">
                    <div id="warning"></div>
                    <div class="submit-buttons">
                        <span class="material-icons link" data-type="submit-proj">add_circle_outline</span>
                        <span class="material-icons link" data-type="cancel-proj">highlight_off</span>
                    </div>
                </form>
            `;
            document.getElementById('proj-form-container').appendChild(projContainer);
        } else {
            document.getElementById('proj-form-container').innerHTML = '';
        }
    }

    function toggleTodoForm(toggle, projName) {
        if (!toggle) {
            const formElem = document.createElement('form');
            const nameLabel = document.createElement('label');
            nameLabel.setAttribute('for', 'todo-name');
            nameLabel.innerText = 'Todo Name:';
            formElem.appendChild(nameLabel);
            const nameInput = document.createElement('input');
            nameInput.setAttribute('type', 'text');
            nameInput.setAttribute('id', 'todo-name');
            formElem.appendChild(nameInput);

            const warningElem = document.createElement('div');
            warningElem.setAttribute('id', 'warning');
            formElem.appendChild(warningElem);

            const noteLabel = document.createElement('label');
            noteLabel.setAttribute('for', 'todo-note');
            noteLabel.innerText = 'Notes:';
            formElem.appendChild(noteLabel);
            const noteInput = document.createElement('textarea');
            noteInput.setAttribute('id', 'todo-note');
            noteInput.setAttribute('rows', '3');
            formElem.appendChild(noteInput);

            const projLabel = document.createElement('label');
            projLabel.setAttribute('for', 'todo-proj-name');
            projLabel.innerText = 'Project:';
            formElem.appendChild(projLabel);
            const projInput = document.createElement('select');
            projInput.setAttribute('id', 'todo-proj-name');
            const blankOption = document.createElement('option');
            blankOption.setAttribute('value', '');
            projInput.appendChild(blankOption);
            let tempProjList = list.viewProjList();
            tempProjList.map(projName => {
                const projOption = document.createElement('option');
                projOption.setAttribute('value', projName);
                projOption.textContent = projName;
                projInput.appendChild(projOption);
            });
            formElem.appendChild(projInput);

            const priorityLabel = document.createElement('label');
            priorityLabel.setAttribute('for', 'todo-priority');
            priorityLabel.innerText = 'Priority:';
            formElem.appendChild(priorityLabel);
            const priorityInput = document.createElement('select');
            priorityInput.setAttribute('id', 'todo-priority');
            const noPriority = document.createElement('option');
            noPriority.setAttribute('value', '');
            priorityInput.appendChild(noPriority);
            const highPriority = document.createElement('option');
            highPriority.setAttribute('value', 'High');
            highPriority.innerText = 'High';
            priorityInput.appendChild(highPriority);
            const medPriority = document.createElement('option');
            medPriority.setAttribute('value', 'Medium');
            medPriority.innerText = 'Medium';
            priorityInput.appendChild(medPriority);
            const lowPriority = document.createElement('option');
            lowPriority.setAttribute('value', 'Low');
            lowPriority.innerText = 'Low';
            priorityInput.appendChild(lowPriority);
            formElem.appendChild(priorityInput);

            const dateLabel = document.createElement('label');
            dateLabel.setAttribute('for', 'todo-date');
            dateLabel.innerText = 'Due Date:';
            formElem.appendChild(dateLabel);
            const dateInput = document.createElement('input');
            dateInput.setAttribute('type', 'date');
            dateInput.setAttribute('id', 'todo-date');
            formElem.appendChild(dateInput);

            const subButtons = document.createElement('div');
            subButtons.setAttribute('class', 'submit-buttons');
            const addIcon = document.createElement('span');
            addIcon.setAttribute('class', 'material-icons link');
            addIcon.setAttribute('data-type', 'submit-todo');
            addIcon.innerText = 'add_circle_outline';
            subButtons.appendChild(addIcon);
            const cancelButton = document.createElement('span');
            cancelButton.setAttribute('class', 'material-icons link');
            cancelButton.setAttribute('data-type', 'cancel-todo');
            cancelButton.innerText = 'highlight_off';
            subButtons.appendChild(cancelButton);
            formElem.appendChild(subButtons);

            const todoContainer = document.createElement('div');
            todoContainer.setAttribute('id', 'todo-add-form');
            todoContainer.appendChild(formElem);

            document.getElementById('todo-form-container').appendChild(todoContainer);

            if (projName !== 'All' && projName !== 'Today' && projName !== 'Week' && projName !== 'Completed') {
                console.log(projName)
                const defaultProjOption = document.querySelector(`#todo-proj-name option[value="${projName}"]`);
                defaultProjOption.setAttribute('selected', 'selected');
            }
        } else {
            document.getElementById('todo-form-container').innerHTML = '';
        }
    }

    function emptyWarning() {
        document.getElementById('warning').textContent = '*Name cannot be empty*';
    }

    function duplicateWarning() {
        document.getElementById('warning').textContent = '*Name already exists*';
    }

    return {
        refreshContent,
        refreshProjList,
        toggleProjForm,
        toggleTodoForm,
        emptyWarning,
        duplicateWarning,
        detailElement,
        editTodoForm,
        editProjForm,
        deleteProjectForm,
        confirmDelTodo,
    };
})();

export { contentUpdater }