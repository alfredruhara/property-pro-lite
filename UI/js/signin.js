class Signin extends IsQ{

    constructor(){
        super();
        this.validate();
    }

    /* process */
    process(email,passcode) {
         document.location.assign("../html/account.html");
    }

    validate(){
        
        const email      = Qval(".email");
        const passcode   = Qval(".passcode");
        let   isValid      = true
        
        if (!this.Qvalid("email", email)) {

            Qselect('.email-disp-error').textContent = "Invalid email address";
            isValid = false;
            
        } else {
            Qselect('.email-disp-error').textContent = "";  
        }
        
        if (passcode.toString().length < 6) {
            Qselect('.passcode-disp-error').textContent = "Password should have 6 caracters or more";
            isValid = false;
        } else {
            Qselect('.passcode-disp-error').textContent = "";
        }

        if (isValid == true) {
            this.process(email,passcode)
        }

    }
}



