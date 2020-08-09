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
        <td><i id="delete" class="fa fa-trash"></i> <i class="fa fa-edit"></i></td>
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


document.querySelector('form').addEventListener('submit', e => {
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const profession = document.querySelector('#profession').value;
    // Instantiate profile object
    const profile = new Profile(name, email, profession);
    //Instantiate UI object
    const ui = new UI();
    // Validation
    if (name === '' || email === '' || profession === '') {

    } else {
        ui.addProfileToList(profile);
        ui.clearField();
    }
    e.preventDefault();
});


// Event delegation (parent)
document.querySelector('#profile-list').addEventListener('click', e => {
    //Instantiate UI object
    const ui = new UI();
    ui.deleteProfile(e.target);
})