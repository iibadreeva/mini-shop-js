// import {upDate} from '/mini-shop-js/js/index.js'
import {matches} from '/mini-shop-js/js/controller.js'

export default class Model {
    constructor(){
        this.count = 0;
    }

    data() {
        async function data() {
            try {
                const request = await fetch('https://raw.githubusercontent.com/iibadreeva/mini-shop-js/master/js/main.json');
                const json = await request.json();
                return json;
            }catch(e){
                throw new Error('нет данных')
            }
        }
        this.matches = data();
        return this.matches;
    }

    pruducts(id) {
        if (matches.item.length < 1) return;

        for (var i in matches.item) {
            if (id === matches.item[i].id) {
                if (matches.item[i].count === 0) {
                    alert(matches.item[i].name + ' нет в продаже');
                } else if (this.count >= matches.item[i].price) {
                    this.count -= matches.item[i].price;
                    matches.item[i].count -= 1;

                    return matches.item[i];
                }
                else {
                    alert('Недостаточно средств');
                    throw new Error('Недостаточно средств')
                }
            }
        }
        throw new Error('Нет товара.');
    }

    getcount(type) {
        var countResul = 0;
        var userWallet = matches.user;
        var vmWallet = matches.vm

        if (type == 'user') {
            for(var i = 0; i < matches.user.length; i++){
                countResul += (matches.user[i].currency * matches.user[i].count);
            }
        }

        if (type == 'vm') {
            for(var i = 0; i < matches.vm.length; i++){
                countResul += (matches.vm[i].currency * matches.vm[i].count);
            }
        }

        if (!type) countResul = this.count;

        return countResul;
    }

    pushTemplate(){
        var i;
        var coin;
        var returnCoinSet = [];
        var sum = this.count;

        var ten = Math.floor((sum % 1000) / 10);
        for (i = 0; i < ten; i++) {
            coin = 10;
            returnCoinSet.push(coin);
            sum = sum - coin;
        }

        var five = Math.floor((sum % 100) / 5);
        for (i = 0; i < five; i++) {
            coin = 5;
            returnCoinSet.push(coin);
            sum = sum - coin;
        }

        var two = Math.floor((sum % 100) / 2);
        for (i = 0; i < two; i++) {
            coin = 2;
            returnCoinSet.push(coin);
            sum = sum - coin;
        }

        var one = Math.floor((sum % 100));
        for (i = 0; i < one; i++) {
            coin = 1;
            returnCoinSet.push(coin);
            sum = sum - coin;
        }

        var returnCoinSetLength = returnCoinSet.length;
        while ((returnCoinSetLength -= 1) >= 0) {
            coin = returnCoinSet[returnCoinSetLength];
            this.getTemplate('vm', coin);
            this.setTemplate('user', coin);
        }

        return returnCoinSet;
    }

    getTemplate(type, coin) {
        var result = 0,
            userData,
            vmData,
            userLength,
            vmLength;

        if (type == 'user') {
            userLength = matches.user.length;
            while ((userLength -= 1) >= 0) {
                userData = matches.user[userLength];
                if (userData.currency == coin && userData.count > 0) {
                    result = userData.count;
                    userData.count = userData.count - 1;
                    document.getElementById(userData.id).innerHTML = userData.count;
                }
            }
        }

        if (type == 'vm') {
            vmLength = matches.vm.length;
            while ((vmLength -= 1) >= 0) {
                vmData = matches.vm[vmLength];
                if (vmData.currency == coin && vmData.count > 0) {
                    result = vmData.count;
                    vmData.count = vmData.count - 1;
                    document.getElementById(vmData.id).innerHTML = vmData.count;
                }
            }
            this.count -= parseInt(coin);
        }

        return result;
    }

    setTemplate(type, coin) {
        var userWallet = matches.user,
            vmWallet = matches.vm;

        if (type == 'user') {
            var userWalletLength = userWallet.length;

            while ((userWalletLength -= 1) >= 0) {
                var userWalletRow = userWallet[userWalletLength];
                if (userWalletRow.currency == coin) {
                    userWalletRow.count++;
                    document.getElementById(userWalletRow.id).innerHTML = userWalletRow.count;
                }
            }
        }

        if (type == 'vm') {
            var vmWalletLength = vmWallet.length;
            while ((vmWalletLength -= 1) >= 0) {
                var vmWalletRow = vmWallet[vmWalletLength];
                if (vmWalletRow.currency == coin) {
                    vmWalletRow.count++;
                    document.getElementById(vmWalletRow.id).innerHTML = vmWalletRow.count;
                }
            }

            this.count += parseInt(coin);
        }
    }

    eventMoney(e){
        var valSum = e.target.getAttribute('sum'),
            userCoinCount = this.getTemplate('user', valSum);
        if (userCoinCount > 0) {
            this.setTemplate('vm', valSum);
        }
        if (valSum > 0) {
            matches.sum += parseInt(valSum)
        }else{
            this.pushTemplate();
            matches.sum = 0;
        }
        this.upDate();
    }

    eventPruducts(e) {
        try {
            const returnPruducts = this.pruducts(e.getAttribute('type-id'));
            if(returnPruducts){
                const $countPruducts = e.previousSibling.previousSibling;
                $countPruducts.innerText = returnPruducts.count;
                matches.sum -= parseInt(returnPruducts.price);

                alert('Покупка ' + returnPruducts.name + ' завершена. Спасибо');
            }

        }catch(e) {
            console.log(e.message)
        }finally {
            this.upDate();
        }
    }

    upDate(){
        const $sumReturn = document.getElementById('sum-return'),
            $moneyUser = document.getElementById('money-user'),
            $moneyVm = document.getElementById('money-vm');

        $sumReturn.innerText = matches.sum;
        $moneyUser.innerText = this.getcount('user');
        $moneyVm.innerText = this.getcount('vm');
    }


}


