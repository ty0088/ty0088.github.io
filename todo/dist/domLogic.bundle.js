/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/todoLogic.js":
/*!**************************!*\
  !*** ./src/todoLogic.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "list": () => (/* binding */ list)
/* harmony export */ });
const list = (() => {
    let todoList = [];
    let projectList = [];

    function addTodo(todoName, todoNote, todoProjName, todoPriority, todoDate, todoStatus) {
        todoList.push({ todoName, todoNote, todoProjName, todoPriority, todoDate, todoStatus });
    }

    function modTodo() {
    }

    function deleteTodo() {
    }

    function addProject(newProjName) {
        projectList.push(newProjName);
    }

    function modProjectList() {
    }

    function viewTodoList() {
        const todoCopy = [...todoList];
        return todoCopy;
    }

    function viewProjList() {
        const projCopy = [...projectList];
        return projCopy;
    }

    return {
        addTodo,
        addProject,
        modTodo,
        deleteTodo,
        modProjectList,
        viewTodoList,
        viewProjList,
    };

})();

const toDoController = (() => {

})();

list.addTodo('Laundry', '2x loads', 'Housework', 'High', '08/03/2020', true);
list.addTodo('Tidy up', 'Kitchen and living room', 'Housework', 'Medium', '10/03/2020', false);
list.addTodo('Vacuum House', 'Whole house', 'Housework', 'Low', '11/03/2020', false);
list.addTodo('Go running', '5km', 'Hobbies', 'Low', '15/03/2020', false);
list.addTodo('Update CV', '', 'Work', 'High', '09/03/2020', false);
list.addTodo('Cut grass', '', 'Garden', 'Medium', '12/03/2020', false);
list.addProject('Housework');
list.addProject('Hobbies');
list.addProject('Work');
list.addProject('Garden');




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/domLogic.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _todoLogic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todoLogic */ "./src/todoLogic.js");


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

        const todoListArr = [..._todoLogic__WEBPACK_IMPORTED_MODULE_0__.list.viewTodoList()]; 
        todoListArr.map(todoObj => {
            if (!todoObj.todoStatus) { //filter out completed todos
                todoListElem.appendChild(newTodoElement(todoObj, todoListArr));
            }
        });

        document.getElementById('todo-content').appendChild(todoListElem);
    }

    function byToday() {
        const todoListArr = [..._todoLogic__WEBPACK_IMPORTED_MODULE_0__.list.viewTodoList()];
        //filter todoListArr by todays date
        //update DOM with filtered list
    }

    function byWeek() {
        //filter todoListArr by current week range
        //update DOM with filtered list
    }

    function byCompleted() {
        const todoListArr = [..._todoLogic__WEBPACK_IMPORTED_MODULE_0__.list.viewTodoList()];

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
        const projListArr = [..._todoLogic__WEBPACK_IMPORTED_MODULE_0__.list.viewProjList()];

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
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLy4vc3JjL3RvZG9Mb2dpYy5qcyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9kb21Mb2dpYy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBsaXN0ID0gKCgpID0+IHtcclxuICAgIGxldCB0b2RvTGlzdCA9IFtdO1xyXG4gICAgbGV0IHByb2plY3RMaXN0ID0gW107XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkVG9kbyh0b2RvTmFtZSwgdG9kb05vdGUsIHRvZG9Qcm9qTmFtZSwgdG9kb1ByaW9yaXR5LCB0b2RvRGF0ZSwgdG9kb1N0YXR1cykge1xyXG4gICAgICAgIHRvZG9MaXN0LnB1c2goeyB0b2RvTmFtZSwgdG9kb05vdGUsIHRvZG9Qcm9qTmFtZSwgdG9kb1ByaW9yaXR5LCB0b2RvRGF0ZSwgdG9kb1N0YXR1cyB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtb2RUb2RvKCkge1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRlbGV0ZVRvZG8oKSB7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkUHJvamVjdChuZXdQcm9qTmFtZSkge1xyXG4gICAgICAgIHByb2plY3RMaXN0LnB1c2gobmV3UHJvak5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1vZFByb2plY3RMaXN0KCkge1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHZpZXdUb2RvTGlzdCgpIHtcclxuICAgICAgICBjb25zdCB0b2RvQ29weSA9IFsuLi50b2RvTGlzdF07XHJcbiAgICAgICAgcmV0dXJuIHRvZG9Db3B5O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHZpZXdQcm9qTGlzdCgpIHtcclxuICAgICAgICBjb25zdCBwcm9qQ29weSA9IFsuLi5wcm9qZWN0TGlzdF07XHJcbiAgICAgICAgcmV0dXJuIHByb2pDb3B5O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgYWRkVG9kbyxcclxuICAgICAgICBhZGRQcm9qZWN0LFxyXG4gICAgICAgIG1vZFRvZG8sXHJcbiAgICAgICAgZGVsZXRlVG9kbyxcclxuICAgICAgICBtb2RQcm9qZWN0TGlzdCxcclxuICAgICAgICB2aWV3VG9kb0xpc3QsXHJcbiAgICAgICAgdmlld1Byb2pMaXN0LFxyXG4gICAgfTtcclxuXHJcbn0pKCk7XHJcblxyXG5jb25zdCB0b0RvQ29udHJvbGxlciA9ICgoKSA9PiB7XHJcblxyXG59KSgpO1xyXG5cclxubGlzdC5hZGRUb2RvKCdMYXVuZHJ5JywgJzJ4IGxvYWRzJywgJ0hvdXNld29yaycsICdIaWdoJywgJzA4LzAzLzIwMjAnLCB0cnVlKTtcclxubGlzdC5hZGRUb2RvKCdUaWR5IHVwJywgJ0tpdGNoZW4gYW5kIGxpdmluZyByb29tJywgJ0hvdXNld29yaycsICdNZWRpdW0nLCAnMTAvMDMvMjAyMCcsIGZhbHNlKTtcclxubGlzdC5hZGRUb2RvKCdWYWN1dW0gSG91c2UnLCAnV2hvbGUgaG91c2UnLCAnSG91c2V3b3JrJywgJ0xvdycsICcxMS8wMy8yMDIwJywgZmFsc2UpO1xyXG5saXN0LmFkZFRvZG8oJ0dvIHJ1bm5pbmcnLCAnNWttJywgJ0hvYmJpZXMnLCAnTG93JywgJzE1LzAzLzIwMjAnLCBmYWxzZSk7XHJcbmxpc3QuYWRkVG9kbygnVXBkYXRlIENWJywgJycsICdXb3JrJywgJ0hpZ2gnLCAnMDkvMDMvMjAyMCcsIGZhbHNlKTtcclxubGlzdC5hZGRUb2RvKCdDdXQgZ3Jhc3MnLCAnJywgJ0dhcmRlbicsICdNZWRpdW0nLCAnMTIvMDMvMjAyMCcsIGZhbHNlKTtcclxubGlzdC5hZGRQcm9qZWN0KCdIb3VzZXdvcmsnKTtcclxubGlzdC5hZGRQcm9qZWN0KCdIb2JiaWVzJyk7XHJcbmxpc3QuYWRkUHJvamVjdCgnV29yaycpO1xyXG5saXN0LmFkZFByb2plY3QoJ0dhcmRlbicpO1xyXG5cclxuZXhwb3J0IHtsaXN0fTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge2xpc3R9IGZyb20gJy4vdG9kb0xvZ2ljJ1xyXG5cclxuY29uc3Qgc2hvd0xpc3RzID0gKCgpID0+IHtcclxuXHJcbiAgICBmdW5jdGlvbiBuZXdUb2RvRWxlbWVudCh0b2RvT2JqLCB0b2RvTGlzdEFycikge1xyXG4gICAgICAgIGNvbnN0IHRvZG9FbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgdG9kb0VsZW0uc2V0QXR0cmlidXRlKCdjbGFzcycsICdsb25nLWNvbnRhaW5lciB0b2RvJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHN0YXR1c0NsYXNzID0gKHRvZG9PYmoudG9kb1N0YXR1cykgPyAnY2hlY2tfYm94JyA6ICdjaGVja19ib3hfb3V0bGluZV9ibGFuayc7XHJcblxyXG4gICAgICAgIHRvZG9FbGVtLmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1pY29ucyBsaW5rXCIgZGF0YS1jbGljaz1cImNoZWNrLWJveFwiPiR7c3RhdHVzQ2xhc3N9PC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRvZG8tdGl0bGUgbGlua1wiIGRhdGEtY2xpY2s9XCJ0b2RvXCIgZGF0YS1pbmRleD1cIiR7dG9kb0xpc3RBcnIuaW5kZXhPZih0b2RvT2JqKX1cIj4ke3RvZG9PYmoudG9kb05hbWV9PC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNvcnQgJHt0b2RvT2JqLnRvZG9Qcmlvcml0eX1cIj4ke3RvZG9PYmoudG9kb1ByaW9yaXR5fTwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzb3J0XCI+JHt0b2RvT2JqLnRvZG9EYXRlfTwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1pY29ucyBsaW5rXCIgZGF0YS1jbGljaz1cImVkaXRcIj5ub3RlX2FsdDwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1pY29ucyBsaW5rXCIgZGF0YS1jbGljaz1cImRlbGV0ZVwiPmRlbGV0ZTwvc3Bhbj5cclxuICAgICAgICBgO1xyXG4gICAgICAgIHJldHVybiB0b2RvRWxlbTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBieUFsbCgpIHtcclxuICAgICAgICAvL3JlbW92ZSBET00gZWxlbWVudHMgYW5kIG1vdmUgdG8gZG9tQ29udHJvbGxlclxyXG4gICAgICAgIGNvbnN0IHRvZG9MaXN0RWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOyAvL1xyXG4gICAgICAgIHRvZG9MaXN0RWxlbS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3RvZG8tbGlzdCcpOyAvL1xyXG5cclxuICAgICAgICBjb25zdCB0b2RvTGlzdEFyciA9IFsuLi5saXN0LnZpZXdUb2RvTGlzdCgpXTsgXHJcbiAgICAgICAgdG9kb0xpc3RBcnIubWFwKHRvZG9PYmogPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXRvZG9PYmoudG9kb1N0YXR1cykgeyAvL2ZpbHRlciBvdXQgY29tcGxldGVkIHRvZG9zXHJcbiAgICAgICAgICAgICAgICB0b2RvTGlzdEVsZW0uYXBwZW5kQ2hpbGQobmV3VG9kb0VsZW1lbnQodG9kb09iaiwgdG9kb0xpc3RBcnIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9kby1jb250ZW50JykuYXBwZW5kQ2hpbGQodG9kb0xpc3RFbGVtKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBieVRvZGF5KCkge1xyXG4gICAgICAgIGNvbnN0IHRvZG9MaXN0QXJyID0gWy4uLmxpc3Qudmlld1RvZG9MaXN0KCldO1xyXG4gICAgICAgIC8vZmlsdGVyIHRvZG9MaXN0QXJyIGJ5IHRvZGF5cyBkYXRlXHJcbiAgICAgICAgLy91cGRhdGUgRE9NIHdpdGggZmlsdGVyZWQgbGlzdFxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGJ5V2VlaygpIHtcclxuICAgICAgICAvL2ZpbHRlciB0b2RvTGlzdEFyciBieSBjdXJyZW50IHdlZWsgcmFuZ2VcclxuICAgICAgICAvL3VwZGF0ZSBET00gd2l0aCBmaWx0ZXJlZCBsaXN0XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYnlDb21wbGV0ZWQoKSB7XHJcbiAgICAgICAgY29uc3QgdG9kb0xpc3RBcnIgPSBbLi4ubGlzdC52aWV3VG9kb0xpc3QoKV07XHJcblxyXG4gICAgICAgIGNvbnN0IHRvZG9MaXN0RWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHRvZG9MaXN0RWxlbS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3RvZG8tbGlzdCcpO1xyXG5cclxuICAgICAgICB0b2RvTGlzdEFyci5tYXAodG9kb09iaiA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0b2RvT2JqLnRvZG9TdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIHRvZG9MaXN0RWxlbS5hcHBlbmRDaGlsZChuZXdUb2RvRWxlbWVudCh0b2RvT2JqLCB0b2RvTGlzdEFycikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2RvLWNvbnRlbnQnKS5hcHBlbmRDaGlsZCh0b2RvTGlzdEVsZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGJ5UHJvamVjdChwcm9qTmFtZSkge1xyXG4gICAgICAgIC8vZmlsdGVyIHRvZG9MaXN0QXJyIGJ5IHRvZG9zIHByb2plY3RcclxuICAgICAgICAvL3VwZGF0ZSBET00gd2l0aCBmaWx0ZXJlZCBsaXN0XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcHJvakxpc3QoKSB7XHJcbiAgICAgICAgY29uc3QgcHJvakxpc3RBcnIgPSBbLi4ubGlzdC52aWV3UHJvakxpc3QoKV07XHJcblxyXG4gICAgICAgIGNvbnN0IHByb2pMaXN0RWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHByb2pMaXN0RWxlbS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3Byb2plY3QtbGlzdCcpO1xyXG4gICAgICAgIGNvbnN0IHByb2pIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBwcm9qSGVhZGVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnaGVhZGVyJyk7XHJcbiAgICAgICAgcHJvakhlYWRlci50ZXh0Q29udGVudCA9ICdQcm9qZWN0cyc7XHJcblxyXG4gICAgICAgIHByb2pMaXN0RWxlbS5hcHBlbmRDaGlsZChwcm9qSGVhZGVyKTtcclxuXHJcbiAgICAgICAgcHJvakxpc3RBcnIubWFwKHByb2ogPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwcm9qRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBwcm9qRWxlbS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3Byb2plY3QtbGluaycpXHJcblxyXG4gICAgICAgICAgICBwcm9qRWxlbS5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+Zm9ybWF0X2xpc3RfYnVsbGV0ZWQ8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2plY3QtdGl0bGUgbGlua1wiIGRhdGEtY2xpY2s9XCJwcm9qXCIgZGF0YS1pbmRleD1cIiR7cHJvakxpc3RBcnIuaW5kZXhPZihwcm9qKX1cIj4ke3Byb2p9PC9zcGFuPlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICBwcm9qTGlzdEVsZW0uYXBwZW5kQ2hpbGQocHJvakVsZW0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1jb250ZW50JykuYXBwZW5kQ2hpbGQocHJvakxpc3RFbGVtKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGJ5QWxsLFxyXG4gICAgICAgIGJ5VG9kYXksXHJcbiAgICAgICAgYnlXZWVrLFxyXG4gICAgICAgIGJ5Q29tcGxldGVkLFxyXG4gICAgICAgIGJ5UHJvamVjdCxcclxuICAgICAgICBwcm9qTGlzdCxcclxuICAgIH07XHJcblxyXG59KSgpO1xyXG5cclxuY29uc3QgZG9tQ29udHJvbGxlciA9ICgoKSA9PiB7XHJcblxyXG4gICAgZnVuY3Rpb24gY2xpY2tDb250cm9sbGVyKGV2ZW50KSB7XHJcbiAgICAgICAgY29uc3QgY2xpY2tUeXBlID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1jbGljaycpO1xyXG4gICAgICAgIGNvbnN0IGVsZW1JbmRleCA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTsvL1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhjbGlja1R5cGUpO1xyXG5cclxuICAgICAgICBpZiAoY2xpY2tUeXBlID09PSAnYWxsJykge1xyXG4gICAgICAgICAgICByZWZyZXNoQ29udGVudChjbGlja1R5cGUpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY2xpY2tUeXBlID09PSAndG9kYXknKSB7XHJcbiAgICAgICAgICAgIHJlZnJlc2hDb250ZW50KGNsaWNrVHlwZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjbGlja1R5cGUgPT09ICd3ZWVrJykge1xyXG4gICAgICAgICAgICByZWZyZXNoQ29udGVudChjbGlja1R5cGUpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY2xpY2tUeXBlID09PSAnY29tcCcpIHtcclxuICAgICAgICAgICAgcmVmcmVzaENvbnRlbnQoY2xpY2tUeXBlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGNsaWNrVHlwZSA9PT0gJ3Byb2onKSB7XHJcbiAgICAgICAgICAgIHJlZnJlc2hDb250ZW50KGNsaWNrVHlwZSwgZXZlbnQudGFyZ2V0LnRleHRDb250ZW50KTtcclxuICAgICAgICB9IGVsc2UgaWYgKGNsaWNrVHlwZSA9PT0gJ2FkZC1wcm9qJykge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9IGVsc2UgaWYgKGNsaWNrVHlwZSA9PT0gJ3NvcnQtcHJpb3JpdHknKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSBpZiAoY2xpY2tUeXBlID09PSAnc29ydC1kYXRlJykge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9IGVsc2UgaWYgKGNsaWNrVHlwZSA9PT0gJ2FkZC10b2RvJykge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9IGVsc2UgaWYgKGNsaWNrVHlwZSA9PT0gJ2NoZWNrLWJveCcpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIGlmIChjbGlja1R5cGUgPT09ICd0b2RvJykge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9IGVsc2UgaWYgKGNsaWNrVHlwZSA9PT0gJ2VkaXQnKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSBpZiAoY2xpY2tUeXBlID09PSAnZGVsZXRlJykge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsaWNrTGlzdGVuZXIoKSB7XHJcbiAgICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5saW5rJyk7XHJcbiAgICAgICAgbGluay5mb3JFYWNoKGVsZW1lbnQgPT4gZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrQ29udHJvbGxlcikpO1xyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBzaG93SGVhZGVyKGxpc3RUeXBlKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhdC1oZWFkZXInKS50ZXh0Q29udGVudCA9IGxpc3RUeXBlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlZnJlc2hDb250ZW50KGxpc3RUeXBlLCBwcm9qTmFtZSkge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWNvbnRlbnQnKS5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2F0LWhlYWRlcicpLnRleHRDb250ZW50ID0gJyc7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG8tY29udGVudCcpLmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgICAgICBpZiAobGlzdFR5cGUgPT09ICdhbGwnKSB7XHJcbiAgICAgICAgICAgIC8vc2hvdWxkIGNvbnRhaW4gRE9NIGVsZW1lbnRzIGluc2lkZSBzaG93TGlzdHMuYnlBbGxcclxuICAgICAgICAgICAgc2hvd0xpc3RzLmJ5QWxsKCk7XHJcbiAgICAgICAgICAgIHNob3dIZWFkZXIoJ0FsbCcpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobGlzdFR5cGUgPT09ICd0b2RheScpIHtcclxuICAgICAgICAgICAgc2hvd0xpc3RzLmJ5VG9kYXkoKTtcclxuICAgICAgICAgICAgc2hvd0hlYWRlcignVG9kYXknKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxpc3RUeXBlID09PSAnd2VlaycpIHtcclxuICAgICAgICAgICAgc2hvd0xpc3RzLmJ5V2VlaygpO1xyXG4gICAgICAgICAgICBzaG93SGVhZGVyKCdXZWVrJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsaXN0VHlwZSA9PT0gJ2NvbXAnKSB7XHJcbiAgICAgICAgICAgIHNob3dMaXN0cy5ieUNvbXBsZXRlZCgpO1xyXG4gICAgICAgICAgICBzaG93SGVhZGVyKCdDb21wbGV0ZWQnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxpc3RUeXBlID09PSAncHJvaicpIHtcclxuICAgICAgICAgICAgc2hvd0xpc3RzLmJ5UHJvamVjdChwcm9qTmFtZSk7XHJcbiAgICAgICAgICAgIHNob3dIZWFkZXIocHJvak5hbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2hvd0xpc3RzLnByb2pMaXN0KCk7XHJcbiAgICAgICAgY2xpY2tMaXN0ZW5lcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZFRvZG9Gb3JtKCkge1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZFByb2pGb3JtKCkge1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVmcmVzaENvbnRlbnQsXHJcbiAgICB9O1xyXG5cclxufSkoKTtcclxuXHJcblxyXG5cclxuZG9tQ29udHJvbGxlci5yZWZyZXNoQ29udGVudCgnYWxsJyk7XHJcblxyXG4vL2V2ZW50IGxpc3RlbmVycyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==