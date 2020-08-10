// Create a Profile class
class Profile {
    constructor(id, name, email, profession) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.profession = profession;
    }
}

class Store {
    static addProfileToStorage(profile) {
        let profiles;
        // When first profile is added or if there is no profiles key in local storage, assign empty array to profiles
        if (localStorage.getItem('profiles') === null) {
            profiles = [];
        } else {
            // Get the existing profiles to the array
            profiles = JSON.parse(localStorage.getItem('profiles'));
        }
        // Adding new profile
        profiles.push(profile);
        localStorage.setItem('profiles', JSON.stringify(profiles));
    }
    static getProfilesFromLocalStorage() {
        let profiles;
        if (localStorage.getItem('profiles') === null) {
            profiles = [];
        } else {
            profiles = JSON.parse(localStorage.getItem('profiles'))
        }
        return profiles;
    }
    static displayProfiles() {
        const profiles = Store.getProfilesFromLocalStorage();
        profiles.forEach(profile => {
            const ui = new UI();
            ui.addProfileToList(profile)
        })
    }
}
// Trigger after DOMLoaded
window.addEventListener('DOMContentLoaded', Store.displayProfiles);

class UI {
    addProfileToList({
        // Object destructuring from profile object
        id,
        name,
        email,
        profession
    }) {
        // Create html table
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <th scope="row">${id}</th>
        <td>${name}</td>
        <td>${email}</td>
        <td>${profession}</td>
        <input type="hidden" data-id="${id}" />
        <td><i id="delete" class="fa fa-trash"></i> <i id="edit" class="fa fa-edit"></i></td>
        `
        document.querySelector('#profile-list').appendChild(tr);
    }
    clearField() {
        document.querySelector('#name').value = '';
        document.querySelector('#email').value = '';
        document.querySelector('#profession').value = '';
    }
    deleteProfile(target) {
        if (target.id === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }
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

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const profession = document.querySelector('#profession').value;

    //Instantiate UI object
    const ui = new UI();

    const id = ui.getId();
    console.log(id);

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