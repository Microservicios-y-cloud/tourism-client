export class Customer {
    id: string;
    userType: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;

    constructor(
        id: string,
        userType: string,
        username: string,
        firstName: string,
        lastName: string,
        email: string
    ) {
        this.id = id;
        this.userType = userType;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}
