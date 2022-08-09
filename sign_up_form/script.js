function passCheck() {
    if (document.getElementById('password').value !==
        document.getElementById('pass_con').value && document.getElementById('pass_con').value !== '') {
            document.getElementById('password').classList.add("error");
            document.getElementById('pass_con').classList.add("error");
            document.getElementById('error_message').innerHTML = '*Passwords do not match';
    } else {
        document.getElementById('password').classList.remove("error");
        document.getElementById('pass_con').classList.remove("error");
        document.getElementById('error_message').innerHTML = '';
    }
}

function validitycheck() {
    ['input', 'focusout'].forEach(evt => {
        document.querySelectorAll('input').forEach(input => {input.addEventListener(evt, handler, false)});
    });
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        if (!form.reportValidity()) {
            event.preventDefault();
        } else if (document.getElementById('password').value !==
        document.getElementById('pass_con').value && document.getElementById('pass_con').value !== '') {
            event.preventDefault();
            document.getElementById('pass_con').setCustomValidity('Passwords do not match');
            document.getElementById('pass_con').reportValidity();
        }
    })
}

function handler(event) {
    event.target.setCustomValidity('');
    if (event.target.validity.valueMissing) {
        event.target.setCustomValidity('This field must be filled in to proceed');
    } else if (event.target.validity.patternMismatch) {
        event.target.setCustomValidity('Phone number must be numeric');
    } else if (event.target.validity.tooShort) {
        event.target.setCustomValidity('Phone number is too short');
    } else if (event.target.validity.typeMismatch) {
        if (event.target.getAttribute('type') === 'email') {
            event.target.setCustomValidity('Ensure email format is correct with an @ used');
        }
    } 
    event.target.reportValidity();
}

validitycheck();