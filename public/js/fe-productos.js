//const validator = require('validator');
const isEmpty = (input) => input.value && input.value.trim() !== "";

const validations = [
  {
    inputName: "name",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "El nombre no puede estar vacio",
      },
      {
        validator: (input) => input.value.length >= 2,
        errorMsg: "El nombre debe tener al menos 2 caracteres",
      },
    ],
  },
  {
    inputName: "description_short",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "La descripcion no puede estar vacia",
      },
    ],
  },
  {
    inputName: "description_long",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "La descripcion no puede estar vacia",
      },
    ],
  },
  {
    inputName: "ingredients",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Los ingredientes no pueden estar vacios",
      },
    ],
  },
  {
    inputName: "price",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "El precio no puede estar vacio",
      },
    ],
  },
  {
    inputName: "discount",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "El precio no puede estar vacio",
      },
    ],
  },
  {
    inputName: "product",
    validations: [
      {
        validator: isEmpty,
        errorMsg: "Debes subir una imagen",
      },
    ],
  },
];

window.addEventListener("load", function () {
  const form = document.querySelector(".form-create-product");
  validations.forEach((inputToValidate) => {
    const errores1 = [];
    const input = form[inputToValidate.inputName];

    input.addEventListener("blur", (e) => {
      for (const validation of inputToValidate.validations) {
        const isValid = validation.validator(input);
        if (!isValid) {
          errores1.push(validation.errorMsg);
          input.parentElement.querySelector(".error").innerHTML =
            validation.errorMsg;
          return;
        }
      }
      input.parentElement.querySelector(".error").innerHTML = "";
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const errores = [];
    validations.forEach((inputToValidate) => {
      const input = form[inputToValidate.inputName];
      for (const validation of inputToValidate.validations) {
        const isValid = validation.validator(input);
        if (!isValid) {
          errores.push(validation.errorMsg);
          input.parentElement.querySelector(".error").innerHTML =
            validation.errorMsg;
          return;
        }
      }
      input.parentElement.querySelector(".error").innerHTML = "";
    });

    if (errores.length == 0) {
      form.submit();
    } else {
      console.log(errores);
    }
  });
});
