import { currency_list } from "../modules/currency-data.js"

// This script is used to load the Select Element with the different currency options using the curreny_list array
const selectEl = document.querySelectorAll("select")
const userMsg = document.querySelector("#user-message")

let options = ""
for (let i = 0; i < currency_list.length; i++) {
	options += `<option value="${currency_list[i][0]}">${currency_list[i][1]}</option>\n`
}

selectEl[0].insertAdjacentHTML("afterbegin", options)
selectEl[1].insertAdjacentHTML("afterbegin", options)

const firstCurrency = currency_list[0][1]
userMsg.textContent = `1 ${firstCurrency} = 1 ${firstCurrency}`
