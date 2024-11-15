function sortiraj() {
    if (document.getElementById("naziv").checked) {
        let stavka = $('.food-menu-item').get()
        stavka.sort((a, b) =>{
            let prvi = $(a).find('.food-titile').text()
            let drugi = $(b).find('.food-titile').text()
            if(prvi < drugi) {
                return -1
            }
            else if (prvi > drugi) {
                return 1
            }
            else{
                return 0
            }
        });

        stavka.forEach(item => {
            $('.food-menu-container').append(item)
        });
        
    } 
    else if (document.getElementById("cena").checked) {
        let stavke = $('.food-menu-item').get()
        stavke.sort(function(a, b) {
            let prvaCena = parseFloat($(a).find('.food-price').text().replace(/[^\d.-]/g, ''))
            let drugaCena = parseFloat($(b).find('.food-price').text().replace(/[^\d.-]/g, ''))
            return prvaCena - drugaCena
        });
        stavke.forEach(item => {
            $('.food-menu-container').append(item)
        });
    }
}


function pretrazi() {
    let unos = document.getElementById('pretraga').value
    let pronadjeno = false
    
    let nizJela = document.getElementsByClassName('food-menu-item')

    for (var i = 0; i < nizJela.length; i++) {
        let item = nizJela[i]
        let naziv = item.querySelector('.food-titile').textContent
        console.log(naziv)
        if (naziv.startsWith(unos)) {
            nizJela[i].style.display = ""
        } else {
            nizJela[i].style.display = "none"
        }
    }

}

function pretraga1() {
    let unos = document.getElementById('pretraga1').value
    let nizJela = document.getElementsByClassName('food-menu-item')

    for (var i = 0; i < nizJela.length; i++) {
        let item = nizJela[i]
        let cena = item.querySelector('.food-price').textContent
        let cenaBroj = parseInt(cena.match(/\d+/))

        if (unos === '' || cenaBroj <= parseInt(unos)) {
            nizJela[i].style.display = ""
        } else {
            nizJela[i].style.display = "none"
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('pretraga').addEventListener('input', pretrazi)
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('naziv').addEventListener('input', sortiraj)
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('cena').addEventListener('input', sortiraj)
});


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('pretraga1').addEventListener('input', pretraga1)
});



