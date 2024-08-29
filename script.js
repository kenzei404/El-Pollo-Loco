
let contacts = [
    'vorname', 'kenzo',
    'nachname', 'kasper',
]

class contact {
    vorname;
    nachname;
}


function createContact(vorname, nachname) {
    let myContact = new contact();
    myContact['vorname'] = vorname;
    myContact['nachname'] = nachname;
    contacts.push({ myContact })
}


