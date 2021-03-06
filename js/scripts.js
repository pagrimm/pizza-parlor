//Business logic
//Cart constructor and prototypes
function Cart(salesTax, deliveryFee) {
  this.pizzas = [],
  this.subTotal = 0,
  this.salesTax = salesTax,
  this.totalTax = 0,
  this.deliveryFee = deliveryFee,
  this.totalPrice = 0
}

//prototype method for calculating the subtotal, total tax, and total price of a cart based on the pizzas it contains
Cart.prototype.calculatePrice = function() {
  this.subTotal = 0;
  for (i = 0; i < this.pizzas.length; i++) {
    this.subTotal += this.pizzas[i].price;
  }
  this.totalTax = this.subTotal * this.salesTax;
  this.totalPrice = this.subTotal + this.totalTax + this.deliveryFee;
}

//Pizza constructor and prototypes
function Pizza(size, cheese, toppings) {
  this.size = size,
  this.cheese = cheese,
  this.toppings = toppings,
  this.price = 0
}

//prototype method for calculating a pizza's price based on its size and ingredients
Pizza.prototype.calculatePrice = function() {
  this.price = 0;
  this.price += this.size.value;
  this.price += this.cheese.value;
  for (i = 0; i < this.toppings.length; i++) {
    this.price += this.toppings[i].value;
  }
}


//PizzaOption constructor
function PizzaOption(name, value) {
  this.name = name;
  this.value = value;
}

//UI logic
//function to display the various contents of the cart object in the cart area of the html
function displayCart(cart) {
  $(".cart-container").html("");
  for (i = cart.pizzas.length - 1; i >= 0; i--) {
    $(".cart-container").prepend($(".pizza-cart-container").last().clone());
    $(".pizza-cart-container").first().addClass("cart-hidden");
    $(".pizza-name-cart").first().append(i + 1);
    $(".pizza-size-cart").first().text(cart.pizzas[i].size.name);
    $(".pizza-cheese-cart").first().text(cart.pizzas[i].cheese.name);
    for (n = 0; n < cart.pizzas[i].toppings.length; n++) {
      $(".pizza-toppings-cart").first().append("<div>" + cart.pizzas[i].toppings[n].name + "</div>");
    }
    $(".pizza-price-cart").first().append(cart.pizzas[i].price.toFixed(2));
  }
  $(".subtotal-cart").text(cart.subTotal.toFixed(2));
  $(".tax-cart").text(cart.totalTax.toFixed(2));
  $(".delivery-fee-cart").text(cart.deliveryFee.toFixed(2));
  $(".price-cart").text(cart.totalPrice.toFixed(2));
  $(".cart-shown").hide();
  $(".cart-hidden").show();
}

//function to get inputs from the form, create new PizzaOption objects from them, and return them in an array
function getInputs() {
  let inputs = [];
  let size = new PizzaOption($("label[for='" + $("input:radio[name=size]:checked").attr("id") + "']").text(), parseInt($("input:radio[name=size]:checked").val()));
  let cheese = new PizzaOption($("#input-cheese option:selected").text(), parseInt($("#input-cheese").val()));
  let toppings = [];
  $("input:checkbox[name=toppings]:checked").each(function () {
    let topping = new PizzaOption($("label[for='" + $(this).attr("id") + "']").text(), parseInt($(this).val()))
    toppings.push(topping);
  });
  inputs.push(size, cheese, toppings);
  return inputs;
}

$(document).ready(function () {
  let salesTax = .065;
  let deliveryFee = 3;
  let cart = new Cart(salesTax, deliveryFee);
  $("#pizza-input-form").submit(function (event) {
    event.preventDefault();
    let inputs = getInputs();
    document.getElementById("pizza-input-form").reset();
    let pizza = new Pizza(inputs[0], inputs[1], inputs[2])
    pizza.calculatePrice();
    cart.pizzas.push(pizza);
    cart.calculatePrice();
    displayCart(cart);
  });
  $("#reset-button").click(function () {
    cart = new Cart(salesTax, deliveryFee);
    $(".cart-container").html("");
    $(".cart-hidden").hide();
    $(".cart-shown").show();
  });
});
