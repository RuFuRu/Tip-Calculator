"use strict";
const billValue = document.querySelector('.bill-container > input');
const peopleNum = document.querySelector('.num-of-people > input');
const gridButtons = document.querySelectorAll('.tip-grid-container > .grid-button');
const tipAmount = document.querySelector('.tip-amount');
const totalAmount = document.querySelector('.total-amount');
const resetButton = document.querySelector('.reset');
const errorPara = document.querySelector('.num-of-people > p');
const numOfPeopleInput = document.querySelector('.num-of-people > input');
let val = 0;
numOfPeopleInput.addEventListener('input', () => {
    if (numOfPeopleInput.value === '' || numOfPeopleInput.value === '0') {
        numOfPeopleInput.classList.add('no-people-input');
        errorPara.setAttribute('style', 'display: block');
    }
    else {
        numOfPeopleInput.classList.remove('no-people-input');
        errorPara.setAttribute('style', 'display: none');
    }
    totalAmount.textContent = `$${((billValue.valueAsNumber * val + billValue.valueAsNumber) / numOfPeopleInput.valueAsNumber).toFixed(2)}`;
    tipAmount.textContent = `$${((billValue.valueAsNumber * val) / numOfPeopleInput.valueAsNumber).toFixed(2)}`;
});
billValue.addEventListener('input', () => {
    if (billValue.valueAsNumber === 0 || billValue.value === '') {
        totalAmount.textContent = '$0.00';
        tipAmount.textContent = '$0.00';
    }
    totalAmount.textContent = `$${((billValue.valueAsNumber * val + billValue.valueAsNumber) / numOfPeopleInput.valueAsNumber).toFixed(2)}`;
    tipAmount.textContent = `$${((billValue.valueAsNumber * val) / numOfPeopleInput.valueAsNumber).toFixed(2)}`;
});
gridButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('5%')) {
            resetButtons();
            val = 0.05;
            button.classList.add('btn-clicked');
            button.setAttribute('style', 'pointer-events: none');
        }
        else if (button.classList.contains('10%')) {
            resetButtons();
            val = 0.1;
            button.classList.add('btn-clicked');
            button.setAttribute('style', 'pointer-events: none');
        }
        else if (button.classList.contains('15%')) {
            resetButtons();
            button.classList.add('btn-clicked');
            val = 0.15;
            button.setAttribute('style', 'pointer-events: none');
        }
        else if (button.classList.contains('25%')) {
            resetButtons();
            button.classList.add('btn-clicked');
            val = 0.25;
            button.setAttribute('style', 'pointer-events: none');
        }
        else if (button.classList.contains('50%')) {
            resetButtons();
            button.classList.add('btn-clicked');
            val = 0.5;
            button.setAttribute('style', 'pointer-events: none');
        }
        else if (button.classList.contains('Custom')) {
            resetButtons();
            const regex = /\D/;
            let pmt = prompt('How much do you wish to tip ? (please input a number without percentage sign)');
            if (typeof pmt === null) {
                val = 0;
            }
            else if (regex.test(pmt)) {
                alert("not a whole number");
            }
            else {
                val = parseFloat(pmt) / 100;
                if (val * 100 >= 100) {
                    alert("Please type a number lesser than 100");
                    val = 0;
                }
                console.log(val);
            }
            button.textContent = `${val * 100}%`;
            button.classList.add('btn-clicked');
        }
        if (billValue.valueAsNumber === 0 || billValue.value === '') {
            totalAmount.textContent = '$0.00';
            tipAmount.textContent = '$0.00';
        }
        totalAmount.textContent = `$${(billValue.valueAsNumber * val + billValue.valueAsNumber).toFixed(2)}`;
        tipAmount.textContent = `$${(billValue.valueAsNumber * val).toFixed(2)}`;
    });
});
resetButton.addEventListener('click', () => {
    tipAmount.textContent = '$0.00';
    totalAmount.textContent = '$0.00';
    billValue.value = '1';
    val = 0;
    numOfPeopleInput.value = '1';
    resetButtons();
});
function resetButtons() {
    gridButtons.forEach(btn => {
        btn.setAttribute('style', 'pointer-events: auto');
        btn.classList.remove('btn-clicked');
    });
}
