export const userDB = [];
export const tmpSession = [];

export class userModel {
  constructor({
    id,
    email,
    firstName,
    lastName,
    password,
    phoneNumber,
    address,
    isAdmin
  }) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.isAdmin = isAdmin;
  }
}
