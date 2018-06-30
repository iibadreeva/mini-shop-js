'use strict';
import {matches} from '/mini-shop-js/js/controller.js'
import Model from '/mini-shop-js/js/model.js'

const model = new Model();


function hasClass(elem, className) {
    return elem.className.split(' ').indexOf(className) > -1;
}

document.addEventListener('click', function (e) {
    if (hasClass(e.target, 'user-money')) {
        model.eventMoney(e);
    } else if (hasClass(e.target, 'item-products')) {
        model.eventPruducts(e.target)
    }
}, false);
