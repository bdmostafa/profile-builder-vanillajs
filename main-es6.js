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
    // Adding profiles to local storage
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
        console.log(profiles)
        localStorage.setItem('profiles', JSON.stringify(profiles));
    }
    // Getting profiles from local storage
    static getProfilesFromLocalStorage() {
        let profiles;
        if (localStorage.getItem('profiles') === null) {
            profiles = [];
        } else {
            profiles = JSON.parse(localStorage.getItem('profiles'));
        }
        return profiles;
    }
    // Displaying profiles from local storage
    static displayProfiles() {
        const profiles = Store.getProfilesFromLocalStorage();
        profiles.forEach(profile => {
            const ui = new UI();
            ui.addProfileToList(profile)
        })
    }
    // Removing profiles from local storage
    static removeFromLocalStorage(id) {
        const profiles = Store.getProfilesFromLocalStorage();
        profiles.forEach((profile, index) => {

            // console.log('profile -id:', typeof profile.id, 'current-id:', typeof id)
            if (profile.id === id) {
                profiles.splice(index, 1);
            }
        });
        localStorage.setItem('profiles', JSON.stringify(profiles));
    }
}
// Trigger after DOMLoaded
window.addEventListener('DOMContentLoaded', Store.displayProfiles);

class UI {
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
        <th scope="row">#</th>
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