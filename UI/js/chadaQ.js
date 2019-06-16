/*
* chadaQ.js 
* Author Chadrack Ruhara
* 16 june 2019
*/


/* Query selector */
const Qselect = (element) => {
    return document.querySelector(element);
}

/* Set a style(css) to an element */
const Qstyle = (element, property, value) => {
    element.style.setProperty(property, value);
};

/* Hide an element */
const Qhide = (element) => {
    Qstyle(element, "display", "none");
};

/* Show an element */
const Qshow = (element,value='block') => {
    Qstyle(element, "display", value);
};

/* Toast - For notification */
class toastQ {
        
    constructor() {
        this.Qini();
        this.toast = Qselect('.toast');
    }
    Qini() {
        Qselect('body').innerHTML += `
            <div class="toast" class="fine-shadow flex-between">
                <span class="toast-body"></span>
            </div>
        `;
    }
    Qshow(message) {

        if (message != undefined ) {
            Qselect('.toast-body').textContent = message;
            Qstyle(this.toast,'bottom','30px') ;
        }
      
        /* Dismissing the toast */
        setTimeout(() => {
            this.Qdismiss();
        }, 2500);
        
    }
    Qdismiss() {
        Qstyle(this.toast,'bottom','-80px') ;
    }

}
/** Validator methhod  */
class isQ {
    constrcutor() {}


    Qvalid(inputType, value) {

        if (inputType == undefined || value == undefined ) { return false }

        const purified = value.toString().toLowerCase().trim();
        let   water;

        switch(inputType) {

            case "name"   : {
                water = /^[a-zA-Z'-]{2,30}$/;
                break;
            }
            case "number" : {
                water = /^-{0,1}\d+$/;
                break;
            }
            case "email" :  {
                water =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                break;
            }
            /*Allowed formats (123) 456-7890 , (123)456-7890, 123-456-7890, 123.456.7890, 1234567890, +31636363634, 075-63546725 - Tested*/
            case "phone" : {
                water = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
                break;
            }
            case "url"  : {

            }
            default : {
                return false ;
            }
        }

        return water.test(purified);


    }


}



class sliderQ {

}

class ajaxQ {

}

let Q = new isQ();

console.log(Q.Qvalid("number",""))


