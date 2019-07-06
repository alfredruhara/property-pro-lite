// import app from '../../app';
// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import { 
//     CREATED_CODE,
//     SUCCESS_CODE,
//     BAD_REQUEST_CODE , 
//     ERROR_CODE, 
//     UNAUTHORIZED_CODE
//  } from "../constantes/statusCodes";
//  import { 
//      NOT_FOUND, 
//      BAD_REQUEST_MSG, 
//      SUCCESS_MSG 
//  } from '../constantes/statusMessages';
//  import { 
//      EMAIL_EXIST 
//  } from '../constantes/customeMessages';
//  import {
//      signupCredentials,
//      signupCredentials2,
//      corruptCredentials,
//      signinCredentials,
//      signinCredentials2,
//      userUpdateInfos,
//      corruptOnUpdateUserInfos,
//      changePassword,
//      fakeOldPasswork,
//      doesNotMatchPassword,
//      corruptOnChangePassword,
//      changeAvatar,
//      corruptOnChangeAvatar,
//      createProperty,
//      routes
//  } from '../data/data';
 
//  chai.use(chaiHttp);

//  describe("Recall - Sign up and Sign in a new uses Tests ", () => {

//     it('Should create a new user ', (done) => {
//         chai.request(app)
//         .post(routes.signup)
//         .send(signupCredentials2)
//         .end((err,res) =>{ 
//             chai.expect(res.body).to.have.an('object');
//             chai.expect(res.statusCode).to.be.equal(CREATED_CODE);
//             chai.expect(res.type).to.be.equal('application/json');
//             done();
//         });
//     });

//     it('Should sign  a user', (done) =>{
//         chai.request(app)
//         .post(routes.signin)
//         .send(signinCredentials2)
//         .end((err,res) =>{
//             chai.expect(res.statusCode).to.be.equal(SUCCESS_CODE);
//             chai.expect(res.body).to.be.an('object');
//             chai.expect(res.body.status).to.be.equal(SUCCESS_MSG);
//             chai.expect(res.body).to.have.property('status');
//             chai.expect(res.type).to.be.equal('application/json');
//             done();
//         });
//     });

//  });

//  describe("Tests for property endpoints - api/v1/property ", () => {

//     describe("Tests for creating an advert property ", (done) => {
//         chai.request(app)
//         .post(routes.createadvert)
//         .send(createProperty)
//         .end( (err, res) => {
//             console.log(res.body);
//             chai.expect(res.statusCode).to.be.equal(SUCCESS_CODE);
//             chai.expect(res.body.status).to.be.equal(SUCCESS_MSG);
//             done();
//         });
//     });

//  });