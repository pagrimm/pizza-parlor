//Business logic
//Cart constructor and prototypes
function Cart(tax, deliveryFee) {
  this.pizzas = [],
  this.subtotal = 0,
  this.tax = tax,
  this.deliveryFee = deliveryFee,
  this.totalprice = 0
}


//Pizza constructor and prototypes
function Pizza(size, cheese, toppings) {
  this.size = size,
  this.cheese = cheese,
  this.toppings = toppings,
  this.price = 0
}

function PizzaOption (name, value) {
  this.name = name;
  this.value = value;
}

//UI logic
$(document).ready(function () {
  $("#pizza-input-form").submit(function (event) {
    event.preventDefault();
      
  });
});