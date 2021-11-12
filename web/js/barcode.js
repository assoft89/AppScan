function processBarcode(barcode){
    // Create div element and set the barcode value inside this div
    var div = document.createElement("div");
    div.innerHTML = barcode;
    document.body.appendChild(div);
}

function nikoBarcodeListener(e){
    // Event listener for processing scanned data
    localStorage["nikoBarcodeKeyboard"] = "";
    if(e.url.split("\#")[0] === window.location.href){
        window.focus();
        processBarcode(decodeURIComponent(e.newValue));
    }

    window.removeEventListener("storage", nikoBarcodeListener, false);
}

if(window.location.hash !== ""){
    localStorage["nikoBarcodeKeyboard"] = window.location.hash.substr(1);
    self.close();
    window.location.href="about:blank";//In case self.close is disabled
}else{
    // register event listener for capturing url changes
    window.addEventListener("hashchange", function(e){
        window.removeEventListener("storage", nikoBarcodeListener, false);
        var hash = window.location.hash.substr(1);
        if (hash !== "") {
            window.location.hash = "";
            processBarcode(decodeURIComponent(hash));
        }
    }, false);
}

function startScanner(){
    // This function will trigger the scanning process for the current url
    // Set currentUrl so the scanner will know where to return the result
    var currentUrl = window.location.href.split("\#")[0];
    // Register event listener which will process the scanned data after scanning is completed
    window.addEventListener("storage", nikoBarcodeListener, false);
    // You need to add the {CODE} placeholder in your url string so the scanner can replace it with the value
    currentUrl = "appscan://ru.assoft.appscan"
    window.open("niko.barcode.keyboard://scan/" + encodeURIComponent(currentUrl + "#{CODE}"),'_self');
}