import { controller } from "./controllerLogic";

const listener = (function () {

    function clickAll() {
        removeClick();
        const link = document.querySelectorAll('.link');
        link.forEach(element => element.addEventListener('click', controller.click));
    }

    function clickTodo() {
        removeClick();
        const link = document.querySelectorAll('#todo-add-form .link');
        link.forEach(element => element.addEventListener('click', controller.click));
    }

    function clickProj() {
        removeClick();
        const link = document.querySelectorAll('#proj-add-form .link');
        link.forEach(element => element.addEventListener('click', controller.click));
    }

    function clickEditProj() {
        removeClick();
        const link = document.querySelectorAll('#proj-edit-form .link');
        link.forEach(element => element.addEventListener('click', controller.click));
    }

    function clickEditTodo() {
        removeClick();
        const link = document.querySelectorAll('.submit-buttons .link');
        link.forEach(element => element.addEventListener('click', controller.click));
    }

    function removeClick() {
        const link = document.querySelectorAll('.link');
        link.forEach(element => element.removeEventListener('click', controller.click));
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
        clickEditTodo,
        clickEditProj,
        removeClick,
        enterKey,
    };

})();

export { listener } 