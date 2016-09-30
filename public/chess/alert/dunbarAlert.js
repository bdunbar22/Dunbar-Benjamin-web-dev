var alertTemplate = '<div id="alertMaster">' +
	'<div class="alertContainer frontLayer">' +
	'<div id="alertHeader"></div>' +
	'<hr>' +
	'<div id="alertBody"></div>' +
	'<button class="alertButton" onclick="closeDunbarAlert()">Okay</button>' +
	'</div>' +
	'</div>';


function showDunbarAlert(headingText, bodyText) {
	closeDunbarAlert();
	document.body.innerHTML += alertTemplate;
	var header = document.getElementById('alertHeader'),
		body = document.getElementById('alertBody');
	header.innerHTML = headingText;
	body.innerHTML = bodyText;
}

function closeDunbarAlert() {
	var alert = document.getElementById('alertMaster');
	if(alert)
		alert.remove();
}