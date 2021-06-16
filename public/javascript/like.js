


  var likeBtn = document.querySelectorAll('.upvote-btn');
  var likeId;

   function checkForNotif(){
  const response =  fetch('/api/likes/', {
    method: 'get'

    
  })
  
  .then(response => {
    return response.json()
   
}).then(function(data){
   console.log(data);
   data.forEach(element => {
    console.log(element.user.username)
   });

}).catch(err => {
    console.log(err);
    res.status(500).json(err);
});

}


async function upvoteClickHandler(event) {
    event.preventDefault();
    var btn = this;
    likeId = (this.id);
    
    var splitString = likeId.split("_");
    var newId = splitString[1];
    console.log(newId);
    
    const response = await fetch('/api/posts/likes', {
        method: 'PUT',
        body: JSON.stringify({
          post_id: newId
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        //btn.remove();
        document.location.reload();
      } else {
        //alert(response.statusText);
        

      }
  }
  for(var i =0; i < likeBtn.length; i ++){
   likeBtn[i].addEventListener('click', upvoteClickHandler);
}
checkForNotif();
