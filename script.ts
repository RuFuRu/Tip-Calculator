const billValue = document.querySelector('.bill-container > input') as HTMLInputElement;
const peopleNum = document.querySelector('.num-of-people > input') as HTMLInputElement;
const gridButtons = document.querySelectorAll('.tip-grid-container > .grid-button') as NodeListOf<HTMLButtonElement>;
const tipAmount = document.querySelector('.tip-amount') as HTMLHeadingElement;
const totalAmount = document.querySelector('.total-amount') as HTMLHeadingElement;
const resetButton = document.querySelector('.reset') as HTMLButtonElement;
const errorPara = document.querySelector('.num-of-people > p') as HTMLParagraphElement;
const numOfPeopleInput = document.querySelector('.num-of-people > input') as HTMLInputElement;

let val: number = 0;

numOfPeopleInput.addEventListener('input', () => {
  if(numOfPeopleInput.value === '' || numOfPeopleInput.value === '0') {
    numOfPeopleInput.classList.add('no-people-input');
    errorPara.setAttribute('style', 'display: block');
  } else {
    numOfPeopleInput.classList.remove('no-people-input');
    errorPara.setAttribute('style', 'display: none');
  }  
})

billValue.addEventListener('input', () => {
  if(billValue.valueAsNumber === 0 || billValue.value === '') {
    totalAmount.textContent = '$0.00';
    tipAmount.textContent = '$0.00';
  }
  totalAmount.textContent = `$${(billValue.valueAsNumber * val + billValue.valueAsNumber).toFixed(2)}`;
  tipAmount.textContent = `$${(billValue.valueAsNumber * val).toFixed(2)}`;
})

gridButtons.forEach(button => {
  button.addEventListener('click', () => {
    if(button.classList.contains('5%')) {
      gridButtons.forEach(btn => {
        btn.setAttribute('style', 'pointer-events: auto');
        btn.classList.remove('btn-clicked');
      });
      val = 0.05;
      button.classList.add('btn-clicked');
      button.setAttribute('style', 'pointer-events: none')
    } else if(button.classList.contains('10%')) {
        gridButtons.forEach(btn => {
          btn.setAttribute('style', 'pointer-events: auto');
          btn.classList.remove('btn-clicked');
        });
        val = 0.1;
        button.classList.add('btn-clicked');
        button.setAttribute('style', 'pointer-events: none')
    } else if(button.classList.contains('15%')) {
        gridButtons.forEach(btn => {
          btn.setAttribute('style', 'pointer-events: auto');
          btn.classList.remove('btn-clicked');
        });
        button.classList.add('btn-clicked');
        val = 0.15;
        button.setAttribute('style', 'pointer-events: none')
    } else if(button.classList.contains('25%')) {
        gridButtons.forEach(btn => {
          btn.setAttribute('style', 'pointer-events: auto');
          btn.classList.remove('btn-clicked');
        });
        button.classList.add('btn-clicked');
        val = 0.25;
      button.setAttribute('style', 'pointer-events: none')
    } else if(button.classList.contains('50%')) {
        gridButtons.forEach(btn => {
          btn.setAttribute('style', 'pointer-events: auto');
          btn.classList.remove('btn-clicked');
        });
        button.classList.add('btn-clicked');
        val = 0.5;
      button.setAttribute('style', 'pointer-events: none')
    } else if(button.classList.contains('Custom')) {
        gridButtons.forEach(btn => {
          btn.setAttribute('style', 'pointer-events: auto');
          btn.classList.remove('btn-clicked');
        });
        const regex = /\D/;
        let pmt: any = prompt('How much do you wish to tip ? (please input a number without percentage sign)');
        if(typeof pmt === null) {
          val = 0;
        } else if(regex.test(pmt)){
          alert("not a whole number");
        } else {
          val = parseFloat(pmt) / 100;
          if(val * 100 >= 100) {
            alert("Please type a number lesser than 100");
            val = 0;
          }
          console.log(val);
        }
        button.textContent = `${val * 100}%`;
        button.classList.add('btn-clicked');
    }
    if(billValue.valueAsNumber === 0 || billValue.value === '') {
      totalAmount.textContent = '$0.00';
      tipAmount.textContent = '$0.00';
    }
    totalAmount.textContent = `$${(billValue.valueAsNumber * val + billValue.valueAsNumber).toFixed(2)}`;
    tipAmount.textContent = `$${(billValue.valueAsNumber * val).toFixed(2)}`;
  })
})

resetButton.addEventListener('click', () => {
  tipAmount.textContent = '$0.00';
  totalAmount.textContent = '$0.00';
  billValue.value = '';
  val = 0;
  gridButtons.forEach(btn => {
    btn.setAttribute('style', 'pointer-events: auto');
    btn.classList.remove('btn-clicked');
  });
})