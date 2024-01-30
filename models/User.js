class User {

    constructor(name, gender, birthdate, country, email, password, photo, admin) {

        this._name = name;//Conventionally it means a private property because of the _
        this._gender = gender;//Conventionally it means a private property because of the _
        this._birthdate = birthdate;//Conventionally it means a private property because of the _
        this._country = country;//Conventionally it means a private property because of the _
        this._email = email;//Conventionally it means a private property because of the _
        this._password = password;//Conventionally it means a private property because of the _
        this._photo = photo;//Conventionally it means a private property because of the _
        this._admin = admin;//Conventionally it means a private property because of the _
        this._register = new Date();//Conventionally it means a private property because of the _


    }

    get name() {
        return this._name;
    }

    get gender() {
        return this._gender;
    }

    get birth() {
        return this._birth;
    }

    get country() {
        return this._country;
    }

    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }

    get photo() {
        return this._photo;
    }

    get admin() {
        return this._admin;
    }

    get register() {
        return this._register;
    }

    set photo(value) {
        this._photo = value;
    }

}