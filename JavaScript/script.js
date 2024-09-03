
let contacts = []

function createContact(vorname, nachname, nummer) {
    let myContact = new contact(vorname, nachname, nummer);
    contacts.push(myContact);
}

createContact('kenzo', 'kasper', '0791505337')
createContact('ronja', 'kasper', '0791505337')
createContact('daliah', 'kasper', '0791505337')
createContact('marco', 'heinzmann', '0791505337')

