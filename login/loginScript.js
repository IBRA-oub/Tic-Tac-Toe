const form = document.querySelector('form');

const firstPlayer = document.querySelector('input[name="player1"]');
const secondPlayer = document.querySelector('input[name="player2"]');
const firstErrorMessage = document.querySelector('#firstErrorMessage');
const secondErrorMessage = document.querySelector('#SecondErrorMessage');

let form_validation = false;

// ------------input validatio --------------------
const validate = () => {
    
    form_validation = true;

    //--------input-firstPlayer--------
    if (!firstPlayer.value) {
        firstErrorMessage.innerHTML = 'please enter the name of player 1';
        form_validation = false;
    } else if (!/^[A-Za-z]+$/.test(firstPlayer.value)) {
        firstErrorMessage.innerHTML = 'the name should only contain letters';
        form_validation = false;
    } else if (firstPlayer.value.length < 3) {
        firstErrorMessage.innerHTML = 'the name must contain at least 3 characters';
        form_validation = false;
    } else if (firstPlayer.value.length > 9) {
        firstErrorMessage.innerHTML = 'the name must contain a maximum of 9 characters';
        form_validation = false;
    } else {
        firstErrorMessage.innerHTML = '';
    }

    //-------------input-secondPlayer------------
    if (!secondPlayer.value) {
        secondErrorMessage.innerHTML = 'please enter the name of player 2';
        form_validation = false;
    } else if (!/^[A-Za-z]+$/.test(secondPlayer.value)) {
        secondErrorMessage.innerHTML = 'the name should only contain letters';
        form_validation = false;
    } else if (secondPlayer.value.length < 3) {
        secondErrorMessage.innerHTML = 'the name must contain at least 3 characters';
        form_validation = false;
    } else if (secondPlayer.value.length > 9) {
        secondErrorMessage.innerHTML = 'the name must contain a maximum of 9 characters';
        form_validation = false;
    } else {
        secondErrorMessage.innerHTML = '';
    }
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    validate();
    if (form_validation) {
        form.submit();
    }
});
