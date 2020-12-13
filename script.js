let grille = document.getElementById("grille");

function createBlock() {
    let forme = [[[1], [1], [1], [1], [0, 0]], [[1, 1], [1, 1], [0, 0]], [[1], [1, 1], [0, 0]], [[0, 1], [0, 1], [0, 1], [1, 1], [0, 0]]]
    let random = Math.trunc(Math.random() * forme.length)
    let resultForm = forme[random]
    resultForm.push("actif")
    return resultForm
}

function initGrille(grille, taille) {
    for (let i = 0; i < taille; i++) {
        let ligne = document.createElement("div");
        ligne.className = "ligne";
        ligne.style.height = "calc(100% / " + taille;
        for (let j = 0; j < taille; j++) {
            let slot = document.createElement("div");
            slot.className = "slot";
            slot.style.width = "calc(100% / " + taille;
            ligne.appendChild(slot)
        }
        grille.appendChild(ligne);
    }
    return grille;
}

function displayBlock(block, grille) {
    let ligne = grille.getElementsByClassName("ligne");
    for (let y = 0; y < ligne.length; y++) {
        let slot = ligne[y].getElementsByClassName("slot");
        for (let x = 0; x < slot.length; x++) {
            let pos = block[block.length - 2];
            if (y === pos[0] && x === pos[1]) {
                for (let posY = 0; posY < block.length - 2; posY++) {
                    for (let posX = 0; posX < block[posY].length; posX++) {
                        if (block[posY][posX] === 1) {
                            /*console.log(ligne[parseInt(posY + pos[0])].getElementsByClassName("slot")[parseInt(posX)])*/
                            let newPosY = parseInt(posY) + parseInt(pos[0]);
                            let newPosX = parseInt(posX) + parseInt(pos[1])
                            ligne[parseInt(newPosY)].getElementsByClassName("slot")[newPosX].style.backgroundColor = "red"
                        }
                    }
                }
            }
        }
    }

}

function displayListBlock(liste, grille) {
    for (let i of liste) {
        moveDownBlock(i, grille, liste);
    }
}

function effacer(liste){
    
}

function moveDownBlock(block, grille, liste) {
    let time = window.setInterval(function () {
        if (block[block.length - 1] === "actif") {
            console.log(block[block.length - 1])
            effacer(liste);
            displayBlock(block, grille);
            block[block.length - 2][0]++;
            let lengrille = grille.getElementsByClassName("ligne").length;
            let hauteur = block.length - 3;
            let blockDuBas = hauteur + block[block.length - 2][0]
            if (blockDuBas === lengrille) {
                block.pop();
                block.push("noneActif");
                console.log(block)
                clearInterval(time);
                liste.push(createBlock());
                displayListBlock(liste, grille);
            }
        }
    }, 300)
}

grille = initGrille(grille, 20);
let block = [];
block.push(createBlock());
displayListBlock(block, grille);


//move left or right
document.addEventListener("keyup", function (event) {
    console.log(event.key);
    if (event.key === "ArrowRight") {
        for (let slot of block) {
            if (slot[slot.length - 1] === "actif") {
                if (slot[slot.length - 2][1] + 1 < grille.getElementsByClassName("ligne").length - 1) {
                    slot[slot.length - 2][1] += 1;
                }
            }
        }
    } else if (event.key === "ArrowLeft") {
        for (let slot of block) {
            if (slot[slot.length - 1] === "actif") {
                if (slot[slot.length - 2][1] - 1 >= 0) {
                    slot[slot.length - 2][1] -= 1;
                }
            }
        }
    }
})
