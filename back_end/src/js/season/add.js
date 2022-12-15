"use strict";

const year = document.querySelector("#year"),
 addBtn = document.querySelector("button");

addBtn.addEventListener("click", addSeason);

function addSeason() {
    const req = {
        year: year.value,
    };

    fetch("/season/add", {
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

