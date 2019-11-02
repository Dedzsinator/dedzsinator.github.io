 var OregonH = OregonH || {};

 OregonH.Event = {};

 OregonH.Event.eventTypes = [{
     type: 'STAT-CHANGE',
     notification: 'negative',
     stat: 'crew',
     value: -3,
     text: 'Megromlott az étel. Veszteség: '
   },
   {
     type: 'STAT-CHANGE',
     notification: 'negative',
     stat: 'crew',
     value: -4,
     text: 'Fertőzés veszély. Veszteség: '
   },
   {
     type: 'STAT-CHANGE',
     notification: 'negative',
     stat: 'food',
     value: -10,
     text: 'Féreg fertőzés. Elvesztett élelem: '
   },
   {
     type: 'STAT-CHANGE',
     notification: 'negative',
     stat: 'money',
     value: -50,
     text: 'Megloptak a zsebtolvajok $'
   },
   {
     type: 'STAT-CHANGE',
     notification: 'negative',
     stat: 'oxen',
     value: -1,
     text: 'Ökör betegség. Veszteség: '
   },
   {
     type: 'STAT-CHANGE',
     notification: 'positive',
     stat: 'food',
     value: 20,
     text: 'Találtál vad bogyókat, megnövelte az ételt: '
   },
   {
     type: 'STAT-CHANGE',
     notification: 'positive',
     stat: 'food',
     value: 20,
     text: 'Találtál vad bogyókat, megnövelte az ételt: '
   },
   {
     type: 'STAT-CHANGE',
     notification: 'positive',
     stat: 'oxen',
     value: 1,
     text: 'Találtál egy vad ökröt, így van: '
   },
   /*
   {
     type: 'SHOP',
     notification: 'neutral',
     text: 'Találtál egy boltot!',
     products: [{
         item: 'étel',
         qty: 20,
         price: 50
       },
       {
         item: 'ökör',
         qty: 1,
         price: 200
       },
       {
         item: 'tűzerő',
         qty: 2,
         price: 50
       },
       {
         item: 'csapattag',
         qty: 5,
         price: 80
       }
     ]
   },
   */
   {
     type: 'SHOP',
     notification: 'neutral',
     text: 'Találtál egy boltot!',
     products: [{
         item: 'étel',
         qty: 20,
         price: 50
       },
       {
         item: 'ökör',
         qty: 1,
         price: 200
       },
       {
         item: 'tűzerő',
         qty: 2,
         price: 50
       },
       {
         item: 'csapattag',
         qty: 5,
         price: 80
       }
     ]
   },
   {
     type: 'SHOP',
     notification: 'neutral',
     text: 'Találtál egy boltot!',
     products: [{
         item: 'étel',
         qty: 30,
         price: 50
       },
       {
         item: 'ökör',
         qty: 1,
         price: 200
       },
       {
         item: 'tűzerő',
         qty: 2,
         price: 20
       },
       {
         item: 'csapattag',
         qty: 10,
         price: 80
       }
     ]
   },
   {
     type: 'SHOP',
     notification: 'neutral',
     text: 'A csempészek jó dolgokat árulnak!',
     products: [{
         item: 'étel',
         qty: 20,
         price: 60
       },
       {
         item: 'ökör',
         qty: 1,
         price: 300
       },
       {
         item: 'tűzerő',
         qty: 2,
         price: 30
       },
       {
         item: 'csapattag',
         qty: 5,
         price: 60
       }
     ]
   },
   {
     type: 'ATTACK',
     notification: 'negative',
     text: 'A banditák támadnak!'
   },
   {
     type: 'ATTACK',
     notification: 'negative',
     text: 'A banditák támadnak!'
   },
   {
     type: 'ATTACK',
     notification: 'negative',
     text: 'A banditák támadnak!'
   }
 ];

 OregonH.Event.generateEvent = function () {
   //pick random one
   var eventIndex = Math.floor(Math.random() * this.eventTypes.length);
   var eventData = this.eventTypes[eventIndex];

   //events that consist in updating a stat
   if (eventData.type == 'STAT-CHANGE') {
     this.stateChangeEvent(eventData);
   }

   //shops
   else if (eventData.type == 'SHOP') {
     //pause game
     this.game.pauseJourney();

     //notify user
     this.ui.notify(eventData.text, eventData.notification);

     //prepare event
     this.shopEvent(eventData);
   }

   //attacks
   else if (eventData.type == 'ATTACK') {
     //pause game
     this.game.pauseJourney();

     //notify user
     this.ui.notify(eventData.text, eventData.notification);

     //prepare event
     this.attackEvent(eventData);
   }
 };

 OregonH.Event.stateChangeEvent = function (eventData) {
   //can't have negative quantities
   if (eventData.value + this.caravan[eventData.stat] >= 0) {
     this.caravan[eventData.stat] += eventData.value;
     this.ui.notify(eventData.text + Math.abs(eventData.value), eventData.notification);
   }
 };

 OregonH.Event.shopEvent = function (eventData) {
   //number of products for sale
   var numProds = Math.ceil(Math.random() * 4);

   //product list
   var products = [];
   var j, priceFactor;

   for (var i = 0; i < numProds; i++) {
     //random product
     j = Math.floor(Math.random() * eventData.products.length);

     //multiply price by random factor +-30%
     priceFactor = 0.7 + 0.6 * Math.random();

     products.push({
       item: eventData.products[j].item,
       qty: eventData.products[j].qty,
       price: Math.round(eventData.products[j].price * priceFactor)
     });
   }

   this.ui.showShop(products);
 };

 //prepare an attack event
 OregonH.Event.attackEvent = function (eventData) {
   var firepower = Math.round((0.7 + 0.6 * Math.random()) * OregonH.ENEMY_FIREPOWER_AVG);
   var gold = Math.round((0.7 + 0.6 * Math.random()) * OregonH.ENEMY_GOLD_AVG);

   this.ui.showAttack(firepower, gold);
 };
 var OregonH = OregonH || {};

 OregonH.Caravan = {};

 OregonH.Caravan.init = function (stats) {
   this.day = stats.day;
   this.distance = stats.distance;
   this.crew = stats.crew;
   this.food = stats.food;
   this.oxen = stats.oxen;
   this.money = stats.money;
   this.firepower = stats.firepower;
 };

 //update weight and capacity
 OregonH.Caravan.updateWeight = function () {
   var droppedFood = 0;
   var droppedGuns = 0;

   //how much can the caravan carry
   this.capacity = this.oxen * OregonH.WEIGHT_PER_OX + this.crew * OregonH.WEIGHT_PER_PERSON;

   //how much weight do we currently have
   this.weight = this.food * OregonH.FOOD_WEIGHT + this.firepower * OregonH.FIREPOWER_WEIGHT;

   //drop things behind if it's too much weight
   //assume guns get dropped before food
   while (this.firepower && this.capacity <= this.weight) {
     this.firepower--;
     this.weight -= OregonH.FIREPOWER_WEIGHT;
     droppedGuns++;
   }

   if (droppedGuns) {
     this.ui.notify(+droppedGuns + ' fegyvered veszett oda!', 'negative');
   }

   while (this.food && this.capacity <= this.weight) {
     this.food--;
     this.weight -= OregonH.FOOD_WEIGHT;
     droppedFood++;
   }

   if (droppedFood) {
     this.ui.notify(+droppedFood + ' ételed veszett oda!', 'negative');
   }
 };

 //update covered distance
 OregonH.Caravan.updateDistance = function () {
   //the closer to capacity, the slower
   var diff = this.capacity - this.weight;
   var speed = OregonH.SLOW_SPEED + diff / this.capacity * OregonH.FULL_SPEED;
   this.distance += speed;
 };

 //food consumption
 OregonH.Caravan.consumeFood = function () {
   this.food -= this.crew * OregonH.FOOD_PER_PERSON;

   if (this.food < 0) {
     this.food = 0;
   }
 };
 var OregonH = OregonH || {};

 OregonH.UI = {};

 //show a notification in the message area
 OregonH.UI.notify = function (message, type) {
   document.getElementById('updates-area').innerHTML = '<div class="update-' + type + '">' + Math.ceil(this.caravan.day) + '. ' + 'Nap' + ': ' + message + '</div>' + document.getElementById('updates-area').innerHTML;
 };

 //refresh visual caravan stats
 OregonH.UI.refreshStats = function () {
   //modify the dom
   document.getElementById('stat-day').innerHTML = Math.ceil(this.caravan.day);
   document.getElementById('stat-distance').innerHTML = Math.floor(this.caravan.distance);
   document.getElementById('stat-crew').innerHTML = this.caravan.crew;
   document.getElementById('stat-oxen').innerHTML = this.caravan.oxen;
   document.getElementById('stat-food').innerHTML = Math.ceil(this.caravan.food);
   document.getElementById('stat-money').innerHTML = this.caravan.money;
   document.getElementById('stat-firepower').innerHTML = this.caravan.firepower;
   document.getElementById('stat-weight').innerHTML = Math.ceil(this.caravan.weight) + '/' + this.caravan.capacity;

   //update caravan position
   document.getElementById('caravan').style.left = (380 * this.caravan.distance / OregonH.FINAL_DISTANCE) + 'px';
 };

 //show shop
 OregonH.UI.showShop = function (products) {

   //get shop area
   var shopDiv = document.getElementById('shop');
   shopDiv.classList.remove('hidden');

   //init the shop just once
   if (!this.shopInitiated) {

     //event delegation
     shopDiv.addEventListener('click', function (e) {
       //what was clicked
       var target = e.target || e.src;

       //exit button
       if (target.tagName == 'BUTTON') {
         //resume journey
         shopDiv.classList.add('hidden');
         OregonH.UI.game.resumeJourney();
       } else if (target.tagName == 'DIV' && target.className.match(/product/)) {

         console.log('buying')

         var bought = OregonH.UI.buyProduct({
           item: target.getAttribute('data-item'),
           qty: target.getAttribute('data-qty'),
           price: target.getAttribute('data-price')
         });

         if (bought) target.html = '';
       }
     });

     this.shopInitiated = true;
   }

   //clear existing content
   var prodsDiv = document.getElementById('prods');
   prodsDiv.innerHTML = '';

   //show products
   var product;
   for (var i = 0; i < products.length; i++) {
     product = products[i];
     prodsDiv.innerHTML += '<div class="product" data-qty="' + product.qty + '" data-item="' + product.item + '" data-price="' + product.price + '">' + product.qty + ' ' + product.item + ' - $' + product.price + '</div>';
   }

   //setup click event
   //document.getElementsByClassName('product').addEventListener(OregonH.UI.buyProduct);
 };

 //buy product
 OregonH.UI.buyProduct = function (product) {
   //check we can afford it
   if (product.price > OregonH.UI.caravan.money) {
     OregonH.UI.notify('Nincs elég pénzed!', 'negative');
     return false;
   }

   OregonH.UI.caravan.money -= product.price;

   OregonH.UI.caravan[product.item] += +product.qty;

   OregonH.UI.notify('Vásároltál ' + product.qty + ' x ' + product.item, 'positive');

   //update weight
   OregonH.UI.caravan.updateWeight();

   //update visuals
   OregonH.UI.refreshStats();

   return true;

 };

 //show attack
 OregonH.UI.showAttack = function (firepower, gold) {
   var attackDiv = document.getElementById('attack');
   attackDiv.classList.remove('hidden');

   //keep properties
   this.firepower = firepower;
   this.gold = gold;

   //show firepower
   document.getElementById('attack-description').innerHTML = 'Tűzerőd: ' + firepower;

   //init once
   if (!this.attackInitiated) {

     //fight
     document.getElementById('fight').addEventListener('click', this.fight.bind(this));

     //run away
     document.getElementById('runaway').addEventListener('click', this.runaway.bind(this));

     this.attackInitiated = true;
   }
 };

 //fight
 OregonH.UI.fight = function () {

   var firepower = this.firepower;
   var gold = this.gold;

   var damage = Math.ceil(Math.max(0, firepower * 2 * Math.random() - this.caravan.firepower));

   //check there are survivors
   if (damage < this.caravan.crew) {
     this.caravan.crew -= damage;
     this.caravan.money += gold;
     this.notify(' megölték ' + damage + ' emberedet a harcban!', 'negative');
     this.notify('Találtál $' + gold, 'gold');
   } else {
     this.caravan.crew = 0;
     this.notify('Mindenki meghalt a csatában! Vesztettél!', 'negative');
   }

   //resume journey
   document.getElementById('attack').classList.add('hidden');
   this.game.resumeJourney();
 };

 //runing away from enemy
 OregonH.UI.runaway = function () {

   var firepower = this.firepower;

   var damage = Math.ceil(Math.max(0, firepower * Math.random() / 2));

   //check there are survivors
   if (damage < this.caravan.crew) {
     this.caravan.crew -= damage;
     this.notify(damage + ' A menekülő embereidet megölték!', 'negative');
   } else {
     this.caravan.crew = 0;
     this.notify('Mindenki meghalt a menekülésben!', 'negative');
   }

   //remove event listener
   document.getElementById('runaway').removeEventListener('click');

   //resume journey
   document.getElementById('attack').classList.add('hidden');
   this.game.resumeJourney();

 };
 var OregonH = OregonH || {};

 //constants
 OregonH.WEIGHT_PER_OX = 20;
 OregonH.WEIGHT_PER_PERSON = 2;
 OregonH.FOOD_WEIGHT = 0.6;
 OregonH.FIREPOWER_WEIGHT = 5;
 OregonH.GAME_SPEED = 800;
 OregonH.DAY_PER_STEP = 0.2;
 OregonH.FOOD_PER_PERSON = 0.02;
 OregonH.FULL_SPEED = 5;
 OregonH.SLOW_SPEED = 3;
 OregonH.FINAL_DISTANCE = 1000;
 OregonH.EVENT_PROBABILITY = 0.15;
 OregonH.ENEMY_FIREPOWER_AVG = 5;
 OregonH.ENEMY_GOLD_AVG = 50;

 OregonH.Game = {};

 //initiate the game
 OregonH.Game.init = function () {

   //reference ui
   this.ui = OregonH.UI;

   //reference event manager
   this.eventManager = OregonH.Event;

   //setup caravan
   this.caravan = OregonH.Caravan;
   this.caravan.init({
     day: 0,
     distance: 0,
     crew: 30, //!!! Values HERE!!!
     food: 80,
     oxen: 2,
     money: 300,
     firepower: 2
   });

   //pass references
   this.caravan.ui = this.ui;
   this.caravan.eventManager = this.eventManager;

   this.ui.game = this;
   this.ui.caravan = this.caravan;
   this.ui.eventManager = this.eventManager;

   this.eventManager.game = this;
   this.eventManager.caravan = this.caravan;
   this.eventManager.ui = this.ui;

   //begin adventure!
   this.startJourney();
 };

 //start the journey and time starts running
 OregonH.Game.startJourney = function () {
   this.gameActive = true;
   this.previousTime = null;
   this.ui.notify('Egy új kaland veszi kezdetét!', 'positive');

   this.step();
 };

 //game loop
 OregonH.Game.step = function (timestamp) {

   //starting, setup the previous time for the first time
   if (!this.previousTime) {
     this.previousTime = timestamp;
     this.updateGame();
   }

   //time difference
   var progress = timestamp - this.previousTime;

   //game update
   if (progress >= OregonH.GAME_SPEED) {
     this.previousTime = timestamp;
     this.updateGame();
   }

   //we use "bind" so that we can refer to the context "this" inside of the step method
   if (this.gameActive) window.requestAnimationFrame(this.step.bind(this));
 };

 //update game stats
 OregonH.Game.updateGame = function () {
   //day update
   this.caravan.day += OregonH.DAY_PER_STEP;

   //food consumption
   this.caravan.consumeFood();

   if (this.caravan.food === 0) {
     this.ui.notify('A karavánod éhenhalt!', 'negative');
     this.gameActive = false;
     return;
   }

   //update weight
   this.caravan.updateWeight();

   //update progress
   this.caravan.updateDistance();

   //show stats
   this.ui.refreshStats();

   //check if everyone died
   if (this.caravan.crew <= 0) {
     this.caravan.crew = 0;
     this.ui.notify('Mindenki meghalt!', 'negative');
     this.gameActive = false;
     return;
   }

   //check win game
   if (this.caravan.distance >= OregonH.FINAL_DISTANCE) {
     this.ui.notify('Hazaértél!', 'positive');
     this.gameActive = false;
     return;
   }

   //random events
   if (Math.random() <= OregonH.EVENT_PROBABILITY) {
     this.eventManager.generateEvent();
   }
 };

 //pause the journey
 OregonH.Game.pauseJourney = function () {
   this.gameActive = false;
 };

 //resume the journey
 OregonH.Game.resumeJourney = function () {
   this.gameActive = true;
   this.step();
 };


 //init game
 OregonH.Game.init();