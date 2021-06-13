var adjustedWord;
var finalArray = [];
var dataResponse;
openTable = false;
oneTimeOnly = true;
var searchColumn;
var parentSearch;
var lengthOfSearch;
var previousLength = 0;
var nameArray = [];
test = true;

/********************************************/
function findUser(dataResponse){
    
    nameArray = [];
    previousLength = lengthOfSearch;

    //console.log(lengthOfSearch);
    var firstLetter = searcher.value.charAt(0).toUpperCase();
    var secondLetter = searcher.value.charAt(1).toLowerCase();
    //console.log(firstLetter);
    //console.log(searcher);
    if(!openTable){
        searchColumn = document.createElement("div");
        parentSearch = searcher.parentElement;
        //searchColumn.innerText="hello"
        searchColumn.setAttribute("class", "searchIndex");

        var span = document.createElement("span");
        span.innerText = "x";
        searchColumn.appendChild(span);

        span.onclick = function() {
        searchColumn.remove()
        openTable = false;

        }
        //parentSearch.appendChild(searchColumn);
        openTable = true;
    }        
                
            lengthOfSearch = searcher.value.length;
            for(var i = 0; i < searcher.value.length; i++){
            //adjustedWord = searcher.value.charAt(0).toUpperCase() + searcher.value.slice(i);
            if(i === 0){
                adjustedWord = searcher.value.charAt(0).toUpperCase()
            }
            else if(i > 0){
                adjustedWord = adjustedWord + searcher.value.charAt(i).toLowerCase();
                }
            }
            //nameArray = [];
            if(dataResponse){
             dataResponse.forEach(element => {
                 console.log(adjustedWord);
                nameArray.push(element);
            });       
        }
                            //console.log(nameArray);    

            nameArray.forEach(elementName => {
               
                for(var i = 0; i < adjustedWord.length; i++){
                        
                if(adjustedWord.charAt(i) === elementName.username.charAt(i)){
                    if(adjustedWord.charAt(i -1) === elementName.username.charAt(i -1)){
                    
                        if(!finalArray.includes(elementName.username)){
                        finalArray.push(elementName.username);

                        /**************************************/
                        /*while (searchColumn.firstChild) {
                        searchColumn.removeChild(searchColumn.firstChild);
                        }*/
                        parentSearch.appendChild(searchColumn);
                        var a = document.createElement("a"); 
                        //////////////////////////
                        a.setAttribute('href', "/api/users/" + elementName.id);       
                        /////////////////////////         
                        a.innerText = elementName.username;
                        searchColumn.appendChild(a);
                        /**************************************/
                    }
                }
               
            }
            else{
                finalArray = finalArray.filter(e => e !== elementName.username);
                //console.log(finalArray);
                //return;
            }
             /**************************************/
                        while (searchColumn.firstChild) {
                        searchColumn.removeChild(searchColumn.firstChild);
                        } 
                        if(finalArray.length > 0){
                        parentSearch.appendChild(searchColumn);
                        }
                        else{
                            searchColumn.remove();
                        }  
                        /////////////////////////
                        finalArray.forEach(element => {
                            var a = document.createElement("a"); 
                            //////////////////////////
                            a.setAttribute('href', "/api/users/" + elementName.id);
                            a.innerText = element;
                            searchColumn.appendChild(a);
                        });        
                         if(lengthOfSearch < 1){
                console.log("less than last search");
                searchColumn.remove();
                openTable = false;
                         }
                        /**************************************/
        }
    });
    }
        
                    //console.log(element.username + "" + i);
                    /*while (searchColumn.firstChild) {
                    searchColumn.removeChild(searchColumn.firstChild);
                    }*/

                //console.log("found match");
                
                /*parentSearch.appendChild(searchColumn);
                var a = document.createElement("a"); 
                //////////////////////////
                a.setAttribute('href', "/api/users/" + element.id);       
                /////////////////////////         
                a.innerText = element.username;
                searchColumn.appendChild(a);*/

                //console.log(searchColumn.childElementCount);
                /*while (searchColumn.firstChild) {
                    searchColumn.removeChild(searchColumn.firstChild);
                    }*/
            
            /*else{
                nameArray = nameArray.filter(e => e !== element.username);
                console.log(nameArray);
                
            }*/
            /*else if(lengthOfSearch < previousLength){
                console.log("less than last search");
                searchColumn.remove();
                openTable = false;*/
            
            
        
        //console.log(nameArray)
    
            


/****************************************** */

async function searchForUsers(){
    if(oneTimeOnly){
        oneTimeOnly = false;
    const response = await fetch('/api/users', {
    
        method: 'get',
       
        })

        
        .then(response => {
            return response.json()
           
        }).then(function(data){
            //console.log(data);
            //data.forEach(element => console.log(element.username)
            dataResponse = data;
            
            /*console.log(data[0].username);
            if(firstLetter === data[0].username.charAt(0)){
                console.log("found match");
                var p = document.createElement("p");
                p.innerText = data[0].username;
                searchColumn.appendChild(p);
            }*/
        })
        .catch(err => {
        console.log(err);
        });
        }
            findUser(dataResponse);
        }



var searcher = document.querySelector('.inputContent');
searcher.addEventListener('input', searchForUsers);

