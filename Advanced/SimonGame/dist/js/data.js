"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var data = {
    orderData: [],
    currentIndex: 0,
    isStart: false,
    isStrict: false,
    addItem: function addItem() {
        this.orderData.push(Math.floor(Math.random() * 4) + 1);
        this.amount += 1;
    }
};

exports.default = function () {
    return false;
};

exports.data = data;