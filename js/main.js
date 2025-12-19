import { restaurantsData, goodsData } from './data.js';

document.addEventListener('DOMContentLoaded', function () {
    const modalAuth = document.querySelector('.modal-auth');
    const btnOpenAuth = document.querySelector('#openAuth');
    const btnLogout = document.querySelector('#logout');
    const btnCloseAuth = document.querySelector('#closeAuth');
    const logInForm = document.querySelector('#loginForm');
    const userName = document.querySelector('.user-name');

    const cardsRestaurants = document.querySelector('.cards-restaurants');

    window.disableScroll = function () {
        document.body.dbScrollY = window.scrollY;

        document.body.style.cssText=`
            position: fixed;
            top: ${-window.scrollY}px;
            left: 0;
            width: 100%;
            overflow: hidden;
            height: 100vh;
        `;
    }

    window.enableScroll = function () {
        document.body.style.cssText = '';
        window.scroll({top: document.body.dbScrollY});
    }

    btnOpenAuth.addEventListener('click', function () {
        modalAuth.classList.add('is-open');
        disableScroll();
    })

    btnCloseAuth.addEventListener('click', function () {
        modalAuth.classList.remove('is-open');
        enableScroll();
    })

    function toggleModalAuth() {
        modalAuth.classList.toggle('is-open');
        enableScroll();
    }

    modalAuth.addEventListener('click', function (event) {
        if (event.target === modalAuth) {
            toggleModalAuth();
        }
    });

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

    function createCardRestaurant(restaurant) {
        const card = document.createElement('a');
        card.href = '#';
        card.className = 'card card-restaurant';

        card.insertAdjacentHTML('beforeend', `
            <img src="${restaurant.image}" alt="image" class="card-image" />
            <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title">${restaurant.title}</h3>
                    <span class="card-tag tag">${restaurant.tag}</span>
                </div>
                <div class="card-info">
                    <div class="rating">
                        ${restaurant.rating}
                    </div>
                    <div class="price">${restaurant.price}</div>
                    <div class="category">${restaurant.category}</div>
                </div>
            </div>
        `);

        cardsRestaurants.insertAdjacentElement('beforeend', card);
    }

    function renderRestaurants(){
        cardsRestaurants.innerHTML = '';
        restaurantsData.forEach(createCardRestaurant);
    }

    renderRestaurants();

    cardsRestaurants.addEventListener('click', function (event) {
        const card = event.target.closest('.card-restaurant');
        if(!card) return;

        event.preventDefault();

        const isLoggedIn = localStorage.getItem('user');

        if(!isLoggedIn){
            toggleModalAuth();
            return;
        }

        window.location.href = 'restaurant.html';
    })
})