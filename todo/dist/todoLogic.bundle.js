/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/*!**************************!*\
  !*** ./src/todoLogic.js ***!
  \**************************/
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



/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9kb0xvZ2ljLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isc0VBQXNFO0FBQzlGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNjIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8vLi9zcmMvdG9kb0xvZ2ljLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiY29uc3QgbGlzdCA9ICgoKSA9PiB7XHJcbiAgICBsZXQgdG9kb0xpc3QgPSBbXTtcclxuICAgIGxldCBwcm9qZWN0TGlzdCA9IFtdO1xyXG5cclxuICAgIGZ1bmN0aW9uIGFkZFRvZG8odG9kb05hbWUsIHRvZG9Ob3RlLCB0b2RvUHJvak5hbWUsIHRvZG9Qcmlvcml0eSwgdG9kb0RhdGUsIHRvZG9TdGF0dXMpIHtcclxuICAgICAgICB0b2RvTGlzdC5wdXNoKHsgdG9kb05hbWUsIHRvZG9Ob3RlLCB0b2RvUHJvak5hbWUsIHRvZG9Qcmlvcml0eSwgdG9kb0RhdGUsIHRvZG9TdGF0dXMgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbW9kVG9kbygpIHtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkZWxldGVUb2RvKCkge1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZFByb2plY3QobmV3UHJvak5hbWUpIHtcclxuICAgICAgICBwcm9qZWN0TGlzdC5wdXNoKG5ld1Byb2pOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtb2RQcm9qZWN0TGlzdCgpIHtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB2aWV3VG9kb0xpc3QoKSB7XHJcbiAgICAgICAgY29uc3QgdG9kb0NvcHkgPSBbLi4udG9kb0xpc3RdO1xyXG4gICAgICAgIHJldHVybiB0b2RvQ29weTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB2aWV3UHJvakxpc3QoKSB7XHJcbiAgICAgICAgY29uc3QgcHJvakNvcHkgPSBbLi4ucHJvamVjdExpc3RdO1xyXG4gICAgICAgIHJldHVybiBwcm9qQ29weTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGFkZFRvZG8sXHJcbiAgICAgICAgYWRkUHJvamVjdCxcclxuICAgICAgICBtb2RUb2RvLFxyXG4gICAgICAgIGRlbGV0ZVRvZG8sXHJcbiAgICAgICAgbW9kUHJvamVjdExpc3QsXHJcbiAgICAgICAgdmlld1RvZG9MaXN0LFxyXG4gICAgICAgIHZpZXdQcm9qTGlzdCxcclxuICAgIH07XHJcblxyXG59KSgpO1xyXG5cclxuY29uc3QgdG9Eb0NvbnRyb2xsZXIgPSAoKCkgPT4ge1xyXG5cclxufSkoKTtcclxuXHJcbmxpc3QuYWRkVG9kbygnTGF1bmRyeScsICcyeCBsb2FkcycsICdIb3VzZXdvcmsnLCAnSGlnaCcsICcwOC8wMy8yMDIwJywgdHJ1ZSk7XHJcbmxpc3QuYWRkVG9kbygnVGlkeSB1cCcsICdLaXRjaGVuIGFuZCBsaXZpbmcgcm9vbScsICdIb3VzZXdvcmsnLCAnTWVkaXVtJywgJzEwLzAzLzIwMjAnLCBmYWxzZSk7XHJcbmxpc3QuYWRkVG9kbygnVmFjdXVtIEhvdXNlJywgJ1dob2xlIGhvdXNlJywgJ0hvdXNld29yaycsICdMb3cnLCAnMTEvMDMvMjAyMCcsIGZhbHNlKTtcclxubGlzdC5hZGRUb2RvKCdHbyBydW5uaW5nJywgJzVrbScsICdIb2JiaWVzJywgJ0xvdycsICcxNS8wMy8yMDIwJywgZmFsc2UpO1xyXG5saXN0LmFkZFRvZG8oJ1VwZGF0ZSBDVicsICcnLCAnV29yaycsICdIaWdoJywgJzA5LzAzLzIwMjAnLCBmYWxzZSk7XHJcbmxpc3QuYWRkVG9kbygnQ3V0IGdyYXNzJywgJycsICdHYXJkZW4nLCAnTWVkaXVtJywgJzEyLzAzLzIwMjAnLCBmYWxzZSk7XHJcbmxpc3QuYWRkUHJvamVjdCgnSG91c2V3b3JrJyk7XHJcbmxpc3QuYWRkUHJvamVjdCgnSG9iYmllcycpO1xyXG5saXN0LmFkZFByb2plY3QoJ1dvcmsnKTtcclxubGlzdC5hZGRQcm9qZWN0KCdHYXJkZW4nKTtcclxuXHJcbmV4cG9ydCB7bGlzdH07XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==