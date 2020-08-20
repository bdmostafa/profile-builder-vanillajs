// Import Store
import Store from './store';
import UI from './UI';
import Profile from './Profile';

// Trigger after DOMLoaded
window.addEventListener('DOMContentLoaded', Store.displayProfiles);

// Selector form submission
document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const profession = document.querySelector('#profession').value;

    //Instantiate UI object
    const ui = new UI();

    const id = ui.getId();

    // Instantiate profile object
    const profile = new Profile(id, name, email, profession);

    // Validation
    if (name === '' || email === '' || profession === '') {
        ui.showAlert('Please fill up the form', 'warning')
    } else {
        ui.showAlert('You added profile successfully.', 'success');
        // Adding profile to list
        ui.addProfileToList(profile);

        // Adding profile to local storage
        // Its not needed to instantiate. Its used as a 'static' because this architecture is not used outside. Its only for storage purposes
        Store.addProfileToStorage(profile);

        // Clear input field when form is submitted
        ui.clearField();
    }
});


// Event delegation (parent) for delete/edit item
document.querySelector('#profile-list').addEventListener('click', e => {
    //Instantiate UI object
    const ui = new UI();
    if (e.target.classList.contains('fa-trash')) {
        ui.showAlert('Profile is removed successfully', 'info')
        ui.deleteProfile(e.target);
    } else {
        ui.editProfile(e.target);
    }
})