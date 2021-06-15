var trueID;
var adjustedWord;
var finalArray = [];
var idArray = [];
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
                 //console.log(adjustedWord);
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
                         idArray.push(elementName.username + "_" + elementName.id);
                         //console.log(idArray);  
                        /**************************************/
                        parentSearch.appendChild(searchColumn);
                        /*var a = document.createElement("a"); 
                        //////////////////////////
                        a.setAttribute('href', "/user/" + elementName.id);       
                        /////////////////////////   
                        console.log(elementName.id);      
                        a.innerText = elementName.username;
                        searchColumn.appendChild(a);*/
                        /**************************************/
                    }
                }
               
            }
            else{
                finalArray = finalArray.filter(e => e !== elementName.username);
                //console.log(finalArray);
                //return;                        
                //console.log(finalArray)

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
                            idArray.forEach(elementID => {
                               let string = elementID
                                let substring = element; 
                            if(string.includes(substring)){
                                //console.log(string);
                              var split = string.split("_");
                                trueID = split[1];
                                //console.log(trueID);
                            }

                            })
                            
                            //console.log(string.includes(substring)
                            var a = document.createElement("a");
                            //console.log(elementName) 
                            //////////////////////////
                            a.setAttribute('href', "/user/posts/" + trueID);
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

