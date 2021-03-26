//Megjegyzés: kértem a léptetés megírásánál egy kis segítséget, mert nekem egyedül nem sikerült sehogy sem megcsinálni, pedig a logikáját kitaláltam :( A többi része ment teljesen önállóan is

let kérdések;
let index;
let kerdes_szoveg, kerdes_valaszok, kerdes_kep;
let kattinthato = false;

async function letöltés() {
  let k = await fetch("./questions.json");
  k = await k.json();

  letöltésBefejeződött(k);
}

function letöltésBefejeződött(k) {
  kérdések = k;
}

function kérdésMegjelenítés(kérdés) {
  kerdes_valaszok.forEach((v) => {
    v.classList.remove("jó", "rossz", "választott");
  });

  const kerdes = kérdések[kérdés];

  kerdes_szoveg.innerHTML = kerdes.questionText;
  kerdes_valaszok[0].innerHTML = kerdes.answer1;
  kerdes_valaszok[1].innerHTML = kerdes.answer2;
  kerdes_valaszok[2].innerHTML = kerdes.answer3;
  kerdes_kep.src =
    kerdes.image !== ""
      ? `https://szoft1.comeback.hu/hajo/${kerdes.image}`
      : "";
  if (!kattinthato) kattinthatoValtas();
}

window.addEventListener("load", async (event) => {
  index = 0;

  document.querySelector("#elsőgomb").addEventListener("click", visszalép);
  document.querySelector("#másodikgomb").addEventListener("click", előrelép);

  kerdes_szoveg = document.querySelector("#kérdés_szöveg");
  kerdes_valaszok = document.querySelectorAll(".kérdés");
  kerdes_kep = document.querySelector("#kép").children[0];

  kerdes_valaszok.forEach((v) => v.addEventListener("click", válaszol));

  await letöltés();
  kérdésMegjelenítés(index);
});

function előrelép() {
  index = index + 1 >= kérdések.length ? 0 : index + 1;
  kérdésMegjelenítés(index);
}
function visszalép() {
  index = index - 1 < 0 ? kérdések.length - 1 : index - 1;
  kérdésMegjelenítés(index);
}

function válaszol(event) {
  if (kattinthato) {
    const választott = event.target;
    const választott_id = parseInt(választott.id.substring(6));

    kerdes_valaszok.forEach((v) => {
      const id = parseInt(v.id.substring(6));
      if (választott_id === kérdések[index].correctAnswer) {
        if (választott_id === id) v.classList.add("jó");
      } else {
        if (id === kérdések[index].correctAnswer) v.classList.add("jó");
        else if (id === választott_id) v.classList.add("választott");
        else v.classList.add("rossz");
      }
    });
    kattinthatoValtas();
  }
}

function kattinthatoValtas() {
  kattinthato = !kattinthato;
}
