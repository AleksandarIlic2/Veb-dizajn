
$(document).ready(function() {
    prikaziNarudzbine()
    
    function prikaziNarudzbine(flag = true) {
        let kupovine;
        let kol;
        let jezik = $("#jezik").text()
        let tekstDugmeta = ""
        if (jezik == "Srb") {
            kol = "Količina" 
            tekstDugmeta = "Izbaci"
        }
        else if (jezik == "Eng") {
            kol = "Quantity"
            tekstDugmeta = "Remove"
        }
        if (flag == true){
            if (localStorage.getItem("korpa"))
                {
                    kupovine = JSON.parse(localStorage.getItem("korpa"))
                    let tekst = "";
                    let moguciIspis = "block"
                    
                    for (let i = 0; i < kupovine.length; i++)
                    {
                        moguciIspis = "block"
                        if (kupovine[i]['Jezik'] != jezik) moguciIspis = "none";
                        tekst +=  `<div class="porudzbina" style="display: ${moguciIspis}">
                        <div class="row">
                            <div class="col-md-8">
                                <p class="naziv">${kupovine[i]['Naziv']}</p>
                                <p class="kolicina">${kol}: <span class="kolicina-value">${kupovine[i]['Kolicina']}</span></p>
                                <button class=" povecaj btn btn-sm btn-success" data-index="${i}" style = "margin-bottom: 2%;">+</button>
                                <button class="smanji btn btn-sm btn-danger" data-index="${i}" style = "margin-bottom: 2%;">-</button>
                            </div>
                            <div class="col-md-4 text-right">
                                <button class="izbaci btn btn-danger btn-sm" data-index="${i}">${tekstDugmeta}</button>
                            </div>
                        </div>
                      </div>`;    
                       
                    }
                    $("#narudzbine").html(tekst) // kad ovo azuriras, SVI dogadjadji koje si imao do tad u divu narudzbine se brisu, zato moras opet da ih dodesi
                }
                else 
                {
                    let jezik = $("#jezik").text()
                 
                    if (jezik == "Srb")
                        document.getElementById("narudzbine").innerHTML = "<p style = 'font-size: 35px; font-weight: bold;'> Vaša korpa je trenutno prazna! </p>"
                    else if (jezik == "Eng") 
                        $("#narudzbine").html("<p style = 'font-size: 35px; font-weight: bold;'> Your cart is currently empty! </p>" );
                }// obrati paznju da ovaj dogadjaj klika na dugme izbaci mora ovde da bude, da svaki put kad se prikazuje
        }
        else if (flag == false) {
            if (localStorage.getItem("zavrseneNarudzbine"))
                {
                    let kupovine2 = JSON.parse(localStorage.getItem("zavrseneNarudzbine"))
                   // alert(kupovine2[0]['Naziv'])
                    let tekst = "";
                    let kol;
                    let jezik = $("#jezik").text()
                    if (jezik == "Srb") kol = "Količina"
                    else if (jezik == "Eng") kol = "Quantity"
                    for (let i = 0; i < kupovine2.length; i++)
                    {
                        if (kupovine2[i]['Naziv'] == 'kraj'){                           
                            tekst += kupovine2[i]['Kolicina'];
                            tekst += "<hr>"                       
                           
                            continue;                            
                        }
                        if (kupovine2[i]['Jezik'] != jezik) continue;
                        tekst +=  `<div class="porudzbina">
                        <div class="row">
                            <div class="col-md-8">
                                <p class="naziv">${kupovine2[i]['Naziv']}</p>
                                <p class="kolicina">${kol}: <span class="kolicina-value">${kupovine2[i]['Kolicina']}</span></p>

                            </div>

                        </div>
                      </div>`;    
                       
                    }
                    $("#narudzbine").html(tekst) // kad ovo azuriras, SVI dogadjadji koje si imao do tad u divu narudzbine se brisu, zato moras opet da ih dodesi
                }
                else 
                {
                    let jezik = $("#jezik").text()
                    if (jezik == "Srb")
                        document.getElementById("narudzbine").innerHTML = "<p style = 'font-size: 35px; font-weight: bold;'> Nemate još uvek vaših porudžbina. </p>"
                    else if (jezik == "Eng") 
                        $("#narudzbine").html("<p style = 'font-size: 35px; font-weight: bold;'> You don't have any orders yet. </p>" );
                    //document.getElementById("narudzbine").innerHTML = "<p style = 'font-size: 35px; font-weight: bold;'> Nemate jos uvek vaših porudzbina. </p>"
                }// obrati paznju da ovaj dogadjaj klika na dugme izbaci mora ovde da bude, da svaki put kad se prikazuje
        }
        // korpa da se doda, jer kad izbacis jednom nesto iz korpe moras opet da promenis dogadjaje
        $(".izbaci").on("click", function() {
            //alert('radi')
            let index = $(this).data("index");
            let kupovine = JSON.parse(localStorage.getItem("korpa"))
           // splice u ovom slucaju izbacuje element iz niza, index je pocetna pozicija za uklanjanje a 1 je broj elemenata za ukloniti
          
            if (index - 1 >= 0 && kupovine[index - 1]['id'] == kupovine[index]['id']) {
                kupovine.splice(index - 1, 2)
              //  kupovine.splice(index, 1);
              
            }
            else if (index + 1 < kupovine.length && kupovine[index + 1]['id'] == kupovine[index]['id']) {
                kupovine.splice(index, 2);
            //    kupovine.splice(index + 1, 1)
            }
     
           
            localStorage.setItem("korpa", JSON.stringify(kupovine));
            if (kupovine.length == 0) {
                localStorage.removeItem("korpa")
            }
            prikaziNarudzbine(true)    
        })
         // ista prica, svaki put iznova kad se menja nesto u divu narudzbine postavljamo ove dogadjaje
        $(".povecaj").on("click", function() {        
            let indeks = $(this).data("index");
            let kupovine = JSON.parse(localStorage.getItem("korpa"))                    
            kupovine[indeks]['Kolicina'] = parseInt(kupovine[indeks]['Kolicina']) + 1;
            if (indeks - 1 >= 0 && kupovine[indeks - 1]['id'] == kupovine[indeks]['id']) {
                kupovine[indeks - 1]['Kolicina'] = parseInt(kupovine[indeks - 1]['Kolicina']) + 1;
            }
            if (indeks + 1 < kupovine.length && kupovine[indeks + 1]['id'] == kupovine[indeks]['id']) {
                kupovine[indeks + 1]['Kolicina'] = parseInt(kupovine[indeks + 1]['Kolicina']) + 1;
            }
     
            localStorage.setItem("korpa", JSON.stringify(kupovine))
            prikaziNarudzbine(true);
            
        })
           // ista prica, svaki put iznova kad se menja nesto u divu narudzbine postavljamo ove dogadjaje
        $(".smanji").on("click", function() {        
            let indeks = $(this).data("index");
            let kupovine = JSON.parse(localStorage.getItem("korpa"))                    
            kupovine[indeks]['Kolicina'] = parseInt(kupovine[indeks]['Kolicina']) - 1; // smanji prvom pa u ovim ifovima nadji drugog i smanji njemu
            if (indeks - 1 >= 0 && kupovine[indeks - 1]['id'] == kupovine[indeks]['id']) {
                kupovine[indeks - 1]['Kolicina'] = parseInt(kupovine[indeks - 1]['Kolicina']) - 1;
            }
            if (indeks + 1 < kupovine.length && kupovine[indeks + 1]['id'] == kupovine[indeks]['id']) {
                kupovine[indeks + 1]['Kolicina'] = parseInt(kupovine[indeks + 1]['Kolicina']) - 1;
            }
     
            localStorage.setItem("korpa", JSON.stringify(kupovine))
            prikaziNarudzbine(true);
            
        })
    }

    $("#potvrdaNarudzbine").on("click", function() {
        if (localStorage.getItem("korpa") && localStorage.getItem("korpa").length > 0) {
            let zavrseneNarudzbine = JSON.parse(localStorage.getItem("korpa"))
            if (!localStorage.getItem("zavrseneNarudzbine")) {  
                let datum = new Date().toLocaleString();
                         
                zavrseneNarudzbine.push({"Naziv": "kraj", 
                    "Kolicina" : datum
                });
                localStorage.setItem("zavrseneNarudzbine", JSON.stringify(zavrseneNarudzbine))    
            }
            else
            {
                let vecPostojece = JSON.parse(localStorage.getItem("zavrseneNarudzbine"));
                let datum = new Date().toLocaleString();
                zavrseneNarudzbine.push({"Naziv": "kraj", 
                    "Kolicina" : datum
                });
                for (let i = 0; i < zavrseneNarudzbine.length; i++) {
                    vecPostojece.push(zavrseneNarudzbine[i]) // da ne bi bio jos jedan niz, jer je korpa sama po sebi niz dodajemo zavrseneNarudzbine[i] tj. jednu po jednu
                }               
                
                localStorage.setItem("zavrseneNarudzbine", JSON.stringify(vecPostojece))    
            }
            localStorage.removeItem("korpa")
            prikaziNarudzbine(true);
        }
        
    })

    $("#svojeNarudzbine").on("click", function() {        
        prikaziNarudzbine(false);
    })

    $("#nazadNaKorpu").on("click", function() {
        prikaziNarudzbine(true);
    })

 
    

   // alert(kupovine[0]['Naziv'])
   
})