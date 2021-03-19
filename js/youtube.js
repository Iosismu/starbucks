 // 2. This code loads the IFrame Player API code asynchronously.
 var tag = document.createElement('script');

 tag.src = "https://www.youtube.com/iframe_api"; // 유튜브 라이브러리
 var firstScriptTag = document.getElementsByTagName('script')[0];
 firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

 // 3. This function creates an <iframe> (and YouTube player)
 //    after the API code downloads.
 function onYouTubeIframeAPIReady() { // 함수이름 바꾸면 절~대 완되용~~
    new YT.Player('player', {
    videoId: 'CKZvWhCqx1s', // youtube url 끝 아이디 값만
    playerVars: {
      autoplay: true, // 자동 재생 유무
      loop: true, // 반복 재생 유무
      playlist: 'CKZvWhCqx1s' // loop가 true일 경우 반복재생할 영상의 ID 목록
    },
    events: {
      onReady: function (event) { // 속성에 익명함수가 할당 되있으면 메소드라고 부른다
        event.target.mute() // 음소거
      }
    }
   });
 }