const getCurrencyOptions = async () => {
    const response = await fetch('https://api.exchangerate.host/symbols');
    const json =  await response.json();
    // console.log(response);
    
    return json.symbols;
}

//console.log(getCurrencyOptions());

getCurrencyOptions().then(console.log);

 const getCurrencyRate = async (fromCurrency, toCurrency)=>{
    const currencyConvertUrl = new URL('https://api.exchangerate.host/convert');

     currencyConvertUrl.searchParams.append('from', fromCurrency);
     currencyConvertUrl.searchParams.append('to', toCurrency);

     const  response = await fetch(currencyConvertUrl);
     const json = await response.json();
     return json.result;

 };


//  const appendOptionToSelect = (SelectElement, optionItem) => {
//      const optionElement = document.createElement('option');
//      optionElement.value = optionItem.code;
//      optionElement.textContent = optionItem.description;

//     SelectElement.appendChild(optionElement);
// };

const appendOptionToSelect = (selectElement, optionItem) => {
    const optionElement = document.createElement('option');
    optionElement.value = optionItem.code;
    optionElement.textContent = optionItem.description;
    selectElement.appendChild(optionElement);

};

 const populateSelectElement = (SelectElement, optionList) => {
    optionList.forEach(optionItem => {
        appendOptionToSelect(SelectElement, optionItem);
     })
 };

 const setupCurrencies = async ()=> {
     const fromCurrencyElem = document.getElementById('fromCurrency');
     const toCurrencyElem = document.getElementById('toCurrency');

     const currencyOptions = await getCurrencyOptions();

     const currencies = Object.keys(currencyOptions).map(
         currencyKey => currencyOptions[currencyKey]
     );
     //console.log(currencies);

     populateSelectElement(fromCurrencyElem, currencies);
     populateSelectElement(toCurrencyElem, currencies);
 };

    //setupCurrencies();
   
const setupEventListener = () => {
    const formElement = document.getElementById('convertForm');

    formElement.addEventListener('submit', async event =>{
        event.preventDefault();

        const fromCurrency = document.getElementById('fromCurrency');
        const toCurrency = document.getElementById('toCurrency');
        const amount = document.getElementById('amount');
        const convertResultElem = document.getElementById('convertResult');

        try{
            const rate = await getCurrencyRate(
            fromCurrency.value , 
            toCurrency.value);

        const amountValue = Number(amount.value);
        const ConverionResult = Number(amountValue * rate).toFixed(2);
        convertResultElem.textContent = `${amountValue} ${fromCurrency.value} = ${ConverionResult} ${toCurrency.value}`
     }catch(error){
        convertResultElem.textContent = `There was an error getting the conversion rate [${error.message}]`;
        convertResultElem.classList.add('error');
     }


    });
};


setupCurrencies();
setupEventListener();