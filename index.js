// import nominalVolume from "./nominalVolume.json" assert {type:"json"};
import { nominalVolume } from "./nominalVolume.js";
// console.log("gaming", nominalVolume)
const main = document.querySelector(".main");
const calculation = document.querySelector(".calculation");
const selectLiquid = document.querySelector(".selectLiquid");
const selectTank = document.querySelector(".selectTank");
const selectVolume = document.querySelector(".selectVolume");
const selectDiameter = document.querySelector(".selectDiameter");
const submitFirstForm = document.querySelector(".submitFirstForm");
const amount1 = document.querySelector(".amount");
const titleForDiametr = document.querySelector(".titleForDiametr")
// const selectedVolume = document.querySelector(".selectedVolume")
// let lengthA = document.querySelector(".lengthA");
// let lengthB = document.querySelector(".lengthB");
const calculationForm = document.querySelector(".calculationForm");

const title = document.querySelector(".title");
let array = [];
amount1.addEventListener("change", setAmount);

selectLiquid.addEventListener("change", setOutputLiquid);
selectTank.addEventListener("change", setOutput);

submitFirstForm.addEventListener("click", submit);

selectDiameter.addEventListener("change", saveDiametr);
selectVolume.addEventListener("click", function () {
  if (obj.type.length >= 1 && obj.liquid.length >= 1 && obj.amount >= 1) {
    selectVolume.addEventListener("change", setOutputVolume);
  } else {
    alert("Будь ласка заповніть поля вище");
  }
});

// Функція для виділення копій
let obj = {
  // firstValue: 0,
  // secondValue: 0,
  amount: 0,
  type: 0,
  volume: 0,
  diametr: 0,
  liquid: 0,
};

localStorage.setItem("obj", JSON.stringify(obj));
function foo(arr, copies) {
  let map = new Map();
  for (let elem of arr) {
    let counter = map.get(elem);
    map.set(elem, counter ? counter + 1 : 1);
  }
  let res = [];
  for (let [elem, counter] of map.entries())
    if (counter >= copies) res.push(elem);
  return res;
}

//Функція для вибору кількості резервуарів
function setAmount(event) {
  const selectAmount = Number(event.currentTarget.value);
  obj.amount = selectAmount;
}

// Функція для вибору типу рідини
function setOutputLiquid(event) {
  const selectTypeLiquid = event.currentTarget.value;
  obj.liquid = selectTypeLiquid;
}

// функція для додавання вибору об'єму
function setOutput(event) {
  const selectedOptionType = event.currentTarget.value;
  obj.type = selectedOptionType;
  let nominal = "";
  for (const key in nominalVolume) {
    if (key === selectedOptionType) {
      nominal = nominalVolume[key];
      // console.log("nominal>>>>>", nominal);
    }
  }
  const disabledVolume = document.createElement("option");
  const language = localStorage.getItem("ui-language")
  if (language === 'dark') {
    disabledVolume.textContent = "Оберіть об'єм резервуару (iв)";
  } else{
    disabledVolume.textContent = "Select the volume of the tank(s)";
  }
  // disabledVolume.textContent = "Оберіть об'єм резервуару";
  disabledVolume.setAttribute("data-lang-ua","Оберіть об'єм резервуару (iв)")
  disabledVolume.setAttribute("data-lang-en", "Select the volume of the tank(s)")
  disabledVolume.value = "default";
  disabledVolume.selected = true;
  disabledVolume.disabled = true;
  if (selectedOptionType === "rvspAndRvs") {
    selectVolume.innerHTML = "";
    selectDiameter.innerHTML = "";
    const promo = nominal.map((pro) => pro.nominalVolume);

    const filter = foo(promo, 1);
    const language = localStorage.getItem("ui-language")
    const volume = filter.map((nominalVolume) => {
      const option = document.createElement("option");

      option.value = `${nominalVolume}`;

     
      if (language === 'light') {
        option.textContent = `${nominalVolume} m³`;;
      } else{
        option.textContent = `${nominalVolume} м³`;;
      }

      // option.textContent = `${nominalVolume} м³`;

      return option;
    });
    selectVolume.append(disabledVolume);
    selectVolume.append(...volume);
  } else {
    selectVolume.innerHTML = "";
    selectDiameter.innerHTML = "";
    const promo = nominal.map((pro) => pro.nominalVolume);

    const filter = foo(promo, 1);
    const volume = filter.map((nominalVolume) => {
      const option = document.createElement("option");

      option.value = `${nominalVolume}`;
      if (language === 'light') {
        option.textContent = `${nominalVolume} m³`;;
      } else{
        option.textContent = `${nominalVolume} м³`;;
      }
      // option.textContent = `${nominalVolume} м³`;
      return option;
    });
    selectVolume.append(disabledVolume);
    selectVolume.append(...volume);
  }
}

//Функція для додавання вибору діаметру

function setOutputVolume(event) {
  const language = localStorage.getItem("ui-language")
  if (language === 'light') {
    titleForDiametr.innerHTML = "Choose a diameter"
   
  } else{
   titleForDiametr.innerHTML = "Оберіть діаметр"
  }

  // titleForDiametr.innerHTML = "Оберіть діаметр"
  titleForDiametr.setAttribute("data-lang-ua","Оберіть діаметр")
  titleForDiametr.setAttribute("data-lang-en", "Choose a diameter")
  const type = obj.type;
  const nominal2 = nominalVolume[type];
  const selectVolumeValue = Number(event.currentTarget.value);
  obj.volume = selectVolumeValue;
  // console.log("objVolume", obj)
  const filter = nominal2.filter(
    (nom) => nom.nominalVolume === selectVolumeValue
  );
  selectDiameter.innerHTML = "";
  const diametr = filter.map((internalDiameter) => {
    // const span = document.createElement("span")
    //  span.textContent = "Оберіть діаметр"
    // label.append(span)
    const br = document.createElement("br");
    const label = document.createElement("label");

    const language = localStorage.getItem("ui-language")
    if (language === 'light') {
      label.textContent = ` ${internalDiameter.internalDiameter} m`
     
    } else{
    label.textContent = ` ${internalDiameter.internalDiameter} м`
    }

    // label.textContent = ` ${internalDiameter.internalDiameter} м`;
    label.classList = "label";

    const input = document.createElement("input");
    input.type = `radio`;
    input.name = `diametr`;
    input.value = `${internalDiameter.internalDiameter}`;
    input.classList = "inputDiametr"
    // input.textContent = "м³";

    input.classList.add("diametr");

    // label.append(br)
    label.append(input);

    return label;
  });
  //   const span = document.createElement("span")
  //   span.textContent = "Обіріть діаметр"
  // selectDiameter.append(span)
  selectDiameter.append(...diametr);
}

function saveDiametr(event) {
  const diametr = Number(event.target.value);
  obj.diametr = diametr;
  console.log("obj", obj);
}

//Функція для відправки форми з данними про перший тип резервуару
function submit() {
  const { amount, type, volume, diametr, liquid } = obj;
  // const amount = obj.amount;
const objAllDiametrs = amount * diametr
obj.allDiametrs = objAllDiametrs
console.log("allDiametrs", obj.allDiametrs)
const objAllVolume = amount * volume
obj.objAllVolume = objAllVolume
console.log("objAllVolume", obj.objAllVolume)
  // const type = obj.type;

  // const volume = obj.volume;

  // const diametr = obj.diametr

  // const liquid = obj.liquid;

  if (amount >= 1 && volume >= 1 && diametr >= 1 && liquid.length > 1) {
    // localStorage.setItem("array", JSON.stringify(array));
    array.push({ ...obj });
    // console.log("obj", obj)
    // console.log("array", array)
    title.innerHTML = " Резервуари для розрахунку";
    title.classList = "titleTank";

    const item = document.createElement("li");
    const ul = document.createElement("ul");
    ul.classList = "tankWhoAdd cont";
    const type1 = document.createElement("li");
    type1.classList = "tankWhoAddItem content";


    // const language = localStorage.getItem("ui-language")
    // if (language === 'light') {
    //   option.textContent = `${nominalVolume} m³`;;
    // } else{
    //   option.textContent = `${nominalVolume} м³`;;
    // }
    if (type === "rvspAndRvs") {
      type1.textContent = `Тип резервуара: РВСП або РВС`;
    } else {
      type1.textContent = `Тип резервуара: РВСПП`;
    }

    ul.append(type1);

    const liquid1 = document.createElement("li");
    liquid1.classList = "tankWhoAddItem content";
    liquid1.textContent = `Тип рідини: ${liquid}`;
    ul.append(liquid1);
    const total1 = document.createElement("li");
    total1.classList = "tankWhoAddItem content";
    total1.textContent = `Кількість: ${amount} шт`;
    ul.append(total1);
    const volume1 = document.createElement("li");
    volume1.classList = "tankWhoAddItem content";
    volume1.textContent = `Об'єм: ${volume} м³`;
    ul.append(volume1);
    const diametr1 = document.createElement("li");
    diametr1.classList = "tankWhoAddItem content";
    diametr1.textContent = `Діаметр:  ${diametr} м`;
    ul.append(diametr1);
    item.append(ul);

    // Створення кнопки для розрахунків
    const submitFinalForm = document.createElement("button");
    submitFinalForm.textContent = "Розрахувати";
    submitFinalForm.type = "button";
    submitFinalForm.style = "padding: 20px";
    submitFinalForm.classList = "submitFinaltForm";
    submitFinalForm.addEventListener("click", disabledFinalFormButton);
    function disabledFinalFormButton() {
      submitFinalForm.disabled = true;
    }

    calculationForm.append(item);
    if (obj.counter !== 1) {
      // secondForm.append(title)
      calculationForm.after(submitFinalForm);
    }

    // console.log("calculationForm>>>", calculationForm)
    const submitFinaltForm2 = document.querySelector(".submitFinaltForm");
    submitFinaltForm2.addEventListener("click", heightOfCollapse);

    //Скидаємо данні форми та очищаємо обєкт
    selectTank.selectedIndex = 0;
    selectLiquid.selectedIndex = 0;
    while (selectVolume.options.length > 0) {
      selectVolume.remove(0);
    }
    const defaultOption = document.createElement("option");
    defaultOption.value = "default";
    const language = localStorage.getItem("ui-language")
    if (language === 'dark') {
      defaultOption.textContent = "Оберіть об'єм резервуару (iв)";
    } else{
      defaultOption.textContent = "Select the volume of the tank(s)";
    }
    // defaultOption.textContent = "Оберіть об'єм резервуару";
    defaultOption.setAttribute("data-lang-ua","Оберіть об'єм резервуару (ів)")
    defaultOption.setAttribute("data-lang-en", "Select the volume of the tank(s)")
    defaultOption.selected = true;
    selectVolume.appendChild(defaultOption);
    selectDiameter.innerHTML = "";
    titleForDiametr.innerHTML = ""
    amount1.value = "";
    // lengthA.value = '';
    // lengthB.value = '';
    obj.amount = 0;
    obj.diametr = 0;
    obj.liquid = 0;
    obj.volume = 0;
    obj.type = 0;

    obj.counter = 1;
  } else {
    alert("Будь ласка заповніть всі поля");
  }
}
//
//Функція для фінального розрахунку
function heightOfCollapse() {
  submitFirstForm.disabled = true;

 

  //Визначаємо  об'єм найбільшого резервуара
  const volumeArray = array.map((arr) => Number(arr.volume));
  const theVolumeOfTheLargestTank = Math.max(...volumeArray);
  console.log("Обєм найбільшого резервуара",theVolumeOfTheLargestTank)

  //Мінімальна відстань від стінок резервуарів до внутрішніх схилів обвалування

  let minimumDistanceFromTeWalls = 0;
  if (theVolumeOfTheLargestTank >= 10000) {
    minimumDistanceFromTeWalls = 6;
  } else {
    minimumDistanceFromTeWalls = 3;
  }
  // console.log ("Мінімальна відстань від стінок резервуарів до внутрішніх схилів обвалування",minimumDistanceFromTeWalls)

  //Визначаємо діаметр
  const ObjWitchdDiametr = array.find(
    option => (option.volume === theVolumeOfTheLargestTank)
  )
  const diametr = ObjWitchdDiametr.diametr
  console.log("diametr" , diametr)
 // Визначаємо площу обвалування


  //////////////////////////////////////////////////////////////////Визначаємо відстань між стінами резервуарів
  // Визначаємо загальний об'єм резервуарів
  // console.log("array000000000000000000000", array)
  const totalVolumeOfTanks = array
    .map(arr =>  arr.objAllVolume)
    .reduce((previousValue, number) => {
      return previousValue + number;
    }, 0);
  console.log("totalVolumeOfTanks", totalVolumeOfTanks);

  //Визначаємо тип найбільшого резервуару
  const typeOfTanks = array.find(
    (arr) => arr.volume === theVolumeOfTheLargestTank
  ).type;
  // console.log("typeOfTanks", typeOfTanks)

  //3 пункт задачі Визначаємо відстань між стінами резервуарів
  let distanceBetweenTheTankWalls = 0;
  if (
    typeOfTanks === "rvspp" &&
    theVolumeOfTheLargestTank >= 50000 &&
    200000 > totalVolumeOfTanks > 120000
  ) {
    distanceBetweenTheTankWalls = (0.5 * diametr).toFixed(2);
  } else if (
    typeOfTanks === "rvspp" &&
    theVolumeOfTheLargestTank < 50000 &&
    totalVolumeOfTanks < 120000
  ) {
    distanceBetweenTheTankWalls = (0.5 * diametr).toFixed(2);
  } else if (
    typeOfTanks === "rvspAndRvs" &&
    theVolumeOfTheLargestTank >= 50000 &&
    200000 > totalVolumeOfTanks > 120000
  ) {
    distanceBetweenTheTankWalls = 30;
  } else if (
    typeOfTanks === "rvspAndRvs" &&
    400 <= theVolumeOfTheLargestTank <= 50000 &&
    totalVolumeOfTanks < 120000
  ) {
    distanceBetweenTheTankWalls = (0.65 * diametr).toFixed(2);
  } else if (
    typeOfTanks === "rvspAndRvs" &&
    400 <= theVolumeOfTheLargestTank <= 50000 &&
    totalVolumeOfTanks < 120000
  ) {
    distanceBetweenTheTankWalls = (0.7 * diametr).toFixed(2);
  } else {
    console.log("distanceBetweenTheTankWalls ERROR");
  }
  console.log("distanceBetweenTheTankWalls", distanceBetweenTheTankWalls);

  //Визначаємо площу обвалування
  const totalAmountOfTanks = array
  .map((arr) => arr.amount)
  .reduce((previousValue, number) => {
    return previousValue + number;
  }, 0);
console.log("totalAmountOfTanks", totalAmountOfTanks);
let a = 0
let b = 0
// const allDiametres = array.map(arr => arr.diametr);
// console.log("allDiametres",allDiametres)
const allDiametres = array
.map(arr =>  arr.allDiametrs)
.reduce((previousValue, number) => {
  return previousValue + number;
}, 0);
console.log("allDiametres", (allDiametres).toFixed(2));
  if(totalAmountOfTanks === 1){
     a = 6 + (allDiametres).toFixed(2)
     b = a
  } else{
    const number = Number(distanceBetweenTheTankWalls)
    // console.log("1111111",allDiametres)
    // console.log("2222222",number)
    // console.log("33333333",totalAmountOfTanks)
     a = 6 + allDiametres + number * (totalAmountOfTanks-1)
     b = 6 + diametr
  }
  console.log("Довжина резервуарного парку", a)
  console.log("Ширина резервуарного парку", b)
  
  const areaOfCollapse = (a * b).toFixed(2);
  console.log("areaOffCollapse",areaOfCollapse)


  //Визначаємо сумарну площу решти резервуарів
  const totalAreaOfTheRemainingTanks = (
    (3.14 * (diametr * diametr)) / 4
  ).toFixed(2);
  console.log(" сумарну площу решти резервуарів",totalAreaOfTheRemainingTanks)

  //Визначаємо вимагаєму висоту обвалування
  const heightOfCollapse = (
    theVolumeOfTheLargestTank /
      (areaOfCollapse - totalAreaOfTheRemainingTanks) +
    0.2
  ).toFixed(2);
  // console.log("вимагаєму висоту обвалування",heightOfCollapse)

  //Визначаємо ширину обвалування
  let objCollapseInWidth = 20;
  if (heightOfCollapse < 2.5) {
    objCollapseInWidth = 0.5;
  } else if ((2, 5 < heightOfCollapse < 3.0)) {
    objCollapseInWidth = 1;
  } else if (heightOfCollapse > 3) {
    objCollapseInWidth = 2;
  } else {
    console.log("Invalid subscription type");
  }
  // console.log("ширину обвалування",objCollapseInWidth )

  // Висота внутрішнього обвалування в межах однієї групи
  let theHeightOfTheInternalEmbankment = 0;
  if (theVolumeOfTheLargestTank >= 10000) {
    theHeightOfTheInternalEmbankment = 1.3;
  } else {
    theHeightOfTheInternalEmbankment = 0.8;
  }
  // console.log("Висота внутрішнього обвалування в межах однієї групи",theHeightOfTheInternalEmbankment)





  const finalSection = document.createElement("section");
  finalSection.classList = "calculation";
  finalSection.style.backgroundColor = "inherit";
  const finalContainer = document.createElement("div");
  const finalContainerTitle = document.createElement("h2");
  finalContainerTitle.classList = "finalContainerTitle";
  finalContainerTitle.textContent = "Результат";
  finalContainer.classList = "container";
  const ul = document.createElement("ul");
  ul.classList = "tankWhoAdd ulTAnkWhoAdd cont";
  const height = document.createElement("li");
  height.classList = "tankWhoAddItem content";
  height.textContent = `Вимагаєма висота обвалування ${heightOfCollapse} м`;
  ul.append(height);
  const weight = document.createElement("li");
  weight.classList = "tankWhoAddItem content";
  weight.textContent = `Ширина обвалування ${objCollapseInWidth} м`;
  ul.append(weight);
  const internalHeight = document.createElement("li");
  internalHeight.classList = "tankWhoAddItem content";
  internalHeight.textContent = `Висота внутрішнього обвалування ${theHeightOfTheInternalEmbankment} м`;
  ul.append(internalHeight);
  const buttonRefresh = document.createElement("button");
  buttonRefresh.classList = "refreshButton";
  buttonRefresh.textContent = "Провести нові розрахунки";
  buttonRefresh.addEventListener("click", refreshPage);
  function refreshPage() {
    location.reload();
  }
  // console.log("ullllll",ul)
  finalContainer.append(ul);
  finalContainer.append(buttonRefresh);
  finalSection.append(finalContainer);
  main.append(finalSection);
}

// const collapseInWidth =

//Визначаємо середній діаметр
// const diameterArray = array.map(arr => Number(arr.diametr * arr.total));
// 1й варіант визначення середнього діаметра
// const sumDiameter = diameterArray.reduce((previousValue, number) => {
//   return previousValue + number;
// }, 0);
// const totalDiametr = array.reduce((tot, diam) => {
//   return tot + Number(diam.total);
// }, 0);
// const internalDiameter = (sumDiameter/totalDiametr).toFixed(2)

//2й варіант визначення середнього діаметра
// const internalDiameter = ((diameterArray.reduce((previousValue, number) => {
//   return previousValue + number;
// }, 0))/(array.reduce((tot, diam) => {
//   return tot + Number(diam.total);
// }, 0))).toFixed(2)

// // Визначаэмо середнє значення висоти стінки
// const wallHeightArray = array.map(arr => Number(arr.diametr * arr.total));

// const sumwallHeight = wallHeightArray.reduce((previousValue, number) => {
//   return previousValue + number;
// }, 0);
// const totalwallHeight = array.reduce((tot, diam) => {
//   return tot + Number(diam.total);
// }, 0);
// const wallHeight = (sumwallHeight/totalwallHeight).toFixed(2)

// console.log("internalDiameter",internalDiameter)

//     // const array = volume.filter(
//     //   (player) => player.type === type
//     // )[0];
//     // console.log('array>>>', array)
//     // const { internalDiameter, wallHeight } = array;

//     const totalAreaOfTheRemainingTanks = (
//       (3.14 * (internalDiameter * internalDiameter)) /
//       wallHeight
//     ).toFixed(3);
//     const heightOfCollapse = (
//       theVolumeOfTheLargestTank / (area - totalAreaOfTheRemainingTanks) +
//       0.2
//     ).toFixed(3);
//     console.log("heightOfCollapse>>>>>>>>>>", heightOfCollapse);
// array = [ ]
// calculationForm.innerHTML = '<h2>Відповідь </h2>'
// }



// ________________________________________________Тема сторінки__________
const checkbox = document.querySelector('.switch');

checkbox.addEventListener('click', function() {
  const temeWhiteTitle = document.querySelectorAll("*")
  const elements = document.querySelectorAll('[data-lang-en], [data-lang-ua]');
    if (this.checked) {
       temeWhiteTitle.forEach(switcher => {
        switcher.style.color = "black"
        switcher.style.backgroundColor = "white"
        localStorage.removeItem("ui-language");
        localStorage.setItem("ui-language", "light")
       const language = localStorage.getItem("ui-language")
        
        elements.forEach(el => {
          if (language === 'light') {
            el.textContent = el.dataset.langEn;
        }
           
        });



        
    });
      
    } else {
      temeWhiteTitle.forEach(switcher => {
        switcher.style.color = ""
        switcher.style.backgroundColor = ""

        localStorage.removeItem("ui-language");
        localStorage.setItem("ui-language", "dark")
        const language = localStorage.getItem("ui-language")
        elements.forEach(el => {
          if (language === 'dark') {
            el.textContent = el.dataset.langUa;
        }
      });
      
   });
     
    }


});



