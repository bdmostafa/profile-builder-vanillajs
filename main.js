// Create a Profile constructor
function Profile(name, email, profession) {
    this.name = name;
    this.email = email;
    this.profession = profession;
}

// Prototype for single location on every execution
function UI() {
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
        <td><i class="fa fa-trash"></i> <i class="fa fa-edit"></i></td>
        `
        document.querySelector('#profile-list').appendChild(tr);
    }
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
    ui.addProfileToList(profile);
});