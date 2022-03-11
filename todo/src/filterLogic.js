import { list } from './listLogic'
import { isToday, isThisWeek, format, parse} from 'date-fns'

const filterLists = (() => {

    let listArr = [];
    
    function byAll() {
        listArr = [...list.viewTodoList()];
        const newListArr = listArr.filter(todoObj => !todoObj.todoStatus);
        return newListArr;  
    }

    function byToday() {
        listArr = [...list.viewTodoList()];
        const newListArr = listArr.filter(todoObj => isToday(parse(todoObj.todoDate, 'dd/MM/yyyy', new Date())));
        return newListArr;
    }

    function byWeek() {
        listArr = [...list.viewTodoList()];
        const newListArr = listArr.filter(todoObj => isThisWeek(parse(todoObj.todoDate, 'dd/MM/yyyy', new Date()), { weekStartsOn: 1 }));
        return newListArr; 
    }

    function byCompleted() {
        listArr = [...list.viewTodoList()];
        const newListArr = listArr.filter(todoObj => todoObj.todoStatus);
        return newListArr;  
    }

    function byProject(projName) {
        listArr = [...list.viewTodoList()];
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

export { filterLists }