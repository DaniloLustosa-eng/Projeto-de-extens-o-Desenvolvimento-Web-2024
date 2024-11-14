const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //Insere padrão de e-mail
const namePattern = /^[A-Za-zÀ-ÿ\s]+$/; //Insere padrão de nome
const MIN_NAME_LENGTH = 2; //Insere padrão de tamanho para nome
const submitButton = document.getElementById('submitButton');

document.getElementById('registrationForm').addEventListener('submit', async function (event) {
    const email = document.getElementById('email_register').value;
    const password = document.getElementById('password_register').value;
    const confirmPassword = document.getElementById('confirmPassword_register').value;
    const passwordStrength = document.getElementById('passwordStrength');
    const name = document.getElementById('name_register').value;
    const lastName = document.getElementById('lastName_register').value;

    //Faz com que as mensagens de erro apareçam uma de cada vez:
    document.getElementById('emailError').textContent = '';
    passwordStrength.textContent = '';
    document.getElementById('confirmPasswordError').textContent = '';
    document.getElementById('nameError').textContent = '';
    document.getElementById('lastNameError').textContent = '';

    //Validações:
    if (name.length < MIN_NAME_LENGTH) {
        document.getElementById('nameError').textContent = 'O nome digitado deve ter pelo menos 2 caracteres '
        event.preventDefault();
        return;
    } else if (!namePattern.test(name)) {
        document.getElementById('nameError').textContent = 'O nome deve conter apenas letras.';
        event.preventDefault();
        return;
    }

    if (lastName.length < MIN_NAME_LENGTH) {
        document.getElementById('lastNameError').textContent = 'O sobrenome digitado deve ter pelo menos 2 caracteres '
        event.preventDefault();
        return;
    } else if (!namePattern.test(lastName)) {
        document.getElementById('lastNameError').textContent = 'O sobrenome deve conter apenas letras.';
        event.preventDefault();
        return;
    }

    if (!emailPattern.test(email)) {
        document.getElementById('emailError').textContent = 'E-mail inválido.';
        event.preventDefault();
        return;
    }

    const strength = passwordStrengthChecker(password);
    passwordStrength.textContent = strength.message;
    if (password.length < 6) {
        passwordStrength.textContent = 'Número mínimo de caracteres deve ser 6'
        event.preventDefault();
        return;
    } else if (strength.level < 3) {
        passwordStrength.textContent = 'Senha muito fraca.';
        event.preventDefault();
        return;
    }

    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'As senhas não coincidem.';
        event.preventDefault();
        return;
    }
    const creatUser = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nome: name,
            sobrenome: lastName,
            senha: password,
            email: email
        })
    })
    creatUser()
});
 




//Mostrar/esconder senha e trocar o ícone
const passwordInput = document.getElementById('password_register');
const confirmPasswordInput = document.getElementById('confirmPassword_register');
const viewPassword = document.getElementById('view_password');
const viewConfirmPassword = document.getElementById('view_confirm_password');

viewPassword.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.src = type === 'password' ? '/IMAGES/Icon_5.png' : '/IMAGES/Icon_6.png';
});

viewConfirmPassword.addEventListener('click', function () {
    const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPasswordInput.setAttribute('type', type);
    this.src = type === 'password' ? '/IMAGES/Icon_5.png' : '/IMAGES/Icon_6.png';
});


//Verificar força de senha:
function passwordStrengthChecker(password) {
    let strength = { level: 0, message: '' }; //Nível da força e mensagem que será exibida

    if (/[A-Z]/.test(password)) strength.level++;
    if (/[a-z]/.test(password)) strength.level++;
    if (/\d/.test(password)) strength.level++;
    if (/[\W_]/.test(password)) strength.level++;

    switch (strength.level) {
        case 0:
        case 1:
            strength.message = 'senha muito fraca.';
            break;
        case 2:
            strength.message = 'senha mediana.';
            break;
        case 3:
            strength.message = 'senha forte.';
            break;
        case 4:
            strength.message = 'senha muito forte!';
            break;
    }

    return strength;
}

//Verifica a força da senha em tempo real:
const passwordInputField = document.getElementById('password_register');
const passwordStrength = document.getElementById('passwordStrength');

passwordInput.addEventListener('input', function () {
    const password = passwordInput.value;
    const strength = passwordStrengthChecker(password);
    passwordStrength.textContent = strength.message;
});
