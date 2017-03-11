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
        var vy = (Math.random()*2 - 1) * 4;
        var vx = (Math.random()*2 - 1) * 4;
        dvd(circs[i],vx,vy);
    };
};

// document.createElementNS(
//    "http://www.w3.org/2000/svg",
//   "circle");

var dvd = function(circ,vx,vy){
    console.log("dvding");
    //init params
    var r = parseInt(circ.getAttribute("r"));
    var xcor = parseInt(circ.getAttribute("cx"));
    var ycor = parseInt(circ.getAttribute("cy"));
    var nextxcor;
    var nextycor;
    var fill = circ.getAttribute("fill");
    var stroke = circ.getAttribute("stroke");
    var t = 1; // time of one step
    //invisible line
    var centerline = width / 2;

    var redrawDot = function(){
        console.log("step");
        //ball
        nextxcor = xcor + vx * t;
        nextycor = ycor + vy * t;
        if (nextxcor > width - r || nextxcor < 0 + r ){
            vx = -1 * vx;
            nextxcor = xcor + vx * t;
        };
        if (nextycor > height - r || nextycor < 0 + r){
            vy = -1 * vy;
            nextycor = ycor + vy * t;
        };

        //intersection
        if (((centerline - xcor > 0) && (centerline - nextxcor < 0)) || ((centerline - xcor < 0) && (centerline - nextxcor > 0))){
            console.log("line passed");
            r = r / 2;
            if (r >= 2){
                var newCirc = makeCirc(xcor,ycor,r,fill,stroke);
                pic.appendChild(newCirc);
                dvd(newCirc,vx * -1, vy * -1);
            };
        };

        if (r >= 2) {
            xcor = nextxcor;
            ycor = nextycor;

            circ.setAttribute("cx" ,xcor);
            circ.setAttribute("cy",ycor);
            circ.setAttribute("r",r);
            circ.setAttribute("fill",fill);
            circ.setAttribute("stroke",stroke);
            pic.appendChild(circ);
        };
        if (r < 2){
            //var ind = circs.indexOf(circ);
            //circs.splice(ind);
            //window.clearInterval(iid2[ind]);
            //iid2.splice(ind);
            var children = pic.childNodes;// != -1){
            for (var i = 0; i > children.length; i++){
                if (children[i] == circ){
                    pic.removeChild(circ);
                    break;
                };
            };
        };
    };
    var ind = circs.indexOf(circ);
    iid2[ind] = setInterval(redrawDot,10);//interval id
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
