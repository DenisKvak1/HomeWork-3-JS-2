let creditData=[]

sum=document.getElementById('sum')
procent=document.getElementById('percent')
term=document.getElementById('term')
button=document.getElementById('btn')
table=document.getElementById('tableBody')
tableO=document.getElementById('table')
warn=document.getElementById('warn')

button.addEventListener("click", function() {
    if(term.value.includes('.') || term.value.includes(',') || +sum.value>9999999999 ){
        warn.textContent = "Введите корректные данные :)";
        tableO.classList.add('d-none');
    }
    else if(+sum.value>0 && +procent.value>0 && +term.value>0 && +procent.value<5000.01 &&  +term.value<2000.01){
        warn.textContent = "";
        t=Math.round(term.value);
        tableO.classList.remove('d-none');
        let creditData = [];
        let principal = +sum.value;
        let monthlyInterestRate = procent.value / 12 / 100;
        let monthlyPayment = Math.round((principal * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -t)) * 100) / 100;
        for (let i = 0; i < t; i++) {
            let interestPayment = Math.round((principal * monthlyInterestRate) * 100) / 100;
            let principalPayment = Math.round((monthlyPayment - interestPayment) * 100) / 100;
            if (i == t - 1) {
                principalPayment = Math.round(principal*100)/100;
                monthlyPayment=Math.round((interestPayment+principalPayment)*100)/100
            }
            creditData[i] = {
                'dolg': principal,
                'telo': principalPayment,
                'proc': interestPayment,
                'plat': monthlyPayment
            };
            principal = Math.round((principal - principalPayment) * 100) / 100;
        }

        table.innerHTML=''
        for (let i = 0; i < creditData.length; i++) {
            let html=`
            <tr>
                <th scope="row">${i+1}</th>
                <td>${creditData[i]['dolg']}</td>
                <td>${creditData[i]['telo']}</td>
                <td>${creditData[i]['proc']}</td>
                <td>${creditData[i]['plat']}</td>
              </tr>
            `
            table.insertAdjacentHTML('beforeend', html);
        }   
        let html=`
            <tr>
                <th scope="row">Итого</th>
                <td>${principal}</td>
                <td>${Math.round(creditData.reduce((a, cv) => a + cv['telo'], 0)*100)/100}</td>
                <td>Переплата: ${Math.round(creditData.reduce((a, cv) => a + cv['proc'], 0)*100)/100}</td>
                <td>${Math.round(creditData.reduce((a, cv) => a + cv['plat'], 0)*100)/100}</td>
            </tr>`
        table.insertAdjacentHTML('beforeend', html);

    }
});
