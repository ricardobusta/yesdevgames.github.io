const menuDom = document.getElementById('menu')
const planetDom = document.getElementById('planet')
// let currAngle = 0;
let currentMenu = 1;

function radians(degrees) {
  return degrees * Math.PI / 180;
};

const menuItens = [
  ...document.getElementById("menu").getElementsByClassName("item")
];

menuItens.sort((a,b) => {
  const { angle: aAngle } = a.dataset;
  const { angle: bAngle } = b.dataset;
  return aAngle - bAngle;
});

menuItens.get = function(i) {
  i = i % this.length;
  if (i < 0) i += this.length;
  return this[i];
};

function PromiseBuilder() {
  let resolve, reject;
  const promise = new Promise((r1,r2) => {
    resolve = r1;
    reject = r2;
  })
  return {promise,resolve, resolve};
}

function rotateMenu(degree) {
  const {promise, resolve} = PromiseBuilder();

  degree = -(90-degree)%360
  // if (degree === 0 && currAngle > 180) {
  //   menuDom.style['transform'] = `rotate(360deg)`;
  //   menuDom.addEventListener("transitionend", function(e) {
  //     menuDom.style['transition'] = 'unset';
  //     menuDom.style['transform'] = `rotate(0deg)`;
  //     // Trigger a CSS reflow
  //     // https://stackoverflow.com/a/16575811/4080973
  //     menuDom.offsetHeight = menuDom.offsetHeight;
  //     menuDom.style['transition'] = '';
  //     currAngle = 0;
  //     resolve();
  //   }, {once: true});
  //   return promise;
  // }

  menuDom.style['transform'] = `rotate(${degree}deg)`;
  menuDom.addEventListener("transitionend", function(e) {
    // currAngle = degree;
    resolve();
  }, {once: true});
  return promise;
}

function positionItem(item) {
  const { angle } = item.dataset;
  const radius = planetDom.scrollHeight/2;
  const height = item.scrollHeight;
  const width = item.scrollWidth;

  let x = radius - width/2;
  let y = radius - height/2;

  x += 1.15 * radius * Math.cos(radians(angle));
  y += 1.15 * radius * Math.sin(radians(angle));

  item.style['bottom']    = `${y}px`;
  item.style['left']      = `${x}px`;
  item.style['transform'] = `rotate(${90-angle}deg)`;
}

function gotoItem(i) {
  const { angle, title } = menuItens.get(i).dataset;
  const menus = [...document.getElementById("header").children];
  menus[0].innerText = menuItens.get(i+1).dataset.title
  menus[1].innerText = title;
  menus[2].innerText = menuItens.get(i-1).dataset.title
  rotateMenu(angle);
}

window.addEventListener("load", function() {
  menuItens.forEach(positionItem);
  gotoItem(currentMenu);
});

window.addEventListener('resize', function(){
  menuItens.forEach(positionItem);
  gotoItem(currentMenu);
});

document.getElementById('right').addEventListener('click', function (e) {
  currentMenu = (currentMenu+(menuItens.length-1)) % menuItens.length
  gotoItem(currentMenu);
});

document.getElementById('left').addEventListener('click', function (e) {
  currentMenu = (currentMenu+1) % menuItens.length
  gotoItem(currentMenu);
});
