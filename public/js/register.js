const isEmpty = (input) => input.value && input.value.trim() !== "";
const long = (input) => input.value.length >= 2;

let passwordCheck;


const validations = [
  {
    inputName: "first_name",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Debes completar tu nombre!",
      },
      {
        validator: long,
        errorMsg: "Debe tener al menos 2 caracteres!",
      },
    ],
  },
  {
    inputName: "last_name",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Debes completar tu apellido!",
      },
      {
        validator: long,
        errorMsg: "Debe tener al menos 2 caracteres!",
      },
    ],
  },
  {
    inputName: "email",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Debes ingresar un correo electronico!",
      },
      {
        validator: function (input) {
          if (
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
              input.value
            )
          ) {
            return true;
          } else {
            return false;
          }
        },
        errorMsg: "Debes ingresar un correo electronico valido!",
      },
      {
        validator:async (input) => {
          const res = await fetch(`/api/users/validate/${input.value}`)
          const data = await res.json()
          return data.noExiste
      },
        errorMsg: "Este correo ya esta registrado!",
      },
    ],
  },
  {
    inputName: "password",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Debes ingresar una contraseña!",
      },
      {
        validator: (input) => input.value.length >= 8,
        errorMsg: "La contraseña debe tener al menos 8 caracteres!",
      },
      {
        validator: function comprobarContraseña(input) {
          if (/(?:[A-Z])/.test(input.value) && /(?:[a-z])/.test(input.value)) {
            return true;
          } else {
            return false;
          }
        },
        errorMsg: "La contraseña debe tener una mayuscula y una minuscula!",
      },
      {
        validator: function comprobarContraseña(input) {
          if (/(?:\d)/.test(input.value)) {
            return true;
          } else {
            return false;
          }
        },
        errorMsg: "La contraseña debe tener un numero!",
      },
      {
        validator: function comprobarContraseña(input) {
          if (/[^a-zA-Z\d]/.test(input.value)) {
            return true;
          } else {
            return false;
          }
        },
        errorMsg: "La contraseña debe tener un caracter especial!",
      },
    ],
  },
  {
    inputName: "confirm_password",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Debes ingresar la contraseña!",
      },
      {
        validator: (input) => {
          if (input.value === passwordCheck.value) {
            return true;
          }
          return false;
        },
        errorMsg: "La contraseñas deben coincidir!",
      },
    ],
  },
  {
    inputName: "address",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Debes completar tu direccion!",
      },
      {
        validator: long,
        errorMsg: "Debe tener al menos 2 caracteres!",
      },
    ],
  },
  {
    inputName: "avatar",
    validations: [
      {
        validator: (input) => {
          console.log(input.value);
          if (input.value) {
            return true;
          } else {
            return false;
          }
        },
        errorMsg: "Debes subir una imagen!",
      },
      {
        validator: (input) => {
          console.log(input.value);
          if (
            input.value.includes(".jpg") ||
            input.value.includes(".jpeg") ||
            input.value.includes(".png") ||
            input.value.includes(".gif")
          ) {
            return true;
          } else {
            return false;
          }
        },
        errorMsg: "Las extensiones permitidas son: JPG, JPEG, PNG, GIF!",
      },
    ],
  },
];

window.addEventListener("load", function () {
  const form = document.querySelector(".form-register");

  validations.forEach((inputToValidate) => {
    const errores1 = [];
    const input = form[inputToValidate.inputName];
    passwordCheck = form.password;
    input.addEventListener("blur", async(e) => {
      console.log("validacion on time");
      for (const validation of inputToValidate.validations) {
        const isValid = await validation.validator(input);
        if (!isValid) {
          
          console.log('entro por el !isValid');
          errores1.push(validation.errorMsg);
          if (input.name == "password" || input.name == "confirm_password") {
            input.parentElement.parentElement.querySelector(
              ".error"
            ).innerHTML = validation.errorMsg;
            return;
          }
          input.parentElement.querySelector(".error").innerHTML =
            validation.errorMsg;
          return;
        }
      }
      if (input.name == "password" || input.name == "confirm_password") {
        input.parentElement.parentElement.querySelector(".error").innerHTML =
          "";
      } else {
        input.parentElement.querySelector(".error").innerHTML = "";
      }
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const errores = [];

    validations.forEach((inputToValidate) => {
      const input = form[inputToValidate.inputName];
      passwordCheck = form.password;

      for (const validation of inputToValidate.validations) {
        const isValid = validation.validator(input);
        if (!isValid) {
          console.log("validacion post submit");
          errores.push(validation.errorMsg);
          if (input.name == "password" || input.name == "confirm_password") {
            input.parentElement.parentElement.querySelector(
              ".error"
            ).innerHTML = validation.errorMsg;
            return;
          }
          input.parentElement.querySelector(".error").innerHTML =
            validation.errorMsg;
          return;
        }
      }
      if (input.name == "password" || input.name == "confirm_password") {
        input.parentElement.parentElement.querySelector(".error").innerHTML =
          "";
      } else {
        input.parentElement.querySelector(".error").innerHTML = "";
      }
    });

    if (errores.length == 0) {
      form.submit();
    } else {
      console.log(errores);
    }
  });
});
