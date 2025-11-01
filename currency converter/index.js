const API_KEY = "add api key i dont have ";
const baseURL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/`;

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCur = document.querySelector(".from select");
const toCur = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// dropdowns with currencies
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let option = document.createElement("option");
    option.value = currCode;
    option.innerText = currCode;

    if (select.name === "from" && currCode === "USD") {
      option.selected = true;
    } else if (select.name === "to" && currCode === "INR") {
      option.selected = true;
    }

    select.appendChild(option);
  }

  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

// Function to update flag images
const updateFlag = (element) => {
  const currCode = element.value;
  const countryCode = countryList[currCode];
  const img = element.parentElement.querySelector("img");
  if (countryCode && img) {
    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
  }
};

//  conversion are handle here
btn.addEventListener("click", async (e) => {
  e.preventDefault();

  const amountInput = document.querySelector(".amount input");
  let amtVal = parseFloat(amountInput.value.trim());

  if (isNaN(amtVal) || amtVal < 1) {
    amtVal = 1;
    amountInput.value = "1";
  }

  const from = fromCur.value;
  const to = toCur.value;

  const url = `${baseURL}${from}/${to}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch exchange rate");

    const data = await res.json();
    const rate = data.conversion_rate;
    const converted = (amtVal * rate).toFixed(2);

    msg.innerText = `${amtVal} ${from} = ${converted} ${to}`;
  } catch (error) {
    msg.innerText = "Error fetching conversion rate. Try again.";
    console.error("API error:", error);
  }
});
