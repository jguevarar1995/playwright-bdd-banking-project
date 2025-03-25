export class Customer {
    public firstName?: string;
    public lastName?: string;
    public postalCode?: string;

    constructor(firstName?: string, lastName?: string, postalCode?: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.postalCode = postalCode;
    }
}