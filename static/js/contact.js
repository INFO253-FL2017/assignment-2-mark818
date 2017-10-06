function send() {
    var missing = '';
    var pop = document.getElementById('pop');
    var first = document.getElementById('name').value;
    var subject = document.getElementById('subject').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('msg').value;
    if (first == '') {
        missing += "Name,";
    }
    if (email == '') {
    	missing += "Email,";
    }
    if (subject == '') {
        missing += "Subject,";
    }
    if (message == '') {
        missing += "Message,";
    } 
    if (pop.hidden) {
        pop.hidden = false;
    }
    if (missing != '') {
        pop.style.color = "red";
        pop.innerHTML = "Fields " + missing.substr(0, missing.length-1) + " need to be filled out";
    } else {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 204) {
                pop.style.color = "green";
                pop.innerHTML = "Hi " + first + ", your message has been sent";
            }
        };
        xhttp.open("POST", "/f", true);
        xhttp.send('{"name":"' + first + '","email":"' + email + '","subject":"' + subject + '","msg":"' + message + '"}')
    }
    window.scrollTo(0, 0);
}