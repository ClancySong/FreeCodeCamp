const data = {
    orderData: [],
    currentIndex: 0,
    isStart: false,
    isStrict: false,
    addItem: function addItem() {
        this.orderData.push(Math.floor(Math.random() * 4) + 1);
        this.amount += 1;
    },
};

export default () => false;
export { data };