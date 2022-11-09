import { menuArray } from './data.js';

const containerOrder = document.getElementById('container-order');

let yourOrderArray = [];

document.addEventListener("click", function(e) {
    if(e.target.dataset.item) {
        handleAddItemClick(e.target.dataset.item);
    }
    else if (e.target.id === 'remove-item-btn') {
        handleRemoveItemBtn(e.target.dataset.delete);
    }
})

function handleAddItemClick(foodId) {
    const targetFoodObject = menuArray.filter(function(food) {
        return food.id === parseInt(foodId);
    })[0];

    yourOrderArray.push({
        name: targetFoodObject.name,
        price: targetFoodObject.price,
        id: targetFoodObject.id
    })

    let orderList = '';

    yourOrderArray.forEach(function(order) {
        orderList += `
            <li class="list" id="list-${order.id}">
                <div class="order" id="order">
                    <p class="order-item">${order.name}
                    <button class="remove-item-btn" id="remove-item-btn" data-delete="${order.id}">remove</button>
                    </p>
                </div>
                <p class="order-item-price">$${order.price}</p>
            </li>
        `
    })

    document.getElementById('order-list').innerHTML = orderList;
    

    let totalPrice = 0;

    yourOrderArray.forEach(function(order) {
        totalPrice += order.price;
    })

    document.getElementById('total-price').textContent = 'Total Price: ' + '$' + totalPrice;

    containerOrder.classList.remove('hidden');
    render();
}

function handleRemoveItemBtn(orderId) {
    const deleteOrderObject = yourOrderArray.filter(function(order) {
        return order.id === parseInt(orderId);
    })[0];
    
    for (let i = 0; i < yourOrderArray.length; i++) {
        if (yourOrderArray[i] === deleteOrderObject) {
            yourOrderArray.splice(i, 1);
        }
    }

    let totalPrice = 0;

    yourOrderArray.forEach(function(order) {
        totalPrice += order.price;
    })
    
    document.getElementById('total-price').textContent = 'Total Price: ' + '$' + totalPrice;

    let orderList = '';

    yourOrderArray.forEach(function(order) {
        orderList += `
            <li class="list" id="list-${order.id}">
                <div class="order" id="order">
                    <p class="order-item">${order.name}
                    <button class="remove-item-btn" id="remove-item-btn" data-delete="${order.id}">remove</button>
                    </p>
                </div>
                <p class="order-item-price">$${order.price}</p>
            </li>
        `
    })

    document.getElementById('order-list').innerHTML = orderList;
    
    if (yourOrderArray.length === 0) {
        containerOrder.classList.add('hidden');
    }

    render();
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