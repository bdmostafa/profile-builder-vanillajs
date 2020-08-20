// Handle UI section of the app
export default class UI {
    // Adding profiles to UI(User Interface)
    addProfileToList({
        // Object destructuring from profile object
        id,
        name,
        email,
        profession
    }) {
        // Create html table
        const tr = document.createElement('tr');
        // Creating HTML (tr, td) and hidden input element to track id (special identification)
        tr.innerHTML = `
        <td>${name}</td>
        <td>${email}</td>
        <td>${profession}</td>
        <input type="hidden" data-id=${id} />
        <td><i id="delete" class="fa fa-trash"></i> <i id="edit" class="fa fa-edit"></i></td>
        `
        // Append to the tbody
        document.querySelector('#profile-list').appendChild(tr);
    }
    // Clearing fields when submitted the form
    clearField() {
        document.querySelector('#name').value = '';
        document.querySelector('#email').value = '';
        document.querySelector('#profession').value = '';
    }
    // Delete profile on click event from display and local storage
    deleteProfile(target) {
        if (target.id === 'delete') {
            // Getting id from target hidden input
            const id = target.parentElement.previousElementSibling.dataset.id;

            // Converting string 'id' into number for future comparing
            //  Removing profiles from local storage
            Store.removeFromLocalStorage(parseInt(id));

            // Removing tr from UI
            target.parentElement.parentElement.remove();
        }
    }
    // Edit profile on click event and adding it into local storage newly
    editProfile(target) {
        if (target.id === 'edit') {
            const parent = target.parentElement.parentElement;
            // Capture the values from target table
            const targetName = parent.children[1].innerText;
            const targetEmail = parent.children[2].innerText;
            const targetProfession = parent.children[3].innerText;
            // Display the target values onto the form
            document.querySelector('#name').value = targetName;
            document.querySelector('#email').value = targetEmail;
            document.querySelector('#profession').value = targetProfession;
            // Remove current profile from local
            const id = target.parentElement.previousElementSibling.dataset.id;
            Store.removeFromLocalStorage(parseInt(id));
            // Remove current profile from display
            target.parentElement.parentElement.remove();
        }
    }
    showAlert(message, className) {
        const form = document.querySelector('form');
        const container = document.querySelector('.container');
        const div = document.createElement('div');

        // div.classList.add(`alert`);
        // div.classList.add(`alert-${className}`)

        div.className = `alert alert-${className}`;

        div.textContent = message;
        container.insertBefore(div, form);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 1000)
    }
    getId() {
        return document.querySelectorAll('tr').length;
    }
}