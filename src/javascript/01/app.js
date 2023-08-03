/** 
 * XMLHttpRequest
 * 서버에 데이터를 요청하기 위한 브라우저 내장 객체
 * */
//변수 ajax에 다른 값을 할당할 필요가 없어서 const로 선언 
const ajax = new XMLHttpRequest();

// 요구사항 - XHLHttpRequest 객체를 통해 Hacker news에서 제공하는 api를 사용하여 news feed 리스트를 가져온다. 
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
ajax.open("GET", "https://api.hnpwa.com/v0/news/1.json", false);

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
const newsFeed = JSON.parse(ajax.response);

// 요구사항 - 받아온 데이터의 title을 ul, li 태그를 사용하여 보여준다.
/**
 * 1. ul tag를 만들어준다. ul 변수의 값에 다른 값을 할당할 필요가 없어서 상수 const로 선언
 * 2. for 문을 돌려 for문이 도는동안 새로운 li element를 만들고 newsFeed의 각 데이터 타이틀을 li.innerHTML에 할당해준다
 * 3. 데이터 타이틀이 할당된 li element를 ul element에 추가한다.
 * 4. li element가 모두 추가된 ul element를 root element에 추가한다.
 */
const ul = document.createElement('ul');

for(let i = 0; i < newsFeed.length; i++) {
  const li = document.createElement("li");
  li.innerHTML = newsFeed[i].title
  ul.appendChild(li);
};

// 역시 root의 값은 변경될 일이 없어서 상수 const로 선언 
const root = document.getElementById('root');
root.appendChild(ul);
