const currencyOne = document.querySelector(".select--one");
const amountOne = document.querySelector(".appBody__input--one");
const currencyTwo = document.querySelector(".select--two");
const amountTwo = document.querySelector(".appBody__input--two");
const swapButton = document.querySelector(".swap");
const rateInfo = document.querySelector(".rateInfo");

const calculate = () => {
	fetch(`https://api.exchangerate.host/latest?base=${currencyOne.value}&symbols=${currencyTwo.value}`)
		.then(res => res.json())
		.then(data => {
			const currency1 = currencyOne.value;
			const currency2 = currencyTwo.value;
			const rate = data.rates[currency2];

			rateInfo.textContent = `1 ${currency1} = ${rate.toFixed(4)} ${currency2}`;
			amountTwo.value = amountOne.value * rate.toFixed(2);
		});
};

const swap = () => {
	const oldValue = currencyOne.value;
	currencyOne.value = currencyTwo.value;
	currencyTwo.value = oldValue;
	calculate();
};

calculate();

currencyOne.addEventListener("change", calculate);
currencyTwo.addEventListener("change", calculate);
amountOne.addEventListener("input", calculate);
swapButton.addEventListener("click", swap);
