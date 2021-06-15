//session = require('../../server');
/////////////////////////  
var number;
var foundPost;
var commentBlock;
var commentId;
alreadyClicked = false;
////////////////////////////////
async function getInfo(event){
    event.preventDefault();
    var userComment = document.querySelector(".postComment");
    console.log(userComment.value);

    var userCommentValue = userComment.value;
    console.log(number);
    console.log(foundPost);
    const response = await fetch('/api/comments', {
        
        method: 'post',
        body:JSON.stringify({
            comment_text: userCommentValue,
            //user_id: session.user_id,
            ///post url
            post_id: foundPost
            }),
    
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response){ 
        return response.json()})
        .then(function(data) {
            //location.reload();
            console.log(data);
            //window.location='/post/' + foundPost;
            var block = document.createElement("section");
            /************************************************************/
            const response = fetch('/api/posts/' + foundPost, {
    
                method: 'get',
                
                })
        
                
                .then(response => {
                    return response.json()
                   
                }).then(function(data){
                    console.log(data);
                    dataParsed = (data.comments);
                    //console.log(dataParsed);
                    var index = dataParsed.length -1
                    console.log(index);
                    console.log(dataParsed[index]);
                    var thisComment = dataParsed[index]
                    //console.log(session);
                    block.innerHTML = 
                     `
                    <div class="meta">
                    ${thisComment.user.username} on ${new Date().toLocaleDateString() }
                    </div>
                    <div class = "smallProfilePic"><img src="${thisComment.user.user_pic}"></div>
                    
                    <div class = "parentRealText">
                        <div class="text">
                        ${thisComment.comment_text}
                        </div>
                    </div>
                    `
          block.setAttribute("class", "commentUploader");
          allCommentsBlock =  document.querySelector('.comments');
          document.querySelector(".postComment").value = "";
          commentId.appendChild(block);
                })
                .catch(err => {
                console.log(err);
                });
            
        
            /************************************************************/
            
    });

    }
/*******************************************************************/
function addComment(){
    var commenter;
    var comments;
   

    if(!alreadyClicked){
        alreadyClicked = true;
        var foundId = (document.querySelector(".comment"));
        console.log(foundId);
        var splitString = foundId.id.split("_");
        console.log(splitString);
        number = splitString[1];        
        //use this to find proper comments
        foundPost = splitString[0];
        //console.log(number);
        commentId = document.getElementById(foundPost+"_comments");
        console.log(commentId);
        //console.log(foundPost);
            console.log("add comment");
            let div = document.createElement("div");
            div.setAttribute("class", "commenter");
            var post = this.parentElement;
            var parent = post.parentElement;
            //var granparent = parent.parentElement;
            console.log(post);
            
            /*commentBlock = document.querySelector(foundPost);
            console.log(commentBlock);*/
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

            //commentBlock.removeAttribute("class", "displayNone");
            var totalBlock = document.getElementById(foundPost);
            console.log(totalBlock);
            //commentId.appendChild(div);
            totalBlock.appendChild(div);
            document.querySelector('#submitComment').addEventListener('click', getInfo);
            
            //alreadyClicked = false;
        }
        else{
            if(commenter = document.querySelector(".commenter")){
    
                commenter.remove();
                alreadyClicked = false;
                    /*if(comments = document.getElementsByName("theBlock")){
                    console.log(comments);
                    comments.forEach(element => {
                        element.setAttribute("class", "displayNone");
                    });
                }*/
                }
        }
    }
   

  var allComments =  document.querySelectorAll('.comment');
  for(let i = 0; i < allComments.length; i++){
      element = allComments[i].addEventListener('click', addComment);
    }

    //<a  id = "{{id}}_{{user.id}}" class = 'comment'>view {{comments.length}} comment(s)</a>
