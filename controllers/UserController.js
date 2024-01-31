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

            let btn = this.formEl.querySelector("[type=submit]");

            btn.disabled = true;

            let values = this.getValues();

            if (!values) return false;

            //values.photo = "";

            this.getPhoto().then((content)=>{

                values.photo = content;

                this.addLine(values);

                this.formEl.reset();

                btn.disabled = false;


            }, (e)=>{
                console.error(e);

            });

            //this.getValues(); this won't work because the scope of this here is the function. Which means this will be the this.formEl and not the object itself. If we use function instead of arrow function

            //_this.getValues(); no need when using arrow functions


        
        });

    }

    getPhoto(){

        return new Promise((resolve, reject)=>{

            let fileReader = new FileReader();

            let elements = [...this.formEl.elements].filter(item=>{

                if (item.name === 'photo') {
                    return item;
                }

            });


            let file = elements[0].files[0]


            fileReader.onload = ()=>{

                resolve(fileReader.result);

            };

            fileReader.onerror = (e)=> {

                reject(e);


            };

            if (file) {
                fileReader.readAsDataURL(file);
            } else {
                resolve('dist/img/boxed-bg.jpg');
            }


        });



    }

    getValues(){

        let user = {};

        let isValid = true;

        //Array.from(this.formEl.elements).forEach(function(field, index){// solution 1
        [...this.formEl.elements].forEach(function(field, index){// solution 2

            if ((['name', 'email', 'password'].indexOf(field.name) > -1) && !field.value) {

                field.parentElement.classList.add('has-error');
                isValid = false;

            }

            if (field.name == "gender") {
    
                if (field.checked) {
                    user[field.name] = field.value;
                }
    
                } else if(field.name == "admin"){
                    user[field.name] = field.checked;

                } else {
                    user[field.name] = field.value;
                }
    
        });

        if (!isValid) {
            return false;
        }
    
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

        let tr = document.createElement('tr');

        //tr.dataset.user = dataUser;//dataset converts the object to string. In this case, specifically, user variable will show [object Object] and that means one lost all the object properties.

        tr.dataset.user = JSON.stringify(dataUser);//serialize - turns an object into a text. In this case -> JSON string.

        tr.innerHTML = `<td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
                        <td>${dataUser.name}</td>
                        <td>${dataUser.email}</td>
                        <td>${(dataUser.admin)? 'Sim' : 'Não'}</td>
                        <td>${Utils.dateFormat(dataUser.register)}</td>
                        <td>
                            <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                            <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                        </td>` ;
        //one way to format data -> <td>${dataUser.register.getDate()}/${dataUser.register.getMonth()+1}/${dataUser.register.getFullYear()}</td>


        this.tableEl.appendChild(tr);

        this.updateCount();
    
    }

    updateCount() {

        let numberUsers = 0;
        let numberAdmin = 0;

        [...this.tableEl.children].forEach(tr=>{

            numberUsers++;

            let user = JSON.parse(tr.dataset.user);

            if (user._admin) numberAdmin++;

        });

        document.querySelector("#number-users").innerHTML = numberUsers;
        document.querySelector("#number-users-admin").innerHTML = numberAdmin;

    }



}