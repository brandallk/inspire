function QuoteController(){

	var quoteService = new QuoteService()

	let Quote = {
		template: `
			<div>
				<p class="quote-text text-center" v-on:mouseenter="mouseenter" v-on:mouseleave="mouseleave" v-html="quoteText"></p>
				<span class="quote-author" v-if="showAuthor" v-html="quoteAuthor"></span>
			</div>
		`,
		data() {
			return {
				quoteText: '',
				quoteAuthor: '',
				showAuthor: false
			}
		},
		methods: {
			mouseenter() {
				setTimeout( () => {
					this.showAuthor = true
				}, 500)
			},
			mouseleave() {
				setTimeout( () => {
					this.showAuthor = false
				}, 1000)
			}
		},
		mounted() {
			quoteService.getQuote( res => {
				this.quoteText = res.quote
				this.quoteAuthor = "-- " + res.author
			})
		}
	}

	let vue = new Vue({
		el: '#quote',
		components: {
			'quote': Quote
		}
	})

	// Original implementation (not using Vue):

	// var $parentDiv = $('#quote')
	// var quoteTmp = `
	// 	<p class="quote-text"></p>
	// 	<span class="quote-author"></span>
	// `

	// quoteService.getQuote(function(quote){
	// 	// console.log('What is the quote', quote)
	// 	var text = quote.quote
	// 	var author = quote.author
	// 	drawQuote(text, author)
	// })

	// function drawQuote(text, author) {
	// 	$parentDiv.html(quoteTmp)
	// 	$('.quote-text').html(`"${text}"`)
	// 	$('.quote-author').text(`-- ${author}`)
	// }
}
