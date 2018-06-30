'use strict';
// import {matches} from '/mini-shop-js/js/index.js'
import {matches} from '/mini-shop-js/js/controller.js'
import Model from '/mini-shop-js/js/model.js'

const model = new Model();


const $userMoney = document.getElementsByClassName('user-money'),
    $itemProducts = document.getElementsByClassName('item-products');

function hasClass(elem, className) {
    return elem.className.split(' ').indexOf(className) > -1;
}

document.addEventListener('click', function (e) {
    if (hasClass(e.target, 'user-money')) {
        model.eventMoney(e);
    } else if (hasClass(e.target, 'item-products')) {
        eventPruducts(e.target)
    }
}, false);


function eventPruducts(e) {
    try {
        const returnPruducts = model.pruducts(e.getAttribute('type-id'));
        if(returnPruducts){
            const $countPruducts = e.previousSibling.previousSibling;
            $countPruducts.innerText = returnPruducts.count;
            matches.sum -= parseInt(returnPruducts.price);

            alert('Покупка ' + returnPruducts.name + ' завершена. Спасибо');
        }

    }catch(e) {
        console.log(e.message)
    }finally {
        upDate();
    }

}

function upDate(){
	const $sumReturn = document.getElementById('sum-return'),
		$moneyUser = document.getElementById('money-user'),
    	$moneyVm = document.getElementById('money-vm');

	$sumReturn.innerText = matches.sum;
	$moneyUser.innerText = model.getcount('user');
	$moneyVm.innerText = model.getcount('vm');
}


export {upDate};