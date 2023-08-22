/** 
 * XMLHttpRequest
 * 서버에 데이터를 요청하기 위한 브라우저 내장 객체
 * */
//변수 ajax에 다른 값을 할당할 필요가 없어서 const로 선언 
const ajax = new XMLHttpRequest();
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = `https://api.hnpwa.com/v0/item/@id.json`;
// 요구사항 - XHLHttpRequest 객체를 통해 Hacker news에서 제공하는 api를 사용하여 news feed 리스트를 가져온다. 
const getData = ({url}) => {
  /**
   * XMLHttpRequest.open
   * 새로운 http request를 만들거나 기존 request를 초기화한다. 
   * parameters (http method, url, async, user, password)
   * 
   * optional
   * async, 요청을 비동기로 처리할지 여부, boolean, default = true
   * user, 인증 목적으로 사용할 유저 이름, default = null
   * password, 인증 목적으로 사용할 비밀번호, default = null 
   */
  ajax.open("GET", url, false);
  /**
   * XMLHttpRequest.send
   * 서버에 요청을 전송한다.
   * parameter, (body)
   * optional
   * body, 요청으로 전송할 데이터
   */
  ajax.send();
  /**
   * ajax.response
   * 요청한 데이터를 JSON 객체로 확인할 수 있다.
   */
  return JSON.parse(ajax.response);
};

const newsFeed = getData({url: NEWS_URL});

// 요구사항 - 받아온 데이터의 title을 ul, li 태그를 사용하여 보여준다.
/**
 * 1. ul tag를 만들어준다. ul 변수의 값에 다른 값을 할당할 필요가 없어서 상수 const로 선언
 * 2. for 문을 돌려 for문이 도는동안 새로운 li element를 만들고 newsFeed의 각 데이터 타이틀을 li.innerHTML에 할당해준다
 * 3. 데이터 타이틀이 할당된 li element를 ul element에 추가한다.
 * 4. li element가 모두 추가된 ul element를 root element에 추가한다.
 * 5. 
 */

// 역시 root의 값은 변경될 일이 없어서 상수 const로 선언 
const root = document.getElementById('root');
const ul = document.createElement("ul");
const content = document.createElement("div");

for(let i = 0; i < newsFeed.length; i++) {
  const div = document.createElement("div");
  const newsItem = newsFeed[i];

  /**
   * DOM API 최소화
   * 1. 임시로 태그(div)를 만든다.
   * 2. div.innerHTML에 문자열로 실제 할당할 태그를 작성한다.
   * 3. 태그 문자열에 데이터를 삽입한다.
   * 4. div태그의 첫번째 자식 요소를 할당되어야 할곳에 appendChild로 할당 시켜준다. 
   */
  div.innerHTML = `
    <li>
      <a href="#${newsItem.id}">
        ${newsItem.title} (${newsItem.comments_count})
      </a>
    </li>
  `;
  ul.appendChild(div.firstElementChild);
};

/**
 * hashchange Event
 * window.location의 hash가 바뀔때마다 호출되는 event
 * 
 * 1. a 태그의 href요소에 #을 붙여서 hash 사용
 * 2. #의 id 값만 사용하기 위해 #을 지워줌 
 *  2-1. substring(시작 index, 마지막 index), 
 *    1. 시작 index 부터 마지막 index까지의 문자열을 가지고 옴
 *    2. 하나의 parameter만 넘겨줄 경우 해당 index부터 문자열의 끝의 값만 가지고 옴
 * 3. hash로 가지고 온 id를 통해 url을 만들어 content data api를 호출
 * 3. title 변수에 h1 태그를 만들어 할당. 
 * 4. title.innerHTML로 content data의 title을 할당
 * 5. content element에 title element 추가
 */

window.addEventListener("hashchange", () => {
  const id = location.hash.substring(1);
  const newsContent = getData({url: CONTENT_URL.replace("@id", id)});
  const title = document.createElement("h1");

  title.innerHTML = newsContent.title;
  content.appendChild(title);
});


root.appendChild(ul);
root.appendChild(content);