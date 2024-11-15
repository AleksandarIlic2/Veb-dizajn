function labele() {
   
    $(this).css("background-color", "green");

    $(this).css("color", "green");
}

function prebaciNaRezultate() {
    
    window.location.href = "tetris-rezultati.html"
}

function prebaciNaDruguStranicu() {
    let oznaceni = []
    checkBoxoxes = document.getElementsByTagName("input");
    nivo = document.getElementById("selectId")
    
    for (let i = 0; i < checkBoxoxes.length; i++) {
        if (checkBoxoxes[i].checked) {
            oznaceni.push(checkBoxoxes[i].value)
        }
    }

    localStorage.setItem("selektovani", JSON.stringify(oznaceni))
    localStorage.setItem("nivo", nivo.value);
    window.location.href = 'tetris-igra.html';
}

function inicijalizacijaUputstva() {
    $("input[type = 'checkbox']").on({
        click:function(e) {
                   
                    cbId = $(this).attr('id');
                    let labela = $("label[for='" +cbId + "']");
                    let boja = labela.css('color');
                    
                    
                    if (boja === 'rgb(138, 43, 226)') { 
                        labela.css("font-size", "20px")
                        labela.css("color", "green");                  
                    } 
                    else {                  
                        labela.css("font-size", "15px")
                        labela.css("color", "blueviolet");
                    }
                    
             
    
        }
    })
    
   
    
}



var igraci;
var poslednjaPartija = {ime: "null", rezultat: "null"}
var prethodniRezultati = [
    {ime: "null", rezultat: "null"},
    {ime: "null", rezultat: "null"},
    {ime: "null", rezultat: "null"},
    {ime: "null", rezultat: "null"},
    {ime: "null", rezultat: "null"},
    {ime: "null", rezultat: "null"},
    {ime: "null", rezultat: "null"},
    {ime: "null", rezultat: "null"},
    {ime: "null", rezultat: "null"},
    {ime: "null", rezultat: "null"}
];
var endOfTheGame = false;
function inicijalizacijaTabele() {
    igraci = localStorage.getItem("prethodniRezultati");
    console.log("Igraci" + igraci);
    poslednjiIgrac = localStorage.getItem("poslednjiIgrac");
    poslednjiRezultat = localStorage.getItem("poslednjiRezultat");
    if (poslednjiIgrac != null) {
      //  alert("da")
        $("#poslednjiIgrac").text(poslednjiIgrac);
        $("#poslednjiRezultat").text(poslednjiRezultat);
    }
    else {
        localStorage.setItem("poslednjiIgrac", "null");
        localStorage.setItem("poslednjiRezultat", "null");
    }
    if (igraci !== null) {
        prethodniRezultati = JSON.parse(igraci);
        for (let i = 0; i < prethodniRezultati.length; i++) {
            if (prethodniRezultati[i].ime !== "null") {
                $("#Igrac" + (i + 1)).text(prethodniRezultati[i].ime);
                $("#Rezultat" + (i + 1)).text(prethodniRezultati[i].rezultat);
            }
        }
    }
    else {
        localStorage.setItem("prethodniRezultati", JSON.stringify(prethodniRezultati));
    }
}

function compare(a, b) {
    return b.rezultat - a.rezultat;
}

var rez = 0;
function pocniIgru() {
    igraci = localStorage.getItem("prethodniRezultati");
    console.log("Igraci" + igraci);
    poslednjiIgrac = localStorage.getItem("poslednjiIgrac");
    poslednjiRezultat = localStorage.getItem("poslednjiRezultat");
    if (poslednjiIgrac != null) {
      //  alert("da")
        $("#poslednjiIgrac").text(poslednjiIgrac);
        $("#poslednjiRezultat").text(poslednjiRezultat);
    }
    else {
        localStorage.setItem("poslednjiIgrac", "null");
        localStorage.setItem("poslednjiRezultat", "null");
    }
    if (igraci !== null) {
        prethodniRezultati = JSON.parse(igraci);
        for (let i = 0; i < prethodniRezultati.length; i++) {
            if (prethodniRezultati[i].ime !== "null") {
                $("#Igrac" + (i + 1)).text(prethodniRezultati[i].ime);
                $("#Rezultat" + (i + 1)).text(prethodniRezultati[i].rezultat);
            }
        }
    }
    else {
        localStorage.setItem("prethodniRezultati", JSON.stringify(prethodniRezultati));
    }





    
    let skor = $("#tabelaSledecaFigura")
    let tabela = $("#tabelaIgra");
    let popunjenRed = [-1,-1,-1,-1];
    let popunjenCnt = 0;
    let zauzetiRedovi = [];
    let zauzeteKolone = [];
    let bojeZauzetih = [];
   
    let prethodniRedovi = [];
    let prethodneKolone = [];
    endOfTheGame = false;
    let brojac = 0;
    for (let i = 0; i < 21; i++){
        let red = $("<tr></tr>")
        for (let j = 0; j < 10; j++) {
            let celija = $("<td></td>");
            celija.attr("id", brojac++);
            celija.css("background-color", "black");            
            red.append(celija);
        }
        tabela.append(red);        
    }
    

    


    let stap1A = [
        [0, 0, 0],
        [1, 0, 0],
        [1, 1, 1]
    ]
    let stap1B = [
        [1, 1, 0],
        [1, 0, 0],
        [1, 0, 0]
    ]
    let stap1C = [
        [1, 1, 1],
        [0, 0, 1],
        [0, 0, 0]
    ]
    let stap1D = [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0]
    ]

    let kvadratABCD = [
        [0, 0, 0],
        [1, 1, 0],
        [1, 1, 0]
    ]

    let stap2B = [
        [1, 0, 0],
        [1, 0, 0],
        [1, 1, 0]
    ]

    let stap2A = [
        [0, 0, 0],
        [0, 0, 1],
        [1, 1, 1]
    ]

    let stap2C = [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0]
    ]

    let stap2D = [
        [1, 1, 1],
        [1, 0, 0],
        [0, 0, 0]
    ]

    let stepenice1A = [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0]
    ]

    let stepenice1B = [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0]
    ]

    let stepenice2A = [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1]
    ]

    let stepenice2B = [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0]
    ]
    
    let slovoTA = [
        [0, 0, 0],
        [0, 1, 0],
        [1, 1, 1]
    ]

    let slovoTB = [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0]
    ]

    let slovoTC = [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0]
    ]

    let slovoTD = [
        [1, 0, 0],
        [1, 1, 0],
        [1, 0, 0]
    ]

    let linijaA = [
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    let linijaB = [
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0]
    ]

    function iscrtajSledecuFiguru() {
        let noviKursor = 3;
      
        if (cnt >= 4) cnt = 1;
        for (let s = 0; s < niz[sledecaSledecaFigura][0].length; s++) {
            for (let i = 0; i < niz[sledecaSledecaFigura][0].length; i++) {
                if (niz[sledecaSledecaFigura][0][s][i] === 0) {if (i == niz[sledecaSledecaFigura][0].length -1) cnt++; continue;}
                let noviRed = Math.floor((noviKursor + (cnt - 1) * 10) / 10) + 3;
                //if (niz[sledecaSledecaFigura][0].length === 4) {noviKursor = noviKursor - 1;}
                let novaKolona = (noviKursor + i) % 10;               
              
                let red = $("#tabelaSledecaFigura tr").eq(noviRed);
                let cell = red.find("td").eq(novaKolona);
                let boja = nizBoja[sledecaSledecaFigura]; // sledeca je trenutna ovde
                cell.css("background-color", boja);
                cell.css("border", "2px solid black");
                if (i == niz[sledecaSledecaFigura][0].length - 1) cnt++;
            }          
        }
    }

    let stap1 = [stap1A, stap1B, stap1C, stap1D];
    let kvadrati = [kvadratABCD, kvadratABCD, kvadratABCD, kvadratABCD]
    let stap2 = [stap2A, stap2B, stap2C, stap2D]
    let stepenice1 = [stepenice1A, stepenice1B, stepenice1A, stepenice1B]
    let stepenice2 = [stepenice2A, stepenice2B, stepenice2A, stepenice2B]
    let slovoT = [slovoTA, slovoTB, slovoTC, slovoTD]
    let linija = [linijaA, linijaB, linijaA, linijaB]
    let trenutniR = 0;
    let tempCek = localStorage.getItem("selektovani");
    let nizCekiranih = JSON.parse(tempCek);
    let niz = [];
    if (nizCekiranih.includes('Z')) {
        niz.push(stepenice2)
    }
    if (nizCekiranih.includes('S')) {
        niz.push(stepenice1)
    }
    if (nizCekiranih.includes('L')) {
        niz.push(stap2)
    }
    if (nizCekiranih.includes('I')) {
        niz.push(linija)
    }
    if (nizCekiranih.includes('T')) {
        niz.push(slovoT)
    }
    if (nizCekiranih.includes('O')) {
        niz.push(kvadrati)
    }
    if (nizCekiranih.includes('J')) {
        niz.push(stap1)
    }
  
    if (niz.length == 0) {
        alert("Niste izabrali niti jednu figuru")
        window.location.href = "tetris-uputstvo.html"
    }

    let pocetnaBrzina = 700;

    nivo = localStorage.getItem("nivo");
    if (nivo === "Lako") {
        $("#hnivo").text("Lako")
        pocetnaBrzina = 700;
    }
    else if (nivo === "Srednje") {
        $("#hnivo").text("Srednje")
        pocetnaBrzina = 600;
    }
    else if (nivo === "Tesko") {
        $("#hnivo").text("Tesko")
        pocetnaBrzina = 500;
    }   



   
    let nizBoja = ["red", "orange", "blue", "brown", "gray", "green", "purple"]
    let kursor = -6;
    let sledecaFigura = Math.floor(Math.random() * niz.length);
    let sledecaSledecaFigura = Math.floor(Math.random() * niz.length);
    let trenutnaFigura = niz[sledecaFigura][0];
    var cnt = 1;
    var trenutniSkor = 0;
    function iscrtaj() {
        if (kursor < 0) { return;} // mozda visak?
        if (cnt >= 4) cnt = 1;
        if (endOfTheGame) return;
        for (let s = 0; s < trenutnaFigura.length; s++) {
            for (let i = 0; i < trenutnaFigura.length; i++) {
                if (trenutnaFigura[s][i] === 0) {if (i == trenutnaFigura.length -1) cnt++; continue;}
                var noviRed = Math.floor((kursor + (cnt - 1) * 10) / 10);
                var novaKolona = (kursor + i) % 10;
              /*  console.log(noviRed);
                console.log(novaKolona);
                console.log(zauzetiRedovi);
                console.log(zauzeteKolone);*/
                for (let p = 0; p < zauzetiRedovi.length; p++) {
                    if (zauzetiRedovi[p] == noviRed && zauzeteKolone[p] == novaKolona) {
                       endOfTheGame = true;
                        tekstRez = document.getElementById("hskor");
                        rez = parseInt(tekstRez.innerText);                           
                        alert("Igra je zavrsena! Ostvaren rezultat je: " + rez);
                        let igrac = prompt("Unesite vase ime: ");
                        let pozicija = 0;
                        for (let r = 0; r < prethodniRezultati.length; r++ ) {
                            if (prethodniRezultati[r].ime == "null") { break;};     
                            pozicija++;                       
                        }
                      //  alert(pozicija);
                        
                       
                            for (let r = 0; r < 10; r++) {
                                if (prethodniRezultati[r].rezultat == "null") { 
                                   
                                    prethodniRezultati[pozicija] = ({ime: igrac, rezultat: rez})
                                    break;
                                }
                                if (rez > prethodniRezultati[r].rezultat) {
                                    for (let p = prethodniRezultati.length - 1; p > r ; p--) {
                                        prethodniRezultati[p] = { 
                                            ime: prethodniRezultati[p - 1].ime, 
                                            rezultat: prethodniRezultati[p - 1].rezultat 
                                        };
                                    }
                                    prethodniRezultati[r] = {
                                        ime: igrac,
                                        rezultat: rez
                                    };
                                    break;
                                }                             
                                };
                            
                          //  alert("Hej");
                            
                        
                      //  prethodniRezultati.sort(compare)
                        localStorage.setItem("prethodniRezultati", JSON.stringify(prethodniRezultati))
                        if (localStorage.getItem("poslednjiIgrac") == null) localStorage.setItem("poslednjiIgrac", "null");
                        if (localStorage.getItem("poslednjiRezultat") == null) localStorage.setItem("poslednjiRezultat", "null");
                        localStorage.setItem("prethodniRezultati", JSON.stringify(prethodniRezultati));
                        localStorage.setItem("poslednjiIgrac", igrac);
                        localStorage.setItem("poslednjiRezultat", rez);
                        window.location.href = "tetris-rezultati.html"
                        clearTimeout(svakiSledeciId)
                        clearTimeout(pocetniId)
                        
                        return;
                        //alert("Kraj igre!");
                    }
                }
                
                prethodniRedovi.push(noviRed);
                prethodneKolone.push(novaKolona);
                let red = $("#tabelaIgra tr").eq(noviRed);
                let cell = red.find("td").eq(novaKolona);
                let boja = nizBoja[sledecaFigura]; // sledeca je grenutna ovde
                cell.css("background-color", boja);
                if (i == trenutnaFigura.length - 1) cnt++;
            }          
        }
    }

    function pripremaZaSledeci() {
        let flag = true;        
        if (kursor < 0) return;
        if (cnt >= 4) cnt = 1;
        
        for (let s = 0; s < trenutnaFigura.length; s++) {
            if (kursor < 0) break;
            flag = true;
            for (let i = 0; i < trenutnaFigura.length; i++) {
                if (trenutnaFigura[s][i] === 0) {if (i == trenutnaFigura.length -1) cnt++; continue;}
                let nr = Math.floor((kursor + (cnt - 1) * 10 + 10) / 10);
                let nk = (kursor + i) % 10;

                for (let j = 0; j < zauzetiRedovi.length; j++) {
                    if (zauzetiRedovi[j] === nr && zauzeteKolone[j] === nk) {
                        flag = false;
                        for (let v = 0; v < prethodniRedovi.length; v++) {
                            zauzetiRedovi.push(prethodniRedovi[v]);
                            zauzeteKolone.push(prethodneKolone[v]);
                            bojeZauzetih.push(nizBoja[sledecaFigura]);
                        }
                        break;
                    }
                }
                if (flag == false)break;
                if (nr >= 21) {
                    for (let s = 0; s < prethodniRedovi.length; s++) {
                        zauzetiRedovi.push(prethodniRedovi[s]);
                        zauzeteKolone.push(prethodneKolone[s]);
                        bojeZauzetih.push(nizBoja[sledecaFigura]);
                    }
                    flag = false;
                    break;
                }
                if (i == trenutnaFigura.length - 1) cnt++;
            }
            if (!flag) {
                flag = true;
              
                let br = 0;
                let najveciUPrethodnim = -1; // neki max_int, table ima 21 redova svakako;
                for (let t = 0; t < prethodniRedovi.length; t++) {
                    if (prethodniRedovi[t] > najveciUPrethodnim)
                        najveciUPrethodnim = prethodniRedovi[t];
                }
            //    console.log("najveci: " + najveciUPrethodnim);
                let flagTemp = false;
                popunjenCnt = 0;
                for (let v = 0; v < trenutnaFigura.length; v++) {
                    for (let t = 0; t < zauzetiRedovi.length; t++) {
                        if (zauzetiRedovi[t] == najveciUPrethodnim) {
                            br++;
                            if (br == 10) {
                                 flagTemp = true;
                                 popunjenRed[popunjenCnt] = najveciUPrethodnim;
                                 popunjenCnt = (popunjenCnt + 1) % 4;
                                 }
                           // if (flagTemp == true) break;     
                        }                           
                    }                 
                //if (flag == true) break;     
                br = 0;                
                najveciUPrethodnim--;   
              //  console.log("najveci: " + najveciUPrethodnim);
                }
                

                //if (br == 10) popunjenRed = najveciUPrethodnim;
                br = 0;
                while (prethodniRedovi.length > 0) {
                    prethodniRedovi.pop();
                    prethodneKolone.pop();
                }
                // cistimo tabelu za predvidjanje sledece figure
                for (let u = 0; u < 7; u++) {
                    for (let o = 0; o < 7; o++) {
                        let red = $("#tabelaSledecaFigura tr").eq(u);
                        let cell = red.find("td").eq(o);
                        cell.css("background-color", "darkkhaki");
                        cell.css("border", "none");
                    }
                }
                              

                sledecaFigura = sledecaSledecaFigura;
                sledecaSledecaFigura = Math.floor(Math.random() * niz.length);
                trenutnaFigura = niz[sledecaFigura][trenutniR];
                kursor = -6;
                cnt = 1;
                return;

            }          
        }

    }

    function osvezi() {
        if (kursor < 0) return;
        if (cnt >= 4) cnt = 1;
        for (let s = 0; s < trenutnaFigura.length; s++) {
            for (let i = 0; i < trenutnaFigura.length; i++) {
                if (trenutnaFigura[s][i] === 0) {if (i == trenutnaFigura.length - 1) cnt++; continue;}
                let nr = Math.floor((kursor + (cnt - 1) * 10) / 10);
                let nk = (kursor + i) % 10;
                prethodniRedovi.pop();
                prethodneKolone.pop();
                let red = $("#tabelaIgra tr").eq(nr);
                let cell = red.find("td").eq(nk);
                cell.css("background-color", "black");
                if (i == trenutnaFigura.length - 1) cnt++;
            }          
        }
    }

    function proveriSledecuFiguru(figura) {
        let flag = true;
        if (kursor < 0) return;
        if (cnt >= 4) cnt = 1;
        for (let s = 0; s < figura.length; s++) {
            if (!flag) break;
            if (kursor < 0) break;            
            flag = true;
            for (let i = 0; i < figura.length; i++) {
                if (figura[s][i] === 0) {if (i == figura.length -1) cnt++; continue;}
                let nr = Math.floor((kursor + (cnt - 1) * 10 + 10) / 10);
                let nr2 = Math.floor((kursor + (cnt - 1) * 10) / 10);
                let nk = (kursor + i) % 10;
                
                if ((nk) % 10 == 0){
                    flag = false;  break;
                }    

                if (nr > 20) {
                   
                    flag = false; break;
                }
                for (let j = 0; j < zauzetiRedovi.length; j++) {
                    if (zauzetiRedovi[j] === nr && zauzeteKolone[j] === nk) {
                        flag = false;                       
                        break;
                    }
                }
                if (flag == true){
                    for (let j = 0; j < zauzetiRedovi.length; j++) {
                        if (zauzetiRedovi[j] === nr2 && zauzeteKolone[j] === nk) {
                            flag = false;                       
                            break;
                        }
                    }
                }
                if (flag == false) break;
                if (i == figura.length - 1) cnt++;
            }
            if (!flag) {             
                cnt = 1;
                break;;
            }          
           // break;
        }
        if (!flag) return true;
        else return false;
    }

    document.addEventListener('keydown', function(ev) {
        if (ev.key === "ArrowLeft") {
           
            levo();
          
        }
     
    })
    document.addEventListener('keydown', function(ev) {
        if (ev.key === "ArrowRight") {
           // osvezi();
            desno();
           // iscrtaj();
        }
       
    })
    document.addEventListener('keydown', function(ev) {
        if (ev.key === "ArrowDown");
        dole();
    })
    document.addEventListener('keydown', function(ev) {
        if (ev.key === "ArrowUp") {
            osvezi();
            rotiraj();
            iscrtaj();
        }
      
    })

    function jediniceUKoloni(kolona, figure){
        for (let i = 0; i < figure.length; i++){
            if (figure[i][kolona] === 1) {return true;}
        }
        return false;
    }

    function rotiraj() {
        let jediniceUStaroj = jediniceUKoloni(trenutnaFigura.length - 1, trenutnaFigura); // ovde je sledecaFigura jos uvek trenutna
        let jediniceUNovoj = jediniceUKoloni(trenutnaFigura.length - 1, niz[sledecaFigura][(trenutniR + 1) % 4])
        if (jediniceUNovoj == true && jediniceUStaroj == false && (kursor % 10) >= 8) kursor--;
        let temp = proveriSledecuFiguru(niz[sledecaFigura][(trenutniR + 1) % 4]);
        if (temp == false) {
            // moze rotacija
            //console.log("DEBUG")
            trenutniR = (trenutniR + 1) % 4;
            trenutnaFigura = niz[sledecaFigura][trenutniR]; // ovde je sledecaFigura jos uvek trenutna
        }
        if (kursor < 0) kursor = kursor + 10;
    }
    
    var doleFlag = false;
    function dole() {
        doleFlag = true;
        igraj();
    }
    function noviKrug() {
        osvezi();
        kursor = kursor + 10;
    }

    function promeniTablu() {
        for (let i = 0; i < 21; i++) {
            for (j = 0; j < 10; j++) {
                let red = $("#tabelaIgra tr").eq(i);
                let cell = red.find("td").eq(j);
                cell.css("background-color", "black");
            }
        }
        //alert(zauzetiRedovi);
       // alert(zauzeteKolone);
        for (let i = 0; i < zauzetiRedovi.length; i++) {   
            if (zauzetiRedovi[i] >= 0) {
               // alert(zauzetiRedovi[i]);
             //   alert(zauzeteKolone[i]);
                let red = $("#tabelaIgra tr").eq(zauzetiRedovi[i]);
                let cell = red.find("td").eq(zauzeteKolone[i]);
                cell.css("background-color", bojeZauzetih[i]);
            } 
        } 
     
    }

    function igraj() {
        pocetnaBrzina = pocetnaBrzina - 1;
     //   console.log(pocetnaBrzina);
       // alert(pocetnaBrzina)
        if (pocetnaBrzina <100) pocetnaBrzina = 120 ;
        noviKrug();
        iscrtajSledecuFiguru();
        iscrtaj();
      
       // let br = 0;
       for (let c = 0; c < 4; c++) {
        if (popunjenRed[c] != -1) {
          //  alert(popunjenRed);
            //alert("zauzeti redovi" + zauzetiRedovi);
            for (let i = 0; i < zauzetiRedovi.length; i++) {
              if (zauzetiRedovi[i] < (popunjenRed[c] + c)) // ovo +c je za slucaj kad se gubi vise od 1 reda 
                 {
                  zauzetiRedovi[i] = zauzetiRedovi[i] + 1;
              }
              else if (zauzetiRedovi[i] == (popunjenRed[c] + c)) // taj vise nije zauzet tj ne postoji{
                  {
                      //br++;
                      zauzetiRedovi[i] = -20;
                      zauzeteKolone[i] = -20;
                      bojeZauzetih[i] = "none";
                  }
                
              }            
              promeniTablu();
              let trenutniSkor = document.getElementById("hskor");
              let rez = parseInt(trenutniSkor.innerText);            
              rez++;
              
              trenutniSkor.innerText = rez;
              popunjenRed[c] = -1;
             // alert("zauzeti redovi" + zauzetiRedovi)
            }
       }
              
                           
        //provera da li je popunjen red
        pripremaZaSledeci();
        //console.log(endOfTheGame);
        if (endOfTheGame == false && doleFlag == false) {
            pocetnaBrzina = 0.99 * pocetnaBrzina;
            clearInterval(pocetniId);
            clearInterval(noviId);
            noviId = setInterval(igraj, pocetnaBrzina)
           
      //      var svakiSledeciId = setTimeout(igraj, pocetnaBrzina);
        }
        doleFlag = false;
       
    }

    var noviId;
    var pocetniId = setInterval(igraj, pocetnaBrzina);

    function levo() {
        osvezi();
        var cnt = 1;
        let leftflag = false;     
        if (cnt >= 4) cnt = 1;
        for (let s = 0; s < trenutnaFigura.length; s++) {
            if (leftflag == true) break;              
            for (let i = 0; i < trenutnaFigura.length; i++) {
                if (trenutnaFigura[s][i] === 0) {if (i == trenutnaFigura.length -1) cnt++; continue;}
              //  console.log("kursor1" + kursor );
                let tempKursor = kursor - 1;
                let nr = Math.floor((tempKursor + (cnt - 1) * 10) / 10);
                let nr2 = Math.floor((tempKursor + (cnt - 1) * 10 + 10) / 10);
                let nk = (tempKursor + i) % 10;
                
                if ((tempKursor + i) % 10 === 9){
                    leftflag = true; break;
                }    

                for (let j = 0; j < zauzetiRedovi.length; j++) {
                    
                    if (zauzetiRedovi[j] === nr && zauzeteKolone[j] === nk) {
                        leftflag = true;      
                        //console.log("DA");            
                        break;
                    }
                }
                if (leftflag == false)
                {
                    for (let j = 0; j < zauzetiRedovi.length; j++) {
                        if (zauzetiRedovi[j] === nr2 && zauzeteKolone[j] === nk) {
                            leftflag = true;
                            //console.log("DA2");                       
                            break;
                        }
                    }
                }
               
                if (i == trenutnaFigura.length - 1) cnt++;
            }
      
        }
        cnt = 1;
        if (leftflag == false) {kursor = kursor - 1;}
        if (kursor < 0) kursor = kursor + 10;
        iscrtaj();
    }

    function desno() {
        osvezi();
        var cnt = 1;
        let rightFlag = false;     
        if (cnt >= 4) cnt = 1;
        for (let s = 0; s < trenutnaFigura.length; s++) {
            if (rightFlag == true) break;              
            for (let i = 0; i < trenutnaFigura.length; i++) {
                if (trenutnaFigura[s][i] === 0) {if (i == trenutnaFigura.length -1) cnt++; continue;}
                //console.log("kursor1" + kursor );
                let tempKursor = kursor + 1;
                let nr = Math.floor((tempKursor + (cnt - 1) * 10) / 10);
                let nr2 = Math.floor((tempKursor + (cnt - 1) * 10 + 10) / 10);
                let nk = (tempKursor + i) % 10;
                
                if ((nk) % 10 == 0){
                    rightFlag = true; kursor = kursor = kursor - 1; break;
                }    

                for (let j = 0; j < zauzetiRedovi.length; j++) {
             
                    if (zauzetiRedovi[j] === nr && zauzeteKolone[j] === nk) {
                        rightFlag = true;      
                        kursor = kursor - 1;                                
                        break;
                    }
                }
                if (rightFlag == false)
                {
                    for (let j = 0; j < zauzetiRedovi.length; j++) {
                        if (zauzetiRedovi[j] === nr2 && zauzeteKolone[j] === nk) {
                            rightFlag = true;
                            kursor = kursor - 1;                                             
                            break;
                        }
                    }
                }
               
                if (i == trenutnaFigura.length - 1) cnt++;
            }
      
        }
        cnt = 1;
        kursor += 1;
       // if (rightFlag == false) {kursor = kursor - 1;}
        if (kursor < 0) kursor = kursor + 10;
        iscrtaj();
    }
   

}

