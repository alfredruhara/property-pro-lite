import app from '../../app';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { 
   CREATED_CODE,
   SUCCESS_CODE,
   BAD_REQUEST_CODE , 
   ERROR_CODE, 
   UNAUTHORIZED_CODE
} from "../constantes/statusCodes";
import { 
    NOT_FOUND, 
    BAD_REQUEST_MSG, 
    SUCCESS_MSG 
} from '../constantes/statusMessages';
import { 
    EMAIL_EXIST 
} from '../constantes/customeMessages';
import {
    fakeToken,
    signupCredentials,
    corruptCredentials,
    signinCredentials,
    userUpdateInfos,
    corruptOnUpdateUserInfos,
    changePassword,
    fakeOldPasswork,
    doesNotMatchPassword,
    changeAvatar,
    routes
} from '../data/data';

chai.use(chaiHttp);
let token = '';



describe('Test for the user endpoint - /api/v1/user/', () => {

    describe('Account creation Test', () => {
        it('Should create a new user ', (done) => {
            chai.request(app)
            .post(routes.signup)
            .send(signupCredentials)
            .end((err,res) =>{ 
                chai.expect(res.body).to.have.an('object');
                chai.expect(res.statusCode).to.be.equal(CREATED_CODE);
                chai.expect(res.type).to.be.equal('application/json');
                done();
            });
        });

        it('Should fail to create the same user twice',(done) =>{
            chai.request(app)
            .post(routes.signup)
            .send(signupCredentials)
            .end((err,res) =>{ 
                chai.expect(res.body.error).to.be.equal(EMAIL_EXIST);
                chai.expect(res.body.status).to.be.equal(ERROR_CODE);
                chai.expect(res.type).to.be.equal('application/json');
                done();
        
            });
        });

        it('Should validate user inputs spec', (done) => {
            chai.request(app)
            .post(routes.signup)
            .send(corruptCredentials)
            .end((err, res) => {
                chai.expect(res.statusCode).to.be.equal(BAD_REQUEST_CODE);
                chai.expect(res.body.status).to.be.equal(BAD_REQUEST_MSG);
                chai.expect(res.type).to.be.equal('application/json');
                done();
            });
        });


    });

    describe('Account signing in Tests', () => {
       
        it('Should sign  a user', (done) =>{
            chai.request(app)
            .post(routes.signin)
            .send(signinCredentials)
            .end((err,res) => {
                token = res.body.data.token;
                chai.expect(res.statusCode).to.be.equal(SUCCESS_CODE);
                chai.expect(res.body).to.be.an('object');
                chai.expect(res.body.status).to.be.equal(SUCCESS_CODE);
                chai.expect(res.body).to.have.property('status');
                done();
            });
        });

        it('Should not signin a user with wrong credentials',() =>{
          chai.request(app)
          .post(routes.signin)
          .send({
              email:'fakeuser',
              password:14253
          })
          .end((err,res) =>{
              chai.expect(res.status).to.be.equal(BAD_REQUEST_CODE);
              chai.expect(res.body).to.be.an('object');
              chai.expect(res.body).to.have.property('status');
              chai.expect(res.body.status).to.be.equal(BAD_REQUEST_MSG);
              chai.expect(res.type).to.be.equal('application/json');
          });
         });


        it('Should not signin a user with  if password does not ',() =>{
            chai.request(app)
            .post(routes.signin)
            .send({
                email:'alfred@gmail.com',
                password:'coscode'
            })
            .end((err,res) =>{
                chai.expect(res.statusCode).to.be.equal(UNAUTHORIZED_CODE);
            });
        });

         it('Should validate signin body inputs spec', (done) => {
            chai.request(app)
            .post(routes.signin)
            .send(corruptCredentials)
            .end((err, res) => {
                chai.expect(res.statusCode).to.be.equal(BAD_REQUEST_CODE);
                chai.expect(res.body.status).to.be.equal(BAD_REQUEST_MSG);
                chai.expect(res.type).to.be.equal('application/json');
                done();
            });
        });

        
                
    });
    
    describe("User agents Tests", () => {
        it("Should return all user agent ", (done) => {
            chai.request(app)
            .get(routes.agents)
            .end((err, res) => {
                chai.expect(res.statusCode).to.be.equal(SUCCESS_CODE);
                done();
            });
        });
    });

    describe("User signed in Tests", () => {

        describe("User update information Tests", () => {

            it('Should update user information', (done) => {
                chai.request(app)
                .patch(routes.updateInfo)
                .send(userUpdateInfos)
                .set({Authorization : `Bearer ${token}` , 'Accept':'application/json'})
                .end((err, res) => {
                    chai.expect(res.statusCode).to.be.equal(SUCCESS_CODE);
                    chai.expect(res.body.status).to.be.equal(SUCCESS_CODE);
                    chai.expect(res.body).to.be.an('object');
                    chai.expect(res.type).to.be.equal('application/json');
                    done();
                });
            });
    
            it('Should handle to do not update user information if a fake id', (done) => {
                chai.request(app)
                .patch(routes.updateInfoWithFakeUserId)
                .send(userUpdateInfos)
                .set({Authorization : fakeToken , 'Accept':'application/json'})
                .end((err, res) => {
                    chai.expect(res.statusCode).to.be.equal(ERROR_CODE);
                    chai.expect(res.body.status).to.be.equal(ERROR_CODE);
                    chai.expect(res.body).to.be.an('object');
                    done();
                });
            });
            it('Should validate user body inputs spec', (done) => {
                chai.request(app)
                .patch(routes.updateInfo)
                .send(corruptOnUpdateUserInfos)
                .set({Authorization : `Bearer ${token}` , 'Accept':'application/json'})
                .end((err, res) => {
                    chai.expect(res.statusCode).to.be.equal(BAD_REQUEST_CODE);
                    chai.expect(res.body.status).to.be.equal(BAD_REQUEST_MSG);
                    chai.expect(res.type).to.be.equal('application/json');
                    done();
                });
            });

        });

        describe("User change password Tests", () => {
            it('Should change user password', (done) => {
                chai.request(app)
                .patch(routes.changepassword)
                .send(changePassword)
                .set({Authorization : `Bearer ${token}` , 'Accept':'application/json'})
                .end((err, res) => {
                    chai.expect(res.statusCode).to.be.equal(SUCCESS_CODE);
                    chai.expect(res.body).to.be.an('object');
                    done();
                });
            });

            it('Should not change the password if old password is incorrect', (done) => {
                chai.request(app)
                .patch(routes.changepassword)
                .send(fakeOldPasswork)
                .set({Authorization : `Bearer ${token}` , 'Accept':'application/json'})
                .end((err, res) => {
                    chai.expect(res.statusCode).to.be.equal(UNAUTHORIZED_CODE);
                    chai.expect(res.body.message).to.be.equal('Wrong old password');
                    chai.expect(res.body).to.be.an('object');
                    done();
                });
            });

            it('Should not change the password if new and confirm password does not match', (done) => {
                chai.request(app)
                .patch(routes.changepassword)
                .send(doesNotMatchPassword)
                .set({Authorization : `Bearer ${token}` , 'Accept':'application/json'})
                .end((err, res) => {
                    chai.expect(res.statusCode).to.be.equal(UNAUTHORIZED_CODE);
                    chai.expect(res.body.message).to.be.equal('Password does not macth');
                    chai.expect(res.body).to.be.an('object');
                    done();
                });
            });
            
            it('Should handle to do not change user password if the user ID is fake', (done) => {
                chai.request(app)
                .patch(routes.changepasswordWithFakeUserId)
                .send(changePassword)
                .set({Authorization : fakeToken , 'Accept':'application/json'})
                .end((err, res) => {
                    chai.expect(res.statusCode).to.be.equal(ERROR_CODE);
                    chai.expect(res.body.status).to.be.equal(ERROR_CODE);
                    chai.expect(res.body).to.be.an('object');
                    done();
                });
            });

        });

        describe("User change avatar pictute Tests", () => {
            it ('Should change the user avatar image', (done) => {
                chai.request(app)
                .patch(routes.changeAvatar)
                .send(changeAvatar)
                .set({Authorization : `Bearer ${token}` , 'Accept':'application/json'})
                .end((err, res) => {
                    chai.expect(res.statusCode).to.be.equal(SUCCESS_CODE);
                    chai.expect(res.body.status).to.be.equal(SUCCESS_CODE);
                    done();
                });
            });

            it ('Shloud handle to do not change the user avatar image if the user ID is fake', (done) => {
                chai.request(app)
                .patch(routes.changeAvatarWithFakeUserId)
                .send(changeAvatar)
                .set({Authorization : fakeToken , 'Accept':'application/json'})
                .end((err, res) => {
                    chai.expect(res.statusCode).to.be.equal(ERROR_CODE);
                    chai.expect(res.body.status).to.be.equal(ERROR_CODE);
                    done();
                });
            });


        });


    });


  
});

