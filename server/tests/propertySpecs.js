import app from '../../app';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { 
   CREATED_CODE,
   SUCCESS_CODE,
   BAD_REQUEST_CODE , 
   ERROR_CODE, 
   UNAUTHORIZED_CODE,
   FORBIDDEN_CODE
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
                phoneNumber: '1353465',
                address: 'Kigali',
                isAdmin: true
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
    
    /**  Case where Values does not exist  yet in the database */

    it("Should not fetch property advert if it does bot exist", (done) => { 
        chai.request(app)
        .get(routes.viewspecific)
        .end( (err, res) => {
            chai.expect(res.statusCode).to.be.equal(BAD_REQUEST_CODE);
            chai.expect(res.body.message).to.be.equal('This resource does not exist');
            done();
        });
    });


    it("Should not  fetch all adverts properties if there is no property", (done) => {
        chai.request(app)
        .get(routes.allProperties)
        .end( (err, res) => {
            chai.expect(res.statusCode).to.be.equal(ERROR_CODE);
            chai.expect(res.body.message).to.be.equal('Adverts properties datas unavailable');
            done();
        });
    });


    
    it("Should not delete a property advert if it does not exist", (done) => {
        chai.request(app)
        .delete(routes.deletespecificproperty)
        .set({Authorization : `Bearer ${token}` , 'Accept':'application/json'})
        .end( (err, res) => {
            chai.expect(res.statusCode).to.be.equal(BAD_REQUEST_CODE);
            chai.expect(res.body.message).to.be.equal('This resource does not exist');
            done();
        });
    });

    it("Should not update a property advert if it does not exist", (done) => {
        chai.request(app)
        .put(routes.updateSpecidicProperty)
        .send(updateProperty)
        .set({Authorization : `Bearer ${token}` , 'Accept':'application/json'})
        .end( (err, res) => {
            chai.expect(res.statusCode).to.be.equal(ERROR_CODE);
            done();
        });
    });

    it("Should not mark a property advert as trade if it does not exists", (done) => {
        chai.request(app)
        .patch(routes.tradeSpecificProperty)
        .set({Authorization : `Bearer ${token}` , 'Accept':'application/json'})
        .end( (err, res) => {
            chai.expect(res.statusCode).to.be.equal(BAD_REQUEST_CODE);
            done();
        });
    });

    it("Should not mark a property advert as untrade if it does not exists", (done) => {
        chai.request(app)
        .patch(routes.untradeSpecificProperty)
        .set({Authorization : `Bearer ${token}` , 'Accept':'application/json'})
        .end( (err, res) => {
            chai.expect(res.statusCode).to.be.equal(BAD_REQUEST_CODE);
            done();
        });
    });


    it("Should not get all adverts properties for the agent if he does not post yet anything", (done) => {
        chai.request(app)
        .get(routes.agentAvailableProperty)
        .set({Authorization : `Bearer ${token}` , 'Accept':'application/json'})
        .end( (err, res) => {
            chai.expect(res.statusCode).to.be.equal(ERROR_CODE);
            chai.expect(res.body.message).to.be.equal('Adverts properties datas unavailable');
            done();
        });
    });

    it("Should not get all trade advert property for the agent if he does not post yet anything", (done) => {
        chai.request(app)
        .get(routes.agentTradeProperty)
        .set({Authorization : `Bearer ${token}` , 'Accept':'application/json'})
        .end( (err, res) => {
            chai.expect(res.statusCode).to.be.equal(ERROR_CODE);
            chai.expect(res.body.message).to.be.equal('Adverts properties datas unavailable');
            done();
        });
    });

    it("Should not get all trade advert property for the agent if he does not post yet anything", (done) => {
        chai.request(app)
        .get(routes.filterProperty)
        .set({Authorization : `Bearer ${token}` , 'Accept':'application/json'})
        .end( (err, res) => {
            chai.expect(res.statusCode).to.be.equal(ERROR_CODE);
            done();
        });
    });

         /** <<<<<<<<<<<<<<<< >>>>>>>>>>>>>>>> */
    /** <<<<<<<<<<<<<<<< DATA EXISTSS >>>>>>>>>>>>>>>> */
         /** <<<<<<<<<<<<<<<< >>>>>>>>>>>>>>>> */

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
            chai.expect(res.statusCode).to.be.equal(SUCCESS_CODE);
            done();
        });
    });

    it("Should get all trade advert property for the agent ", (done) => {
        chai.request(app)
        .get(routes.agentTradeProperty)
        .set({Authorization : `Bearer ${token}` , 'Accept':'application/json'})
        .end( (err, res) => {
            chai.expect(res.statusCode).to.be.equal(SUCCESS_CODE);
            done();
        });
    });


    /******************************    Mark a property as Trade       **********************************/


    it("Should  mark a property advert as trade ", (done) => {
        chai.request(app)
        .patch(routes.tradeSpecificProperty)
        .set({Authorization : `Bearer ${token}` , 'Accept':'application/json'})
        .end( (err, res) => {
            chai.expect(res.statusCode).to.be.equal(SUCCESS_CODE);
            done();
        });
    });


    it("Should get all trade advert property for the agent ", (done) => {
        chai.request(app)
        .get(routes.agentTradeProperty)
        .set({Authorization : `Bearer ${token}` , 'Accept':'application/json'})
        .end( (err, res) => {
            chai.expect(res.statusCode).to.be.equal(SUCCESS_CODE);
            done();
        });
    });


    it("Should not fetch property advert which are no longer available", (done) => {
        chai.request(app)
        .get(routes.viewspecific)
        .end( (err, res) => {
            chai.expect(res.statusCode).to.be.equal(FORBIDDEN_CODE);
            done();
        });
    });


    it("Should handle to do not fetch if the location have not set in the query search", (done) => {
        chai.request(app)
        .get(routes.filterProperty)
        .set({Authorization : `Bearer ${token}` , 'Accept':'application/json'})
        .end( (err, res) => {
            chai.expect(res.statusCode).to.be.equal(ERROR_CODE);
            done();
        });
    });

    it("Should not  fetch all adverts properties if there is no property", (done) => {
        chai.request(app)
        .get(routes.allProperties)
        .end( (err, res) => {
            chai.expect(res.statusCode).to.be.equal(ERROR_CODE);
            chai.expect(res.body.message).to.be.equal('All have been trade . try late');
            done();
        });
    });

    it("Should not update a property advert if it does not belong to this user", (done) => {
        chai.request(app)
        .patch(routes.updateSpecidicProperty)
        .send(updateProperty)
        .set({Authorization : fakeToken , 'Accept':'application/json'})
        .end( (err, res) => {
            console.log(res.body)
            chai.expect(res.statusCode).to.be.equal(BAD_REQUEST_CODE);
            chai.expect(res.body.message).to.be.equal('Only the own of this ressource can perfom this action')
            done();
        });
    });


    it("Should not get all adverts properties for the agent if there is nothing to show", (done) => {
        chai.request(app)
        .get(routes.agentAvailableProperty)
        .set({Authorization : `Bearer ${token}` , 'Accept':'application/json'})
        .end( (err, res) => {
            chai.expect(res.statusCode).to.be.equal(SUCCESS_CODE);
            chai.expect(res.body.message).to.be.equal('Nothing to show');
            done();
        });
    });


    /******************************   Fake IDS      **********************************/

    it("Should not update a property advert if the property ID is fake", (done) => {
        chai.request(app)
        .patch(routes.updateSpecidicPropertyFakeID)
        .send(updateProperty)
        .set({Authorization : fakeToken , 'Accept':'application/json'})
        .end( (err, res) => {
            console.log(res.body)
            chai.expect(res.statusCode).to.be.equal(BAD_REQUEST_CODE);
            chai.expect(res.body.message).to.be.equal('This resource does not exist')
            done();
        });
    });

    it("Should not mark a property advert as trade if it the ID does not Exists", (done) => {
        chai.request(app)
        .patch(routes.tradeSpecificPropertyFakeID)
        .set({Authorization : `Bearer ${token}` , 'Accept':'application/json'})
        .end( (err, res) => {
            chai.expect(res.statusCode).to.be.equal(BAD_REQUEST_CODE);
            chai.expect(res.body.message).to.to.equal('This resource does not exist');
            done();
        });
    });

    it("Should not mark a property advert as trade if it does not belong to this user", (done) => {
        chai.request(app)
        .patch(routes.tradeSpecificProperty)
        .set({Authorization : fakeToken, 'Accept':'application/json'})
        .end( (err, res) => {
            chai.expect(res.statusCode).to.be.equal(BAD_REQUEST_CODE);
            chai.expect(res.body.message).to.to.equal('Only the own of this ressource can perfom this action');
            done();
        });
    });

    it("Should not mark a property advert as untrade if it does not belong to this user", (done) => {
        chai.request(app)
        .patch(routes.untradeSpecificProperty)
        .set({Authorization : fakeToken, 'Accept':'application/json'})
        .end( (err, res) => {
            chai.expect(res.statusCode).to.be.equal(BAD_REQUEST_CODE);
            chai.expect(res.body.message).to.to.equal('Only the own of this ressource can perfom this action');
            done();
        });
    });
 

    /******************************    Mark a property as UNTrade       **********************************/


    it("Should  mark a property advert as trade ", (done) => {
        chai.request(app)
        .patch(routes.untradeSpecificProperty)
        .set({Authorization : `Bearer ${token}` , 'Accept':'application/json'})
        .end( (err, res) => {

            chai.expect(res.statusCode).to.be.equal(SUCCESS_CODE);
            done();
        });
    });

       /****************************** Filter | Search  ****************************************************/
    
    it("Should be able to search or filter by location", (done) => {
        chai.request(app)
        .get(routes.filterPropertyLocation)
        .end( (err, res) => {
            console.log(res.body);
            chai.expect(res.statusCode).to.be.equal(SUCCESS_CODE);
            done();
        });
    });

    it("Should be able to search or filter by location and type", (done) => {
        chai.request(app)
        .get(routes.filterPropertyLocationType)
        .end( (err, res) => {

            chai.expect(res.statusCode).to.be.equal(SUCCESS_CODE);
            done();
        });
    });

    it("Should be able to search or filter by location, type , bathrooms and  bedrooms", (done) => {
        chai.request(app)
        .get(routes.filterPropertyFull)
        .end( (err, res) => {

            chai.expect(res.statusCode).to.be.equal(ERROR_CODE);
            chai.expect(res.body.message).to.be.equal('Nothing to show');
            done();
        });
    });


    /****************************** Deleting ************************************************************* */
    it("Should delete a property", (done) => {
        chai.request(app)
        .delete(routes.deletespecificproperty)
        .set({Authorization :  fakeToken , 'Accept':'application/json'})
        .end( (err, res) => {

            chai.expect(res.statusCode).to.be.equal(BAD_REQUEST_CODE);
            chai.expect(res.body.message).to.be.equal('Only the own of this ressource can perfom this action');
            done();
        });
    });

    it("Should delete a property if it does not belong to the agent", (done) => {
        chai.request(app)
        .delete(routes.deletespecificproperty)
        .set({Authorization : `Bearer ${token}` , 'Accept':'application/json'})
        .end( (err, res) => {
            chai.expect(res.statusCode).to.be.equal(SUCCESS_CODE);
            chai.expect(res.body.message).to.be.equal('advdert property deleted');
            done();
        });
    });
    
    /********************** BODY VALIDATIONS PROPERTY **********************  */
   
    it("Should handle body validation ", (done) => {
        chai.request(app)
        .patch(routes.updateSpecidicProperty)
        .send(corruptOnUpdateAproperty)
        .set({Authorization : `Bearer ${token}` , 'Accept':'application/json'})
        .end( (err, res) => {
            chai.expect(res.statusCode).to.be.equal(BAD_REQUEST_CODE);
            done();
        });
    });
 });


 describe ('Authorization - verify Token Tests cases ', () => {
    it('it will ensure  the authorisation header have been set on protected endpoint', (done) => {
        chai.request(app)
        .patch('/api/v1/user/changepassword')
        .send(changePassword)
        .end(function(err,res){
            chai.expect(res.body).to.be.a('object');
            chai.expect(res.statusCode).to.be.equal(BAD_REQUEST_CODE);
            chai.expect(res.body.message).to.be.equal('The authorization token is missing');
           done()
        });
    });
    it('it will ensure a token can be decrypted , if not throw', (done) => {
        chai.request(app)
        .patch('/api/v1/user/changepassword')
        .set('Authorization',  fakeToken+"fake" )
        .send(changePassword)
        .end(function(err,res){
            chai.expect(res.body).to.be.a('object');
            chai.expect(res.statusCode).to.be.equal(UNAUTHORIZED_CODE);
            done()
        });
    });

    it('it will ensure a token have been passed ', (done) => {
        chai.request(app)
        .patch('/api/v1/user/changepassword')
        .set('Authorization',  "token")
        .send(changePassword)
        .end(function(err,res){
            chai.expect(res.body).to.be.a('object');
            chai.expect(res.statusCode).to.be.equal(FORBIDDEN_CODE);
            chai.expect(res.body.message).to.be.equal('No authorization token provided');
           done()
        });
    
    });


});