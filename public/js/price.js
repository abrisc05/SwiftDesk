function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       document.getElementById("show-priceBasic").innerHTML = this.responseText;
      }
    };
    xhttp.open("GET", "txt/basic-yearly.txt", true);
    xhttp.send();
}

function loadDoc2() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     document.getElementById("show-priceStandard").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "txt/standard-yearly.txt", true);
  xhttp.send();
}

function loadDoc3() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     document.getElementById("show-pricePremium").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "txt/premium-yearly.txt", true);
  xhttp.send();
}