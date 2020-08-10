// Create a Profile constructor
function Profile(name, email, profession) {
    this.name = name;
    this.email = email;
    this.profession = profession;
}

// UI constructor
function UI() {}
// Prototype is used for single location on every execution

// Adding item to UI
UI.prototype.addProfileToList = function ({
    // Object destructuring from profile object
    name,
    email,
    profession
}) {
    // console.log(name, email, profession);
    // Create html table
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <th scope="row">1</th>
        <td>${name}</td>
        <td>${email}</td>
        <td>${profession}</td>
        <td><i id="delete" class="fa fa-trash"></i> <i id="edit" class="fa fa-edit"></i></td>
        `
    document.querySelector('#profile-list').appendChild(tr);
}

// Clear Fields after submission
UI.prototype.clearField = function () {
    document.querySelector('#name').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#profession').value = '';
}

// Delete profile
UI.prototype.deleteProfile = function (target) {
    if (target.id === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

// Edit profile
UI.prototype.editProfile = function (target) {
    if (target.id === 'edit') {
        const parent = target.parentElement.parentElement;
        const targetName = parent.children[1].innerText;
        const targetEmail = parent.children[2].innerText;
        const targetProfession = parent.children[3].innerText;
        document.querySelector('#name').value = targetName;
        document.querySelector('#email').value = targetEmail;
        document.querySelector('#profession').value = targetProfession;
        target.parentElement.parentElement.remove();
    }
}

// Show alert message
UI.prototype.showAlert = function (message, className) {
    const form = document.querySelector('form');
    const container = document.querySelector('.container');
    const div = document.createElement('div');

    div.className = `alert alert-${className}`;

    // div.classList.add(`alert`);
    // div.classList.add(`alert-${className}`)

    div.textContent = message;
    container.insertBefore(div, form);
    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 1000)

}



document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const profession = document.querySelector('#profession').value;
    // Instantiate profile object
    const profile = new Profile(name, email, profession);
    //Instantiate UI object
    const ui = new UI();
    // Validation
    if (name === '' || email === '' || profession === '') {
        ui.showAlert('Please fill up the form', 'warning')
    } else {
        ui.showAlert('You added profile successfully.', 'success')
        ui.addProfileToList(profile);
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