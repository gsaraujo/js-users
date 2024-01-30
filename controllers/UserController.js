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

        //Array.from(this.formEl.elements).forEach(function(field, index){// solution 1
        [...this.formEl.elements].forEach(function(field, index){// solution 2

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

        tr.innerHTML = `<td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
                        <td>${dataUser.name}</td>
                        <td>${dataUser.email}</td>
                        <td>${(dataUser.admin)? 'Sim' : 'Não'}</td>
                        <td>${dataUser.birth}</td>
                        <td>
                            <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                            <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                        </td>` ;


        this.tableEl.appendChild(tr);
    
    }



}