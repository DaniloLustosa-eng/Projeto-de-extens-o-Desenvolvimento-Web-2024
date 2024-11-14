const passwordInput = document.getElementById('password_login');
const emailInput = document.getElementById('email_login');
const viewPassword = document.getElementById('view_password'); 
const loginForm = document.getElementById('loginForm');
const loginBtn = document.getElementById('submit-login');



//Mostrar/esconder senha e trocar o ícone
viewPassword.addEventListener('click', function(){
    console.log("alkshdjkjahsdhasd")
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.src = type === 'password' ? '/IMAGES/Icon_5.png' : '/IMAGES/Icon_6.png';

    passwordInput.classList.toggle('show_password', type === 'text');
});

