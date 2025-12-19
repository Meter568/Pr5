import { goodsData } from "./data.js";

const cardsMenu = document.querySelector('.cards-menu');
const userName = document.querySelector('.user-name');
const btnOpenAuth = document.querySelector('#openAuth');
const btnLogout = document.querySelector('#logout');

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

function createCardGood(good) {
    const card = document.createElement('div');
    card.className = 'card';

    card.insertAdjacentHTML('beforeend', `
        <img src="${good.image}" alt="image" class="card-image" />
        <div class="card-text">
            <div class="card-heading">
                <h3 class="card-title card-title-reg">${good.title}</h3>
            </div>
            <div class="card-info">
                <div class="ingredients">
                    ${good.ingredients}
                </div>
            </div>
            <div class="card-buttons">
                <button class="button button-primary button-add-cart">
                    <span class="button-card-text">У кошик</span>
                    <span class="button-cart-svg"></span>
                </button>
                <strong class="card-price-bold">${good.price}</strong>
            </div>
        </div>
    `);

    cardsMenu.insertAdjacentElement('beforeend', card);
}

function renderGoods(){
    if(cardsMenu) {
        cardsMenu.innerHTML = '';
        goodsData.forEach(createCardGood);
    }
}

renderGoods();