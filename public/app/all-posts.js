function loadPosts() {
    if(window.localStorage.user){
      const user = JSON.parse(window.localStorage.user)
      let display="show"
        $.get('/api/posts/', (posts) => {
          for (let p of posts) {
            $('#posts-container').append(
              $(`
              <div class="col-4">
                <div class="card m-2">
                  <div class="card-body">
                    <h5 class="card-title" style="text-align: center;">${p.title}</h5>
                    <a id="${p.id}${p.user.username}" class="btn btn-link text-muted" href="/components/profile.html?q1=${p.user.username}">${p.user.username}</a>
                    <p class="card-text">
                      ${p.body.substr(0, 200)}
                      <a style="color: red" href="/components/singlepost.html?q1=${p.id}">...read more</a>
                    </p>
                    <button type="button" class="btn btn-link-warning" style="" id="like${p.id}">Like</button>
                    <i id="nol" class="fa fa-heart" style="font-size:15px;color:purple"> by ${p.likes}</i>
                    <div class="form-inline" id ="collapseExample">
                    
                      <input id="comment-${p.id}" type="text" class="form-control mb-2 mr-sm-2" placeholder="write a comment....">
                      <div>
                      <button type="submit" id= "${p.id}" class=" btn-primary mb-2 btn-sm">comment</button>
                      <button type="submit" id= "${display}-${p.id}" class="badge badge-pill badge-primary" style="float:right; margin-left: 75px;">show comments</button>
                      </div>
                      
                    </div>
                    <div id="ListId-${p.id}">
                  </div>
                  </div>
                </div>
              </div>
              
              `)
            )
            
            $.get(`api/posts/like/${user.id}/${p.id}`,(data)=>{
                if(data.mssg=="liked"){
                  $(`#like${p.id}`).text("Liked");
                }
                else{$("#like").text("Like");}
            })
    
            $(`#like${p.id}`).click(()=>{
              /* if(user.id==0)
              {
                  window.alert("Login First!!");
                  return;
              } */
              $.post("/api/posts/like",{
                  userid:user.id,
                  postid:p.id
              },(data)=>{
                  $("#nol").text(data.likes);
                  $(`#like${p.id}`).text("Liked");
              })
    
          })
    
            $(`#${p.id}${p.user.username}`).click(()=>{
              console.log("============================================username button working=================================")
            })
    
            $(`#${p.id}`).click(()=>{
              console.log("=========================================button working============================================")
              /* const postId = p.id
              const userId = user.id
              const title = user.username
              const body = $(`#comment-${p.id}`).val() */
      
              const postId = p.id
              const userId = user.id
              const title = user.username
              const body = $(`#comment-${p.id}`).val()
      
             $.post('/api/comments/', {userId, postId, body}, (data)=>{
                console.log('ok sent', data.postId)
              })
    
              /* $.post(`'/comments/${p.id}/${JSON.parse(window.localStorage.user)}'`, {comment:$(`#comment-${p.id}`).val()}, (data)=>{
                console.log('ok sent', data.postId)
              }) */
              //comments()
            })
    
            /* $(`#showcomments-${p.id}`).onclick(() => {
              //$("ListId-${p.id}").hide();
            }) */
    
              function comments(){
                let date = null
                let time = null
                $(`#ListId-${p.id}`).empty()
                $.get(`/api/comments?postId=${p.id}`, (comments)=>{
                  $(`#ListId-${p.id}`).empty()
                  
                  for(let c of comments){
                   /*  for(let l of `${c.createdAt}`){
                    
                    } */
                    
                    console.log('==========================' + `${c.createdAt}` + '===============================')
                    $(`#ListId-${p.id}`).append(
                      $(`
                      
                      <div class="card" style="width: 18rem;" id="comment-card">
                        <div class="card-body">
                          <h6 class="card-subtitle mb-2 text-muted">${c.user.username}</h6>
                          <p class="card-text">${c.body}</p>
                          
                        </div>
                      </div>
                      `)
                    )
                  }
                  
                 })
              }
              
               //comments()
    
              /* $(`#showcomments-${p.id}`).onclick(() => {
                $("ListId-${p.id}").hide();
              })  */
    
              
    
              $(`#${display}-${p.id}`).click(()=>{
                if(display==='show'){
                  comments()
                  $(`#ListId-${p.id}`).show()
                  //console.log($(`#${display}-${p.id}`).text('hide'))
                  $(`#${display}-${p.id}`).text('hide comments')
                  console.log($(`#${display}-${p.id}`).text())
                  display='hide'
                  
                }
                else if(display==='hide'){
                  display='show'
                  $(`#${display}-${p.id}`).text('show comments')
                  $(`#ListId-${p.id}`).hide()
                  
                  console.log($(`#${display}-${p.id}`).text())
                  
                  console.log($(`#${display}-${p.id}`).text())
                }
      
              })
          }
        })
    }else{
      $('#posts-container').append(
          $(`<style>
            #posts-container{
              justify-content: center;
            }
          </style>
          <p>
          <a class="btn btn-info" data-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="true" aria-controls="multiCollapseExample1">OBJECTIVE</a>
          <button class="btn btn-info" type="button" data-toggle="collapse" data-target="#multiCollapseExample2" aria-expanded="true" aria-controls="multiCollapseExample2">FEATURES</button>
          </p>
          <div class="row">
          <div class="col">
            <div class="multi-collapse collapse show" id="multiCollapseExample1" style="">
              <div class="card card-body" id="MC">            
                Our aim is to give a platform to you guys,where you can create new posts related to your favourite topics and share your posts to all the users on our platform.If you think ,you are creative with your posts then surely you will get more likes and followers on our platfrom.<br> Go on share your knowledge with others!
              </div>
            </div>
          </div>
          <div class="col">
            <div class="multi-collapse collapse show" id="multiCollapseExample2" style="">
              <div class="card card-body" id="MC">
                  <ul>
                      <li>Create and post your articles,latest posts will be shown first in the trending section.</li>
                      <li>Posts are categorized into specific keywords or topics,and we can search these posts according to these keywords.</li>
                      <li>Like, comment on posts, follow other creators.</li>
                      <li>Enter the chat room and utilize the multiplayer canvas.</li>
                  </ul>
      
              </div>
            </div>
          </div>
        </div>
          `)
      )
    }

  }

