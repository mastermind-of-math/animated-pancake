function preload(){
    imgList = [loadImage("house_inside_2.jpg"), loadImage("house_inside.jpg"), loadImage("house.jpg"), loadImage("space.jpg"), loadImage("tree.jpg")];
}

obj = [];
img = ""
totalList = [3, 3, 1, 2];
detectList = [0, 0, 0, 0];

function setup(){
    canvas = createCanvas(810, 534);
    canvas.position(370, 180);
}

function modelLoaded(){
    console.log("modelLoaded");
}

function start(){
    img = imgList[localStorage.getItem("getId")];
    cocossd = ml5.objectDetector("cocossd", modelLoaded);
    cocossd.detect(img, detected);
    document.getElementById("class").innerText = "There are " + totalList[localStorage.getItem("getId")] + " major objects in this picture. Coco SSD has detected " + detectList[localStorage.getItem("getId")] + " of them."
    if(localStorage.getItem("getId") == 4){
        document.getElementById("class").innerText = "Coco SSD thinks this is broccoli."
    }
}

function draw(){
    image(img, 0, 0, 600, 500);
    id = localStorage.getItem("getId");
    noFill()
    for(i = 0; i < obj.length; i++){
        stroke(Math.round(Math.random()) * 255, Math.round(Math.random()) * 255, Math.round(Math.random()) * 255)
        percent = Math.floor(obj[i].confidence * 100) + "%"
        strokeWeight(3)
        rect(obj[i].x, obj[i].y, obj[i].width, obj[i].height);
        strokeWeight(1);
        text(obj[i].label, obj[i].x + 10, obj[i].y + 20)
    }
}

function back(){
    window.location = "index.html"
}

function detected(error, results){
    if(error){
        console.error(error);
    } else {
        console.log(results);
        obj = results;
        for(i = 0; i < obj.length; i++){
            stroke(Math.round(Math.random()) * 255, Math.round(Math.random()) * 255, Math.round(Math.random()) * 255)
            percent = Math.floor(obj[i].confidence * 100) + "%"
            strokeWeight(3)
            rect(obj[i].x, obj[i].y, obj[i].width, obj[i].height);
            strokeWeight(1);
            text(obj[i].label, obj[i].x + 10, obj[i].y + 20)
        }
    }
}