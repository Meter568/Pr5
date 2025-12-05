document.addEventListener('DOMContentLoaded', function () {
    const modalAuth = document.querySelector('.modal-auth');
    const btnOpenAuth = document.querySelector('#openAuth');
    const btnLogout = document.querySelector('#logout');
    const btnCloseAuth = document.querySelector('#closeAuth');
    const logInForm = document.querySelector('#loginForm');
    const userName = document.querySelector('.user-name');

    btnOpenAuth.addEventListener('click', function () {
        modalAuth.style.display = 'block';
    })

    btnCloseAuth.addEventListener('click', function () {
        modalAuth.style.display = 'none';
    })

    logInForm.addEventListener('click', function () {
        event.preventDefault();
        const loginEl = document.querySelector('#login');
        const passwordEl = document.querySelector('#password');

        const messageLogin = document.querySelector('#message-login');
        const messagePassword = document.querySelector('#message-passsword');

        messageLogin.textContent = '';
        messagePassword.textContent = '';

        loginEl.style.borderColor = 'black';
        passwordEl.style.borderColor = 'black';

        const loginInput = loginEl.value.trim();
        const passwordInput = passwordEl.value.trim();

        if (loginInput && passwordInput) {
            localStorage.setItem('user', loginInput);
            modalAuth.style.display = 'none';
            checkAuth();
        } else {
            if(!loginInput){
                loginEl.style.borderColor = 'red';
                messageLogin.textContent = 'Будь ласка, введіть свій логін!';
            }
            if(!passwordInput){
                passwordEl.style.borderColor = 'red';
                messagePassword.textContent = 'Будь ласка, введіть свій пароль!';
            }
        }
    })

    btnLogout.addEventListener('click', function () {
        localStorage.removeItem('user');

        userName.textContent = '';
        userName.style.display = 'none';

        btnOpenAuth.style.display = 'block';
        btnLogout.style.display = 'none';
    })

    function checkAuth(){
        const user = localStorage.getItem('user');

        if(user){
            userName.textContent = user;
            userName.style.display = 'inline';

            btnOpenAuth.style.display = 'none';
            btnLogout.style.display = 'block';
        } else {
            btnOpenAuth.style.display = 'block';
            btnLogout.style.display = 'none';
        }
    }

    checkAuth();

})