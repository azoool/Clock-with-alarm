var i = 1;

function ajoutReveil() {
	console.log(i);
    var newReveil = document.createElement('div');
    newReveil.innerHTML = "<div id='reveil" + i + "' class='rev'>"
							+ "<form class='form-inline'>"
								+ "<div class='checkbox'>"
									+ "<input type='checkbox' name='validReveil' id='checkboxReveil" + i + "' onChange='gererReveil(" + i + ")'>"
								+ "</div>"
								+ "<div class='form-group form1'>"
									+ "<input type='number' name='heure' class='form-control' id='heure" + i + "' min='00' max='23' placeholder='Heures'> : "
								+ "</div>"
								+ "<div class='form-group form2'>"
									+ "<input type='number' name='minute' class='form-control' id='minute" + i + "' min='00' max='59' placeholder='Minutes'>"
								+ "</div>"
								+ "<div class='form-group form3'>"
									+ "<input type='text' name='nomReveil' class='form-control' id='nomReveil" + i + "' placeholder='Nom du réveil'>"
								+ "</div>"
								+ "<select name='choixSon' class='form-control form4' id='selectSound" + i + "'>"
									+ "<option value='sound1' selected>Son 1</option>"
									+ "<option value='sound2' >Son 2</option>"
									+ "<option value='sound3' >Son 3</option>"
								+ "</select>"
	  							+ "<button type='submit' id='suppr" + i + "' class='btn btn-default form5' onClick='supprimerReveil(" + i + ")'>-</button><br />"
								+ "<button type='submit' value='stop' class='btn btn-default form6' class='boutonStop' id='stop" + i + "' onClick='stopReveil(" + i + ")' disabled >Stop</button>"
							+ "</form>"
						+ "</div>";
	
	
    document.getElementById('contenuReveil').appendChild(newReveil);
    i = i + 1;
}

function gererReveil(i) {
    if (document.getElementById("checkboxReveil" + i).checked) {
        document.getElementById("reveil" + i).style.borderColor="#12b142";
        var heureReveil = document.getElementById("heure" + i).value;
        var minuteReveil = document.getElementById("minute" + i).value;
        heureReveil = Number(heureReveil);
        minuteReveil = Number(minuteReveil);
        var date = new Date;
        var heureReel, minuteReel;
        heureReel = date.getHours();
        minuteReel = date.getMinutes();
        if ((heureReveil === heureReel) && (minuteReveil === minuteReel)) {
            var idSon = document.getElementById("selectSound" + i).value;
            document.getElementById(idSon).play();
            document.getElementById("snooze" + i).disabled = false;
            document.getElementById("stop" + i).disabled = false;
        } else {
            setTimeout("gererReveil("+i+")", 1000);
            document.getElementById("snooze" + i).disabled = true;
            document.getElementById("stop" + i).disabled = true;
        }
    }else{
        document.getElementById("reveil" + i).style.borderColor="white";
        var son = document.getElementById("selectSound" + i).value;
        document.getElementById(son).pause();
    }
}

function stopReveil(i) {
    var son = document.getElementById("selectSound" + i).value;
    document.getElementById(son).pause();
    document.getElementById("snooze" + i).disabled = true;
    document.getElementById("stop" + i).disabled = true;
}

function snooze(i) {
    var son = document.getElementById("selectSound" + i).value;
    document.getElementById(son).pause();
    document.getElementById("snooze" + i).disabled = true;
    document.getElementById("stop" + i).disabled = true;
    var heureReveil = document.getElementById("heure" + i).value;
    var minuteReveil = document.getElementById("minute" + i).value;
    var date = new Date;
    if (date.getMinutes() > 54) {
        if (date.getHours() === 23) {
            heureReveil.value = '00';
        }else{
            heureReveil.value = heureReveil.value + 1;
        }
        minuteReveil.value = minuteReveil.value - 55;
    }else{
        minuteReveil.value = minuteReveil.value + 5;
    }
}

function supprimerReveil(i) {
    var reveil = document.getElementById("reveil" + i);
    reveil.parentNode.removeChild(reveil);
    //var son = document.getElementById("selectSound" + i).value;
    //document.getElementById(son).pause();
}

function afficheHeure() {
    var date = new Date;
    var h = date.getHours();
    if (h < 10) {
        h = "0" + h;
    }
    var m = date.getMinutes();
    if (m < 10) {
        m = "0" + m;
    }
    var s = date.getSeconds();
    if (s < 10) {
        s = "0" + s;
    }
    document.getElementById("afficheHeure").innerHTML = "Il est " + h + "h " + m + "m " + s + "s";
    setTimeout('afficheHeure();', '1000');
}