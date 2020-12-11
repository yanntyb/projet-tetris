let grille = document.getElementById("grille");

function createBlock(){
    let forme = [[[1,1],[1,0],[1,0],[0,0]],[[1,1],[1,1],[0,0]],[[1,1],[1,0], [0,0]],[[0,1],[0,1],[0,1],[1,1],[0,0]]]
    let random = Math.trunc(Math.random() * forme.length)
    let resultForm = forme[random]
    resultForm.push("actif")
    return resultForm
}

function initGrille(grille ,taille){
    for(let i = 0; i < taille; i++){
        let ligne = document.createElement("div");
        ligne.className = "ligne";
        ligne.style.height = "calc(100% / " + taille;
        for(let j = 0; j < taille; j++){
            let slot = document.createElement("div");
            slot.className = "slot";
            slot.style.width = "calc(100% / " + taille;
            ligne.appendChild(slot)
        }
        grille.appendChild(ligne);
    }
    return grille;
}

function displayBlock(block,grille){
    let ligne = grille.getElementsByClassName("ligne");
    for(let y = 0; y < ligne.length; y++){
        let slot = ligne[y].getElementsByClassName("slot");
        for(let x = 0; x < slot.length; x++){
            let pos = block[block.length - 2];
            if(y === pos[0] && x=== pos[1]){
                for(let posY = 0; posY < block.length - 2; posY++){
                    for(let posX = 0; posX < block[posY].length; posX++){
                        if(block[posY][posX] === 1){
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

function displayListBlock(liste,grille){
    for(let i of liste){
        moveDownBlock(i, grille);
    }
}

function effacer(block,grille){
    let ligne = grille.getElementsByClassName("ligne");
    for(let y = 0; y< ligne.length; y++){
        let slot = ligne[y].getElementsByClassName("slot")
        for(let x = 0; x < slot.length; x ++){
            if(ligne[y - 1] !== undefined){
                ligne[y-1].getElementsByClassName("slot")[x].style.backgroundColor = "bisque";
            }
        }
    }
}

function moveDownBlock(block, grille){
    if(block[block.length - 1] === "actif"){
        let time = window.setInterval(function(){
            effacer(block,grille)
            displayBlock(block, grille)
            block[block.length - 2][0] ++;
            console.log(block)
            let lengrille = grille.getElementsByClassName("ligne").length
            if(block[block.length - 1][0] === lengrille - 2){
                block[block.length - 1] = "none";
            }
        },300)
    }else{
        clearInterval(time)
    }

}

grille = initGrille(grille, 20);
let block = [];
block.push(createBlock());


displayListBlock(block,grille);