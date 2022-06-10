console.log("Ejecutando Javascript...");
// Asignamos a las variables la información del gran premio.

const degradation_max = 60;

const soft =   [0.000,13,0.07375,4];
const medium = [0.615,29,0.0500,2];
const hard =   [1.847,36,0.0300,1];
const time_lost_pit = 16.4;
const time_lost_pit_sc = 8.2;

var time_total_1 = 0;
var time_total_sc = 0;

var time_soft = 0;
var lap_soft = 0;
var deg_soft = 0;

var time_medium = medium[0];
var lap_medium = 0;
var deg_medium = 0;

var time_hard = hard[0];
var lap_hard = 0;

var time_pit = 0;

var race_length = 0;

let race = document.getElementsByClassName("Laps");
for(var i = 0; i < race.length; i++){
    race[i].onclick = (ev)=>{
        length_race(ev.target);
    }
};
function length_race(boton){
    race_length = boton.value;
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

function strategy_1_stop(time_total) {
    if (soft[1]+medium[1]>=race_length) {
        // Estrategia de blandos medios es viable.
        console.log("Blandos - Medios");
        // Tiempo más lento el neumático blando.
        time_soft = soft[0];
        // Variable que marca que el neumático actual es el mas rápido.
        var best_tire = true;
        // Mientras el neumático blando sea más rápido se mantendrá.
        while (best_tire){
            if (time_soft<time_medium) {
                time_soft += soft[2];
                lap_soft += 1;
                deg_soft += soft[3];
            }else{
                best_tire = false;
                time_pit = time_lost_pit;
            }
        };
        var best_tire = true;
        time_medium = medium[0];
        for (let lap = lap_soft; lap < race_length; lap++) {
            time_medium += medium[2];
            lap_medium += 1;    
            deg_medium += medium[3];    
        }
    }else if (soft[1]+hard[1]>=race_length) {
        // La estrategia a una parada recomendada será la de blandos-duros.
        console.log("Blandos - Duros");
    } else if (medium[1]+hard[1]>=race_length) {
        // La estrategia a una parada será la de medios-duros.
        console.log("Medios - Duros");
    } else {
        // Se analiza si es posible gracias a los SC/VS.
        console.log("Solo posible bajo SC.");
    }
    time_total = time_soft + time_medium + time_hard + time_pit;

}

function strategy_2_stop(time_total) {
    if (soft[1]+medium[1]+soft[1] >= race.length) {
    
    }else if (soft[1]+medium[1]+medium[1] >= race.length) {
        
    }else if (soft[1]+hard[1]+soft[1 >= race.length]) {
        
    }
}


function show_info(info, time) {
    console.log("Vueltas con el blando: "+ info[0]);
    console.log("Degradación Blando: " + info[1]);

    console.log("Vueltas con el medio: "+ info[2]);
    console.log("Degradación Medio: " + info[3]);

    console.log("Vueltas con el duro: " + info[4]);
    console.log("Degradación Duro: " + info[5]);

    console.log("Puntuación de esta estrategia " + time);
}


calculo = document.getElementsByClassName("calculo");
for (let i = 0; i < calculo.length; i++) {
    calculo[i].onclick = (ev) =>{
        set_calculo(ev.target);
    }    
}
function set_calculo(boton){
    // Calculamos primero la estrategia a una parada.
    // Para ello vemos si es viable la estrategia con blandos.
    // time_total_1 es la estrategia a una parada.
    time_total_1 = boton.value;
    var info_one_stop = [lap_soft,deg_soft,lap_medium,deg_medium,lap_hard,deg_hard,]
    // time_total_2 es la estrategia a dos paradas.
    time_total_2 = boton.value;

    time_total_1 = strategy_1_stop(time_total_1);

    show_info(info_one_stop,time_total_1);

    time_total_2 = strategy_2_stop(time_total_2);
}