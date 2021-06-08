// Get the modal

var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("feelingToday");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
async function addtoPost(event){
event.preventDefault();
console.log("writing to post");
const title = document.querySelector("#contentForPost").value;

const response = await fetch('/api/posts', {
    
    method: 'post',
    body:JSON.stringify({
        title,
        post_url: "www.test.com"
        
        }),

        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      //document.location.replace('/');
      console.log("good");
      modal.style.display = "none";
    } else {
      alert(response.statusText);
    } 
    
}


document.querySelector('#whatYouWrite').addEventListener('click', addtoPost);