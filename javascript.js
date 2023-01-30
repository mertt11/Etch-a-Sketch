window.onload=()=>{
    activateButton(DEF_MOD);
    grid(DEF_SIZE);
    
}

const DEF_COLOR="black";
const DEF_MOD="staticColor";
const DEF_SIZE=20;

let currentColor=DEF_COLOR;
let currentMode=DEF_MOD;
let currentSize=DEF_SIZE;

const body=document.querySelector("body");
const container=document.getElementById("container");
let rows=document.getElementsByClassName("rowGrid");
let cells=document.getElementsByClassName("cell");
const wholeContainer=document.querySelector(".wholeContainer");
const slider=document.getElementById("slider");
let sliderValue=document.querySelectorAll(".sliderValue");


const button1=document.getElementById("button1");
const button2=document.getElementById("button2");
const button3=document.getElementById("button3");
const button4=document.getElementById("button4");



button1.addEventListener("click",()=>(setCurrentMode("staticColor")));
button2.onclick=()=>setCurrentMode("rainbow");
button3.onclick=()=>setCurrentMode("eraser");
button4.addEventListener("click",()=>{container.textContent="";grid(currentSize);});



let mouseDown=false;
let mouseOver=false;

draw();

function draw(){
    [].forEach.call(cells,function(e){   
        e.addEventListener("mousemove",function(e){ 
            let canvas=container.getBoundingClientRect();
            if((canvas.x+5)>e.clientX||(e.clientX+5)>canvas.right||(e.clientY-5)<canvas.y||(e.clientY+5)>canvas.bottom){
                mouseDown=false;
                mouseOver=false;
            }
        });
        e.addEventListener("mousedown",function(e){
            mouseOver=true;
            mouseDown=true;
            if(mouseDown===true){
                if(currentMode==="rainbow"){
                    this.style.backgroundColor=randomColorGenerate();
                }else if(currentMode==="eraser"){
                    this.style.backgroundColor="white";
                }else if(currentMode==="staticColor"){
                    this.style.backgroundColor="black";
                }
            }
            e.preventDefault();       
        });
        e.addEventListener("mouseup",function(){
            mouseDown=false;
            mouseOver=false;
        });
        e.addEventListener("mouseover",function(){
            mouseOver=true;
            if(mouseDown){
                if(currentMode==="rainbow"){
                    this.style.backgroundColor=randomColorGenerate();
                }else if(currentMode==="eraser"){
                    this.style.backgroundColor="white";
                }else if(currentMode==="staticColor"){
                    this.style.backgroundColor="black";
                }
            }   
        });
    });
}

slider.oninput = function(){
    sliderValue[0].textContent=this.value;
    sliderValue[1].textContent=this.value;
    deleteCanvas();
    currentSize=this.value;
    grid(this.value);
}

function grid(num){
    makeRow(num);
    makeColm(num)
    draw();
}
function makeRow(num){
    for(i=0;i<num;i++){
        const row=document.createElement("div");
        container.appendChild(row).className="rowGrid";
    }
}
function makeColm(num){
    for(j=0;j<rows.length;j++){
        for(i=0;i<num;i++){
            let newCell=document.createElement("div");
            rows[i].appendChild(newCell).className="cell";
        }
    }
}

    
function activateButton(newMode){
    if(currentMode==="rainbow"){
        button2.classList.remove("active");
    }else if(currentMode==="staticColor"){
        button1.classList.remove("active");
    }else if(currentMode==="eraser"){
        button3.classList.remove("active");
    }

    if(newMode==="rainbow"){
        button2.classList.add("active");
    }else if(currentMode==="staticColor"){
        button1.classList.add("active");
    }else if(newMode==="eraser"){
        button3.classList.add("active");
    }
}

function setCurrentMode(newMode) {
    activateButton(newMode)
    currentMode = newMode
  }

function deleteCanvas(){
    container.replaceChildren();
}

function randomColorGenerate(){
    const randomColor=Math.floor(Math.random()*16777215).toString(16);
    return "#"+randomColor;
}
