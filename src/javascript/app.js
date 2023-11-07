const ajax = new XMLHttpRequest();
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = `https://api.hnpwa.com/v0/item/@id.json`;
const getData = ({url}) => {
  ajax.open("GET", url, false);
  ajax.send();
  return JSON.parse(ajax.response);
};

const root = document.getElementById('root');
const ul = document.createElement("ul");
const content = document.createElement("div");

function newsFeed() {
  const newsFeed = getData({url: NEWS_URL});
  const newsList = [];
  newsList.push(`<ul>`);

  for(let i = 0; i < newsFeed.length; i++) {
    const div = document.createElement("div");
    const newsItem = newsFeed[i];

    newsList.push(`
      <li>
        <a href="#${newsItem.id}">
          ${newsItem.title} (${newsItem.comments_count})
        </a>
      </li>
    `);
  };
  
  newsList.push(`</ul>`);
  root.innerHTML = newsList.join("");
}

function newsDetail() {
  const id = location.hash.substring(1);
  const newsContent = getData({url: CONTENT_URL.replace("@id", id)});
  const title = document.createElement("h1");
  root.innerHTML = `
    <h1>${newsContent.title}</h1>
    <div>
      <a href="#">목록</a>
    </div>
  `;
};

function router() {
  const routePath = location.hash;
  if(routePath === "") {
    newsFeed();
  } else {
    newsDetail();
  };
}

window.addEventListener("hashchange", router);

router();