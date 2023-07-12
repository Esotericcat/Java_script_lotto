const submitRef = document.querySelector('form button[type="submit"]');
const inputRefs = [...document.querySelectorAll('form.lotto-form input[id^="digit"]')];


const isNotEmpty = (elements) => elements.every((element) => element.value !== '');
const isIntegers = (elements) => elements
    .every((element) => Number.isInteger(Number(element.value)));

const ConvertInputs = (elements) => elements.map((element) => parseInt(element.value));

const isNotRedundant = (digits) => new Set(digits).size === digits.length;
const calculatePrice = (length) => {
    switch (length){
        case 3:
            return 24;
        case 4:
            return 170;
        case 5:
            return 3500;
        case 6:
            return 3000000;
        default:
            return 0

    }
    
};
const showResults = (hits,drawnDigits) =>{
    let message = `wylosowane liczby to: ${drawnDigits.join(', ')}`
    if (hits.length>0){
        message += `trafiłes ${hits.length} razy, twoje liczby to ${hits.join(', ')}.`
        message += `Hajs: ${calculatePrice(hits.length)}PLN`
    } resultRef.innerText = message
}

const drawDigits = () => {
    const temp = [];
    for(let i=0; i<6;i++){
        const result = Math.round(Math.random() * 48+1);
        if (!temp.includes(result)){
            temp.push(result);
        }else{
            i--;
        }
        } return temp.sort((a,b)=>a-b);
}
const checkHits = (userdigits,drawDigits)=>{
    const hits = [];
    for (const digit of userdigits){
        if (drawDigits.includes(digit)){
            hits.push(digit);
        }
    }return hits;
}
submitRef.addEventListener('click', (event) => {
    event.preventDefault();

    if (isNotEmpty(inputRefs)) {
        if (isIntegers(inputRefs)) {
            const userDigits = ConvertInputs(inputRefs);
            if (isNotRedundant(userDigits)) {
               const drawnDigits = drawDigits();
               const hits = checkHits(userDigits,drawDigits());
               console.log(hits)
            } else {
                console.log('redundant');
            }
        } else {
            console.log('no integers')
        }
    } else {
        console.log('empty inputs');
    }
})


