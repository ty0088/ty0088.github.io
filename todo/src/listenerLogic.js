import { controller } from "./controllerLogic";

const listener = (function () {

    function clickAll() {
        removeClick();
        const link = document.querySelectorAll('.link');
        link.forEach(element => element.addEventListener('click', controller.click));
        const double = document.querySelectorAll('.project-title.link');
        double.forEach(element => element.addEventListener('dblclick', controller.editProjName));
    }

    function clickTodo() {
        removeClick();
        const link = document.querySelectorAll('#todo-add-form .link');
        link.forEach(element => element.addEventListener('click', controller.click));
    }

    function clickProj() {
        removeClick();
        const link = document.querySelectorAll('#project-add-form .link');
        link.forEach(element => element.addEventListener('click', controller.click));
    }

    function clickEdit() {
        removeClick();
        const link = document.querySelectorAll('.submit-buttons .link');
        link.forEach(element => element.addEventListener('click', controller.click));
    }

    function removeClick() {
        const link = document.querySelectorAll('.link');
        link.forEach(element => element.removeEventListener('click', controller.click));
        const double = document.querySelectorAll('.project-title.link');
        double.forEach(element => element.removeEventListener('dblclick', controller.editProjName));
    }

    function enterKey() {
        document.addEventListener("keydown", function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                controller.enterValues();
            }
        });
    }

    return {
        clickAll,
        clickTodo,
        clickProj,
        clickEdit,
        removeClick,
        enterKey,
    };

})();

export { listener } 