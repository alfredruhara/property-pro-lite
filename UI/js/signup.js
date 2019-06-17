class Signup extends IsQ{

    constructor(){
        super();
        this.validate();
    }

    /* process */
    process(email,passcode) {
         document.location.assign("../html/account.html");
    }



    validate(){
        
        const firstName  = Qval(".firstName");
        const lastName   = Qval(".lastName");
        const email      = Qval(".email");
        const phone      = Qval(".phone");
        const passcode   = Qval(".password");
        const confirmPasscode   = Qval(".confirmPassword");

        let   isValid      = true
        
        if (firstName == "") {
            Qselect('.firstname-disp-error').textContent = "What is your first name ?";
            isValid = false;
        }else{
            Qselect('.firstname-disp-error').textContent = "";  
        }

        if (lastName == "") {
            Qselect('.lastname-disp-error').textContent = "What is your last name ?";
            isValid = false;
        }else{
            Qselect('.lastname-disp-error').textContent = "";  
        }

        if (!this.Qvalid("email", email)) {

            Qselect('.email-disp-error').textContent = "Invalid email address";
            isValid = false;
            
        } else {
            Qselect('.email-disp-error').textContent = "";  
        }
        
        if (!this.Qvalid("phone", phone)) {

            Qselect('.phone-disp-error').textContent = "Invalid phone number";
            isValid = false;
            
        } else {
            Qselect('.phone-disp-error').textContent = "";  
        }

        if (passcode.length < 6 ) {

            Qselect('.password-disp-error').textContent = "Password should have 6 caracters or more";
            isValid = false;
        } else {
            Qselect('.password-disp-error').textContent = "";
        }

        if (passcode != confirmPasscode ) {

            Qselect('.confirmPassword-disp-error').textContent = "Password does not match";
            isValid = false;
        } else {
            Qselect('.confirmPassword-disp-error').textContent = "";
        }

        if (isValid == true) {
            this.process(email,passcode)
        }

    }
}



