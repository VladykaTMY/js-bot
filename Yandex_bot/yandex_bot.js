// ==UserScript==
// @name         Bot for Yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        https://xn----8sbabr6ahc3e.xn--p1ai/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let keywords = ["тюнинг приоры ", "Подвеска двигателя нового образца"," руководство лада калина"];
let btnN = document.getElementsByClassName("button_theme_search")[0]
let links = document.links;
let keyword = keywords[getRandom(0, keywords.length)];
let yaInput = document.getElementById("text");
let i = 0;

if(btnN!== undefined){
    let timerId = setInterval(()=>{
        yaInput.value += keyword[i];
        i++;
        if(i==keyword.length){
            clearInterval(timerId);
            btnN.click();
        }
    },250);

}else if(location.hostname == "xn----8sbabr6ahc3e.xn--p1ai" ){//на сайте лада.онлайн кликаем рандомные ссылки и с вероятностью 70% попадаем на яндекс
    console.log("работает");
    setTimeout(()=>{
        let index = getRandom(0,links.length);
        if(getRandom(0,101)>=10){
            location.href = "https://yandex.ru";
        }
        if(links[index].href.indexOf("xn----8sbabr6ahc3e.xn--p1ai")!=-1)
            links[index].click();
    }, getRandom(1000,2000));

}


else{
    let nextYaPage = true //Добавляем переменную переключающую на следующую страницу
    for(let i=0; i<links.length; i++){
        if(links[i].href.indexOf("xn----8sbabr6ahc3e.xn--p1ai")!=-1){
            let link = links[i];
            console.log("Найдено "+link);
            nextYaPage = false;
            setTimeout(()=>{// задержка клика
                link.removeAttribute("target");
                link.click();}
                       ,getRandom(100,500));
            break;
        }
    }
    if(document.querySelector('.pager__item_current_yes').ariaLabel =="Текущая страница 4"){
        nextYaPage = false;
        setTimeout(()=>{


            location.href = "https://yandex.ru";}
                   ,getRandom(3000,4000));

    }
    if (document.querySelector(".pager__item_current_yes").ariaLabel !=="Текущая страница 4"){// нажимаем на кнопку следующая страница в течении 3-5 сек
        setTimeout(()=>{
            document.querySelector(".pager__item_kind_next").click();}
                   ,getRandom(3000,4000));
    }
}


function getRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}
