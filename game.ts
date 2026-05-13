const woodText = document.getElementById("wood");
const recolectarButton = document.getElementById("recolectarButton");
const upgradeButton = document.getElementById("upgradeButton");
const workButton = document.getElementById("workerButton");
const stoneText = document.getElementById("stone");
const mineButton = document.getElementById("mineButton");
const upgradePickaxe = document.getElementById("upgradePickaxe");
const stoneWorker = document.getElementById("stoneWorker");
const ironText = document.getElementById("iron");
const upgradeTaladro = document.getElementById("upgradeIron");
const ironWorker = document.getElementById("ironWorker");
const mineIron = document.getElementById("mineIron");

let wood = 0;
let woodPerClick = 1;
let upgradeCost = 10;
let woodPerSecond = 0;
let workerCost = 25;
let stone = 0;
let stonePerClick = 1;
let pickCost = 10;
let stoneWorkCost = 25;
let stonePerSecond = 0;
let iron = 0;
let ironPerClick = 1;
let upgradeIron = 25;
let ironPerSecond = 0;
let ironMiner = 50;

function updateUi () {
    woodText!.innerText = `Madera ${Math.floor(wood)}`;
    upgradeButton!.innerText = `Mejorar Hacha (${Math.floor(upgradeCost)})`;
    workButton!.innerText = `Contratar Leñador (${Math.floor(workerCost)})`;
    stoneText!.innerText = `Piedra ${Math.floor(stone)}`
    upgradePickaxe!.innerText = `Mejorar Pico (${Math.floor(pickCost)})`
    stoneWorker!.innerText = `Contratar trabajador (${Math.floor(stoneWorkCost)})`;
    ironText!.innerText = `Hierro ${Math.floor(iron)}`;
    upgradeTaladro!.innerText = `Mejorar el Taladro (${Math.floor(upgradeIron)})`;
    ironWorker!.innerText = `Contratar Minero (${Math.floor(ironMiner)})`;

    if (wood < upgradeCost){
        upgradeButton!.style.backgroundColor = "red";
    }else{
        upgradeButton!.style.backgroundColor = "lightgreen";
    }

    if (wood < workerCost){
    workButton!.style.backgroundColor = "red";
    }else {
    workButton!.style.backgroundColor = "lightgreen";       
    }

    if (wood >= 300){
        stoneText!.style.display = "block";
        mineButton!.style.display = "inline-block";
        upgradePickaxe!.style.display = "inline-block";
        stoneWorker!.style.display = "inline-block";
    }
    if (stone < pickCost){
        upgradePickaxe!.style.backgroundColor = "red";
    }else {
        upgradePickaxe!.style.backgroundColor = "lightgreen";
    }
    if (stone < stoneWorkCost){
        stoneWorker!.style.backgroundColor = "red";
    }else {
        stoneWorker!.style.backgroundColor = "lightgreen";
    }
      if (wood >= 500 && stone >= 300){
        ironText!.style.display = "block";
        upgradeTaladro!.style.display = "inline-block";
        ironWorker!.style.display = "inline-block";
        mineIron!.style.display = "inline-block";
    }
    if (iron < upgradeIron){
        upgradeTaladro!.style.backgroundColor = "red";
    }else {
        upgradeTaladro!.style.backgroundColor = "lightgreen";
    }
    if (iron < ironMiner){
        ironWorker!.style.backgroundColor = "red";
    }else {
        ironWorker!.style.backgroundColor = "lightgreen";
    }

}
recolectarButton?.addEventListener("click", () => {
    wood += woodPerClick;
    
    updateUi()

});

upgradeButton?.addEventListener("click", () => {

    if (wood >= upgradeCost){

        wood -= upgradeCost;

        woodPerClick++;

        upgradeCost *= 1.5;

        updateUi()
    } 

});
workButton?.addEventListener("click", () =>{
    if (wood >= workerCost){

        wood -= workerCost;
        
        woodPerSecond++;

        workerCost *= 1.5;

       updateUi()

    }

})
mineButton?.addEventListener("click", () => {
    stone += stonePerClick;
    updateUi()
})

upgradePickaxe?.addEventListener("click", () => {
    if (stone >= pickCost){
        stonePerClick++;
        stone -= pickCost
        pickCost *= 1.5;
        updateUi()
    }
})
stoneWorker?.addEventListener("click", () => {
    if (stone >= stoneWorkCost){
        stonePerSecond++;
        stone -= stoneWorkCost;
        stoneWorkCost *= 1.5;
        updateUi()
    }
})
mineIron?.addEventListener("click", () => {
    iron += ironPerClick;
    updateUi()
})
upgradeTaladro?.addEventListener("click", () => {
    if (iron >= upgradeIron){
        ironPerClick++;
        iron -= upgradeIron;
        upgradeIron *= 1.5;
        updateUi()
    }
})
ironWorker?.addEventListener("click", () => {
    if (iron >= ironMiner){
        ironPerSecond++;
        iron -= ironMiner;
        ironMiner *= 1.5;
        updateUi()

    }

})
function saveGame (){
    const saveData ={
        wood: wood,
        stone: stone,
        iron: iron,
        woodPerClick: woodPerClick,
        stonePerClick: stonePerClick,
        ironPerClick: ironPerClick,
        woodPerSecond: woodPerSecond,
        stonePerSecond: stonePerSecond,
        ironPerSecond: ironPerSecond,
        upgradeCost: upgradeCost,
        workerCost: workerCost,

        pickCost: pickCost,
        stoneWorkCost: stoneWorkCost,
        upgradeIron: upgradeIron,
        ironMiner: ironMiner
    };
    localStorage.setItem(
        "save",
        JSON.stringify(saveData)
    );
}
function loadGame(){
    const savedGame = localStorage.getItem("save");
    if (savedGame){
        const saveData = JSON.parse(savedGame);
        wood = saveData.wood;

        stone = saveData.stone;

        iron = saveData.iron;

        woodPerClick = saveData.woodPerClick;

        stonePerClick = saveData.stonePerClick;

        ironPerClick = saveData.ironPerClick;

        woodPerSecond = saveData.woodPerSecond;

        stonePerSecond = saveData.stonePerSecond;

        ironPerSecond = saveData.ironPerSecond;
        upgradeCost = saveData.upgradeCost || 10;
        workerCost = saveData.workerCost || 25;
        pickCost = saveData.pickCost || 10;
        stoneWorkCost = saveData.stoneWorkCost || 25;
        upgradeIron = saveData.upgradeIron || 25;
        ironMiner = saveData.ironMiner || 50;
    }
}

setInterval(() =>{

    wood += woodPerSecond;
    stone += stonePerSecond;
    iron += ironPerSecond;

    updateUi()

}, 1000)
setInterval(() => {
    saveGame()
}, 5000);

loadGame()
updateUi()