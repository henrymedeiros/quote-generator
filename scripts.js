const quoteContainer = document.querySelector('#quote-container')
const quoteText = quoteContainer.querySelector('#quote')
const authorText = quoteContainer.querySelector('#author')
const twitterBtn = quoteContainer.querySelector('#twitter')
const newQuoteBtn = quoteContainer.querySelector('#new-quote')
const loader = document.querySelector('#loader')


function showLoadingSpinner(){
    loader.hidden = false
    quoteContainer.hidden = true
}

function removeLoadingSpinner(){
    if(!loader.hidden){
        quoteContainer.hidden = false
        loader.hidden = true
    }
}

// Get Quote From API

async function getQuote(){
    showLoadingSpinner()
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch(proxyUrl + apiUrl)
        const data = await response.json();
        // If author is blank
        if(data.quoteAuthor === ''){
            authorText.innerText = 'Unknown'
        }
        authorText.innerText = data.quoteAuthor;
        // If quote is too long
        if(data.quoteText.length > 50){
            quoteText.classList.add('long-quote')
        }
        quoteText.innerText = data.quoteText;
        removeLoadingSpinner()

    }catch(error){
        console.log(error);
        quoteText.innerText = 'Try again later'
        authorText.innerText = 'Devloper'
    }

}

function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}
// On Load 

getQuote();