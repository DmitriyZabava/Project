export default function priceWithDiscount(price, discount) {
    const discountMoney = price / 100 * discount;
    const newPrice = price - discountMoney;
    return{discountMoney,newPrice}

};