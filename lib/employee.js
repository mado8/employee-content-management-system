class createEmployee {
    constructor(id, firstName, lastName, email, roleId, manager) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.roleId = roleId;
        this.manager = manager
    }
};

module.exports = createEmployee;