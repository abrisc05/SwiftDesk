// JavaScript for displaying demo sent message
function validateEmail() {
  var emailInput = document.getElementById('email');
  var email = emailInput.value;
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailPattern.test(email)) {
      // Email format is valid, proceed with emailSent() function
      emailSent();
  } else {
      alert("Please enter a valid email address.");
  }
}

function emailSent() {
    email = $("email").val();
    sent = "Thank you. Please check your email for the demo";

    $("#sent").text(sent);
}


$(document).ready(function() {
  $("form").submit(function() {

  const data = {

      email: $("#email").val(),
      username: $("#username").val(),
      password: $("#password").val()
  }

  $.post( "/api/users/create", data, function( data ) {
    console.log("Done")
});

success = "User account created successfully. Please Log in.";

  $("#success").text(success);
      
  
return false;

  });
});


$(document).ready(function() {
  $("form").submit(function() {

  const data = {
  	
    name: $("#name").val(),
    email2: $("#email2").val(),
    phonenumber: $("#phonenumber").val(),
    subject: $("#subject").val(),
    tixmessage: $("#tixmessage").val()
   }

  $.post( "/api/tickets/create", data, function( data ) {
    console.log("Done")
});

created = "Your ticket has been submitted successfully.";

  $("#created").text(created);
      
  
return false;

  });
});

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       document.getElementById("creation-details").innerHTML = this.responseText;
      }
    };
    xhttp.open("GET", "txt/ticket-creation.txt", true);
    xhttp.send();

}

function loadDoc2() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       document.getElementById("automation-details").innerHTML = this.responseText;
      }
    };
    xhttp.open("GET", "txt/automation.txt", true);
    xhttp.send();

}

function loadDoc3() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       document.getElementById("analytics-details").innerHTML = this.responseText;
      }
    };
    xhttp.open("GET", "txt/analytics.txt", true);
    xhttp.send();

}

function loadDoc4() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       document.getElementById("integration-details").innerHTML = this.responseText;
      }
    };
    xhttp.open("GET", "txt/integration.txt", true);
    xhttp.send();

}

function loadDoc5() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       document.getElementById("customization-details").innerHTML = this.responseText;
      }
    };
    xhttp.open("GET", "txt/customization.txt", true);
    xhttp.send();

}

function loadDoc6() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       document.getElementById("communication-details").innerHTML = this.responseText;
      }
    };
    xhttp.open("GET", "txt/communication.txt", true);
    xhttp.send();

}



