var doc_loaded = function () {
    var items = [
        new models.Product('001', 'Чай', 13, 10, 'images/product_1.jpg'),
        new models.Product('002', 'Кофе', 18, 20, 'images/product_2.jpg'),
        new models.Product('003', 'Кофе с молоком', 21, 20, 'images/product_3.jpg'),
        new models.Product('004', 'Сок', 35, 15, 'images/product_4.jpg')
    ];

    models.Dispenser.setInventory(items);

    var userWallet = [
        new models.Money(1, 10, 'userWallet'),
        new models.Money(2, 30, 'userWallet'),
        new models.Money(5, 20, 'userWallet'),
        new models.Money(10, 15, 'userWallet')
    ];

    models.Dispenser.setUserWallet(userWallet);

    var vmWallet = [
        new models.Money(1, 100, 'vmWallet'),
        new models.Money(2, 100, 'vmWallet'),
        new models.Money(5, 100, 'vmWallet'),
        new models.Money(10, 100, 'vmWallet')
    ];

    models.Dispenser.setVmWallet(vmWallet);

    var itemsLength = items.length;
    while ((itemsLength -= 1) >= 0) {
        views.itemDeck.itemRender(items[itemsLength]);
    }
    views.itemDeck.init();

    var userWalletLength = userWallet.length;
    while ((userWalletLength -= 1) >= 0) {
        views.coinPanel.userWalletRender(userWallet[userWalletLength]);
    }

    var vmWalletLength = vmWallet.length;
    while ((vmWalletLength -= 1) >= 0) {
        views.coinPanel.vmWalletRender(vmWallet[vmWalletLength]);
    }

    views.coinPanel.init();
    views.coinPanel.updateCost();
};

if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', doc_loaded, false);
} else if (document.attachEvent) {
    document.attachEvent('onreadystatechange', doc_loaded);
} else {
    window.onload = doc_loaded;
}