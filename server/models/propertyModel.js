export const propertyDB = [];

export class PropertyModel {
  constructor({
    id,
    owner,
    ownerInfo,
    status,
    price,
    state,
    city,
    address,
    type,
    createdOn,
    imageUrl,
    ownerEmail,
    ownerPhoneNumber
  }) {
    this.id = id;
    this.owner = owner;
    this.ownerInfo = ownerInfo;
    this.status = status;
    this.price = price;
    this.state = state;
    this.city = city;
    this.address = address;
    this.type = type;
    this.createdOn = createdOn;
    this.imageUrl = imageUrl;
    this.ownerEmail = ownerEmail;
    this.ownerPhoneNumber = ownerPhoneNumber;
  }
}
