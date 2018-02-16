function QuoteController(){

	var quoteService = new QuoteService()

	var $parentDiv = $('#quote')
	var quoteTmp = `
		<p class="quote-text"></p>
		<span class="quote-author"></span>
	`

	quoteService.getQuote(function(quote){
		// console.log('What is the quote', quote)
		var text = quote.quote
		var author = quote.author
		drawQuote(text, author)
	})

	function drawQuote(text, author) {
		$parentDiv.html(quoteTmp)
		$('.quote-text').html(`"${text}"`)
		$('.quote-author').text(`-- ${author}`)
	}
}
