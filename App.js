const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const button  = document.querySelector("form button")
const msg =  document.querySelector(".msg")
const  fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    // console.log(code,countryList[code])
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }

    select.append(newOption);
  }


 select.addEventListener("change", (e)=>{
   UpDateFalg(e.target)
 })
}


const UpDateFalg =  (element)=>{
//   console.log(Element)

let currCode= element.value
let CountryCode =  countryList[currCode];
let newSrc = `https://flagsapi.com/${CountryCode}/flat/64.png`
let img = element.parentElement.querySelector("img")
  img.src =newSrc
 
}






button.addEventListener("click", async(e)=>{
    e.preventDefault()
    let amount = document.querySelector(".amount input")
    //   let amountValue  =    amount.value;
    let amountValue = parseFloat(amount.value);

     // console.log(amountValue)

     if(amountValue ==="" || amountValue<1) 
     {
        amountValue =1
        amount.value = "1"
     }
  //console.log(fromCurr.value , toCurr.value)
//   const URL =  `${BASE_URL}/${fromCurr.value.toLowerCase()} /${toCurr.value.toLowerCase()}.json`
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

  let response  = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()]
//   console.log(rate)
//   let Final_amount = amountValue *rate;
  let Final_amount = Math.floor(amountValue * rate * 100) / 100;
  msg.innerText = `${amountValue}${fromCurr.value} ${Final_amount} ${toCurr.value}`

})

