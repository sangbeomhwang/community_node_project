import request from "/js/lib/request.js";

const template = ({ boardidx, nickname, register, title, hashtag, hit, like, comment }) => `
 <li data-set="${boardidx}">
   <div class="li_user">
     닉네임 ${nickname}
     <div>
       <span>${register}</span>
     </div>
   </div>
   <div class="li_sub"><a href="#">${title}</a></div>
   <div class="li_Cate">
     <a href="#">#Gitjub #Repository</a>
     <div>
       <div>
         조회수<img
           src="https://i.postimg.cc/XYD9XSTJ/ph-eye.png"
         /><span>${hit}</span>
       </div>
       <div>
         좋아요<img
           src="https://i.postimg.cc/JnXFPQbN/Vector.png"
         /><span>0</span>
       </div>
       <div>
         댓글<img
           src="https://i.postimg.cc/5ynS3Hk5/Vector-1.png"
         /><span>0</span>
       </div>
     </div>
   </div>
 </li>
 `;

const contentBox = document.querySelector("#content_body > ul");

const firstRender = async () => {
  // await request.get(`/boards?mainidx=${mainidx}&subidx=${subidx}&page=${page}`);
  const { data } = await request.get(`/boards?mainidx=1&page=1`);
  contentBox.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    contentBox.innerHTML += template(data[i]);
  }
};

firstRender();
