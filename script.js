import { menuArray } from './data.js';

document.addEventListener("click", function(e) {
    if(e.target.dataset.item) {
        handleAddItemClick(e.target.dataset.item);
    }
})



function handleAddItemClick(foodId) {
    const targetFoodObject = menuArray.filter(function(food) {
        return food.id === parseInt(foodId);
    })[0];

    let total = 0;

    document.getElementById('order-list').innerHTML += `
        <p class="order-item">${targetFoodObject.name}
        <button class="remove-item-btn" id="remove-item-btn" data-itemRem="${targetFoodObject.id}">remove</button>
        </p>
        <p class="order-item-price">$${targetFoodObject.price}</p>
    `

    total += targetFoodObject.price;

    document.getElementById('total-price').textContent += `$${total}`
}

function getHtml() {
    let pageHtml = '';

    menuArray.forEach(function(food) {
        pageHtml += `
            <div class="food-detail">
                <p class="food-emoji" role="img" aria-label="${food.name}">${food.emoji}</p>
                <h3 class="food-title">${food.name}</h3>
                <p class="food-ingredients">${food.ingredients}</p>
                <p class="food-price">$${food.price}</p>
                <button class="add-item" id="${food.id}" data-item="${food.id}">+</button>
            </div> 
        `
    })

    return pageHtml;
}

function render() {
    document.getElementById('container-food').innerHTML = getHtml();
}

render();