
class Account extends IsQ {

    constructor () {
        super();
        this.ToastQ = new ToastQ();
    }

    deleteAdvert(){
        this.ToastQ.Qshow('Advert deleted')
    }

    markAdvert(){
        this.ToastQ.Qshow('Advert mark as Out')
    }

    postAdvert() {
        this.ToastQ.Qshow('Advert successfully posted');
    }

}

const Qaccount = new Account();
