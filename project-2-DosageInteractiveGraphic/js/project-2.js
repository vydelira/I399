//select id from html
const drugs = document.querySelector('#drugs');

//Grabbing each drug
drugList.forEach((drug) => {
    //console.log(drug.slug);
    const html = `
    <figure data-drug-name="${drug.name}"; data-drug-amount="${drug.amount}">
        <img src="images/${drug.slug}.jpg" alt="${drug.name}">
        <figcaption>${drug.name}</figcaption>
    </figure>
    `;

    //append html under 'drugs' id in the html
    drugs.insertAdjacentHTML('beforeend', html);
});

//keep track of dosage
let totalDose = 0; 

//select bar, label, and warning message
let bar = document.querySelector('span');
let meter = document.querySelector('.meter');
let label = document.querySelector('.label');
let warning = document.querySelector('.total');
let message   = document.querySelector('.doseWarning');

function addDrug(drug) {
    console.log(drug);
    //grab drug by its dose amount and convert it to int
    const dosage = parseInt(drug.dataset.drugAmount, 10);

    //if drug is clicked on and does not contain 'selected', class then add it
    if (!(drug.classList.contains('selected'))) {
        drug.classList.add('selected');
        //add dose to total and update label
        totalDose += dosage;
        label.innerHTML = `<strong>${drug.dataset.drugName}</strong> ${totalDose}mg`;
        message.innerHTML = `${totalDose}`;
    }
    else {
        //if drug is clicked on and constains 'selected' class, then remove it
        drug.classList.remove('selected');
        //subtract dose from total and update label
        totalDose -= dosage;
        label.innerHTML = `${totalDose}mg`;
        message.innerHTML = `${totalDose}`;
    }

    //update warning
    if (totalDose < 4000) {
        message.style.color = 'black';
        //bar height and dose position
        bar.style.height = `25%`; 
        label.style.top = `-25%`;
    }
    else if (totalDose < 8000) {
        message.style.color = '#D5B612';
        warning.innerHTML = "You've exceeded the FDA’s recommended maximum daily limit of acetaminophen.";
        bar.style.height = `50%`; 
        label.style.top = `-50%`;
    }
    else if (totalDose < 15000) {
        message.style.color = '#D17827';
        warning.innerHTML = "You've exceeded the level at which liver damage can occur if taken for several days, according to McNeil, the maker of Tylenol.";
        bar.style.height = `75%`; 
        label.style.top = `-75%`;
    }
    else if (totalDose >= 15000) {
        message.style.color = '#C20802';
        warning.innerHTML = "You've exceeded the threshold toxic dose of acetaminophen. A single dose at this level can result in death, according to medical experts and literature.";
        meter.innerText = "height: 100%";
        bar.style.height = `100%`; 
        label.style.top = `-100%`;
    }
}

///YOu've exceeded the threshhold toxic does of acetamino

//add event listener too all figure elements
document.querySelectorAll('figure').forEach(item => {
    item.addEventListener('click', () => {
        addDrug(item)
    })
})