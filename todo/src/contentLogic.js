import { list } from './listLogic'

const contentUpdater = (() => {

    function refreshContent(tempList, header) {
        document.getElementById('project-content').innerHTML = '';
        document.getElementById('cat-header').textContent = '';
        document.getElementById('todo-content').innerHTML = '';

        document.getElementById('cat-header').textContent = header;

        const todoListElem = document.createElement('div');
        todoListElem.setAttribute('class', 'todo-list');

        tempList.map(todoObj => {
            todoListElem.appendChild(newTodoElement(todoObj))
        });
        document.getElementById('todo-content').appendChild(todoListElem);
        refreshProjList();
    }

    function newTodoElement(todoObj) {
        const todoContainer = document.createElement('div');
        todoContainer.setAttribute('data-index', todoObj.todoID);
        const todoElem = document.createElement('div');
        todoElem.setAttribute('class', 'todo');
        todoElem.setAttribute('data-index', todoObj.todoID);

        const statusClass = (todoObj.todoStatus) ? 'check_box' : 'check_box_outline_blank';

        todoElem.innerHTML = `
            <span class="material-icons link" data-click="check-box" data-index="${todoObj.todoID}">${statusClass}</span>
            <span class="todo-title link" data-click="todo" data-index="${todoObj.todoID}">${todoObj.todoName}</span>
            <span class="sort ${todoObj.todoPriority}">${todoObj.todoPriority}</span>
            <span class="sort">${todoObj.todoDate}</span>
            <span class="material-icons link" data-click="edit-todo" data-index="${todoObj.todoID}">note_alt</span>
            <span class="material-icons link" data-click="delete-todo" data-index="${todoObj.todoID}">delete</span>
        `; 
        todoContainer.appendChild(todoElem);
        return todoContainer;
    }

    function detailElement(id, todoObj) {
        const existDetail = document.querySelectorAll('.detail');
        existDetail.forEach(elem => elem.remove());
        const existBorder = document.querySelectorAll('.detail-border');
        existBorder.forEach(elem => elem.classList.remove('detail-border'))

        const findElem = document.querySelector(`[data-index="${id}"]`);
        findElem.setAttribute('class', 'detail-border');
        const detailElem = `
            <div class="detail"><span>Project: </span><span>${todoObj.todoProjName}</span></div>
            <div class="detail"><span>Notes: </span><span>${todoObj.todoNote}</span></div>
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
                        <span class="material-icons link" data-click="submit-edit">add_circle_outline</span>
                        <span class="material-icons link" data-click="cancel-edit">highlight_off</span>
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
            addIcon.setAttribute('data-click', 'submit-todo');
            addIcon.innerText = 'add_circle_outline';
            subButtons.appendChild(addIcon);
            const cancelButton = document.createElement('span');
            cancelButton.setAttribute('class', 'material-icons link');
            cancelButton.setAttribute('data-click', 'cancel-todo');
            cancelButton.innerText = 'highlight_off';
            subButtons.appendChild(cancelButton);
            formElem.appendChild(subButtons);
    
            const todoContainer = document.createElement('div');
            todoContainer.setAttribute('id', 'todo-add-form');
            todoContainer.appendChild(formElem);

            document.getElementById('todo-form-container').appendChild(todoContainer);
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

    return{
        refreshContent,
        refreshProjList,
        toggleProjForm,
        toggleTodoForm,
        emptyWarning,
        duplicateWarning,
        detailElement,
    }
})();

export { contentUpdater }