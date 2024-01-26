class UserController {

    constructor(formId, tableId){

        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();

    }

    onSubmit(){

        //let _this = this; no need when using arrow function

        this.formEl.addEventListener("submit", event => {

            event.preventDefault(); //prevent submit on the form

            //this.getValues(); this won't work because the scope of this here is the function. Which means this will be the this.formEl and not the object itself. If we use function instead of arrow function

            //_this.getValues(); no need when using arrow functions

            this.addLine(this.getValues());
        
        });

    }

    getValues(){

        let user = {};

        //Array.from(this.formEl.elements).forEach(function(field, index){// solution 1
        [...this.formEl.elements].forEach(function(field, index){// solution 1

            if (field.name == "gender") {
    
                if (field.checked) {
                    user[field.name] = field.value;
                }
    
                } else {
                    user[field.name] = field.value;
                }
    
        });
    
        return new User(
            user.name,
            user.gender,
            user.birth,
            user.country,
            user.email,
            user.password,
            user.photo,
            user.admin
        );

        
    }


    addLine(dataUser) {

        console.log(dataUser);
    
        this.tableEl.innerHTML =
                        `<tr>
                            <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
                            <td>${dataUser.name}</td>
                            <td>${dataUser.email}</td>
                            <td>${dataUser.admin}</td>
                            <td>${dataUser.birth}</td>
                            <td>
                            <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                            <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                            </td>
                        </tr>` ;
    
    }



}