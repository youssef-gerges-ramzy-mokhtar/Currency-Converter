"use strict"
import { conversionRate } from "../modules/currency-api.js"

// HTML Elements
const input1 = document.querySelector(".input1")
const input2 = document.querySelector(".input2")
const selectEl = document.querySelectorAll("select")

let cur1, cur2
cur1 = "AFN"
cur2 = "AFN"

// render_msg() is used to display the string recived by the function inside the userMsg Element
function render_msg(msg) {
   const userMsg = document.querySelector("#user-message")
   userMsg.textContent = msg
}

// converter() receives 2 currencies and a number representing the input field
// converter() converts from one currency to another and sets the value inside the input field which needs conversion 
async function converter(cur1, cur2, inputNum) {
   const conversion_rate = await conversionRate(cur1, cur2);

   if (typeof conversion_rate == "string") {
      render_msg(conversion_rate)
      return "";
   }

   if (inputNum === 1) input2.value = (conversion_rate * parseFloat(input1.value)).toFixed(3);
   if (inputNum === 2) input1.value = (conversion_rate * parseFloat(input2.value)).toFixed(3);

   return conversion_rate.toFixed(3) // returns the conversion rate between the 2 currencies to be used to display the rates between the currencies
}


// updateCurrency() used update variables cur1 and cur2 to the value stored inside the option to represent the current currencies
function updateCurrency() {
   cur1 = selectEl[0].options[selectEl[0].selectedIndex].value
   cur2 = selectEl[1].options[selectEl[1].selectedIndex].value
}


// displayRates() used to take the per unit rate between the 2 currencies and display the per unit rate between those 2 currencies
async function displayRates(rate) {
   if (typeof rate == "string") {
      render_msg(rate)
      return
   }

   const option1 = selectEl[0].options[selectEl[0].selectedIndex].textContent
   const option2 = selectEl[1].options[selectEl[1].selectedIndex].textContent

   render_msg(`1 ${option1} = ${rate} ${option2}`)
}



// Event Listeners //

// Event Listeners on the Select Elements
for (const select of selectEl) {
   select.addEventListener("change", async function() {
      updateCurrency()
      const rate = await converter(cur1, cur2, 1)

      if (isNaN(rate)) displayRates(rate)
      else displayRates(Number(rate))
   })
}

// Event Listeners on the Input Fields
input1.addEventListener("input", function() {
   if (this.value.length == 0) {
      input2.value = ""
      return
   }

   converter(cur1, cur2, 1)
})

input2.addEventListener("input", function() {
   if (this.value.length == 0) {
      input1.value = ""
      return
   }

   converter(cur2, cur1, 2)
})