var Caravan = Caravan || {};
var audio, playbtn, mutebtn, seek_bar;
var progress = document.querySelector('#progress');
var i = 0;
var inv_btn = document.getElementById('inv-btn');
var inv = document.getElementById('inventory');

var pressed = false;
inv_btn.onclick = function () {
  if(pressed == false) {
    inv.classList.remove('hidden');
    inv_btn.style.background = "url(../img/caravan/book2.png)";
    pressed = true;
  } else {
    inv.classList.add('hidden');
    inv_btn.style.background = "url(../img/caravan/book1.png) no-repeat";
    pressed = false;
  }
}
//!!!!!!!!

const person = {
  hp: 50, ///Hit points
  mp: 25, ///Magic Stamina points
  armor : 0.0, ///Pourcentage of damage ignored (1 = 1%)
  shield: 0, ///Hit points that regen. passively
  physDmg: 5, ///Physical Damage
  fireDmg: 0, ///Fire Damage (strong against lightning)
  coldDmg: 0, ///Cold Damage (strong against fire)
  lightningDmg: 0, ///Lightning Damage (strong against cold)
  fireResistance: 0, ///Take less fireDmg (1 = 1%)
  coldResistance: 0, ///Take less coldDmg (1 = 1%)
  lightningResistance: 0, ///Take less lightningDmg (1 = 1%)
  healPower: 5, ///Healing Hit points
  pureDmg: 0, ///Damage that ignore all resistances
  critChance: 10, ///Chance to do more damage (10 = 10% chance to crit)
  critDmg: 1.0, ///Times the damage gets multiplied when criting.
  equippedItems: {helmetSlot: 0, bodyarmourSlot: 0, gloveSlot: 0, beltSlot: 0, ringSlot: 0, amuletSlot: 0, weaponSlot: 0},
  backpack: [],
};

function ItemType(type) {
  this.type = type
}

function Item(name, type, image, level, physDmg, armor) {
  this.name = name
  this.type = type
  this.image = image
  this.level = level
  this.physDmg = physDmg
  this.armor = armor
}


var bearHead = new Item("Bear Head", "helmet", "blank.png", 0, 100, 0)
var redCloth = new Item("Red Cloth", "bodyarmour", "redcloth.png", 2, 10, 5)

var helmetBlank = new Item("Nothing", "helmet", "blank.png", 0, 0, 0)
var bodyarmourBlank = new Item("Nothing", "bodyarmour", "blank.png", 0, 0, 0)
var gloveBlank = new Item("Nothing", "glove", "blank.png", 0, 0, 0)
var beltBlank = new Item("Nothing", "belt", "blank.png", 0, 0, 0)
var ringBlank = new Item("Nothing", "ring", "blank.png", 0, 0, 0)
var amuletBlank = new Item("Nothing", "amulet", "blank.png", 0, 0, 0)
var weaponBlank = new Item("Nothing", "weapon", "blank.png", 0, 0, 0)
person.equippedItems.helmetSlot = helmetBlank
person.equippedItems.bodyarmourSlot = bodyarmourBlank
person.equippedItems.gloveSlot = gloveBlank
person.equippedItems.beltSlot = beltBlank
person.equippedItems.ringSlot = ringBlank
person.equippedItems.amuletSlot = amuletBlank
person.equippedItems.weaponSlot = weaponBlank
var helmet = new ItemType(1)
var bodyarmour = new ItemType(2)
var glove = new ItemType(3)
var belt = new ItemType(4)
var ring = new ItemType(5)
var amulet = new ItemType(6)
var weapon = new ItemType(7)


person.backpack.push(redCloth)
person.backpack.push(bearHead)
console.log('0 = Backpack')
console.log('1 = Equipped Items')
console.log('2 = Put on item')
for (let f = 0; f < 10; f++){
  var premiereQuestion = prompt("Choose Option");

  if (premiereQuestion == null || premiereQuestion.toLowerCase() === "q") {
    break
  }

  if (premiereQuestion == 0) {
    console.log("- ".repeat(10))
    console.log("BACKPACK")
    for (let i = 0; i < person.backpack.length; i++) {
      console.log(person.backpack[i])
    }
  }
  if (premiereQuestion == 1) {
    console.log("- ".repeat(10))
    console.log("EQUIPPED ITEMS")
    console.log('Helmet: ' + person.equippedItems.helmetSlot.name)
    console.log('Body Armour: ' + person.equippedItems.bodyarmourSlot.name)
    console.log('Glove: ' + person.equippedItems.gloveSlot.name)
    console.log('Belt: ' + person.equippedItems.beltSlot.name)
    console.log('Ring: ' + person.equippedItems.ringSlot.name)
    console.log('Amulet: ' + person.equippedItems.amuletSlot.name)
    console.log('Weapon: ' + person.equippedItems.weaponSlot.name)
  }
  if (premiereQuestion == 2) {
    console.log("- ".repeat(10))
    console.log("PUT ON ITEM")

    console.log("Backpack:")
    for (let u = 0; u < person.backpack.length; u++) {
      console.log('ItemSlot' + u + ': ' + person.backpack[u].name)
    }

    for (v = 0; v < 1; v++) {
      var a = +prompt("Choose Item Number")
      if (person.backpack[a].type == "helmet"){
        person.backpack.push(person.equippedItems.helmetSlot);
        person.equippedItems.helmetSlot = person.backpack[a]
        person.backpack.splice(a, 1)
        break;
      }
      if (person.backpack[a].type == "bodyarmour"){
        person.backpack.push(person.equippedItems.bodyarmourSlot);
        person.equippedItems.bodyarmourSlot = person.backpack[a]
        person.backpack.splice(a, 1)
        break;
      }
      if (person.backpack[a].type == "glove"){
        person.backpack.push(person.equippedItems.gloveSlot);
        person.equippedItems.gloveSlot = person.backpack[a]
        person.backpack.splice(a, 1)
        break;
      }
      if (person.backpack[a].type == "belt"){
        person.backpack.push(person.equippedItems.beltSlot);
        person.equippedItems.beltSlot = person.backpack[a]
        person.backpack.splice(a, 1)
        break;
      }
      if (person.backpack[a].type == "ring"){
        person.backpack.push(person.equippedItems.ringSlot);
        person.equippedItems.ringSlot = person.backpack[a]
        person.backpack.splice(a, 1)
        break;
      }
      if (person.backpack[a].type == "amulet"){
        person.backpack.push(person.equippedItems.amuletSlot);
        person.equippedItems.amuletSlot = person.backpack[a]
        person.backpack.splice(a, 1)
        break;
      }
      if (person.backpack[a].type == "weapon"){
        person.backpack.push(person.equippedItems.weaponSlot);
        person.equippedItems.weaponSlot = person.backpack[a]
        person.backpack.splice(a, 1)
        break;
      }
    }
  }
}


//?-----------------------------------------------------------------------?// WORKS WITHOUT THIS, REPLACE
const item = document.querySelector('#fill');
const empties = document.querySelectorAll('#empty');

item = redCloth.image;

// Fill listeners
item.addEventListener('dragstart', dragStart);
item.addEventListener('dragend', dragEnd);

// Loop through empty boxes and add listeners
for (const empty of empties) {
  empty.addEventListener('dragover', dragOver);
  empty.addEventListener('dragenter', dragEnter);
  empty.addEventListener('dragleave', dragLeave);
  empty.addEventListener('drop', dragDrop);
}

// Drag Functions
function dragStart() {
  this.className += ' hold';
  setTimeout(() => (this.className = 'invisible'), 0);
  console.log(1);
}

function dragEnd() {
  this.className = 'fill';
}

function dragOver(e) {
  e.preventDefault();
  console.log(3);
}

function dragEnter(e) {
  e.preventDefault();
  this.className += ' hovered';
  console.log(4);
}

function dragLeave() {
  this.className = 'empty';
  console.log(5);
}

function dragDrop() {
  this.className = 'empty';
  this.append(fill);
  console.log(6);
}
/*function dragDrop() {
  this.style.background = "url(../img/caravan/slot.png)";
  this.append(fill);
}*/
//?-----------------------------------------------------------------------?//

Caravan.Event = {};
Caravan.Items = {};

Caravan.Items.items = [{
    name: 'kard',
    dmg: 5,
    rarity: 'common',
    //image: url(),
  },
  {
    name: 'ijj',
    dmg: 10,
    rarity: 'common',
    //image: url(),
  },
  {
    name: 'sisak',
    dmg: 2,
    rarity: 'common',
    //image: url(),
  },
  {
    name: 'mellvert',
    armor: 6,
    rarity: 'common',
    //image: url(),
  },
  {
    name: 'nadrag',
    dmg: 1,
    rarity: 'common',
    //image: url(),
  },
  {
    name: 'pajzs',
    dmg: 10,
    rarity: 'common',
    //image: url(),
  },
  {
    name: 'csizma',
    dmg: 4,
    rarity: 'common',
    //image: url(),
  },
];

   //?-----------------------------------------------------------------------?//

 Caravan.Event.eventTypes = [{
    type: 'TIPS',
    notification: 'tips',
    text: ''
   },
   //?-----------------------------------------------------------------------?//
   {
    type: 'CHOICE',
    notification: 'choice',
    stat1: 'ökör',
    value1: -1,
    stat2: 'étel',
    //value2: ,
    text: 'Fogytán van az élelmed, levágod-e egy ökrödet élelemért?'
   },
   //?-----------------------------------------------------------------------?//
   {
     type: 'STAT-CHANGE',
     notification: 'negative',
     stat: 'étel',
     value: -3,
     text: 'Megromlott az étel. Veszteség: '
   },
   {
     type: 'STAT-CHANGE',
     notification: 'positive',
     stat: 'ökör',
     value: 3,
     text: 'Új ökrök születtek a Caravánban! '
   },
   {
     type: 'STAT-CHANGE',
     notification: 'positive',
     stat: 'ökör',
     value: 1,
     text: 'Találtál egy elkóborolt ökröt! '
   },
   {
     type: 'STAT-CHANGE',
     notification: 'positive',
     stat: 'étel',
     value: 30,
     text: 'Találtál egy nemrég óta halott szarvast! '
   },
   {
     type: 'STAT-CHANGE',
     notification: 'positive',
     stat: 'étel',
     value: 20,
     text: 'Elhagyott madártojásokra bukkantál'
   },
   {
     type: 'STAT-CHANGE',
     notification: 'positive',
     stat: 'étel',
     value: 10,
     text: 'A kocsi kereke megakadt egy ehető gyökérben! '
   },
   {
     type: 'STAT-CHANGE',
     notification: 'positive',
     stat: 'étel',
     value: 10,
     text: 'Mézet találtál az egyik fán! '
   },
   {
     type: 'STAT-CHANGE',
     notification: 'positive',
     stat: 'gold',
     value: 50,
     text: 'Észrevettél egy csillogó követ a fa alatt! '
   },
   {
     type: 'STAT-CHANGE',
     notification: 'positive',
     stat: 'gold',
     value: 30,
     text: 'Egy holttestet találtál az út szélén, goldzel a zsebében! '
   },
   {
     type: 'STAT-CHANGE',
     notification: 'positive',
     stat: 'tűzerő',
     value: 3,
     text: 'Az út szélén áll egy elhagyott kocsi tele puskaporral! '
   },
   {
     type: 'STAT-CHANGE',
     notification: 'positive',
     stat: 'tűzerő',
     value: 2,
     text: 'Egy üres táborban találtál fegyvereket és lőszert! '
   },
   {
     type: 'STAT-CHANGE',
     notification: 'positive',
     stat: 'tűzerő',
     value: 3,
     text: 'Egy lőszereskocsiról leesett egy láda fegyver! '
   },
   {
     type: 'STAT-CHANGE',
     notification: 'positive',
     stat: 'csapattag',
     value: 5,
     text: 'Találtál egy csapat túlélőt az erdőben! '
   },
   {
     type: 'STAT-CHANGE',
     notification: 'positive',
     stat: 'csapattag',
     value: 6,
     text: 'Vándorok csatlakoztak a Caravánodhoz! '
   },
   {
     type: 'STAT-CHANGE',
     notification: 'positive',
     stat: 'csapattag',
     value: 4,
     text: 'Sebesült katonák csatlakoztak a csapatodhoz! '
   },
   {
     type: 'STAT-CHANGE',
     notification: 'positive',
     stat: 'folyadék',
     value: 30,
     text: 'Egy forráshoz értél! '
   },
   {
     type: 'STAT-CHANGE',
     notification: 'positive',
     stat: 'folyadék',
     value: 20,
     text: 'Találtál az erdőben egy kutat '
   },
   {
     type: 'STAT-CHANGE',
     notification: 'positive',
     stat: 'folyadék',
     value: 10,
     text: 'Elkezdett esni az eső! '
   },
   {
     type: 'STAT-CHANGE',
     notification: 'positive',
     stat: 'folyadék',
     value: 15,
     text: 'Találtál egy hordó friss vizet! '
   },
   {
     type: 'STAT-CHANGE',
     notification: 'negative',
     stat: 'folyadék',
     value: -20,
     text: 'A vízkészleted megfertőződött! '
   },
   {
     type: 'STAT-CHANGE',
     notification: 'negative',
     stat: 'folyadék',
     value: 15,
     text: 'Egy vizeshordó leesett a kocsiról! '
   },
   {
     type: 'STAT-CHANGE',
     notification: 'negative',
     stat: 'folyadék',
     value: 30,
     text: 'Szárazság! A vízkészleted alaposan megcsappant! '
   },
   {
     type: 'STAT-CHANGE',
     notification: 'negative',
     stat: 'csapattag',
     value: -4,
     text: 'Fertőzés veszély. Veszteség: '
   },
   {
     type: 'STAT-CHANGE',
     notification: 'negative',
     stat: 'étel',
     value: -10,
     text: 'Féreg fertőzés. Elvesztett élelem: '
   },
   {
     type: 'STAT-CHANGE',
     notification: 'negative',
     stat: 'gold',
     value: -50,
     text: 'Megloptak a zsebtolvajok $'
   },
   {
     type: 'STAT-CHANGE',
     notification: 'negative',
     stat: 'étel',
     value: -30,
     text: 'A mosómedvék ellopták az ételedet '
   },
   {
     type: 'STAT-CHANGE',
     notification: 'negative',
     stat: 'étel',
     value: -20,
     text: 'Megromlott az ételed! '
   },
   {
     type: 'STAT-CHANGE',
     notification: 'negative',
     stat: 'csapattag',
     value: -5,
     text: 'A csapatodra esett egy fa! '
   },
   {
     type: 'STAT-CHANGE',
     notification: 'negative',
     stat: 'ökör',
     value: -4,
     text: 'Beestek az ökreid a mocsárba! '
   },
   {
     type: 'STAT-CHANGE',
     notification: 'negative',
     stat: 'ökör',
     value: -2,
     text: 'Elszabadultak az ökreid! '
   },
   {
     type: 'STAT-CHANGE',
     notification: 'negative',
     stat: 'tűzerő',
     value: -4,
     text: 'Eláztak a fegyvereid! '
   },
   {
     type: 'STAT-CHANGE',
     notification: 'negative',
     stat: 'csapattag',
     value: -4,
     text: 'Megtámadtak a farkasok! '
   },
   {
     type: 'STAT-CHANGE',
     notification: 'negative',
     stat: 'gold',
     value: -100,
     text: 'Elitadd a goldedet!'
   },
   {
     type: 'STAT-CHANGE',
     notification: 'negative',
     stat: 'gold',
     value: -30,
     text: 'Leesett a karavánról a zsákmányod '
   },
   {
     type: 'STAT-CHANGE',
     notification: 'negative',
     stat: 'tűzerő',
     value: -3,
     text: 'Felrobbantak a lőporos hordóid! '
   },
   {
     type: 'STAT-CHANGE',
     notification: 'negative',
     stat: 'ökör',
     value: -1,
     text: 'Ökör betegség. Veszteség: '
   },
   {
     type: 'STAT-CHANGE',
     notification: 'positive',
     stat: 'étel',
     value: 20,
     text: 'Találtál vad bogyókat, megnövelte az ételt: '
   },
   {
     type: 'STAT-CHANGE',
     notification: 'positive',
     stat: 'ökör',
     value: 1,
     text: 'Találtál egy vad ökröt, így van: '
   },
   //?-----------------------------------------------------------------------?//
  /*{
     type: 'SHOP',
     notification: 'neutral',
     text: 'Találtál egy boltot!',
     products: [{
         item: 'sisak',
         qty: 1,
         price: 50
       },
       {
         item: 'mellvert',
         qty: 1,
         price: 200
       },
       {
         item: 'kard',
         qty: 1,
         price: 50
       },
       {
         item: 'ijjj',
         qty: 1,
         price: 80
       }
     ]
   },*/
   {
     type: 'SHOP',
     notification: 'neutral',
     text: 'Találtál egy boltot!',
     products: [{
         item: 'sisak',
         qty: 1,
         price: 50
       },
       {
         item: 'mellvert',
         qty: 1,
         price: 200
       },
       {
         item: 'kard',
         qty: 1,
         price: 50
       },
       {
         item: 'ijj',
         qty: 1,
         price: 80
       }
     ]
   },
   {
     type: 'SHOP',
     notification: 'neutral',
     text: 'Találtál egy boltot!',
     products: [{
       item: 'sisak',
       qty: 1,
       price: 50
     },
     {
       item: 'mellvert',
       qty: 1,
       price: 200
     },
     {
       item: 'kard',
       qty: 1,
       price: 50
     },
     {
       item: 'ijj',
       qty: 1,
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
         qty: 30,
         price: 10
       },
       {
         item: 'ökör',
         qty: 3,
         price: 50
       },
       {
         item: 'tűzerő',
         qty: 7,
         price: 20
       },
       {
         item: 'csapattag',
         qty: 10,
         price: 30
       }
     ]
   },
   //?-----------------------------------------------------------------------?//
   {
     type: 'ATTACK',
     notification: 'negative',
     text: 'A banditák támadnak!'
   },
   {
     type: 'ATTACK',
     notification: 'negative',
     text: 'A sheriffel találkoztál!'
   },
   {
     type: 'ATTACK',
     notification: 'negative',
     text: 'Megtámadtak a farkasok!'
   },
   {
     type: 'GOOD',
     notification: 'positive',
     text: 'Találkoztál egy rejtélyes öregúrral!'
   }
   //?-----------------------------------------------------------------------?//
 ];

function initAudioPlayer() {
  audio = new Audio();
  audio.src = "../audio/caravan/caravan.mp3"; //!---------------------------------
  volume.addEventListener('change', function(e) {
    audio.volume = e.currentTarget.value / 100;
  });
  audio.loop = true; 
  audio.play();
  // Set object references
  playbtn = document.getElementById("playpausebtn");
  mutebtn = document.getElementById("mutebtn");
  // Add Event Handling
  playbtn.addEventListener("click", playPause);
  //mutebtn.addEventListener("click", mute);
  // Functions
  function playPause() {
    if (audio.paused) {
      audio.play();
      playbtn.style.background = "url(../img/caravan/volume.png) no-repeat";
    } else {
      audio.pause();
      playbtn.style.background = "url(../img/caravan/mute_volume.png) no-repeat";
    }
  }

  function mute() {
    if (audio.muted) {
      audio.muted = false;
      mutebtn.style.background = "url(../img/caravan/volume.png) no-repeat";
    } else {
      audio.muted = true;
      mutebtn.style.background = "url(../img/caravan/mute_volume.png) no-repeat";
    }
  }
}

 Caravan.Event.generateEvent = function () {
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
     ///////////////////////////////////////////////////////////////
   } else if (eventData.type == 'GOOD') {
     this.game.pauseJourney();
     this.ui.notify(eventData.text, eventData.notification)
     this.goodEvent(eventData);
   }
 };

 ////////////////////////////////////////////////////////////////


 Caravan.Event.stateChangeEvent = function (eventData) {
   //can't have negative quantities
   if (eventData.value + this.caravan[eventData.stat] >= 0) {
     this.caravan[eventData.stat] += eventData.value;
     this.ui.notify(eventData.text + Math.abs(eventData.value), eventData.notification);
   }
 };

 Caravan.Event.shopEvent = function (eventData) {
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

 //////////////////////////////////////////////////////////////////

 Caravan.Event.goodEvent = function (eventData) {
   var étel = Math.round(0.7 + 0.6 * Math.random() * Caravan.FOOD_AVG);

   this.ui.showGood(étel);
 };

 //////////////////////////////////////////////////////////////////

 //prepare an attack event
 Caravan.Event.attackEvent = function (eventData) {
   var tűzerő = Math.round((0.7 + 0.6 * Math.random()) * Caravan.ENEMY_FIREPOWER_AVG);
   var gold = Math.round((0.7 + 0.6 * Math.random()) * Caravan.ENEMY_GOLD_AVG);

   this.ui.showAttack(tűzerő, gold);
 };
 var Caravan = Caravan || {};

 Caravan.Caravan = {};

 Caravan.Caravan.init = function (stats) {
   this.day = stats.day;
   this.distance = stats.distance;
   this.csapattag = stats.csapattag;
   this.étel = stats.étel;
   this.folyadék = stats.folyadék;
   this.ökör = stats.ökör;
   this.gold = stats.gold;
   this.tűzerő = stats.tűzerő;
 };

 //update weight and capacity
 Caravan.Caravan.updateWeight = function () {
   var droppedFood = 0;
   var droppedGuns = 0;

   //how much can the caravan carry
   this.capacity = this.ökör * Caravan.WEIGHT_PER_OX + this.csapattag * Caravan.WEIGHT_PER_PERSON;

   //how much weight do we currently have
   this.weight = this.étel * Caravan.FOOD_WEIGHT + this.tűzerő * Caravan.FIREPOWER_WEIGHT;

   //drop things behind if it's too much weight
   //assume guns get dropped before food
   while (this.tűzerő && this.capacity <= this.weight) {
     this.tűzerő--;
     this.weight -= Caravan.FIREPOWER_WEIGHT;
     droppedGuns++;
   }

   if (droppedGuns) {
     this.ui.notify(+droppedGuns + ' fegyvered veszett oda!', 'negative');
   }

   while (this.étel && this.capacity <= this.weight) {
     this.étel--;
     this.weight -= Caravan.FOOD_WEIGHT;
     droppedFood++;
   }

   if (droppedFood) {
     this.ui.notify(+droppedFood + ' ételed veszett oda!', 'negative');
   }
 };

 //update covered distance
 Caravan.Caravan.updateDistance = function () {
   //the closer to capacity, the slower
   var diff = this.capacity - this.weight + this.ökör;
   var speed = Caravan.SLOW_SPEED + diff / this.capacity * Caravan.FULL_SPEED;
   this.distance += speed;
 };

 Caravan.Caravan.updateXp = function() {
   this.xp += Math.round(Caravan.XP_PER_DAY);
 } 

 //water consumption
 Caravan.Caravan.consumeWater = function () {
  this.folyadék -= this.csapattag * Caravan.WATER_PER_PERSON;

  if (this.folyadék < 0) {
    this.folyadék = 0;
  }
};

 //food consumption
 Caravan.Caravan.consumeFood = function () {
   this.étel -= this.csapattag * Caravan.FOOD_PER_PERSON;

   if (this.étel < 0) {
     this.étel = 0;
   }
 };
 
 var Caravan = Caravan || {};

 Caravan.UI = {};

 //show a notification in the message area
 Caravan.UI.notify = function (message, type) {
   document.getElementById('updates-area').innerHTML = '<div class="update-' + type + '">' + Math.ceil(this.caravan.day) + '. ' + 'Nap' + ': ' + message + '</div>' + document.getElementById('updates-area').innerHTML;
 };

 //refresh visual caravan stats
 Caravan.UI.refreshStats = function () {
   //modify the dom
   document.getElementById('stat-day').innerHTML = Math.ceil(this.caravan.day);
   document.getElementById('stat-distance').innerHTML = Math.floor(this.caravan.distance);
   document.getElementById('stat-crew').innerHTML = this.caravan.csapattag;
   document.getElementById('stat-oxen').innerHTML = this.caravan.ökör;
   document.getElementById('stat-food').innerHTML = Math.ceil(this.caravan.étel);
   document.getElementById('stat-liquid').innerHTML = Math.ceil(this.caravan.folyadék);
   document.getElementById('stat-money').innerHTML = this.caravan.gold;
   document.getElementById('stat-firepower').innerHTML = this.caravan.tűzerő;
   document.getElementById('stat-weight').innerHTML = Math.ceil(this.caravan.weight) + '/' + this.caravan.capacity;


   //update caravan position
   document.getElementById('caravan').style.left = (380 * this.caravan.distance / Caravan.FINAL_DISTANCE) + 'px';
 };

 //show shop
 Caravan.UI.showShop = function (products) {

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
         Caravan.UI.game.resumeJourney();
       } else if (target.tagName == 'DIV' && target.className.match(/product/)) {

         console.log('buying')

         var bought = Caravan.UI.buyProduct({
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
   var list = ["csapattag", "ökör", "étel", "folyadék", "gold", "tűzerő"];
   var product;
   for (var i = 0; i < products.length; i++) {
     product = products[i];
     console.log(product.item);
     prodsDiv.innerHTML += '<div class="product" data-qty="' + product.qty + '" data-item="' + product.item + '" data-price="' + product.price + '">' + product.qty + ' ' + product.item + ' - $' + product.price + '</div>';
   }

   //setup click event
   //document.getElementsByClassName('product').addEventListener(Caravan.UI.buyProduct);
 };

 //buy product
 Caravan.UI.buyProduct = function (product) {
   //check we can afford it
   if (product.price > this.caravan.gold) {
     Caravan.UI.notify('Nincs elég golded!', 'negative');
     return false;
   }

   this.caravan.gold -= product.price;

   this.caravan[product.item] += +product.qty;

   Caravan.UI.notify('Vásároltál ' + product.qty + ' x ' + product.item, 'positive');
   console.log();

   //update weight
   Caravan.UI.caravan.updateWeight();

   //update visuals
   Caravan.UI.refreshStats();

   return true;

 };

  Caravan.UI.showShop = function (products) {

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
         Caravan.UI.game.resumeJourney();
       } else if (target.tagName == 'DIV' && target.className.match(/product/)) {

         console.log('buying')

         var bought = Caravan.UI.buyProduct({
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
   var list = ["csapattag", "ökör", "étel", "folyadék", "gold", "tűzerő"];
   var product;
   for (var i = 0; i < products.length; i++) {
     product = products[i];
     console.log(product.item);
     prodsDiv.innerHTML += '<div class="product" data-qty="' + product.qty + '" data-item="' + product.item + '" data-price="' + product.price + '">' + product.qty + ' ' + product.item + ' - $' + product.price + '</div>';
   }

   //setup click event
   //document.getElementsByClassName('product').addEventListener(Caravan.UI.buyProduct);
 };

 //buy product
 Caravan.UI.buyProduct = function (product) {
   //check we can afford it
   if (product.price > this.caravan.gold) {
     Caravan.UI.notify('Nincs elég golded!', 'negative');
     return false;
   }

   this.caravan.gold -= product.price;

   this.caravan[product.item] += +product.qty;

   Caravan.UI.notify('Vásároltál ' + product.qty + ' x ' + product.item, 'positive');
   console.log();

   //update weight
   Caravan.UI.caravan.updateWeight();

   //update visuals
   Caravan.UI.refreshStats();

   return true;

 };


 //show attack
 Caravan.UI.showAttack = function (tűzerő, gold) {
   var attackDiv = document.getElementById('attack');
   attackDiv.classList.remove('hidden');

   //keep properties
   tűzerő = this.caravan.tűzerő;
   this.gold = gold;

   //show tűzerő
   document.getElementById('attack-description').innerHTML = 'Tűzerőd: ' + tűzerő;

   //init once
   if (!this.attackInitiated) {

     //fight
     document.getElementById('fight').addEventListener('click', this.fight.bind(this));

     //run away
     document.getElementById('runaway').addEventListener('click', this.runaway.bind(this));

     this.attackInitiated = true;
   }
 };

 Caravan.UI.showGood = function (étel) {
   var attackDiv = document.getElementById('good');
   attackDiv.classList.remove('hidden');

   var étel = Math.round(this.caravan.étel);

   document.getElementById('good-description').innerHTML = 'Ételed: ' + étel;

   //init once
   if (!this.attackInitiated) {

     //fight
     document.getElementById('accept').addEventListener('click', this.accept.bind(this));

     //run away
     document.getElementById('decline').addEventListener('click', this.decline.bind(this));

     this.attackInitiated = true;
   }
 };

 //good
 Caravan.UI.accept = function () {

   var gotFood = Math.floor((Math.random() * 20) + 1);
   this.caravan.étel += gotFood;
   this.notify('Az öregúr adott neked ' + gotFood + ' ételt!', 'positive');

   document.getElementById('good').classList.add('hidden');
   this.game.resumeJourney();
 };

 Caravan.UI.decline = function () {

   this.notify('nem fogadtad el az öregúr ajánlatát!', 'neutral');
   document.getElementById('decline').removeEventListener('click');

   //resume journey
   document.getElementById('good').classList.add('hidden');
   this.game.resumeJourney();
 };

 //fight
 Caravan.UI.fight = function () {

   var tűzerő = this.caravan.tűzerő;
   gold = this.gold;

   var damage = Math.ceil(Math.max(0, tűzerő * 2 * Math.random() - this.caravan.tűzerő));

   //check there are survivors
   if (damage < this.caravan.csapattag) {
     this.caravan.csapattag -= damage;
     this.caravan.gold += gold;
     this.notify(' megölték ' + damage + ' emberedet a harcban!', 'negative');
     this.notify('Találtál $' + gold, 'gold');
   } else {
     this.caravan.csapattag = 0;
     this.notify('Mindenki meghalt a csatában! Vesztettél!', 'negative');
   }

   //resume journey
   document.getElementById('attack').classList.add('hidden');
   this.game.resumeJourney();
 };

 //runing away from enemy
 Caravan.UI.runaway = function () {

   var tűzerő = this.tűzerő;

   var damage = Math.ceil(Math.max(0, tűzerő * Math.random() / 2));

   //check there are survivors
   if (damage < this.caravan.csapattag) {
     this.caravan.csapattag -= damage;
     this.notify(damage + ' A menekülő embereidet megölték!', 'negative');
   } else {
     this.caravan.csapattag = 0;
     this.notify('Mindenki meghalt a menekülésben!', 'negative');
   }

   //resume journey
   document.getElementById('attack').classList.add('hidden');
   this.game.resumeJourney();

 };
 var Caravan = Caravan || {};

 //constants
 Caravan.WEIGHT_PER_OX = 23;
 Caravan.WEIGHT_PER_PERSON = 2;
 Caravan.FOOD_WEIGHT = 0.6;
 Caravan.LIQUID_WEIGHT = 0.5;
 Caravan.FIREPOWER_WEIGHT = 5;
 Caravan.GAME_SPEED = 800;
 Caravan.DAY_PER_STEP = 0.2;
 Caravan.XP_PER_DAY = Math.random(1, 10);
 Caravan.FOOD_PER_PERSON = 0.02;
 Caravan.WATER_PER_PERSON = 0.01; //! lehet kell nagyobbitani (0.05)
 Caravan.FULL_SPEED = 5;
 Caravan.SLOW_SPEED = 3;
 Caravan.FINAL_DISTANCE = 5000;
 Caravan.EVENT_PROBABILITY = 0.15;
 Caravan.ENEMY_FIREPOWER_AVG = 5;
 Caravan.ENEMY_GOLD_AVG = 50;
 Caravan.FOOD_AVG = 37;

 Caravan.Game = {};

 //initiate the game
 Caravan.Game.init = function () {

   //reference ui
   this.ui = Caravan.UI;

   //reference event manager
   this.eventManager = Caravan.Event;

   //setup caravan
   this.caravan = Caravan.Caravan;
   this.caravan.init({
     day: 0,
     distance: 0,
     csapattag: 30, //!!! Values HERE!!!
     étel: 80,
     folyadék: 100,
     ökör: 2,
     gold: 300,
     tűzerő: 2,
     pancel: 5,
     elet: 100,
     xp: 0,
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
   window.addEventListener("load", initAudioPlayer);
 };

 //start the journey and time starts running
 Caravan.Game.startJourney = function () {
   this.gameActive = true;
   this.previousTime = null;
   this.ui.notify('Egy új kaland veszi kezdetét!', 'positive');
   console.log(this.caravan.csapattag);
   console.log(this.caravan.ökör);
   console.log(this.caravan.étel);
   console.log(this.caravan.folyadék);
   console.log(this.caravan.gold);
   console.log(this.caravan.tűzerő);

   this.step();
 };

 //game loop
 Caravan.Game.step = function (timestamp) {

   //starting, setup the previous time for the first time
   if (!this.previousTime) {
     this.previousTime = timestamp;
     this.updateGame();
   }

   //time difference
   var progress = timestamp - this.previousTime;

   //game update
   if (progress >= Caravan.GAME_SPEED) {
     this.previousTime = timestamp;
     this.updateGame();
   }

   //we use "bind" so that we can refer to the context "this" inside of the step method
   if (this.gameActive) window.requestAnimationFrame(this.step.bind(this));
 };

 //update game stats
 Caravan.Game.updateGame = function () {
   //day update
   this.caravan.day += Caravan.DAY_PER_STEP;
    this.caravan.updateXp();
   //étel consumption
   this.caravan.consumeFood();
   this.caravan.consumeWater();

   if(this.caravan.xp == 50) {
     this.caravan.xp = 0;
     this.caravan.elet += 25;
   }

   if (this.caravan.étel === 0) {
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
   if (this.caravan.csapattag <= 0) {
     this.caravan.csapattag = 0;
     this.ui.notify('Mindenki meghalt!', 'negative');
     this.gameActive = false;
     return;
   }

   //check if has ox : died
   if (this.caravan.ökör <= 0) {
    this.caravan.ökör = 0;
    this.ui.notify('Elfogytak az ökreid, így nem tudsz hazaérni!', 'negative');
    this.gameActive = false;
    return;
  }


   //check win game
   if (this.caravan.distance >= Caravan.FINAL_DISTANCE) {
     this.ui.notify('Hazaértél!', 'positive');
     this.gameActive = false;
     return;
   }

   //random events
   if (Math.random() <= Caravan.EVENT_PROBABILITY) {
     this.eventManager.generateEvent();
   }
 };

 //pause the journey
 Caravan.Game.pauseJourney = function () {
   this.gameActive = false;
 };

 //resume the journey
 Caravan.Game.resumeJourney = function () {
   this.gameActive = true;
   this.step();
 };

//module.exports(Caravan);
 //init game
 Caravan.Game.init();