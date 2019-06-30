import app from '../../app';
import { userModel, userDB } from "../models/userModel";
import chai from 'chai';
import chaiHttp from 'chai-http';
import { CREATED_CODE, BAD_REQUEST_CODE , ERROR_CODE, INTERNAL_SERVER_ERROR_CODE } from "../constantes/statusCodes";
import { NOT_FOUND, BAD_REQUEST_MSG } from '../constantes/statusMessages';
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

const user = userDB.find(user => req.body.email === user.email);


describe('Test for the user endpoint', () => {
    describe('Account creation', () => {
        it('Should create a new user', (done) => {
            chai.request(app)
            .post('/api/v1/user/signup')
            .send(signupCredentials)
            .end((err,res) =>{ 
                chai.expect(res.body).to.have.an('object');
                chai.expect(res.statusCode).to.be.equal(CREATED_CODE);
                done();
            });
        })

        it('Should fail to create the same user twice',(done) =>{
            chai.request(app)
            .post('/api/v1/user/signup')
            .send(signupCredentials)
            .end((err,res) =>{ 
                chai.expect(res.body.error).to.be.equal(EMAIL_EXIST);
                chai.expect(res.body.status).to.be.equal(BAD_REQUEST_CODE);
                done();
        
            })
        });

        it('Should validate user inputs spec', (done) => {
            chai.request(app)
            .post('/api/v1/user/signup')
            .send(corruptCredentials)
            .end((err, res) => {
                chai.expect(res.statusCode).to.be.equal(BAD_REQUEST_CODE);
                chai.expect(res.body.status).to.be.equal(BAD_REQUEST_MSG);
                done();
            });
        })

        describe("Incomming bad requests" , () => {
            it('should handle not found request',(done) =>{
                chai.request(app)
                .post('/')
                .send(signupCredentials)
                .end((err,res) =>{ 
                    chai.expect(res.status).to.be.equal(ERROR_CODE);
                    chai.expect(res.body.error.message).to.be.equal(NOT_FOUND);
                    done();
            
                })
            });

           
        });

    })

    

});

