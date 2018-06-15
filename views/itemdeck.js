namespace('views.itemDeck');
views.itemDeck = (function () {
    var dispenser;
    var coinpan;

    function init() {
        dispenser = models.Dispenser;
        coinpan = views.coinPanel;
    }

    function setHTML(item) {
        return '<div class="item_slot center padbottom">'
            + '	<img src="' + item.imgurl + '"></img>'
            + '</div>'
            + '<div class="center padbottom">'
            + item.name + '(<span class="item_amount">' + item.amount + '</span>)<br />'
            + item.price + ' р.'
            + '</div>'
            + '<div class="center padbottom">'
            + '<button itemcode="' + item.code + '">Купить</button>'
            + '</div>';
    }

    function addEjectEvent(e) {
        if (!e.target.hasAttribute('itemcode'))
            return;
        try {
            var returnObj = dispenser.getBeverage(e.target.getAttribute('itemcode'));
            if (returnObj) {
                console.log('Заберите ваш "' + returnObj.name + '"');
                updateAmount(e.currentTarget, returnObj.amount);
                window.alert('Спасибо!');
            }
        } catch (e) {
            console.log(e.message);
        } finally {
            coinpan.updateCost();
        }
    }

    function updateAmount(containerobj, capacity) {
        var obj = containerobj.getElementsByClassName('item_amount');
        obj[0].innerHTML = capacity;
    }

    return {
        init: init,
        itemRender: function (item) {
            var contents = document.getElementById("panel_left");
            var div = document.createElement("div");
            div.className = "viewpanel";
            div.innerHTML = setHTML(item);
            util.event('click', div, this, addEjectEvent);
            contents.appendChild(div);
        }
    };
}());
