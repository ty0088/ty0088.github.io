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
