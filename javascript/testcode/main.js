
// const changeCharacter = (selector, search, replace) => {
//     const result = selector.innerHTML.replaceAll(search, replace);
//     selector.innerHTML = result;
// }
// changeCharacter(document.body, "@", "<span class='hash'>#</span>");
// const ua = navigator.userAgent.toLowerCase();
// const isAndroid = ua.indexOf("android") > -1;
// if (isAndroid) {
//   document.body.style.color = "red";
// }

const cars = [
  {
    make: 'audi',
    model: 'r8',
    year: '2012',
  },
  {
    make: 'audi',
    model: 'rs5',
    year: '2013',
  },
  {
    make: 'ford',
    model: 'mustang',
    year: '2012',
  },
  {
    make: 'ford',
    model: 'fusion',
    year: '2015',
  },
  {
    make: 'kia',
    model: 'optima',
    year: '2012',
  },
];

const group = cars.reduce((prev, next) => {
  const make = next.make;
  if (prev[make] == null) prev[make] = [];
  prev[make].push(next);
  return prev;
}, {});

for (const key in group) {
  if (group.hasOwnProperty.call(group, key)) {
    const els = group[key];
    const htmls = `
        <ul>
          ${key}
          ${els.map(el => `<li>${el.model}</li>`).join('\n')}
        </ul>
      `
    document.querySelector(".select").innerHTML += htmls;
  }
}


function format(literals, ...substitutions) {
  let result = '';

  for (let i = 0; i < substitutions.length; i++) {
      result += literals[i];
      result += substitutions[i];
  }

  // add the last literal
  result += literals[literals.length - 1];
  return result;
}

let quantity = 9,
  priceEach = 8.99,
  result = format`${quantity} items cost $${(quantity * priceEach).toFixed(2)}.`;

console.log(result); 
