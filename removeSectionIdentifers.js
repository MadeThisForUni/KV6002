window.onload =(function() {
        var currentURL = window.location.href;
        /*
        Similarly to the injection of the new divs, measures needed to be put in place to remove them if the user
        was on the admin console.
        */
        if(currentURL.includes(".squarespace.")){
            var iframe = document.getElementById('sqs-site-frame');
            var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
            var newDiv = innerDoc.getElementsByClassName("filterID");
            for(var i=0;i<newDiv.length; i++){
                newDiv[i].style.display = "none";
            }
        }
        else{
            var newDiv = document.getElementsByClassName("filterID");
            for(var i=0;i<newDiv.length; i++){
                newDiv[i].style.display = "none";
            }
        }
})();