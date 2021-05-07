// ==UserScript==
// @name         Bot for Yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        https://napli.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==
let sites = {
    "napli.ru":["10 самых популярных шрифтов от Google ",
                "Отключение редакций и ревизий в WordPress ",
                "Вывод произвольных типов записей и полей в WordPress"],
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":["гобой",
                                           "Как звучит флейта",
                                           "Кларнет", "Валторна"]}
   /* "psyholog.me":["центр здоровых отношений ",
                   "Услуги центра здоровых отношений ",
                   "Чекалина Елена психолог "],
    "xn----8sbabr6ahc3e.xn--p1ai":["тюнинг приоры ",
                                   "Подвеска двигателя нового образца",
                                   " руководство лада калина"]
}*/
//let searchs = ["www.google.com","yandex.ru"];
//let search = object.keys(searchs)[getRandom(0,1)];
//let search = "yandex.ru";//searchs[getRandom(0,searchs.length)];
let site = Object.keys(sites)[getRandom(0,Object.keys(sites).length)];
let keywords = sites[site] ;
let btnN = document.getElementsByClassName("button_theme_search")[0];
let links = document.links;
let keyword = keywords[getRandom(0, keywords.length)];
let yaInput = document.getElementById("text");
let i = 0;
let nextYaPage;
if(btnN!== undefined){
    document.cookie = "site=" + site;
}else if(location.hostname == "yandex.ru"){
    site = getCookie("site");
}else {
    site = location.hostname;
}

if(btnN!== undefined){
    document.cookie = "site=" + site;
    let timerId = setInterval(()=>{
        yaInput.value += keyword[i];
        i++;
        if(i==keyword.length){
            clearInterval(timerId);
            btnN.click();
        }
    },100);

}else if(location.hostname == site ){//на сайте лада.онлайн кликаем рандомные ссылки и с вероятностью 70% попадаем на яндекс
    console.log("Переходим на сайт");
    setTimeout(()=>{
        let index = getRandom(0,links.length);
        if(getRandom(0,101)>=50){
            location.href ="https://yandex.ru/";
        }
        if(links[index].href.indexOf(site)!=-1);
        links[index].click();
    }, getRandom(4000,7000));

}


else{
    nextYaPage = true; //Добавляем переменную переключающую на следующую страницу
    for(let i=0; i<links.length; i++){
        if(links[i].href.indexOf(site)!=-1){
            let link = links[i];
            console.log("Найдено "+link);
            nextYaPage = false;
            setTimeout(()=>{// задержка клика
                link.removeAttribute("target");
                link.click();
            }, getRandom(3000,5000));
            break;
        }
    }
    if(document.querySelector('.pager__item_current_yes').ariaLabel =="Текущая страница 6"){
        nextYaPage = false;
        //setTimeout(()=>{
        location.href = "https://yandex.ru/";}
    //,getRandom(3000,4000));
}

if (nextYaPage === true){// нажимаем на кнопку следующая страница в течении 3-5 сек
    setTimeout(()=>{
        document.querySelector(".pager__item_kind_next").click();
    }, getRandom(3000,5000));
}


function getRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
