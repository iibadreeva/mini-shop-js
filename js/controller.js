import Model from '/mini-shop-js/js/model.js'

let matches = {};
const model = new Model();

new Promise(function(resolve) {
        window.onload = resolve;
    })
    .then(function() {
        return model.data().then(function(data) {
            matches = data
        });
    })
    .then(function () {
        return model.data().then(function(data) {
            return data.user;
        });
    })
    .then(function (item) {
        const results = document.querySelector('#sub_panel_insert_button');
        results.innerHTML = View.render('moneyUser', { list: item });
    })
    .then(function () {
        return model.data().then(function(data) {
            return data.item;
        });
    })
    .then(function (item) {
        const results = document.querySelector('#item-products');
        results.innerHTML = View.render('itemProducts', { list: item });
    })
    .then(function () {
        return model.data().then(function(data) {
            return data.vm;
        });
    })
    .then(function (item) {
        const results = document.querySelector('#money-vm-panel');
        results.innerHTML = View.render('moneyVm', { list: item });
    })
    .catch(function(e) {
        console.error(e);
        alert('Ошибка: ' + e.message);
    });

export {matches};
