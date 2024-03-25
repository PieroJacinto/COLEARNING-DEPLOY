// Email: obligatorio, valido, debe existir en la base (opcional)
// Pass: obligatorio

const isEmpty = (input) => input.value && input.value.trim() !== "";

const isEmailValid = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return isEmpty(input) && emailRegex.test(input.value);
}
// Falta chequear si el email existe en la db
const validations = [
    {
        inputName: "email",
        validations: [
            {
                validator: isEmpty,
                errorMsg: "El email no puede estar vacio!"
            },
            {
                validator: isEmailValid,
                errorMsg: "El email no es valido!"
            }
        ]
    },
    {
        inputName: "password",
        validations: [
            {
                validator: isEmpty,
                errorMsg: "La contraseña no puede estar vacia!"
            },
        ]
    }
]

window.addEventListener("load", function () {    
    const form = document.querySelector(".form-register")
    const password = document.querySelector('i.fa-eye-slash')
    password.addEventListener('click', ()=>{
        if (form['password'].type === "password") {
            form['password'].type = "text";
          } else {
            form['password'].type = "password";
          }
    })

    validations.forEach((inputToValidate) => {
        const errores1 = [];
        const input = form[inputToValidate.inputName];
        input.addEventListener("blur", async(e) => {
          for (const validation of inputToValidate.validations) {
            const isValid = await validation.validator(input);
            if (!isValid) {
              if (input.name == "password") {
                  input.parentElement.parentElement.querySelector(
                      ".error"
                      ).innerHTML = validation.errorMsg;
                      errores1.push(validation.errorMsg);
                return;
              }
              input.parentElement.querySelector(".error").innerHTML =
                validation.errorMsg;
                errores1.push(validation.errorMsg);
              return;
            }
          }
          if (input.name == "password" ) {
            input.parentElement.parentElement.querySelector(".error").innerHTML =
              "";
          } else {
            input.parentElement.querySelector(".error").innerHTML = "";
          }
        });
      });
    
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        console.log('entro por el submit');
        const errores = [];

        validations.forEach((inputToValidate) => {
            const input = form[inputToValidate.inputName];

            for (const validation of inputToValidate.validations) {
                const isValid = validation.validator(input);
                if (!isValid) {
                    if (input.name == "password" ) {
                        input.parentElement.parentElement.querySelector(
                          ".error"
                        ).innerHTML = validation.errorMsg;
                        errores.push(validation.errorMsg);
                        return;
                      }
                      input.parentElement.querySelector(".error").innerHTML =
                      validation.errorMsg;
                      errores.push(validation.errorMsg);
          return;
                }
            }
            if (input.name == "password" ) {
                input.parentElement.parentElement.querySelector(".error").innerHTML =
                  "";
              } else {
                input.parentElement.querySelector(".error").innerHTML = "";
              }
        });

        if (errores.length == 0) {
            form.submit();
        } else {
            console.log(errores)
        }
    })

})