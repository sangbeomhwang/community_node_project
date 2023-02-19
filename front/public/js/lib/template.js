const boardListTemplate = ({ boardidx, nickname, register, hash, title, hit, like, comment }) => {
  let hashes;
  if (hash.length > 0) {
    hashes = hash.map((val) => "#" + val).join(" ");
  } else hashes = "";

  return `
 <li data-boardidx="${boardidx}">
   <div class="li_user">
     닉네임 ${nickname}
     <div>
     <span>등록일시</span>
       <span>${register}</span>
     </div>
   </div>
   <div class="li_sub"><a href="/boards/${boardidx}">${title}</a></div>
   <div class="li_Cate">
     <div class="hash">${hashes}</div>
     <div>
       <div>
         조회수<img
           src="/img/hits.png"
         /><span>${hit}</span>
       </div>
       <div>
         좋아요<img
           src="/img/likes.png"
         /><span>${like}</span>
       </div>
       <div>
         댓글<img  
           src="/img/comments.png"
         /><span>${comment}</span>
       </div>
     </div>
   </div>
 </li>
 `;
};

const mainPageTemplate = ({ boardidx, nickname, register, hit, comment, like, title }) => {
  return ` <li>
<div class="first_line">
  <div class="nickname_time_box">
    <div class="nickname">${nickname}</div>
    <div class="time">${register}</div>
  </div>
  <div class="information_box">
    <div class="hits_box">
      <span class="hits"></span>
      <span>${hit}</span>
    </div>
    <div class="reply_box">
      <span class="reply"></span>
      <span>${comment}</span>
    </div>
    <div class="likes_box">
      <span class="likes"></span>
      <span>${like}</span>
    </div>
  </div>
</div>
<div class="seconde_line">
  <a href="/boards/${boardidx}">${title}</a>
</div>
</li>`;
};

export { boardListTemplate, mainPageTemplate };
