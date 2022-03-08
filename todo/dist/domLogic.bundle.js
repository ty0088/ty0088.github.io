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


const filterLists = (() => {

    function byAll() {
        const listArr = [..._todoLogic__WEBPACK_IMPORTED_MODULE_0__.list.viewTodoList()];
        const newListArr = listArr.filter(todoObj => !todoObj.todoStatus);
        return newListArr;  
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
        const listArr = [..._todoLogic__WEBPACK_IMPORTED_MODULE_0__.list.viewTodoList()];
        const newListArr = listArr.filter(todoObj => todoObj.todoStatus);
        return newListArr;  
    }

    function byProject(projName) {
        const listArr = [..._todoLogic__WEBPACK_IMPORTED_MODULE_0__.list.viewTodoList()];
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tTG9naWMuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixzRUFBc0U7QUFDOUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2M7Ozs7Ozs7VUMxRGQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05nQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qix5REFBaUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyx5REFBaUI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIseURBQWlCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIseURBQWlCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSx3REFBd0Q7QUFDeEQsMEVBQTBFO0FBQzFFLHVFQUF1RTtBQUN2RSwwREFBMEQ7QUFDMUQ7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1RUFBdUUsWUFBWTtBQUNuRiwwRUFBMEUsNkJBQTZCLElBQUksaUJBQWlCO0FBQzVILGdDQUFnQyxxQkFBcUIsSUFBSSxxQkFBcUI7QUFDOUUsaUNBQWlDLGlCQUFpQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyx5REFBaUI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUZBQWlGLDBCQUEwQixJQUFJLEtBQUs7QUFDcEg7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8vLi9zcmMvdG9kb0xvZ2ljLmpzIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2RvbUxvZ2ljLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGxpc3QgPSAoKCkgPT4ge1xyXG4gICAgbGV0IHRvZG9MaXN0ID0gW107XHJcbiAgICBsZXQgcHJvamVjdExpc3QgPSBbXTtcclxuXHJcbiAgICBmdW5jdGlvbiBhZGRUb2RvKHRvZG9OYW1lLCB0b2RvTm90ZSwgdG9kb1Byb2pOYW1lLCB0b2RvUHJpb3JpdHksIHRvZG9EYXRlLCB0b2RvU3RhdHVzKSB7XHJcbiAgICAgICAgdG9kb0xpc3QucHVzaCh7IHRvZG9OYW1lLCB0b2RvTm90ZSwgdG9kb1Byb2pOYW1lLCB0b2RvUHJpb3JpdHksIHRvZG9EYXRlLCB0b2RvU3RhdHVzIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1vZFRvZG8oKSB7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGVsZXRlVG9kbygpIHtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRQcm9qZWN0KG5ld1Byb2pOYW1lKSB7XHJcbiAgICAgICAgcHJvamVjdExpc3QucHVzaChuZXdQcm9qTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbW9kUHJvamVjdExpc3QoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdmlld1RvZG9MaXN0KCkge1xyXG4gICAgICAgIGNvbnN0IHRvZG9Db3B5ID0gWy4uLnRvZG9MaXN0XTtcclxuICAgICAgICByZXR1cm4gdG9kb0NvcHk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdmlld1Byb2pMaXN0KCkge1xyXG4gICAgICAgIGNvbnN0IHByb2pDb3B5ID0gWy4uLnByb2plY3RMaXN0XTtcclxuICAgICAgICByZXR1cm4gcHJvakNvcHk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBhZGRUb2RvLFxyXG4gICAgICAgIGFkZFByb2plY3QsXHJcbiAgICAgICAgbW9kVG9kbyxcclxuICAgICAgICBkZWxldGVUb2RvLFxyXG4gICAgICAgIG1vZFByb2plY3RMaXN0LFxyXG4gICAgICAgIHZpZXdUb2RvTGlzdCxcclxuICAgICAgICB2aWV3UHJvakxpc3QsXHJcbiAgICB9O1xyXG5cclxufSkoKTtcclxuXHJcbmNvbnN0IHRvRG9Db250cm9sbGVyID0gKCgpID0+IHtcclxuXHJcbn0pKCk7XHJcblxyXG5saXN0LmFkZFRvZG8oJ0xhdW5kcnknLCAnMnggbG9hZHMnLCAnSG91c2V3b3JrJywgJ0hpZ2gnLCAnMDgvMDMvMjAyMCcsIHRydWUpO1xyXG5saXN0LmFkZFRvZG8oJ1RpZHkgdXAnLCAnS2l0Y2hlbiBhbmQgbGl2aW5nIHJvb20nLCAnSG91c2V3b3JrJywgJ01lZGl1bScsICcxMC8wMy8yMDIwJywgZmFsc2UpO1xyXG5saXN0LmFkZFRvZG8oJ1ZhY3V1bSBIb3VzZScsICdXaG9sZSBob3VzZScsICdIb3VzZXdvcmsnLCAnTG93JywgJzExLzAzLzIwMjAnLCBmYWxzZSk7XHJcbmxpc3QuYWRkVG9kbygnR28gcnVubmluZycsICc1a20nLCAnSG9iYmllcycsICdMb3cnLCAnMTUvMDMvMjAyMCcsIGZhbHNlKTtcclxubGlzdC5hZGRUb2RvKCdVcGRhdGUgQ1YnLCAnJywgJ1dvcmsnLCAnSGlnaCcsICcwOS8wMy8yMDIwJywgZmFsc2UpO1xyXG5saXN0LmFkZFRvZG8oJ0N1dCBncmFzcycsICcnLCAnR2FyZGVuJywgJ01lZGl1bScsICcxMi8wMy8yMDIwJywgZmFsc2UpO1xyXG5saXN0LmFkZFByb2plY3QoJ0hvdXNld29yaycpO1xyXG5saXN0LmFkZFByb2plY3QoJ0hvYmJpZXMnKTtcclxubGlzdC5hZGRQcm9qZWN0KCdXb3JrJyk7XHJcbmxpc3QuYWRkUHJvamVjdCgnR2FyZGVuJyk7XHJcblxyXG5leHBvcnQge2xpc3R9O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7bGlzdH0gZnJvbSAnLi90b2RvTG9naWMnXHJcblxyXG5jb25zdCBmaWx0ZXJMaXN0cyA9ICgoKSA9PiB7XHJcblxyXG4gICAgZnVuY3Rpb24gYnlBbGwoKSB7XHJcbiAgICAgICAgY29uc3QgbGlzdEFyciA9IFsuLi5saXN0LnZpZXdUb2RvTGlzdCgpXTtcclxuICAgICAgICBjb25zdCBuZXdMaXN0QXJyID0gbGlzdEFyci5maWx0ZXIodG9kb09iaiA9PiAhdG9kb09iai50b2RvU3RhdHVzKTtcclxuICAgICAgICByZXR1cm4gbmV3TGlzdEFycjsgIFxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGJ5VG9kYXkoKSB7XHJcbiAgICAgICAgY29uc3QgdG9kb0xpc3RBcnIgPSBbLi4ubGlzdC52aWV3VG9kb0xpc3QoKV07XHJcbiAgICAgICAgLy9maWx0ZXIgdG9kb0xpc3RBcnIgYnkgdG9kYXlzIGRhdGVcclxuICAgICAgICAvL3VwZGF0ZSBET00gd2l0aCBmaWx0ZXJlZCBsaXN0XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYnlXZWVrKCkge1xyXG4gICAgICAgIC8vZmlsdGVyIHRvZG9MaXN0QXJyIGJ5IGN1cnJlbnQgd2VlayByYW5nZVxyXG4gICAgICAgIC8vdXBkYXRlIERPTSB3aXRoIGZpbHRlcmVkIGxpc3RcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBieUNvbXBsZXRlZCgpIHtcclxuICAgICAgICBjb25zdCBsaXN0QXJyID0gWy4uLmxpc3Qudmlld1RvZG9MaXN0KCldO1xyXG4gICAgICAgIGNvbnN0IG5ld0xpc3RBcnIgPSBsaXN0QXJyLmZpbHRlcih0b2RvT2JqID0+IHRvZG9PYmoudG9kb1N0YXR1cyk7XHJcbiAgICAgICAgcmV0dXJuIG5ld0xpc3RBcnI7ICBcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBieVByb2plY3QocHJvak5hbWUpIHtcclxuICAgICAgICBjb25zdCBsaXN0QXJyID0gWy4uLmxpc3Qudmlld1RvZG9MaXN0KCldO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHByb2pOYW1lKVxyXG4gICAgICAgIGNvbnN0IG5ld0xpc3RBcnIgPSBsaXN0QXJyLmZpbHRlcih0b2RvT2JqID0+IHRvZG9PYmoudG9kb1Byb2pOYW1lID09PSBwcm9qTmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIG5ld0xpc3RBcnI7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBieUFsbCxcclxuICAgICAgICBieVRvZGF5LFxyXG4gICAgICAgIGJ5V2VlayxcclxuICAgICAgICBieUNvbXBsZXRlZCxcclxuICAgICAgICBieVByb2plY3QsXHJcbiAgICB9O1xyXG5cclxufSkoKTtcclxuXHJcbmNvbnN0IGRvbUNvbnRyb2xsZXIgPSAoKCkgPT4ge1xyXG5cclxuICAgIGZ1bmN0aW9uIGNsaWNrQ29udHJvbGxlcihldmVudCkge1xyXG4gICAgICAgIGNvbnN0IGNsaWNrVHlwZSA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2xpY2snKTtcclxuICAgICAgICBjb25zdCBlbGVtSW5kZXggPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XHJcblxyXG4gICAgICAgIGlmIChjbGlja1R5cGUgPT09ICdhbGwnKSB7XHJcbiAgICAgICAgICAgIHJlZnJlc2hDb250ZW50KGZpbHRlckxpc3RzLmJ5QWxsKCkpO1xyXG4gICAgICAgICAgICBzaG93SGVhZGVyKCdBbGwnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGNsaWNrVHlwZSA9PT0gJ3RvZGF5Jykge1xyXG4gICAgICAgICAgICBzaG93SGVhZGVyKCdUb2RheScpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY2xpY2tUeXBlID09PSAnd2VlaycpIHtcclxuICAgICAgICAgICAgc2hvd0hlYWRlcignV2VlaycpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY2xpY2tUeXBlID09PSAnY29tcCcpIHtcclxuICAgICAgICAgICAgcmVmcmVzaENvbnRlbnQoZmlsdGVyTGlzdHMuYnlDb21wbGV0ZWQoKSk7XHJcbiAgICAgICAgICAgIHNob3dIZWFkZXIoJ0NvbXBsZXRlZCcpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY2xpY2tUeXBlID09PSAncHJvaicpIHtcclxuICAgICAgICAgICAgY29uc3QgcHJvak5hbWUgPSBldmVudC50YXJnZXQudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICAgIGxldCBsaXN0ID0gZmlsdGVyTGlzdHMuYnlQcm9qZWN0KHByb2pOYW1lKTsgLy9tb3ZlIHRvIGZpbHRlciBsaXN0IG9yIHNlcGFyYXRlIG91dCBpbnRvIG90aGVyIGZ1bmN0aW9uXHJcbiAgICAgICAgICAgIGxldCBpbmNvbXBMaXN0ID0gbGlzdC5maWx0ZXIodG9kb09iaiA9PiAhdG9kb09iai50b2RvU3RhdHVzKTsgLy9cclxuICAgICAgICAgICAgbGV0IGNvbXBMaXN0ID0gbGlzdC5maWx0ZXIodG9kb09iaiA9PiB0b2RvT2JqLnRvZG9TdGF0dXMpOyAvL1xyXG4gICAgICAgICAgICBsZXQgam9pbmVkTGlzdCA9IGluY29tcExpc3QuY29uY2F0KGNvbXBMaXN0KTsgLy9cclxuICAgICAgICAgICAgcmVmcmVzaENvbnRlbnQoam9pbmVkTGlzdCk7XHJcbiAgICAgICAgICAgIHNob3dIZWFkZXIocHJvak5hbWUpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY2xpY2tUeXBlID09PSAnYWRkLXByb2onKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSBpZiAoY2xpY2tUeXBlID09PSAnc29ydC1wcmlvcml0eScpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIGlmIChjbGlja1R5cGUgPT09ICdzb3J0LWRhdGUnKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSBpZiAoY2xpY2tUeXBlID09PSAnYWRkLXRvZG8nKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSBpZiAoY2xpY2tUeXBlID09PSAnY2hlY2stYm94Jykge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9IGVsc2UgaWYgKGNsaWNrVHlwZSA9PT0gJ3RvZG8nKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSBpZiAoY2xpY2tUeXBlID09PSAnZWRpdCcpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIGlmIChjbGlja1R5cGUgPT09ICdkZWxldGUnKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xpY2tMaXN0ZW5lcigpIHtcclxuICAgICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxpbmsnKTtcclxuICAgICAgICBsaW5rLmZvckVhY2goZWxlbWVudCA9PiBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tDb250cm9sbGVyKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIHNob3dIZWFkZXIobGlzdFR5cGUpIHtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2F0LWhlYWRlcicpLnRleHRDb250ZW50ID0gbGlzdFR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbmV3VG9kb0VsZW1lbnQodG9kb09iaiwgdG9kb0xpc3RBcnIpIHtcclxuICAgICAgICBjb25zdCB0b2RvRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHRvZG9FbGVtLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbG9uZy1jb250YWluZXIgdG9kbycpO1xyXG5cclxuICAgICAgICBjb25zdCBzdGF0dXNDbGFzcyA9ICh0b2RvT2JqLnRvZG9TdGF0dXMpID8gJ2NoZWNrX2JveCcgOiAnY2hlY2tfYm94X291dGxpbmVfYmxhbmsnO1xyXG5cclxuICAgICAgICB0b2RvRWxlbS5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgbGlua1wiIGRhdGEtY2xpY2s9XCJjaGVjay1ib3hcIj4ke3N0YXR1c0NsYXNzfTwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0b2RvLXRpdGxlIGxpbmtcIiBkYXRhLWNsaWNrPVwidG9kb1wiIGRhdGEtaW5kZXg9XCIke3RvZG9MaXN0QXJyLmluZGV4T2YodG9kb09iail9XCI+JHt0b2RvT2JqLnRvZG9OYW1lfTwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzb3J0ICR7dG9kb09iai50b2RvUHJpb3JpdHl9XCI+JHt0b2RvT2JqLnRvZG9Qcmlvcml0eX08L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic29ydFwiPiR7dG9kb09iai50b2RvRGF0ZX08L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgbGlua1wiIGRhdGEtY2xpY2s9XCJlZGl0XCI+bm90ZV9hbHQ8L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgbGlua1wiIGRhdGEtY2xpY2s9XCJkZWxldGVcIj5kZWxldGU8L3NwYW4+XHJcbiAgICAgICAgYDtcclxuICAgICAgICByZXR1cm4gdG9kb0VsZW07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVmcmVzaENvbnRlbnQobGlzdCkge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWNvbnRlbnQnKS5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2F0LWhlYWRlcicpLnRleHRDb250ZW50ID0gJyc7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG8tY29udGVudCcpLmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgICAgICBjb25zdCB0b2RvTGlzdEVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICB0b2RvTGlzdEVsZW0uc2V0QXR0cmlidXRlKCdjbGFzcycsICd0b2RvLWxpc3QnKTtcclxuXHJcbiAgICAgICAgbGlzdC5tYXAodG9kb09iaiA9PiB7XHJcbiAgICAgICAgICAgIHRvZG9MaXN0RWxlbS5hcHBlbmRDaGlsZChuZXdUb2RvRWxlbWVudCh0b2RvT2JqLCBsaXN0KSlcclxuICAgICAgICB9KTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9kby1jb250ZW50JykuYXBwZW5kQ2hpbGQodG9kb0xpc3RFbGVtKTtcclxuXHJcbiAgICAgICAgcmVmcmVzaFByb2pMaXN0KClcclxuICAgICAgICBjbGlja0xpc3RlbmVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVmcmVzaFByb2pMaXN0KCkge1xyXG4gICAgICAgIGNvbnN0IHByb2pMaXN0QXJyID0gWy4uLmxpc3Qudmlld1Byb2pMaXN0KCldO1xyXG5cclxuICAgICAgICBjb25zdCBwcm9qTGlzdEVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBwcm9qTGlzdEVsZW0uc2V0QXR0cmlidXRlKCdjbGFzcycsICdwcm9qZWN0LWxpc3QnKTtcclxuICAgICAgICBjb25zdCBwcm9qSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgcHJvakhlYWRlci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2hlYWRlcicpO1xyXG4gICAgICAgIHByb2pIZWFkZXIudGV4dENvbnRlbnQgPSAnUHJvamVjdHMnO1xyXG5cclxuICAgICAgICBwcm9qTGlzdEVsZW0uYXBwZW5kQ2hpbGQocHJvakhlYWRlcik7XHJcblxyXG4gICAgICAgIHByb2pMaXN0QXJyLm1hcChwcm9qID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcHJvakVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgcHJvakVsZW0uc2V0QXR0cmlidXRlKCdjbGFzcycsICdwcm9qZWN0LWxpbmsnKVxyXG5cclxuICAgICAgICAgICAgcHJvakVsZW0uaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmZvcm1hdF9saXN0X2J1bGxldGVkPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9qZWN0LXRpdGxlIGxpbmtcIiBkYXRhLWNsaWNrPVwicHJvalwiIGRhdGEtaW5kZXg9XCIke3Byb2pMaXN0QXJyLmluZGV4T2YocHJvail9XCI+JHtwcm9qfTwvc3Bhbj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgcHJvakxpc3RFbGVtLmFwcGVuZENoaWxkKHByb2pFbGVtKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtY29udGVudCcpLmFwcGVuZENoaWxkKHByb2pMaXN0RWxlbSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkVG9kb0Zvcm0oKSB7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkUHJvakZvcm0oKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZWZyZXNoQ29udGVudCxcclxuICAgICAgICBjbGlja0xpc3RlbmVyLFxyXG4gICAgICAgIHJlZnJlc2hQcm9qTGlzdCxcclxuICAgIH07XHJcblxyXG59KSgpO1xyXG5cclxuXHJcbmRvbUNvbnRyb2xsZXIucmVmcmVzaFByb2pMaXN0KClcclxuZG9tQ29udHJvbGxlci5jbGlja0xpc3RlbmVyKCk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==