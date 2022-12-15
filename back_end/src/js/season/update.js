"use strict";

const year = document.querySelector("#year"),
 addBtn = document.querySelector("button");

addBtn.addEventListener("click", updateSeason);

function updateSeason() {
    const req = {
        year: year.value,
    };

    fetch(`/season/${contentid[4]}/update`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req)
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.code === 200) {
                location.href = "/season/show";
            }else {
                alert(res.message);
            }
        })
        .catch((err) => {
            console.error("에러 발생");
        });
}