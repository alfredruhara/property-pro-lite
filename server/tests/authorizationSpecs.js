// import app from '../../app';
// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import { 
//    BAD_REQUEST_CODE , 
//    UNAUTHORIZED_CODE,
//    FORBIDDEN_CODE
// } from "../constantes/statusCodes";
// import {
//     fakeToken,
//     changePassword,
// } from '../data/data';

// chai.use(chaiHttp);

//  describe ('Authorization - verify Token Tests cases ', () => {
//     it('it will ensure  the authorisation header have been set on protected endpoint', (done) => {
//         chai.request(app)
//         .patch('/api/v1/user/changepassword')
//         .send(changePassword)
//         .end((err,res) => {
//             chai.expect(res.body).to.be.a('object');
//             chai.expect(res.statusCode).to.be.equal(BAD_REQUEST_CODE);
//             chai.expect(res.body.message).to.be.equal('The authorization token is missing');
//            done()
//         });
//     });
//     it('it will ensure a token can be decrypted , if not throw', (done) => {
//         chai.request(app)
//         .patch('/api/v1/user/changepassword')
//         .set('Authorization',  fakeToken+"fake" )
//         .send(changePassword)
//         .end((err,res) => {
//             chai.expect(res.body).to.be.a('object');
//             chai.expect(res.statusCode).to.be.equal(UNAUTHORIZED_CODE);
//             done()
//         });
//     });

//     it('it will ensure a token have been passed ', (done) => {
//         chai.request(app)
//         .patch('/api/v1/user/changepassword')
//         .set('Authorization',  "token")
//         .send(changePassword)
//         .end((err,res) => {
//             chai.expect(res.body).to.be.a('object');
//             chai.expect(res.statusCode).to.be.equal(FORBIDDEN_CODE);
//             chai.expect(res.body.message).to.be.equal('No authorization token provided');
//            done()
//         });
    
//     });


// });