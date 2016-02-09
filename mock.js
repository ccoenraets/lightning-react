// Mock implementation to simulate Lightning Component and test locally

var contacts = [
    {Id: 1, Name: "Lisa Taylor"},
    {Id: 2, Name: "Joe Smith"},
    {Id: 3, Name: "Chloe Miller"},
    {Id: 4, Name: "Luis Vasquez"},
    {Id: 5, Name: "Alex Wong"}
];

var dataService = {
    findAll: function(callback) {
        callback(contacts);
    },
    findByName: function(name, callback) {
        var filtered = contacts.filter(function(contact) {
            return contact.Name.toLowerCase().indexOf(name.toLowerCase()) > -1
        });
        callback(filtered);
    }
};

reactSearch.init(document.getElementById("react"), dataService);
