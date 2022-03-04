/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************!*\
  !*** ./src/todoLogic.js ***!
  \**************************/
const list = (() => {
    let todoList = [];
    let projectListArr = [];

    const addTask = (taskName, taskNote, taskProjName, taskPriority, taskDate) => {
        todoList.push({taskName, taskNote, taskProjName, taskPriority, taskDate})
    };

    const modTask = () => {

    };

    const deleteTask = () => {

    };

    const addProject = () => {
        
    };

    const modProjectList = () => {

    };

    const viewList = () => {
        const listCopy = [...todoList];
        return listCopy;
    };

    return {
        addTask,
        addProject,
        modTask,
        deleteTask,
        modProjectList,
        viewList,
    };

})();

const toDoController = (() => {
})();

list.addTask('taskName', 'taskNote', 'taskProjName', 'taskPriority', 'taskDate')

console.log(list.viewList());


// export {};

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9kb0xvZ2ljLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIseURBQXlEO0FBQ2hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8vLi9zcmMvdG9kb0xvZ2ljLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGxpc3QgPSAoKCkgPT4ge1xyXG4gICAgbGV0IHRvZG9MaXN0ID0gW107XHJcbiAgICBsZXQgcHJvamVjdExpc3RBcnIgPSBbXTtcclxuXHJcbiAgICBjb25zdCBhZGRUYXNrID0gKHRhc2tOYW1lLCB0YXNrTm90ZSwgdGFza1Byb2pOYW1lLCB0YXNrUHJpb3JpdHksIHRhc2tEYXRlKSA9PiB7XHJcbiAgICAgICAgdG9kb0xpc3QucHVzaCh7dGFza05hbWUsIHRhc2tOb3RlLCB0YXNrUHJvak5hbWUsIHRhc2tQcmlvcml0eSwgdGFza0RhdGV9KVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBtb2RUYXNrID0gKCkgPT4ge1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgZGVsZXRlVGFzayA9ICgpID0+IHtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGFkZFByb2plY3QgPSAoKSA9PiB7XHJcbiAgICAgICAgXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IG1vZFByb2plY3RMaXN0ID0gKCkgPT4ge1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgdmlld0xpc3QgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbGlzdENvcHkgPSBbLi4udG9kb0xpc3RdO1xyXG4gICAgICAgIHJldHVybiBsaXN0Q29weTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBhZGRUYXNrLFxyXG4gICAgICAgIGFkZFByb2plY3QsXHJcbiAgICAgICAgbW9kVGFzayxcclxuICAgICAgICBkZWxldGVUYXNrLFxyXG4gICAgICAgIG1vZFByb2plY3RMaXN0LFxyXG4gICAgICAgIHZpZXdMaXN0LFxyXG4gICAgfTtcclxuXHJcbn0pKCk7XHJcblxyXG5jb25zdCB0b0RvQ29udHJvbGxlciA9ICgoKSA9PiB7XHJcbn0pKCk7XHJcblxyXG5saXN0LmFkZFRhc2soJ3Rhc2tOYW1lJywgJ3Rhc2tOb3RlJywgJ3Rhc2tQcm9qTmFtZScsICd0YXNrUHJpb3JpdHknLCAndGFza0RhdGUnKVxyXG5cclxuY29uc29sZS5sb2cobGlzdC52aWV3TGlzdCgpKTtcclxuXHJcblxyXG4vLyBleHBvcnQge307XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==