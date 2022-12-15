"use strict";

const opponent = document.querySelector("#opponent");
const tournament = document.querySelector("#tournament");
const date = document.querySelector("#date");
const result = document.querySelector("#result");
const goal_for = document.querySelector("#goal_for");
const goal_against = document.querySelector("#goal_against");
const shot = document.querySelector("#shot");
const possession = document.querySelector("#possession");
const pass = document.querySelector("#pass");
const key_pass = document.querySelector("#key_pass");
const dribble = document.querySelector("#dribble");
const tackle = document.querySelector("#tackle");
const clear = document.querySelector("#clear");
const block = document.querySelector("#block");
const rating = document.querySelector("#rating");
const addBtn = document.querySelector("button");

addBtn.addEventListener("click", addTeamGameStat);

function addTeamGameStat() {
    let urlStr = window.location.href;
    let contentid = urlStr.split('/');

    const req = {
        opponent: opponent.value,
        tournament: tournament.value,
        date: date.value,
        result: result.value,
        goal_for: goal_for.value,
        goal_against: goal_against.value,
        shot: shot.value,
        possession: possession.value,
        pass: pass.value,
        key_pass: key_pass.value,
        dribble: dribble.value,
        tackle: tackle.value,
        clear: clear.value,
        block: block.value,
        rating: rating.value
    };

    fetch(`/season/team/${contentid[5]}/player/${contentid[7]}/teamgs/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req)
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.code === 200) {
                location.href = `/season/team/${contentid[5]}/player/${contentid[7]}/teamgs/show`;
            }else {
                alert(res.message);
            }
        })
        .catch((err) => {
            console.error("에러 발생");
        });
}