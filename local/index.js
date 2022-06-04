console.log("Ejecutando Javascript...");

const auxiliar = document.getElementsByClassName("title");
const race_name = auxiliar[0].innerHTML;
console.log(race_name);

let race = document.getElementsByClassName("Laps");
for(var i = 0; i < race.length; i++){
    race[i].onclick = (ev)=>{
        length_race(ev.target);
    }
};
function length_race(boton){
    var race_length = boton.value;
    console.log(race_length);
}

let clima = document.getElementsByClassName("Weather");
for (let i = 0; i < clima.length; i++) {
    clima[i].onclick = (ev)=>{
        set_weather(ev.target);
    }
    
}
function set_weather(boton){
    var weather = boton.value;
    console.log(weather);
}


/* Cálculo de las estrategias más óptimas para el gran premio*/
calculo.onclick = () =>{
    
}