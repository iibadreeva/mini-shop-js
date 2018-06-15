namespace('views.coinPanel');
views.coinPanel = (function () {

    var dispenser;
    var coin;
    var button_panel;
    var costObject;
    var totalUser;
    var totalVm;

    function init() {
        dispenser = models.Dispenser;
        coin = models.Coin;
        button_panel = document.getElementById('sub_panel_insert_button');
        util.event('click', button_panel, this, addPushEvent);

        if (arguments.length > 0)
            costObject = document.getElementById(arguments[0]);
        else if (!costObject)
            costObject = document.getElementById('total_cost');

        totalUser = document.getElementById('total_user');
        totalVm = document.getElementById('total_vm');
    }

    function addPushEvent(e) {
        if (e.target.className !== 'coin_push') return;

        var amount = e.target.getAttribute('amount');
        var returnArray;
        var success;

        if (amount > 0) {
            success = dispenser.setCoin(new coin(amount));
            if (success) {
                console.log('Вы пополнили баланс на ' + amount);
                updateCost();
            }
        } else {
            returnArray = dispenser.returnCoin();
            console.log('res',returnArray);
            if (returnArray.length < 1) {
                console.log('Баланс пустой');
            }

            for (var i = 0; i < returnArray.length; i++) {
                console.log(returnArray[i].denomination + ' вернули.');
                updateCost();
            }
        }
    }

    function updateCost() {
        costObject.innerHTML = dispenser.getCurrentAmount();
        // console.log('up',dispenser.getCurrentAmount())
        updateUserWallet();
        updateVmWallet();
    }

    function updateUserWallet() {
        totalUser.innerHTML = dispenser.getCurrentAmount('user');
        // console.log('user',dispenser.getCurrentAmount('user'))
    }

    function updateVmWallet() {
        totalVm.innerHTML = dispenser.getCurrentAmount('vm');
        // console.log('vm',dispenser.getCurrentAmount('vm'))
    }

    function setHTML(item) {
        var view;

        if (item.type == 'userWallet') {
            view = item.denomination + ' руб (<span id="' + item.type + '-' + item.denomination + '" class="count">' + item.count + '</span>) ' +
                '<input type="button" class="coin_push" amount="' + item.denomination + '" value="внести">' +
                '<br>';
        }

        if (item.type == 'vmWallet') {
            view = item.denomination + ' руб (<span id="' + item.type + '-' + item.denomination + '" class="count">' + item.count + '</span>) <br>';
        }

        return view
    }

    return {
        init: init,
        updateCost: updateCost,
        updateUserWallet: updateUserWallet,
        updateVmWallet: updateVmWallet,
        userWalletRender: function (item) {
            var contents = document.getElementById('sub_panel_user_wallet');
            var div = document.createElement('div');
            div.className = 'userWalletRow';
            div.innerHTML = setHTML(item);
            contents.appendChild(div);
        },
        vmWalletRender: function (item) {
            var contents = document.getElementById('sub_panel_vm_wallet');
            var div = document.createElement('div');
            div.className = 'vmWalletRow';
            div.innerHTML = setHTML(item);
            contents.appendChild(div);
        }
    };
}());