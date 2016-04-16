$(document).ready(function() {
	var selected = document.getElementsByClassName("selected");
	var shape = ['diamond', 'ellipse', 'sshape'];
	var color = ['green', 'red', 'purple'];
	var fill = ['empty', 'striped', 'solid'];
	var number = [1, 2, 3];
	var allCards = [];
	var shapeLength = shape.length;
	var colorLength = color.length;
	var fillLength = fill.length;
	var numberLength = number.length;
	var imgHolder = document.getElementsByClassName("imgHolder");
	var imgHolderLength = imgHolder.length;
	var cardDivs = document.getElementsByClassName("card");
	var cardDivsLength = cardDivs.length;
	var dealtCards = [];


	//Begin Interactions


	//Allows user to select up to 3 cards
	$(".card").click(function() {

		var selectedLength = selected.length;

		if (selectedLength <= 2) {

			$(this).toggleClass("selected");	

		} else if (selectedLength = 3) {

			$(this).removeClass("selected");
		}
	});

	//End Interactions

	//object constructor for cards
	function card (number, shape, color, fill) {

		this.number = number;
		this.shape = shape;
		this.color = color;
		this.fill = fill;
		this.inSet = 'n';
		this.divId = '';
		this.image = 'images/' + fill + color + shape + '.jpg';
		this.divId = "";

	}

	//Picks a card object at random from allCards (deck) and writes images to card.
	function dealCards() {

		for (var i = 0; i < cardDivs.length; i++) {

			if ((imgHolder[i].childElementCount === 0 ) && (cardDivs[i].className != "card hidden ")) {

				var randomNum = Math.floor(Math.random() * allCards.length);
				shapeNumber = allCards[randomNum].number;

					for (var j = 0; j <= shapeNumber - 1; j++) {

						var cardImage = document.createElement("img");
						cardImage.setAttribute("src", allCards[randomNum].image);
						imgHolder[i].appendChild(cardImage);
						
					}

					allCards[randomNum].divId = i;
					dealtCards.push(allCards[randomNum])
					allCards.splice(randomNum, 1);

			}

		}

	}

	//compares each attribute of selected cards
	function checkSet() {

		var selectedCard = document.getElementsByClassName("selected");
		var selectedCardId1 = selectedCard[0].getAttribute("id");
		var selectedCardId2 = selectedCard[1].getAttribute("id");
		var selectedCardId3 = selectedCard[2].getAttribute("id");
		var shapeComp = compareCards("shape");
		var numberComp = compareCards("number");
		var colorComp = compareCards("color");
		var fillComp = compareCards("fill");

		if (shapeComp && numberComp && colorComp && fillComp) {

			alert("set");

			var imgHolder1 = document.getElementById(selectedCardId1).firstElementChild;
			var imgHolder2 = document.getElementById(selectedCardId2).firstElementChild;
			var imgHolder3 = document.getElementById(selectedCardId3).firstElementChild;

			$(cardDivs[selectedCardId1]).addClass("hidden")
			$(cardDivs[selectedCardId2]).addClass("hidden")
			$(cardDivs[selectedCardId3]).addClass("hidden")

			$(".selected").removeClass("selected");

			var removeSelectedId = function (divId) {

				for (var i = 0; i < dealtCards.length; i++) {

					console.log(dealtCards[i])
					console.log(divId)
					
					if (dealtCards[i].divId == divId) {

						alert('yo')

						dealtCards.splice(i, 1);

					}
				}

			}

			removeSelectedId(selectedCardId1);
			removeSelectedId(selectedCardId2);
			removeSelectedId(selectedCardId3);

			$(imgHolder1).empty();
			$(imgHolder2).empty();
			$(imgHolder3).empty();

			if (dealtCards.length === 9 ) {

				dealCards(3);

				$(cardDivs[selectedCardId1]).removeClass("hidden");
				$(cardDivs[selectedCardId2]).removeClass("hidden");
				$(cardDivs[selectedCardId3]).removeClass("hidden");

			} 

		} else {

			alert("not a set");

			$(".selected").removeClass("selected");


		}
		

		function compareCards(type) {

			var typeVal1 = dealtCards[selectedCardId1][type];
			var typeVal2 = dealtCards[selectedCardId2][type];
			var typeVal3 = dealtCards[selectedCardId3][type];

			if (
					(
						(typeVal1 === typeVal2) 
						&&
						(typeVal2 === typeVal3)

					)

				||

					(
						(typeVal1 != typeVal2)
						&&
						(typeVal2 != typeVal3)
						&&
						(typeVal1 != typeVal3)

					)
				) 
			{

				return true;

			} else {

				return false;

			}
		}
	}


	//create all cards, one for each unique combination of shape, color, number and fill. 
	for (var i = 0; i < 81;) {

		for (var fillIndex = 0; fillIndex < fillLength; fillIndex++){

			for (var colorIndex = 0; colorIndex < colorLength; colorIndex++) {

				for (var shapeIndex = 0; shapeIndex < shapeLength; shapeIndex++) {

					for (var numberIndex = 0; numberIndex < numberLength; numberIndex++) {

						allCards[i] = new card (number[numberIndex], shape[shapeIndex], color[colorIndex], fill[fillIndex]);
						i++;

					}
				}
			}
		}
	}

	dealCards(12);
	
	$("button[name='checkSet']").click(function() {

		checkSet();

	});

	$("button[name='deal3']").click(function() {

		$(".hidden").removeClass("hidden");

		dealCards(3);

	});


});