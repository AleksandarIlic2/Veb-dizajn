let korpa = [

]

$(document).ready(function() {
    let predjelo = document.querySelector(".card-title").textContent // ovde svakako prikazuje za trenutnu ocitanu str
    // tkd nema veze sto ne uzimas oba predjela/jela/dezerta, samo jedno je na stranici vidljivo
    

    let nizOcena = []
    if (localStorage.getItem('ocene')) {
        nizOcena = JSON.parse(localStorage.getItem("ocene"))  
    }  

    for (let i = 0; i < nizOcena.length; i++) {
        if (nizOcena[i]['Naziv'] == predjelo) {
            let temp = 0;            
            for (let j = 0; j < nizOcena[i]['Ocene'].length; j++ ) {              
                temp += parseInt(nizOcena[i]['Ocene'][j])
            }
            $("#ocena").text(temp / nizOcena[i]['Ocene'].length)
            break;
        }
    }
   
   
    $("#btnOcena").on("click", function() {     
    
        sacuvajOcenu();

    })


    $("#btnNaruci").on("click", function() {
        if (!localStorage.getItem("korpa")) {
            localStorage.setItem("korpa" , JSON.stringify([]));
        }
  
        sacuvajKupovinu();

    })

}
)

function sacuvajKupovinu() {
    
    if (!localStorage.getItem("korpa")) {
        localStorage.setItem("korpa" , JSON.stringify(korpa));
    }
    else {
        korpa = JSON.parse(localStorage.getItem("korpa"))
        let kolicina = $("#kolicina").val()
        let nazivi = document.querySelectorAll(".card-title")
     
        //alert(kolicina)
       // alert(naziv)
       let jezik = $("#jezik").text();
       let nasId = korpa.length;

       for (let k = 0; k < nazivi.length; k++) {
        let naziv = nazivi[k].textContent
 

        if (jezik == "Srb") {
            let naziv = nazivi[k].textContent
        
            let novaKupovina = {
                "Naziv" : naziv,
                "Kolicina": kolicina,
                "Jezik" : "Srb",
                "id": nasId
            }
            let novaKupovina2 = {
                "Naziv" : nazivi[k + 1].textContent, // k + 1 je na eng
                "Kolicina": kolicina,
                "Jezik" : "Eng",
                "id": nasId
            }
            korpa.push(novaKupovina)
            korpa.push(novaKupovina2)
    
        }
        else if (jezik == "Eng") {
            let naziv = nazivi[k].textContent
    
            let novaKupovina = {
                "Naziv" : naziv,
                "Kolicina": kolicina,
                "Jezik" : "Eng",
                "id": nasId
            }
            let novaKupovina2 = {
                "Naziv" : nazivi[k + 1].textContent, // k + 1 je na Srb
                "Kolicina": kolicina,
                "Jezik" : "Srb",
                "id": nasId
            }
            korpa.push(novaKupovina)
            korpa.push(novaKupovina2)
        }   
        break;
    }

        localStorage.setItem("korpa", JSON.stringify(korpa));
    }

}

function sacuvajOcenu() {

    let predjela = document.querySelectorAll(".card-title")
    
    let ocena = $("#novaOcena").val()
   
    let nizOcena = []
    if (localStorage.getItem('ocene')) {
        nizOcena = JSON.parse(localStorage.getItem("ocene"))  
    }  
    let fl;

    for (let k = 0; k < predjela.length; k++) {
        let predjelo = predjela[k].textContent
        fl = false;
        for (let i = 0; i < nizOcena.length; i++) {
            if (nizOcena[i]['Naziv'] == predjelo) {
                nizOcena[i]['Ocene'].push(ocena);
                let temp = 0;            
                for (let j = 0; j < nizOcena[i]['Ocene'].length; j++ ) {                  
                    console.log(parseInt(nizOcena[i]['Ocene'][j]))             
                    temp += parseInt(nizOcena[i]['Ocene'][j])
                }
                $("#ocena").text(temp / nizOcena[i]['Ocene'].length)
                
                fl = true;
                break;
            }
        }
        if (fl == false) {
            let objekat = {
                "Naziv" : predjelo,
                "Ocene" : [ocena]
            }
            nizOcena.push(objekat)
            $("#ocena").text(ocena)
        }
    }




    localStorage.setItem("ocene", JSON.stringify(nizOcena))
    return;

}