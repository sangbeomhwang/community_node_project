import request from "/js/lib/request.js";

const template = ({ boardidx, nickname, register, title, hashtag, hit, like, comment }) => `
 <li data-boardidx="${boardidx}">
   <div class="li_user">
     닉네임 ${nickname}
     <div>
     <span>등록일시</span>
       <span>${register}</span>
     </div>
   </div>
   <div class="li_sub"><a href="#">${title}</a></div>
   <div class="li_Cate">
     <a href="#">#Gitjub #Repository</a>
     <div>
       <div>
         조회수<img
         src="/img/hits.png"
         /><span>${hit}</span>
       </div>
       <div>
         좋아요<img
         src="/img/likes.png"
         /><span>0</span>
       </div>
       <div>
         댓글<img
         src="/img/comments.png"
         /><span>0</span>
       </div>
     </div>
   </div>
 </li>
 `;

const contentBox = document.querySelector("#content_body > ul");

document.querySelector("#searchbox").addEventListener("keyup", async (e) => {
  e.preventDefault();
  if (e.keyCode === 13) {
    const searchbox = e.target;
    const response = await request.get(`/boards/search?keyword=${searchbox.value}`);

    contentBox.innerHTML = "";
    for (let i = 0; i < response.data.length; i++) {
      contentBox.innerHTML += template(response.data[i]);
    }
    return response;
  }
});
