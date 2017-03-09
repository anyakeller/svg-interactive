var pic=document.getElementById("vimage");
var height = pic.getBoundingClientRect().height;
var width = pic.getBoundingClientRect().width;

var iid2=[];
var circs = [];
var makeCirc = function(x,y,r,fill,stroke){
    var circ = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle");
    circ.setAttribute("cx",x);
    circ.setAttribute("cy",y);
    circ.setAttribute("r",r);
    circ.setAttribute("fill",fill);
    circ.setAttribute("stroke",stroke);
    circ.addEventListener("click",function(evt){
        evt.stopPropagation();
        if (circ.getAttribute("fill") == "red"){
            circs.splice(circs.indexOf(circ),1);
            pic.removeChild(circ);
            var newCirc = makeCirc(Math.random() * (width - 2 * r) + r,Math.random() * (height - 2 * r) + r,r,fill,stroke);
            pic.appendChild(newCirc);
        };
    });
    circ.addEventListener("click",function(evt){
        evt.stopPropagation();
        if (circ.getAttribute("fill") != "red"){
            circ.setAttribute("fill","red");
            circ.setAttribute("stroke","black");
        };
    });
circs.push(circ);
return(circ);
};

var move = function(){
    for (var i = 0; i < circs.length;i++){
        dvd(circs[i]);
    };
};

// document.createElementNS(
//    "http://www.w3.org/2000/svg",
//   "circle");

var dvd = function(circ){
    console.log("dvding");
    //init params
    var r = parseInt(circ.getAttribute("r"));
    var xcor = parseInt(circ.getAttribute("cx"));
    var ycor = parseInt(circ.getAttribute("cy"));
    var fill = circ.getAttribute("fill");
    var stroke = circ.getAttribute("stroke");
    var vy = Math.random() * 4 - 2;
    var vx = Math.random() * 4 - 2;
    var t = 1; // time of one step
    var redrawDot = function(){
        console.log("step");
        //ball
        xcor = xcor + vx * t;
        ycor = ycor + vy * t;
        if (xcor > width - r || xcor < 0 + r ){
            xcor = xcor - vx * t;
            vx = -1 * vx;
            xcor = xcor + vx * t;
        };
        if (ycor > height - r || ycor < 0 + r){
            ycor = ycor - vy * t;
            vy = -1 * vy;
            ycor = ycor + vy * t;
        };
        circ.setAttribute("cx" ,xcor);
        circ.setAttribute("cy",ycor);
        circ.setAttribute("r",r);
        circ.setAttribute("fill",fill);
        circ.setAttribute("stroke",stroke);
        pic.appendChild(circ);
    };
    iid2.push(setInterval(redrawDot,10));//interval id
};

var clear = function(){
    circs = [];
    for (var i = 0; i < iid2.length;i++){
        window.clearInterval(iid2[i]);
    };
    while (pic.lastChild) {
        pic.removeChild(pic.lastChild);
    };
};


pic.addEventListener('click', function(evt){
    circ = makeCirc(evt.offsetX,evt.offsetY,25,"blue","black");
    pic.appendChild(circ);
});

m = document.getElementById("move");
m.addEventListener("click", move);

b = document.getElementById("clear");
b.addEventListener("click", clear);
