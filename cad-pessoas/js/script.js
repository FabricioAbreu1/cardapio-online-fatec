class Validator {

    constructor() {
        this.validations = [
            'data-required',
            'data-min-length',
            'data-max-length',
            'data-email-validate',
            'data-only-letters',
            'data-equal',
            'data-password-validate',
            'data-only-numbers',
        ]
    }

    // testar a validação em todos os campos
    validate(form) {

        // resgata todas as validações
        let currentValidations = document.querySelectorAll('form .error-validation');
        if (currentValidations.length > 0) {
            this.cleanValidations(currentValidations);
        }

        //pegar os inputs
        let inputs = form.getElementsByTagName('input');

        //HTMLCollection -> array
        let inputsArray = [...inputs];

        //Loop nos inputs com validação mediante ao que for encontrado
        inputsArray.forEach(function (input) {

            // console.log(input); teste

            // loop em todas as validações que existem
            for (let i = 0; this.validations.length > i; i++) {
                //verifica se a validação existe no input
                if (input.getAttribute(this.validations[i]) != null) {
                    // data-min-length -> minlength limpa a string para virar um metodo
                    let method = this.validations[i].replace('data-', '').replace('-', '');

                    //valor do input
                    let value = input.getAttribute(this.validations[i]);

                    // invoca o metodo
                    this[method](input, value);
                }
            }
        }, this);
    }

    // verifica se o campo está vazio
    required(input) {
        let inputValue = input.value;
        if (inputValue === '') {
            let errorMessage = 'Este campo é obrigatório!'
            this.printMessege(input, errorMessage);
        }
    }

    // verifica se passou do min de caracteres
    minlength(input, minValue) {
        let inputLength = input.value.length;
        let errorMessage = `O campo deve ter pelo menos ${minValue} caracteres`;
        if (inputLength < minValue) {
            this.printMessege(input, errorMessage);
        }
    }

    // verifica se passou do max de caracteres
    maxlength(input, maxValue) {
        let inputLength = input.value.length;
        let errorMessage = `O campo deve ter menos que ${maxValue} caracteres`;
        if (inputLength > maxValue) {
            this.printMessege(input, errorMessage);
        }
    }

    // valida emails
    emailvalidate(input) {
        //email@email.com -> email@email.com.br
        let re = /\S+@\S+\.\S+/;

        let email = input.value;
        let errorMessage = 'Digite o e-mail no padrão correto exemplo@exemplo.com';
        if (!re.test(email)) {
            this.printMessege(input, errorMessage);
        }
    }

    // valida se são somente letras
    onlyletters(input) {
        let re = /^[A-Za-z]+$/;
        let inputValue = input.value;
        let errorMessage = 'Digite apenas letras!';
        if (!re.test(inputValue)) {
            this.printMessege(input, errorMessage);
        }
    }

    // verifica se os campos estão iguais
    equal(input, inputName) {
        let inputToCompare = document.getElementsByName(inputName)[0];
        let errorMessage = 'Confirmação de senha está diferente da senha!';
        if (input.value != inputToCompare.value) {
            this.printMessege(input, errorMessage);
        }
    }

    // valida o campo da senha
    passwordvalidate(input) {
        // explodir a string para um array
        let charArr = input.value.split("");
        let uppercases = 0;
        let numbers = 0;

        for (let i = 0; charArr.length > i; i++) {
            if (charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
                uppercases++;
            } else if (!isNaN(parseInt(charArr[i]))) {
                numbers++;
            }
        }
        if (uppercases === 0 || numbers === 0) {
            let errorMessage = 'A senha precisa de um caractere maiúsculo e um número';
            this.printMessege(input, errorMessage);
        }
    }

    // mensagem de erro
    printMessege(input, msg) {
        let errorsQty = input.parentNode.querySelector('.error-validation');
        if (errorsQty === null) {
            let template = document.querySelector('.error-validation').cloneNode(true);
            template.textContent = msg;
            let inputParent = input.parentNode;
            template.classList.remove('template');
            inputParent.appendChild(template);
        }
    }

    // limpa as validações da tela
    cleanValidations(validations) {
        validations.forEach(el => el.remove());
    }
}


let form = document.getElementById("register-form");
let submit = document.getElementById("btnSubmit");

let validator = new Validator();

// Evento das validações

submit.addEventListener('click', function (e) {

    e.preventDefault();

    validator.validate(form);

});