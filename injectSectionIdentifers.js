window.onload =(function() {
        var currentURL = window.location.href;
        /*
        As Squarespace has an administrator console for site admins, validation needs to be added to check whether a
        user is on the live version of the site, or the admin console.
        Fortunately, the admin console of a Squarespace site will have ".squarespace." in its domain; so this was 
        used validate the version.
        */
        if(currentURL.includes(".squarespace.")){
            /*
            Squarespace uses iFrames to view the live site and any subsequent modifications, so the code needed to be
            adapted.
            */
            var iframe = document.getElementById('sqs-site-frame');
            var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
            var data_section_ids = innerDoc.getElementsByTagName("section");
            var id_list = [];
            /*
            For every "data-section-id" we needed to create a new div to display over every other site element so that 
            the user can copy the text.
            */
            for(var i=0;i<data_section_ids.length; i++){
                id_list.push(data_section_ids[i].getAttribute('data-section-id'));
                var newDiv = innerDoc.createElement("div");
                newDiv.setAttribute("class","filterID");
                newDiv.innerHTML = ".page-section[data-section-id='" + id_list[i] + "']";
                innerDoc.getElementsByTagName("section")[i].appendChild(newDiv);
                newDiv.style.position = "absolute";
                newDiv.style.color="white";
                newDiv.style.borderBottom=" 1px solid yellow";
                newDiv.style.backgroundColor="#001442";
                newDiv.style.padding="20px";
            }  
        }
        else{
            var data_section_ids = document.getElementsByTagName("section");
            var id_list = [];
            for(var i=0;i<data_section_ids.length; i++){
                id_list.push(data_section_ids[i].getAttribute('data-section-id'));
                var newDiv = document.createElement("div");
                newDiv.setAttribute("class","filterID");
                newDiv.innerHTML = ".page-section[data-section-id='" + id_list[i] + "']";
                document.getElementsByTagName("section")[i].appendChild(newDiv);
                newDiv.style.position = "absolute";
                newDiv.style.color="white";
                newDiv.style.borderBottom=" 1px solid yellow";
                newDiv.style.backgroundColor="#001442";
                newDiv.style.padding="20px";
            }  
        }   

})();  
                                
