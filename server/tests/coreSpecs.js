import app from '../../app';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { 
   ERROR_CODE
} from "../constantes/statusCodes";
import { 
    NOT_FOUND
} from '../constantes/statusMessages';
import {
    signupCredentials,
    routes
} from '../data/data';

chai.use(chaiHttp);


describe('Test for the user endpoint - /api/v1/user/', () => {

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