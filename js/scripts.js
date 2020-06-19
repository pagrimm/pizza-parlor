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

Pizza.prototype.calculatePrice = function() {
  this.price += this.size.value;
  this.price += this.cheese.value;
  for (i = 0; i < this.toppings.length; i++) {
    this.price += this.toppings[i].value;
  }
}

function PizzaOption (name, value) {
  this.name = name;
  this.value = value;
}

//UI logic

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
  let tax = .065;
  let deliveryFee = 3;
  let cart = new Cart(tax, deliveryFee);
  $("#pizza-input-form").submit(function (event) {
    event.preventDefault();
    let inputs = getInputs();
    let pizza = new Pizza(inputs[0], inputs[1], inputs[2])
    pizza.calculatePrice();
  });
});

$("label[for='" + $("input:radio[name=size]:checked").attr("id") + "']").text();
