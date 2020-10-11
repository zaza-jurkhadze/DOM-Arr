const main = document.getElementById('main');
const adduserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showBtn = document.getElementById('show-milionaire');
const sortBtn = document.getElementById('sort');
const calculateBtn = document.getElementById('calculate-wealth');


let data = [];


async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api')
    const data = await res.json();
    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random()*10000000),
        picture: `${user.picture.thumbnail}`
    }; 
      
      
        addData(newUser); 
          
}


function addData(obj) {
    data.push(obj);

    updateDOM();
}



function doubleMoney() {
    data = data.map((el) =>{
        return {...el, money: el.money * 2}
    });
 
    updateDOM()
   
}
function sortByRichest() {
    data.sort((a,b) => b.money - a.money);
    updateDOM();
}

function showMIlionaires(){
    data = data.filter((user) => user.money >= 1000000);
    updateDOM();
}
function calculateWealth() {
    const wealth = data.reduce((acc,user) => {
        return acc += user.money
    }, 0);
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth<strong>${formatMoney(wealth)}</strong></h3>`
    main.appendChild(wealthEl);
}
function updateDOM(providedata =  data){
    
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';
    providedata.forEach((items) =>{
        const element = document.createElement('div');
        const image = document.createElement('img');
        image.classList.add('user-image');
        image.src = items.picture;
        element.classList.add('person');
        element.innerHTML = `<strong>${items.name}</strong> ${formatMoney(items.money)}`;
        main.appendChild(element);
        main.appendChild(image);
        
    });
}

function formatMoney(number) {
    return  number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' $';
}

//event listener

adduserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
showBtn.addEventListener('click', showMIlionaires)
sortBtn.addEventListener('click',sortByRichest);
calculateBtn.addEventListener('click', calculateWealth);





