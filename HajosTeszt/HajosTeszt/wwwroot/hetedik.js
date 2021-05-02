//Megjegyzés: kértem a léptetés megírásánál egy kis segítséget, mert nekem egyedül nem sikerült sehogy sem megcsinálni, pedig a logikáját kitaláltam :( A többi része ment teljesen önállóan is

let kerdes;
let index;
let kerdes_szoveg, kerdes_valaszok, kerdes_kep;
let kattinthato = false;

function kérdésBetölt(id) {
    fetch(`/questions/${id}`)
        .then(res => {
            if (!res.ok) console.log(`HIBA! ${res.status}`);
            else return res.json();
        })
        .then(res => kérdésMegjelenítés(res))
}

function kérdésMegjelenítés(kérdés) {
    kerdes_valaszok.forEach((v) => {
        v.classList.remove("jó", "rossz", "választott");
    });

    kerdes = kérdés;

    kerdes_szoveg.innerHTML = kérdés.questionText;
    kerdes_valaszok[0].innerHTML = kérdés.answer1;
    kerdes_valaszok[1].innerHTML = kérdés.answer2;
    kerdes_valaszok[2].innerHTML = kérdés.answer3;

    kerdes_kep.src =
        kérdés.image !== ""
            ? `https://szoft1.comeback.hu/hajo/${kérdés.image}`
            : "";

    if (!kattinthato) kattinthatoValtas();

}

window.addEventListener("load", (event) => {
    index = 1;

    document.querySelector("#elsőgomb").addEventListener("click", visszalép);
    document.querySelector("#másodikgomb").addEventListener("click", előrelép);

    kerdes_szoveg = document.querySelector("#kérdés_szöveg");
    kerdes_valaszok = document.querySelectorAll(".kérdés");
    kerdes_kep = document.querySelector("#kép1");
    kerdes_kep.addEventListener("error", képEllenőrzés);

    kerdes_valaszok.forEach((v) => v.addEventListener("click", válaszol));

    kérdésBetölt(index);
});


function előrelép() {
    index = index + 1 > 800 ? 1 : index + 1;
    kérdésBetölt(index);
}
function visszalép() {
    index = index - 1 < 1 ? 800 : index - 1;
    kérdésBetölt(index);
}


function válaszol(event) {
    if (kattinthato) {
        const választott = event.target;
        const választott_id = parseInt(választott.id.substring(6));

        kerdes_valaszok.forEach((v) => {
            const id = parseInt(v.id.substring(6));
            if (választott_id === kerdes.correctAnswer) {
                if (választott_id === id) v.classList.add("jó");
            } else {
                if (id === kerdes.correctAnswer) v.classList.add("jó");
                else if (id === választott_id) v.classList.add("választott");
                else v.classList.add("rossz");
            }
        });
        kattinthatoValtas();
    }
}

//const kattinthatoValtas = () => {kattinthato = !kattinthato;}
function kattinthatoValtas() {
    kattinthato = !kattinthato;
}



function képEllenőrzés(event) {
    if (event.srcElement.naturalHeight == 0) event.srcElement.src = "";
}
