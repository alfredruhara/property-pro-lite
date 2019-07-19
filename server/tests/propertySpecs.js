import app from '../../app';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { 
   CREATED_CODE,
   SUCCESS_CODE
} from "../constantes/statusCodes";

import {
    fakeToken,
    changePassword,
    createProperty,
    updateProperty,
    corruptOnUpdateAproperty,
    routes
} from '../data/data';

chai.use(chaiHttp);
let token = '';
// ddl_test.dropUserTable();

describe('Sign up & Sign in a user for tests purposes', () => {

    describe('Account creation Test', () => {
        it('Should create a new user ', (done) => {
            chai.request(app)
            .post(routes.signup)
            .send({
                firstName: 'exceptation',
                email: 'exceptation@gmail.com',
                lastName: 'week2',
                password: '12345678',
                phoneNumber: '1353465'
            })
            .end((err,res) =>{ 
                chai.expect(res.body).to.have.an('object');
                chai.expect(res.statusCode).to.be.equal(CREATED_CODE);
                chai.expect(res.type).to.be.equal('application/json');
                done();
            });
        });

        it('Should sign  a user', (done) =>{
            chai.request(app)
            .post(routes.signin)
            .send({
                email: 'exceptation@gmail.com',
                password: '12345678',
            })
            .end((err,res) => {
                token = res.body.data.token;
                chai.expect(res.statusCode).to.be.equal(SUCCESS_CODE);
                chai.expect(res.body).to.be.an('object');
                chai.expect(res.body.status).to.be.equal(SUCCESS_CODE);
                chai.expect(res.body).to.have.property('status');
                done();
            });
        });

    });
  
});


describe("Tests for property endpoints - api/v1/property ", () => {

    it("Should create an advert property ", (done) => {
        chai.request(app)
        .post(routes.createadvert)
        .send(createProperty)
        .set({Authorization : `Bearer ${token}` , 'Accept':'application/json'})
        .end( (err, res) => {
            chai.expect(res.statusCode).to.be.equal(CREATED_CODE);
            chai.expect(res.body.status).to.be.equal(CREATED_CODE);
            done();
        });
    });

    it("Should get all property adverts", (done) => {
        chai.request(app)
        .get(routes.allProperties)
        .end( (err, res) => {
            chai.expect(res.statusCode).to.be.equal(SUCCESS_CODE);
            chai.expect(res.body.status).to.be.equal(SUCCESS_CODE);
            done();
        });
    });

    it("Should get a specific property advert", (done) => {
        chai.request(app)
        .get(routes.viewspecific)
        .end( (err, res) => {
            chai.expect(res.statusCode).to.be.equal(SUCCESS_CODE);
            chai.expect(res.body.status).to.be.equal(SUCCESS_CODE);
            done();
        });
    });



    it("Should update a specific property ", (done) => {
        chai.request(app)
        .patch(routes.updateSpecidicProperty)
        .send(updateProperty)
        .set({Authorization : `Bearer ${token}` , 'Accept':'application/json'})
        .end( (err, res) => {
            chai.expect(res.statusCode).to.be.equal(SUCCESS_CODE);
            chai.expect(res.body.status).to.be.equal(SUCCESS_CODE);
            done();
        });
    });


    it("Should get  all adverts properties for the agent ", (done) => {
        chai.request(app)
        .get(routes.agentAvailableProperty)
        .set({Authorization : `Bearer ${token}` , 'Accept':'application/json'})
        .end( (err, res) => {
            chai.expect(res.statusCode).to.be.equal(404);
            done();
        });
    });


    it("Should  mark a property advert as trade ", (done) => {
        chai.request(app)
        .patch(routes.tradeSpecificProperty)
        .set({Authorization : `Bearer ${token}` , 'Accept':'application/json'})
        .end( (err, res) => {
            chai.expect(res.statusCode).to.be.equal(SUCCESS_CODE);
            done();
        });
    });

});
