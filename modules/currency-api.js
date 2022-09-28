"use strict"

async function get_json(url, erroMsg = "Something Went Wrong") {
   try {
      const response = await fetch(url)
      if (!response.ok) throw new Error(erroMsg)

      return await response.json();

   } catch (err) {
      return err
   }
}

// conversionRate Takes 2 currencies and return the conversion rate between those 2 currencies
export async function conversionRate(cur1, cur2) {
   const url = `https://api.exchangerate.host/convert?from=${cur1}&to=${cur2}`

   try {
      const data = await get_json(url, "Invalid Currency")
      if (data.constructor.name === "Error") throw new Error("Something Went Wrong. Please try reloading the page or checking your internet connection.")
      if (!data.info.rate) throw new Error("The Currency Conversion Rate between those 2 currencies is not available")

      return data.info.rate
   } catch (err) {
      return err.message
   }
}