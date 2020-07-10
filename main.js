$("ul#starting-values").hide();
$("form#basic-attributes").submit(function(){
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
	$("ul#starting-values li").eq(0).html("Health: "+health);
	//$("ul#starting-values li").eq(0).append(health);
	$("ul#starting-values li").eq(1).html("Magicka: "+magicka);
	//$("ul#starting-values li").eq(1).append(magicka);
	$("ul#starting-values li").eq(2).html("Fatigue: "+fatigue);
	//$("ul#starting-values li").eq(2).append(fatigue);
	$("ul#starting-values li").eq(3).html("Max Encumbrance: "+maxEncumbrance);
	//$("ul#starting-values li").eq(3).append(maxEncumbrance);
	$("ul#starting-values").show();
	return false;	// to prevent default behaviour of submit; since action is not specified in <form>, by default submit reloads the page
});

$(".alchemy").hide();

$("#alchemy-button").click(function(){
	$(".alchemy").toggle();
});

$(".alchemy form").submit(function(){
	var alcSkill = +($("input[name='alchemy-skill']").val());
	var int = +($("input[name='int']").val());
	var luck = +($("input[name='luck']").val());
	var fatigueRatio = +($("input[name='current-fatigue']").val())/+($("input[name='max-fatigue']").val());
	if(fatigueRatio > 1){
		alert("Error: Current fatigue should be less than maximum fatigue");
		return false;
	}
	var alcSuccessRate = (alcSkill + int/5 + luck/10) * (0.75 + 0.5*fatigueRatio);
	$(".alchemy p").html("Alchemy Success Rate = "+alcSuccessRate+" %");
	return false;
});

$(".hit-rate").hide();

$("#hit-button").click(function(){
	$(".hit-rate").toggle();
});

$("#hit-rate-form").submit(function(){
	var weaponSkill = +($("input[name='weapon-skill']").val());
	var agi = +($("input[name='agi']").val());
	var luck = +($("input[name='luck']").val());
	var fatigueRatio = +($(".hit-rate input[name='current-fatigue']").val())/+($(".hit-rate input[name='max-fatigue']").val());
	if(fatigueRatio > 1){
		alert("Error: Current fatigue should be less than maximum fatigue");
		return false;
	}
	var fortAttack = +($("input[name='fortify-attack']").val());
	var blindMag = +($("input[name='blind-effects']").val());
	var hitRate = (weaponSkill + agi/5 + luck/10) * (0.75 + 0.5*fatigueRatio) + fortAttack - blindMag;
	$(".hit-rate p").html("Weapon Hit Rate = "+hitRate+" %<p>Chance to hit = Your hit rate - Opponent's evasion</p>");
	return false;
});

$(".evasion-chance").hide();

$("#evasion").click(function(){
	$(".evasion-chance").toggle();
});

$("#evasion-chance-form").submit(function(){
	var agi = +($("input[name='agi']").val());
	var luck = +($("input[name='luck']").val());
	var fatigueRatio = +($(".evasion-chance input[name='current-fatigue']").val())/+($(".evasion-chance input[name='max-fatigue']").val());
	if(fatigueRatio > 1){
		alert("Error: Current fatigue should be less than maximum fatigue");
		return false;
	}
	var sancMag = +($("input[name='sanctuary-effects']").val());
	var evadeChance = (agi/5 + luck/10) * (0.75 + 0.5*fatigueRatio) + sancMag;
	$(".evasion-chance p").html("Your Evasion Chance in combat = "+evadeChance+" %");
	return false;
});
