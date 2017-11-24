class Order {
    constructor(pizzas, drinks, client) {
        this.id;
        this.pizzas = pizzas;
        this.drinks = drinks;
        this.client = client;
        this.date =  Date.now();
        this.price = this.calculatePrice();
    }

    set id(id) { this.id = id; }
    get id() { return this.id; }

    set date(date) { this.date = Date.now(); }
    get date() { return this.date; }

    set pizzas(pizzas) {this.pizzas = pizzas;}
    get pizzas() { return this.pizzas;}

    set drinks(drinks) { this.drinks = drinks; }
    get drinks() { return this.drinks; }

    set client(client) { this.client = client; }
    get client() { return this.client; }

    set price(price) { this.price =  this.calculatePrice(); }
    get price() { return this.price; }

    addPizza(pizza) {
        this.pizzas.push(pizza);
        this.price += pizza.price;
    }

    addDrinks(drink) {
        this.drinks.push(drink);
        this.price += this.pizza.price;
    }

    removePizza(pizza) {
        let index =  this.pizzas.indexOf(pizza);
        this.pizzas.splice(index, 1);
        this.price -= pizza.price;
    }

    removeDrinks(drink) {
        let index =  this.drinks.indexOf(drink);
        this.drinks.splice(index, 1);
        this.price -= drink.price;
    }

    calculatePrice() {
        let total = 0;
        for (const p of this.pizzas) {
            total += p.price;
        }
        for (const d of this.drinks) {
            total += d.price;
        }
        this.price = total;
    }
}

class Pizza {
    constructor(id, description, quantity, ingredients) {
        this.id = id;
        this.description = description;
        this.quantity = quantity;
        this.ingredients = ingredients;
        this.price = this.calculatePrice();
    }

    set id(id) { this.id = id; }
    get id() { return this.id; }
    
    set description(description) { this.description = description; }
    get description() { return this.description; }

    set quantity(quantity) { this.quantity = quantity; }
    get quantity() { return this.quantity; }

    set ingredients(ingredients) { this.ingredients = ingredients; }
    get ingredients() { return this.ingredients; }

    calculatePrice() {
        let total = 0;
        for (const i of this.ingredients) {
            total += i.price;
        }
        this.price = total * this.quantity;
    }

    addIngredient(ingredient) {
        this.ingredients.push(ingredient);
        this.price += ingredient.price;
    }

    removeIngredient(ingredient) {
        let index = this.ingredients.indexOf(ingredient);
        if(index > -1) {
            let temp = this.ingredients.slice(0, index);
            this.ingredient.push(temp);
        }
        this.price -= ingredient.price;
    }
}

class Drink {
    constructor(id, description, quantity, price) {
        this.id = id;
        this.description = description;
        this.quantity = quantity;
        this.price = price * quantity;
    }

    set id(id) { this.id = id; }
    get id() { return this.id; }

    set description(description) { this.description = description; }
    get description() { return this.description; }

    set quantity(quantity) { this.quantity = quantity; }
    get quantity() { return this.quantity; }

    set price(price) { this.price = price * this.quantity; }
    get price() { return this.price; }
}

class Ingredient {
    constructor(id, description, price) {
        this.id = id;
        this.description = description;
        this.price = price;
    }

    set id(id) { this.id = id; }
    get id() { return this.id; }

    set description(description) { this.description = description; }
    get description() { return this.description; }

    set price(price) { this.price = price; }
    get price() { return this.price; }
}

class Client {
    constructor(cedula, firstName, lastName, phone, cellphone, address, city) {
        this.cedula = cedula;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.cellphone = cellphone;
        this.address = address;
        this.city = city;
    }

    set cedula(cedula) { this.cedula = cedula; }
    get cedula() { return this.cedula; }

    set firstName(firstName) { this.firstName = firstName; }
    get firstName() { return this.firstName; }

    set lastName(lastName) { this.lastName = lastName; }
    get lastName() { return this.lastName; }

    set phone(phone) { this.phone = phone; }
    get phone() { return this.phone; }

    set cellphone(cellphone) { this.cellphone = cellphone; }
    get cellphone() { return this.cellphone; }

    set address(address) { this.address = address; }
    get address() { return this.address; }

    set city(city) { this.city = city; }
    get city() { return this.city; }
}

module.exports.Client = Client;
module.exports.Ingredient = Ingredient;
module.exports.Pizza = Pizza;
module.exports.Drink = Drink;
module.exports.Order = Order;