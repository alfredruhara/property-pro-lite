export const propertyDB = [];

export class PropertyModel {
  constructor({
    id,
    owner,
    ownerInfo,
    status,
    title,
    price,
    state,
    city,
    address,
    type,
    bathRooms,
    bedRooms,
    createdOn,
    imageUrl,
    ownerEmail,
    ownerPhoneNumber,
    description,
    kindOfTrade
  }) {
    this.id = id;
    this.owner = owner;
    this.ownerInfo = ownerInfo;
    this.status = status;
    this.title = title;
    this.price = price;
    this.state = state;
    this.city = city;
    this.address = address;
    this.type = type;
    this.bathRooms = bathRooms;
    this.bedRooms = bedRooms;
    this.createdOn = createdOn;
    this.imageUrl = imageUrl;
    this.ownerEmail = ownerEmail;
    this.ownerPhoneNumber = ownerPhoneNumber;
    this.description = description;
    this.kindOfTrade = kindOfTrade;
  }
}
