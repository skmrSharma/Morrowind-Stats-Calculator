$("ul#starting-values").hide();
$("form").submit(function(){
	var end = +($("input[name='end']").val());
	var str = +($("input[name='str']").val());
	var int = +($("input[name='int']").val());
	var wil = +($("input[name='wil']").val());
	var agi = +($("input[name='agi']").val());
	var health = (str + end)/2;
	var fatigue = str + wil + end + agi;
	var maxEncumbrance = str * 5;
	var race = $("select").val();
	var magickaMult;
	if(race=="Altmer"){
		magickaMult=1.5;
	}
	else if(race=="Breton"){
		magickaMult=0.5;
	}
	else{
		magickaMult=0;
	}
	var magicka = int * (1 + magickaMult);
	$("ul#starting-values li").eq(0).html("Health: ");
	$("ul#starting-values li").eq(0).append(health);
	$("ul#starting-values li").eq(1).html("Magicka: ");
	$("ul#starting-values li").eq(1).append(magicka);
	$("ul#starting-values li").eq(2).html("Fatigue: ");
	$("ul#starting-values li").eq(2).append(fatigue);
	$("ul#starting-values li").eq(3).html("Max Encumbrance: ");
	$("ul#starting-values li").eq(3).append(maxEncumbrance);
	$("ul#starting-values").show();
	return false;	// to prevent default behaviour of submit; since action is not specified in <form>, by default submit reloads the page
});