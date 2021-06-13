/////////////////////////  
var theParent;
alreadyClicked = false;
async function getInfo(event){
    event.preventDefault();
    var userComment = document.querySelector(".postComment");
    console.log(userComment.value);
    var userCommentValue = userComment.value;
    const response = await fetch('/api/comments', {
    
        method: 'post',
        body:JSON.stringify({
            comment_text: userCommentValue,
            user_id: 1,
            post_id: 1
            }),
    
            headers: { 'Content-Type': 'application/json' }
        });
    
        if (response.ok) {
       
          console.log("good");
        } else {
          alert(response.statusText);
        } 
        
    }

function addComment(){
    var commenter;
    var comments;
    if(commenter = document.querySelector(".commenter")){
    
    commenter.remove();
    alreadyClicked = false;
        if(comments = document.getElementsByName("theBlock")){
        console.log(comments);
        comments.forEach(element => {
            element.setAttribute("class", "displayNone");
        });
    }
    }

    if(!alreadyClicked){
        alreadyClicked = true;
        var foundId = (this.id);
        var splitString = foundId.split("_");
        var number = splitString[1];
        console.log(number);
            console.log("add comment");
            let div = document.createElement("div");
            div.setAttribute("class", "commenter");
            var post = this.parentElement;
            var parent = post.parentElement;
            //var granparent = parent.parentElement;
            console.log(parent);
            
            var commentBlock = document.getElementById(number);
            
            /*************************************************************/
            div.innerHTML = `<form class="comment-form">
            <div>
                <textarea class = "postComment" name="comment-body" placeholder = "leave comment here..."></textarea>
            </div>
            
            <div class = "submitUpvote">
                <button id = "submitComment" type="click">add comment</button>
            </div>
            </form>`
            /*************************************************************/

            commentBlock.removeAttribute("class", "displayNone");
            //commentBlock.setAttribute("class", "comments");
            commentBlock.appendChild(div);
            //document.querySelector('#submitComment').addEventListener('click', getInfo);
            alreadyClicked = true;
        }
        else{
                 }
    }
   

  var allComments =  document.querySelectorAll('.comment');
  for(let i = 0; i < allComments.length; i++){
      element = allComments[i].addEventListener('click', addComment);
    }

  