function ImageController() {
	//Your ImageService is a global constructor function what can you do here if you new it up?
	var imageService = new ImageService()

	var $parentDiv = $('#body')

	imageService.getImage(function(image){
		console.log(image.large_url)
		var imageUrl = image.large_url
		drawBackground(imageUrl)
	})

	function drawBackground(imageUrl) {
		$parentDiv.css("background-image", `url(${imageUrl})`)
	}
}


