const webLink = document.querySelector('h1');
const list = document.querySelector('ul');
const title = document.querySelector('#title');
const article = document.querySelector('#article');


webLink.addEventListener('click', function (e) {
    const target = e.target.innerHTML;
    getContent(target)
    title.innerHTML = target;
});

function getList() {
    fetch('./content/list')
        .then(function (response) {
            return response.text();
        })
        .then(function (text) {
            paintList(text);
        })
}

function getContent(listName) {
    fetch(`./content/${listName}`)
        .then(function (response) {
            return response.text();
        })
        .then(function (text) {
            article.innerHTML = text;
            title.innerHTML = listName;
        })
}


function clickList(e) {
    const target = e.target.innerHTML;
    getContent(target)
}


function paintList(text) {
    const item = text;
    item.split(' ').forEach(ele => {
        const li = document.createElement('li');
        li.id = ele.toLowerCase();
        li.addEventListener('click', clickList);
        const a = document.createElement('a');
        a.innerHTML = ele;
        a.href = `#!${ele.toLowerCase()}`;
        li.append(a);
        list.append(li);
    });
}


function init() {
    getList();
    //hash bang
    if (location.hash) {
        //console.log(location.hash.substr(2).toLowerCase());
        getContent(location.hash.substr(2));
    }
}
init();


