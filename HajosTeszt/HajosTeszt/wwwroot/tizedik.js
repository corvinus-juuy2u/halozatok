
let kerdes;
let index;
let kerdes_szoveg, kerdes_valaszok, kerdes_kep;
let kattinthato = false;

var hotList = [];           
var questionsInHotList = 7; 
var displayedQuestion;      
var numberOfQuestions;      
var nextQuestion = 1;      

/*function kérdésBetölt(id) {
    fetch(`/questions/${id}`)
        .then(res => {
            if (!res.ok) console.log(`HIBA! ${res.status}`);
            else return res.json();
        })
        .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)
            }
        );
}
*/



function kérdésBetölt (questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(
            res => {
                if (!res.ok) console.error(`Hibás letöltés: ${res.status}`);
                else return res.json();

            })

        /*.then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)
            })*/

        .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)
                if (displayedQuestion == undefined && destination == 0) { 
                    displayedQuestion = 0;
                    kérdésMegjelenítés();
                }
            })
        /*.then(res => kérdésMegjelenítés(res))*/
}

function init() {
    for (var i = 0; i < questionsInHotList; i++) {
        let q = {
            question: {},
            goodAnswers: 0,
        }
        hotList[i] = q;
        //console.log(question);
        //console.log(question);
    }

    for (var i = 0; i < questionsInHotList; i++) {
        kérdésBetölt(nextQuestion, i);
        nextQuestion++;
    }
}

function kérdésMegjelenítés(kérdés) {
    kerdes_valaszok.forEach((v) => {
        v.classList.remove("jó", "rossz", "választott");
    });

    //let kérdés = hotList[displayedQuestion].question;            
    //console.log(kérdés);

    kerdes = hotList[displayedQuestion].question;
    console.log(kérdés);
    //kerdes = kérdés;

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
    var timeoutHandler;
    timeoutHandler = setTimeout(előre, 3000);
    clearTimeout(timeoutHandler)

    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    kérdésMegjelenítés()

    //index = index + 1 > 800 ? 1 : index + 1;
    //kérdésBetölt(index);
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



