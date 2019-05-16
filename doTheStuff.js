const data = {
  customers: {
    Moe: {
    },
    Larry: {
    },
    Curly: {
    }
  },
  prizes: {
    Foo: 1,
    Bar: 3,
    Bazz: 5
  }
};

function createPrizes() {
    const prize = document.getElementById('prizeInv');
    const generatePrizeCard = (key) => {
	// This is the thing that will make each prize element to stuff into
	// the DOM
	prize.innerHTML += `<div id="${key}"><p>${key}</p><p>${data.prizes[key]}<p></div>`;
    };

    Object.keys(data.prizes).forEach((obj) => {
	generatePrizeCard(obj);
    });
}

createPrizes();

function createCustomers() {
    const cust = document.getElementById('customers');

    const formatCust = (c) => {
	return `<p>${c}</p>`;
                
    };

    const formatCustPrizes = (c, p) => {
	return `<span><button>-</button>${p} ${data.customers[c][p]}<button>+</button></span>`;
    };
    // Add prizes for each customer
    // While we do that we may as well construct our
    // HTML to stuff in the DOM
    let resultHTML = '';
    
    for (let c in data.customers) {
	resultHTML += '<div>';
	resultHTML += formatCust(c);
	for (let p in data.prizes) {
	    data.customers[c][p] = 0;
	    resultHTML += formatCustPrizes(c, p);
	}
	resultHTML += '</div>';	
    }

    // Add all the customer cards to the DOM
    cust.innerHTML += resultHTML;
}

createCustomers();

// Lets add a click event listener to the 'customers' thing and do stuff!!!
// Trying to do this without going totally crazy with IDs. I think I can
// Also not using data just to be a pain in your butt
function alterPrizeAmt(e) {
    if (e.target.nodeName != 'BUTTON') return;
    const operate = e.target.innerText;
    let prize = e.target.parentElement.innerText;
    // Get the present from the sPar innerText
    for (let p in data.prizes) {
	if (prize.includes(p)) 
	    prize = p;
    }
    
    // Sorry. This is a little bonkers, but it was fun.
    const customer = e.target.parentElement.parentElement.firstElementChild.innerText;
    
    if (operate === '-') {
	// Do stuff here
	if (data.customers[customer][prize] > 0) {
	    data.customers[customer][prize] -= 1;
	    data.prizes[prize] += 1;
	}
	else return;
    }
    else if (operate === '+') {
	// Do some other stuff here
	if (data.prizes[prize] > 0) {
	    data.prizes[prize] -= 1;
	    data.customers[customer][prize] += 1;
	}
	else return;
    }
    else {
	console.log('You messed up Nick... Somehow');
	return;
    }

    // Update the text for customer card and prize card (so they are being called)
    e.target.parentElement.innerHTML = `<button>-</button>${prize} ${data.customers[customer][prize]}<button>+</button>`;
    document.getElementById(prize).children[1].innerHTML = data.prizes[prize];
    console.log(data.prizes);
//    document.getElementById(prize).innerText
    // console.log(operate);
    // console.log(sPar);
    // console.log(cPar);
}

document.getElementById('customers').addEventListener('click', alterPrizeAmt, false);
