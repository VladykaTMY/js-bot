// ==UserScript==
// @name         SuperBot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.google.com/*
// @match        https://yandex.ru/*
// @match        https://napli.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==


//общие переменные
let sites = {
    "napli.ru":["10 самых популярных шрифтов от Google ",
                "Отключение редакций и ревизий в WordPress ",
                "Вывод произвольных типов записей и полей в WordPress"],
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":["гобой",
                                           "Как звучит флейта",
                                           "Кларнет", "Валторна"]
}
let searchs = ["https://www.google.com/","https://yandex.ru/"];

let site = Object.keys(sites)[getRandom(0,Object.keys(sites).length)];
let keywords = sites[site];
let links = document.links;
let keyword = keywords[getRandom(0,keywords.length)];
let i=0;
//для гугла
let btnK = document.getElementsByName("btnK")[0];
let googleInput = document.getElementsByName("q")[0];
//для яндекса
let yaInput = document.getElementById("text");
let btnN = document.getElementsByClassName("button_theme_search")[0];
let nextYaPage;

if(btnK!==undefined){
    document.cookie = "site=" + site;
}else if(btnN!== undefined){
    document.cookie = "site=" + site;
}else if(location.hostname == "yandex.ru"){
    site = getCookie("site");
}else if(location.hostname == "www.google.com"){
    site = getCookie("site");
}else {
    site = location.hostname;
}

if(btnK!==undefined){
    document.cookie = "site="+site;
    let timerId = setInterval (()=>{
        googleInput.value += keyword[i];
        i++;
        if(i==keyword.length){
            clearInterval(timerId)
            btnK.click();
        }
    },500);

}else if(btnN!== undefined){
    document.cookie = "site=" + site;
    let timerId = setInterval(()=>{
        yaInput.value += keyword[i];
        i++;
        if(i==keyword.length){
            clearInterval(timerId);
            btnN.click();
        }
    },500);

}else if(location.hostname == site ){
    //console.log("проверено");
    setTimeout(()=>{
        let index = getRandom(0,links.length);
        let r = getRandomSearch(0,1);
        if(getRandom(0,101)>=50){
            location.href=searchs[r];
            console.log("обратно в поисковик");

        }
        else(links[index].href.indexOf(site)!=-1);
        links[index].click();
    }, 4000);

}


else{
    let nextGooglePage = true;
    for(let i =0; i<links.length; i++){
        if (links[i].href.indexOf(site)!=-1){
            let link = links[i];
            console.log("Нашел фразу " + link);
            nextGooglePage = false;
            setTimeout(()=>{
                link.click();}
                       ,getRandom(5000,10000));
            break;
        }
    }
    if(document.querySelector('.YyVfkd').innerText == "5"){
        nextGooglePage = false;
        location.href = "https://www.google.com/";
    }

    if(nextGooglePage){
        setTimeout(()=>{
            pnnext.click();}
                   ,getRandom(5000,8000));
    }
    nextYaPage = true; //Добавляем переменную переключающую на следующую страницу
    for(let i=0; i<links.length; i++){
        if(links[i].href.indexOf(site)!=-1){
            let link = links[i];
            console.log("Найдено "+link);
            nextYaPage = false;
            setTimeout(()=>{// задержка клика
                link.removeAttribute("target");
                link.click();
            }, getRandom(7000,10000));
            break;
        }
    }
    if(document.querySelector('.pager__item_current_yes').ariaLabel =="Текущая страница 6"){
        nextYaPage = false;
        location.href = "https://yandex.ru/";
    }
    if (nextYaPage === true){// нажимаем на кнопку следующая страница в течении 3-5 сек
        setTimeout(()=>{
            document.querySelector(".pager__item_kind_next").click();
        }, getRandom(5000,10000));
    }

}



function getRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}

function getRandomSearch(min,max){
    return Math.round(Math.random()*(max-min)+min);
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
