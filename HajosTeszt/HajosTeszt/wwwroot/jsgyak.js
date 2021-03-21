let külsödoboz = document.getElementById("külsö");

külsödoboz.innerHTML = "";

for (let i = 1; i < 11; i++) {
    let ujelem = document.createElement("div");
    külsödoboz.appendChild(ujelem);
    ujelem.innerHTML = "<b>"+i+"</b>";
    ujelem.style.backgroundColor = "rgb(256,256,"+(20*i)+")";
    ujelem.classList.add("dobozka");
}
let pascal = document.getElementById("pascal")

for (let sor = 0; sor < 10; sor++) {
    let divsor = document.createElement("div")
    divsor.classList.add("sor")
    pascal.appendChild(divsor)

    for (let oszlop = 0; oszlop <= sor; oszlop++) {
        let divelem = document.createElement("div")
        divelem.classList.add("elem")
        divsor.appendChild(divelem)


        let fakt = function (n) {
            let er = 1;
            for (let i = 2; i <= n; i++) {
                er = er * i;
            }
            return er;
        }
        divelem.innerText = fakt(sor) / (fakt(oszlop) * fakt(sor - oszlop))

    }
}