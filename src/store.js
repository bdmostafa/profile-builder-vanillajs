// Handle local storage part
// ES6 module export
export default class Store {
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
        // console.log(profiles);
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