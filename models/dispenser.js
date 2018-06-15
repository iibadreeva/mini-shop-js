namespace('models.Dispenser');
var models;
models.Dispenser = (function () {
    var inventory = [];
    var userWallet = [];
    var vmWallet = [];
    var currentAmount = 0;

    function getCoinFromWallet(type, coin) {
        if (!coin instanceof models.Coin) return 0;

        var userCoinCount = 0;
        var price = coin.getPrice();

            
        if (type == 'user') {
            var userWalletLength = userWallet.length;
            while ((userWalletLength -= 1) >= 0) {
                var userWalletRow = userWallet[userWalletLength];
                if (userWalletRow.denomination == price && userWalletRow.count > 0) {
                    userCoinCount = userWalletRow.count;
                    userWalletRow.count = userWalletRow.count - 1;
                    document.getElementById(userWalletRow.type + '-' + userWalletRow.denomination).innerHTML = userWalletRow.count;
                }
            }
        }

        if (type == 'vm') {
            console.log('go');
            // var vmWalletLength = vmWallet.length;
            // while ((vmWalletLength -= 1) >= 0) {
            //     var vmWalletRow = vmWallet[vmWalletLength];
            //     if (vmWalletRow.denomination == price && vmWalletRow.count > 0) {
            //         userCoinCount = vmWalletRow.count;
            //         vmWalletRow.count = vmWalletRow.count - 1;
            //         document.getElementById(vmWalletRow.type + '-' + vmWalletRow.denomination).innerHTML = vmWalletRow.count;
            //     }
            // }
            console.log('currentAmount',currentAmount)
            currentAmount -= price;
        }

        return userCoinCount;
    }

    function setCoinFromWallet(type, coin) {
        if (!coin instanceof models.Coin) return false;

        var price = coin.getPrice();
        console.log('price',price);

        if (type == 'user') {
            var userWalletLength = userWallet.length;
            while ((userWalletLength -= 1) >= 0) {
                var userWalletRow = userWallet[userWalletLength];
                if (userWalletRow.denomination == price) {
                    userWalletRow.count++;
                    document.getElementById(userWalletRow.type + '-' + userWalletRow.denomination).innerHTML = userWalletRow.count;
                }
            }
        }

        if (type == 'vm') {
            var vmWalletLength = vmWallet.length;
            // while ((vmWalletLength -= 1) >= 0) {
            //     var vmWalletRow = vmWallet[vmWalletLength];
            //     if (vmWalletRow.denomination == price) {
            //         vmWalletRow.count++;
            //         document.getElementById(vmWalletRow.type + '-' + vmWalletRow.denomination).innerHTML = vmWalletRow.count;
            //     }
            // }
            currentAmount += price;
        }
    }

    return {
        getCurrentAmount: function (type) {

            var amount = 0;

            if (type == 'user') {
                var userWalletLength = userWallet.length;
                while ((userWalletLength -= 1) >= 0) {
                console.log('userWalletLength',userWallet);
                    amount += (userWallet[userWalletLength].denomination * userWallet[userWalletLength].count);
                }
            }

            if (type == 'vm') {
                var vmWalletLength = vmWallet.length;
                while ((vmWalletLength -= 1) >= 0) {
                    amount += (vmWallet[vmWalletLength].denomination * vmWallet[vmWalletLength].count);
                }
            }

            if (!type) amount = currentAmount;

            return amount;
        },
        setCoin: function (coin) {
            if (!coin instanceof models.Coin) return false;
            var userCoinCount = getCoinFromWallet('user', coin);
console.log('____',userCoinCount)

            if (userCoinCount > 0) {
                setCoinFromWallet('vm', coin);
            } else return false;

            return true;
        },
        returnCoin: function () {

            var i;
            var coin;
            var returnCoinSet = [];
            var sum = currentAmount;

            var ten = Math.floor((sum % 1000) / 10);
            for (i = 0; i < ten; i++) {
                coin = new models.Coin(10);
                returnCoinSet.push(coin);
                sum = sum - coin.getPrice();
                console.log("coin",new models.Coin(10));
            }

            var five = Math.floor((sum % 100) / 5);
            for (i = 0; i < five; i++) {
                coin = new models.Coin(5);
                returnCoinSet.push(coin);
                sum = sum - coin.getPrice();
            }

            var two = Math.floor((sum % 100) / 2);
            for (i = 0; i < two; i++) {
                coin = new models.Coin(2);
                returnCoinSet.push(coin);
                sum = sum - coin.getPrice();
            }

            var one = Math.floor((sum % 100));
            for (i = 0; i < one; i++) {
                coin = new models.Coin(1);
                returnCoinSet.push(coin);
                sum = sum - coin.getPrice();
            }

            var returnCoinSetLength = returnCoinSet.length;
            while ((returnCoinSetLength -= 1) >= 0) {
                coin = returnCoinSet[returnCoinSetLength];
                getCoinFromWallet('vm', coin);
                setCoinFromWallet('user', coin);
            }

            return returnCoinSet;
        },
        setInventory: function (items) {
            inventory = items;
        },
        setUserWallet: function (items) {
            userWallet = items;
        },
        setVmWallet: function (items) {
            vmWallet = items;
        },
        getBeverage: function (code) {
            if (inventory.length < 1) return undefined;
            for (var i in inventory) {
                if (code === inventory[i].code) {
                    if (inventory[i].amount === 0) {
                        window.alert(inventory[i].name + ' продан.');
                        throw Error(inventory[i].name + ' продан.');
                    } else if (currentAmount >= inventory[i].price) {
                        currentAmount -= inventory[i].price;
                        inventory[i].amount -= 1;
                        return inventory[i];
                    }
                    else {
                        window.alert('Недостаточно средств');
                        throw new Error('Не хватает денег');
                    }

                }
            }
            throw new Error('Нет товара.');
        }
    };
})();


namespace('models.Coin');
models.Coin = function (denomination) {
    this.denomination = parseInt(denomination, 10);
};

models.Coin.prototype = {
    getPrice: function () {
        return this.denomination;
    }
};

namespace('models.Money');
models.Money = function (denomination, count, type) {
    this.denomination = parseInt(denomination, 10);
    this.count = parseInt(count, 10);
    this.type = type;
};

models.Money.prototype = {
    getDenomination: function () {
        return this.denomination;
    },
    getCount: function () {
        return this.count;
    }
};

namespace('models.Product');
models.Product = function (code, name, price, amount, imgurl) {
    this.code = code;
    this.name = name;
    this.price = price;
    this.amount = amount;
    this.imgurl = imgurl;
};

models.Product.prototype = {};