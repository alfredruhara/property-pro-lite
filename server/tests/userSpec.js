import app from '../../app';
import { userModel, userDB } from "../models/userModel";
import chai from 'chai';
import chaiHttp from 'chai-http';
import { 
   CREATED_CODE,
   SUCCESS_CODE,
   BAD_REQUEST_CODE , 
   ERROR_CODE, 
   INTERNAL_SERVER_ERROR_CODE
} from "../constantes/statusCodes";
import { NOT_FOUND, BAD_REQUEST_MSG, SUCCESS_MSG } from '../constantes/statusMessages';
import { EMAIL_EXIST } from '../constantes/customeMessages';


chai.use(chaiHttp);

const signupCredentials = {
    email:'alfredruhara@gmail.com',
    firstName:'chadrack',
    lastName:'ruhara',
    password:'123456',
    phoneNumber:'0750364404',
    address:'Kigali',
    isAdmin:true,
}

const corruptCredentials = {
    unwanted : false
}
const signinCredentials = {
    email:'alfredruhara@gmail.com',
    password:'123456'
}

const userUpdateInfos = {
    firstName:'andela',
    lastName:'user',
    phoneNumber:'89109334',
    address:'Uganda',
}
const corruptOnUpdateUserInfos = {
    firstName:'hacker',
    lastName:'user',
    'email': 'fake@chada.hack'
}

// const user = userDB.find(user => req.body.email === user.email);
const routes = {
    root   : '/',
    signup : '/api/v1/user/signup',
    signin : '/api/v1/user/signin',
    auth_signup : '/api/v1/auth/signup',
    agents : '/api/v1/user/agents',
    updateInfo : '/api/v1/user/1',
    updateInfoWithFakeUserId : '/api/v1/user/100',
}

describe('Test for the user endpoint - /api/v1/user/', () => {

    describe('Account creation', () => {
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
                chai.expect(res.body.status).to.be.equal(BAD_REQUEST_CODE);
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

    describe('Account signing in', () => {
       
        it('Should sign  a user', (done) =>{
            chai.request(app)
            .post(routes.signin)
            .send(signinCredentials)
            .end((err,res) =>{

                chai.expect(res.statusCode).to.be.equal(SUCCESS_CODE);
                chai.expect(res.body).to.be.an('object');
                chai.expect(res.body.status).to.be.equal(SUCCESS_MSG);
                chai.expect(res.body).to.have.property('status');
                chai.expect(res.type).to.be.equal('application/json');
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

         it('Should not sign a user if already signed in', (done) =>{
            chai.request(app)
            .post(routes.signin)
            .send(signinCredentials)
            .end((err,res) =>{

                chai.expect(res.body.status).to.be.equal(INTERNAL_SERVER_ERROR_CODE);
                chai.expect(res.body.error).to.be.equal('data and hash arguments required');
                done();
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

  
                
    });
    
    describe("User agents ", () => {
        it("Should return all user agent ", (done) => {
            chai.request(app)
            .get(routes.agents)
            .end((err, res) => {
                chai.expect(res.statusCode).to.be.equal(SUCCESS_CODE);
                done();
            });
        });
    });

    describe("User signed in", () => {
        it('Should update user information', (done) => {
            chai.request(app)
            .put(routes.updateInfo)
            .send(userUpdateInfos)
            .end((err, res) => {
                chai.expect(res.statusCode).to.be.equal(SUCCESS_CODE);
                chai.expect(res.body.status).to.be.equal(SUCCESS_MSG);
                chai.expect(res.body).to.be.an('object');
                chai.expect(res.type).to.be.equal('application/json');
                done();
            });
        });

        it('Should handle to do not update user information if a fake id', (done) => {
            chai.request(app)
            .put(routes.updateInfoWithFakeUserId)
            .send(userUpdateInfos)
            .end((err, res) => {
                chai.expect(res.statusCode).to.be.equal(BAD_REQUEST_CODE);
                chai.expect(res.body.status).to.be.equal(BAD_REQUEST_MSG);
                chai.expect(res.body.message).to.be.equal('Unknow a user with that ID');
                chai.expect(res.body).to.be.an('object');
                chai.expect(res.type).to.be.equal('application/json');
                done();
            });
        });
        it('Should validate user body inputs spec', (done) => {
            chai.request(app)
            .put(routes.updateInfo)
            .send(corruptOnUpdateUserInfos)
            .end((err, res) => {
                chai.expect(res.statusCode).to.be.equal(BAD_REQUEST_CODE);
                chai.expect(res.body.status).to.be.equal(BAD_REQUEST_MSG);
                chai.expect(res.type).to.be.equal('application/json');
                done();
            });
        });
    });

    describe("Incomming bad requests" , () => {

        it('Should handle not found request',(done) =>{
            chai.request(app)
            .post(routes.root)
            .send(signupCredentials)
            .end((err,res) =>{ 
                chai.expect(res.status).to.be.equal(ERROR_CODE);
                chai.expect(res.body.error.message).to.be.equal(NOT_FOUND);
                done();
        
            });
        });

    });

});



