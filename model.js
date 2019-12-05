"use strict";
class Order {
    constructor(id, client, status, date, payment, pizzas, drinks) {
        this._id = id;
        this._status = status;
        this._date = date;
        this._payment = payment;
        this._pizzas = pizzas;
        this._drinks = drinks;
        this._client = client;
        this._subtotal = this.calculateSubtotal();
        this._tax = this._subtotal * 0.19;
        this._total = this._tax + this._subtotal;
    }

    set id(id) { this._id = id; }
    get id() { return this._id; }

    set status(status) { this._status = status; }
    get status() { return this._status; }

    set date(date) { this._date = date; }
    get date() { return this._date; }

    set payment(payment) { this._payment = payment; }
    get payment() { return this._payment; }

    set pizzas(pizzas) { this._pizzas = pizzas; }
    get pizzas() { return this._pizzas; }

    set drinks(drinks) { this._drinks = drinks; }
    get drinks() { return this._drinks; }

    set client(client) { this._client = client; }
    get client() { return this._client; }

    set subtotal(subtotal) { this._subtotal = subtotal; }
    get subtotal() { return this._subtotal; }

    get tax() { return this._tax; }
    get total() { return this._total; }

    addPizza(pizza) {
        this._pizzas.push(pizza);
        this._subtotal += pizza.price;
        this.calculateSubtotal();
    }

    addDrinks(drink) {
        this._drinks.push(drink);
        this._subtotal += this._pizza.price;
        this.calculateSubtotal();
    }

    removePizza(pizza) {
        let index = this._pizzas.indexOf(pizza);
        this._pizzas.splice(index, 1);
        this._subtotal -= pizza.price;
        this.calculateSubtotal();
    }

    removeDrinks(drink) {
        let index = this._drinks.indexOf(drink);
        this._drinks.splice(index, 1);
        this._subtotal -= drink.price;
        this.calculateSubtotal();
    }

    calculateSubtotal() {
        let price = 0;
        for (let p of this._pizzas) {
            price += p.price;
        }
        for (let d of this._drinks) {
            price += d.price;
        }
        console.log("SUBTOTAL DEL PEDIDO: " + price);
        return price;
    }

    calculateTaxies() {
        this._tax = this._subtotal * 0.19;
    }

    calculateTotal() {
        this._total = this._tax + this._subtotal;
        console.log("SUBTOTAL DEL PEDIDO: " + this._total);
    }
}

class Pizza {
    constructor(id, description, quantity, size, price) {
        this._id = id;
        this._description = description;
        this._quantity = quantity;
        this._size = size;
        this._price = price;
        this.calculatePrice();
    }

    set id(id) { this._id = id; }
    get id() { return this._id; }

    set description(description) { this._description = description; }
    get description() { return this._description; }

    set quantity(quantity) { this._quantity = quantity; this.calculatePrice(); }
    get quantity() { return this._quantity; }

    set size(size) {this._size = size;}
    get size() {return this._size; }

    set price(price) { this._price = price; }
    get price() { return this._price; }

    calculatePrice() {
        this._price = this._price * this._quantity;
    }
}

class Drink {
    constructor(id, description, quantity, volumen, price) {
        this._id = id;
        this._description = description;
        this._quantity = quantity;
        this._volumen = volumen;
        this._price = price;
        this.calculatePrice();
    }

    set id(id) { this._id = id; }
    get id() { return this._id; }

    set description(description) { this._description = description; }
    get description() { return this._description; }

    set quantity(quantity) { this._quantity = quantity; this.calculatePrice(); }
    get quantity() { return this._quantity; }

    set volumen(volumen) { this._volumen = volumen; }
    get volumen() { return this._volumen; }

    set price(price) { this._price = price; }
    get price() { return this._price; }

    calculatePrice() {
        this._price = this._price * this._quantity;
    }
}

class Extra {
    constructor(id, description, price) {
        this._id = id;
        this._description = description;
        this._price = price;
    }

    set id(id) { this._id = id; }
    get id() { return this._id; }

    set description(description) { this._description = description; }
    get description() { return this._description; }

    set price(price) { this._price = price; }
    get price() { return this._price; }
}

class Client {
    constructor(id, fullName, phone, cellphone, address, city) {
        this._id = id;
        this._fullName = fullName;
        this._phone = phone;
        this._cellphone = cellphone;
        this._address = address;
        this._city = city;
    }

    set id(id) { this._id = id; }
    get id() { return this._id; }

    set fullName(fullName) { this._fullName = fullName; }
    get fullName() { return this._fullName; }

    set phone(phone) { this._phone = phone; }
    get phone() { return this._phone; }

    set cellphone(cellphone) { this._cellphone = cellphone; }
    get cellphone() { return this._cellphone; }

    set address(address) { this._address = address; }
    get address() { return this._address; }

    set city(city) { this._city = city; }
    get city() { return this._city; }
}

module.exports.Client = Client;
module.exports.Extra = Extra;
module.exports.Pizza = Pizza;
module.exports.Drink = Drink;
module.exports.Order = Order;