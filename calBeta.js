let display = document.querySelector('.display');
let temp='';

function getNumber(num) {
  display.value += num;
}

function Ans() {
  display.value += temp;
}

function getOperator(op) {
  if (op === 'sin' || op === 'cos' || op === 'tan') {
    display.value += op + '(';
  } else {
    display.value += op;
  }
}

function toRadian() {
  if (display.value.includes('deg')) {
    display.value = display.value.replace('deg', '* Math.PI / 180');
  } else {
    display.value += '* Math.PI / 180';
  }
}

function calculate() {
 

  try {
    expression = display.value;
    expression = expression.replace(/sin\(/g, 'Math.sin(');
    expression = expression.replace(/cos\(/g, 'Math.cos(');
    expression = expression.replace(/tan\(/g, 'Math.tan(');
    expression = expression.replace(/log\(/g, 'Math.log(');
    const result = eval(expression).toFixed(2);
    temp=result;
    fetch('/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ expression, result }),
    }).then(response => response.json());
    

    display.value = result;
  } catch (error) {
    display.value = 'Error';
  }
}

function getHistory() {
  fetch('/history')  
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch history data');
      }
      return response.json();
    })
    .then(data => {
      const historyDisplay = document.querySelector('#history');
      historyDisplay.innerHTML = '<strong>History:</strong><br>';
      data.forEach(record => {
        historyDisplay.innerHTML += `${record.expression} = ${record.result}<br>`;
      });
    })
    .catch(error => {
      console.error(error);
    });
}



function clearDisplay() {
  display.value = '';
}