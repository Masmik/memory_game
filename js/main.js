'use strict';

var app = {

    cards: [
        {
            name: 'owl',
            url: '../memory_game/img/owl-robot.jpg'
        },
        {
            name: 'clock',
            url: '../memory_game/img/clock-robot.jpg'
        },
        {
            name: 'glass',
            url: '../memory_game/img/glass-robot.jpg'
        },
        {
            name: 'green',
            url: '../memory_game/img/green-robot.jpg'
        },
        {
            name: 'rocket',
            url: '../memory_game/img/rocket-robot.jpg'
        },
        {
            name: 'smile',
            url: '../memory_game/img/smile-robot.jpg'
        }
    ],

    fieldsCountCards: 12,

    fieldCards: [],

    selectedElements: [],


    init: function () {
        app.shuffle();
        app.buildHtml();
        app.clickHandles();

    },

    buildHtml: function () {
        var cards_container = document.getElementsByClassName("cards-container");
        for (var i = 0; i < app.fieldCards.length; i++) {
            var d = document.createElement("div");
            d.className = "card";
            var backCard = document.createElement("div");
            backCard.className = "back";
            var backImage = app.fieldCards[i].url;
            backCard.style.backgroundImage = "url(" + backImage + ')';
            var frontCard = document.createElement("div");
            frontCard.className = "front";
            d.setAttribute('data-value', app.fieldCards[i].id);
            cards_container[0].appendChild(d);
            d.appendChild(backCard);
            d.appendChild(frontCard);
        }
    },

    shuffle: function () {
        var beforeSort = [];

        for (var i = 0, j = 0; i < app.fieldsCountCards; i += 2) {

            if (j == app.cards.length) {
                j = 0;
            }

            var cardFirstPair = {
                id: i,
                name: app.cards[j].name,
                url: app.cards[j].url
            };

            var cardSecondPair = {
                id: i + 1,
                name: app.cards[j].name,
                url: app.cards[j].url
            };

            beforeSort.push(cardFirstPair);
            beforeSort.push(cardSecondPair);

            j++;
        }

        beforeSort.sort(function () {
            return 0.5 - Math.random()
        });
        beforeSort.forEach(function (el) {
            app.fieldCards.push(el);
        });
    },


    clickHandles: function () {

        var cards = document.getElementsByClassName("card");
        var selectedClass = function (e) {
            var selectedElem = e.target;

            var selectedCard = selectedElem.parentElement;
            var selectedDataValue = selectedCard.dataset.value;

            if (selectedCard.classList.contains('selected')) {
                return;
            }
            if (selectedCard.classList.contains('matched')) {
                return;
            }

            for (var i = 0; i < app.fieldCards.length; i++) {

                if (app.fieldCards[i].id == selectedDataValue) {

                    app.selectedElements.push(app.fieldCards[i]);
                    selectedCard.classList.add("selected");
                }
            }

            app.checkMatch();
            app.winning();
        };

        for (var i = 0; i < cards.length; i++) {
            cards[i].addEventListener('click', selectedClass, false);
        }

    },

    checkMatch: function () {
        if (app.selectedElements.length == 2) {
            if (app.selectedElements[0].name === app.selectedElements[1].name) {
                app.markAsMatched(app.selectedElements[0].id);
                app.markAsMatched(app.selectedElements[1].id);
            }
        }
        if (app.selectedElements.length > 2) {
            app.moveCardBack(app.selectedElements[0].id);
            app.moveCardBack(app.selectedElements[1].id);
            app.selectedElements.splice(0, 2);
        }
    },

    markAsMatched: function (elId) {

        var selectedCards = document.getElementsByClassName("selected");

        for (var i = 0; i < selectedCards.length; i++) {
            if (selectedCards[i].dataset.value == elId) {
                selectedCards[i].classList.add("matched");
                setTimeout(function () {
                }, 500);
            }
        }
    },

    winning: function () {
        var matchedCards = document.getElementsByClassName("matched");
        var popup = document.getElementsByClassName("popuptext")[0];

        if (matchedCards.length == app.fieldsCountCards) {
            setTimeout(function () {
                popup.classList.toggle("show");
                popup.addEventListener("click", app.reset, false);
            }, 1000);
        }
    },

    moveCardBack: function (elId) {
        var selectedCards = document.getElementsByClassName("selected");

        for (var i = 0; i < selectedCards.length; i++) {
            if (selectedCards[i].dataset.value == elId) {
                selectedCards[i].classList.remove("selected");
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', function () {
    app.init();
});
