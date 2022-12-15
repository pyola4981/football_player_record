"use strict";

const position = document.querySelector("#position");
const played = document.querySelector("#played");
const goal_for = document.querySelector("#goal_for");
const shot = document.querySelector("#shot");
const assist = document.querySelector("#assist");
const pass = document.querySelector("#pass");
const key_pass = document.querySelector("#key_pass");
const dribble = document.querySelector("#dribble");
const yellow_card = document.querySelector("#yellow_card");
const red_card = document.querySelector("#red_card");
const tackle = document.querySelector("#tackle");
const foul = document.querySelector("#foul");
const clear = document.querySelector("#clear");
const rating = document.querySelector("#rating");
const addBtn = document.querySelector("button");

addBtn.addEventListener("click", addPlayerGameStat);

function addPlayerGameStat() {
    let urlStr = window.location.href;
    let contentid = urlStr.split('/');

    const req = {
        position: position.value,
        played: played.value,
        goal_for: goal_for.value,
        shot: shot.value,
        assist: assist.value,
        pass: pass.value,
        key_pass: key_pass.value,
        dribble: dribble.value,
        yellow_card: yellow_card.value,
        red_card: red_card.value,
        tackle: tackle.value,
        foul: foul.value,
        clear: clear.value,
        rating: rating.value
    };

    fetch(`/season/player/${contentid[5]}/teamgs/${contentid[7]}/playergs/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req)
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.code === 200) {
                location.href = `/season/player/${contentid[5]}/teamgs/${contentid[7]}/playergs/show`;
            }else {
                alert(res.message);
            }
        })
        .catch((err) => {
            console.error("에러 발생");
        });
}