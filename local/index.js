console.log("Ejecutando Javascript...");
// Asignamos a las variables la información del gran premio.
var info_race = [];

let url = 'https://raw.githubusercontent.com/SalcedoManuel/F1-Management/main/local/race_info.json'
fetch(url)
    .then(response => response.json())
    .then(data => saveData(data))
    .catch(error => console.log(error));

// Extraer toda la información del JSON y seleccionar la del Gran Premio en el que estemos.    
const grand_prix = document.getElementsByClassName("title")[0].innerHTML;
console.log("You are playing in: " + grand_prix);

// Después de obtener el nombre del Gran Premio se extrae del JSON la info sobre dicho GP.
function saveData(data) {
    info_race = data[0][grand_prix][0];
}

var weather = "";

// Neumáticos usados.
var soft,medium,hard,inter,full_wet = [];

// Variables de tiempo.
var time_total_1,time_total_sc,time_pit,time_lost_pit,time_lost_pit_sc = 0;

// Las 3 estrategias mas relevantes a una parada.
var info_one_stop_1,info_one_stop_2,info_one_stop_3 = [];

// Las 3 paradas mas relevantes a dos paradas.
var info_two_stop_1,info_one_stop_2,info_two_stop_3 = [];

// Variable usada que simula todas las vueltas.
var time_simulation = [];

var race_length, race_length_type = 0;

function reset_tires() {
    time_soft = soft["time"];
    lap_soft = 0;
    deg_soft = 0;

    time_medium = medium["time"];
    lap_medium = 0;
    deg_medium = 0;

    time_hard = hard["time"];
    lap_hard = 0;
    deg_hard = 0;
}

let race = document.getElementsByClassName("Laps");
for(var i = 0; i < race.length; i++){
    race[i].onclick = (ev)=>{
        length_race(ev.target);
    }
};
function length_race(boton){
    race_length_type = boton.value;
    console.log(race_length_type);
}

let clima = document.getElementsByClassName("Weather");
for (let i = 0; i < clima.length; i++) {
    clima[i].onclick = (ev)=>{
        set_weather(ev.target);
    }  
}
function set_weather(boton){
    weather = boton.value;
    console.log(weather);
}

function get_info_race() {
    race_length = Math.round(info_race["laps"]*race_length_type);
    console.log("Longitud de la carrera: " + race_length);

    time_lost_pit = info_race["time_lost_pit"];
    console.log("Tiempo perdido en los boxes: " + time_lost_pit);

    time_lost_pit_sc = info_race["time_lost_pit_sc"];
    console.log("Tiempo perdido en los boxes: " + time_lost_pit_sc);

    time_earn_fuel = info_race["time_earn_fuel"];
    console.log("Tiempo ganado por tener menos peso por el fuel: " + time_earn_fuel);

    degradation_max = info_race["max_degradation"];
    console.log("Degradación máxima de los neumáticos: " + degradation_max);

    soft = info_race["soft"][0];
    console.log(soft);

    medium = info_race["medium"][0];
    console.log(medium);

    hard = info_race["hard"][0];
    console.log(hard);

    inter = info_race["inter"][0];
    console.log(inter);

    full_wet = info_race["wet"][0];
    console.log(full_wet);
}



function two_compounds(compound1,compound2,option) {
    if (compound1["lifespan"]+compound2["lifespan"]>=race_length) {
        let max_laps = compound1["lifespan"]+compound2["lifespan"];
        let loops_laps = max_laps - race_length;
        let first_lap_loop = compound1["lifespan"]-loops_laps;
        console.log(compound1["lifespan"]);
        if (compound1["lifespan"] >= race_length) {
            max_laps = compound1["lifespan"];
            loops_laps = max_laps;
            first_lap_loop = 1;
            console.log("El compuesto 1 aguanta toda la carrera.");
        }else{
            max_laps = compound1["lifespan"]+compound2["lifespan"];
            loops_laps = max_laps - race_length;
            first_lap_loop = compound1["lifespan"]-loops_laps;
            if (first_lap_loop < 1) {
                first_lap_loop = 1;
            }
            console.log("El compuesto 1 no aguanta toda la carrera.")
        }
        for (let index = first_lap_loop; index < compound2["lifespan"]; index++) {
            // lap_stop marca la vuelta de la que sería la parada.
            let lap_stop = index;
            console.log("                    ");
            console.log("Simular si se para en la vuelta: " +lap_stop)
            // Variable usada para decirnos que se ha llegado a la vuelta de la parada.
            var best_tire = true;
            // Resetear todas las variables de los neumáticos.
            // Neumático mas blando.
            let lap_compound1 = 0;
            let time_compound1 = compound1["time"];
            let deg_compound1 = 0;
            
            // Tiempo que se añade por parar.
            let time_pit = 0;

            // Neumático más duro.
            let lap_compound2 = 0;
            let time_compound2 = compound2["time"];
            let deg_compound2 = 0;


            // Mientras no se llegue a la vuelta de la parada simular el neumático mas blando.
            while (best_tire){
                if (lap_compound1 < lap_stop) {
                    time_compound1 += compound1["time_lost_lap"];
                    lap_compound1 += 1;
                    deg_compound1 += compound1["degradation"];
                    console.log("Tiempo del Compuesto 1: " + time_compound1 + " Tiempo de salida Compuesto 2: " + compound2["time"] + " Vuelta: " + lap_compound1);
                }else{
                    best_tire = false;
                    time_pit = 10;
                }
            };
            // Conociendo la vuelta de parada del neumático blando simulamos ahora con el medio.
            for (let index = lap_stop; index < race_length; index++) {
                time_compound2 += compound2["time_lost_lap"];
                lap_compound2 += 1;
                deg_compound2 += compound2["degradation"];                
            }
            let points = time_compound1 + time_compound2 + time_pit;
            console.log("Puntos de la estrategia: " + time_compound1 +"+"+ time_compound2 + "= " + points);
            if (option == 1) {
                lap_soft = lap_compound1;
                deg_soft = deg_compound1;
                lap_medium = lap_compound2;
                deg_medium = deg_compound2;
                lap_hard = 0;
                deg_hard = 0;
            }else if (option == 2) {
                lap_soft = lap_compound1;
                deg_soft = deg_compound1;
                lap_medium = 0;
                deg_medium = 0;
                lap_hard = lap_compound2;
                deg_hard = deg_compound2;
            }else if (option == 3) {
                lap_soft = 0;
                deg_soft = 0;
                lap_medium = lap_compound1;
                deg_medium = deg_compound1;
                lap_hard = lap_compound2;
                deg_hard = deg_compound2;
            }else{
                lap_soft = 0;
                deg_soft = 0;
                lap_medium = 0;
                deg_medium = 0;
                lap_hard = 0;
                deg_hard = 0;
            }
            var time = [points,lap_soft,deg_soft,lap_medium,deg_medium,lap_hard,deg_hard,time_pit,lap_stop];
            time_simulation.push(time);
        }
        //Vamos a quedarnos con el que tenga menos puntos puesto que esto quiere decir que es la más rápida.
        let time_auxiliar = 9999;
        // Vuelta que es la mejor para parar con esa estrategia.
        let lap_good = 1;
        for (let index = 0; index < time_simulation.length; index++) {
            if (time_simulation[index][0] < time_auxiliar) {
                time_auxiliar = time_simulation[index][0];
                lap_good = index;
            }
        }
        // Sacaremos del Array time_simulation la info de la mejor estrategia.
        lap_soft = time_simulation[lap_good][0];
        deg_soft = time_simulation[lap_good][1];
        lap_medium = time_simulation[lap_good][2];
        deg_medium = time_simulation[lap_good][3];
        lap_hard = time_simulation[lap_good][4];
        deg_hard = time_simulation[lap_good][5];
        points = time_simulation[lap_good][6];
        // Guardamos en info_one_stop_1 la info sobre esta estrategia.
        let info_one_stop = [lap_soft,deg_soft,lap_medium,deg_medium,lap_hard,deg_hard,points];
        if (option == 1) {
            info_one_stop_1 = info_one_stop;
        }else if (option == 2) {
            info_one_stop_2 = info_one_stop;
        }else if (option == 3) {
            info_one_stop_3 = info_one_stop;
        }
        reset_tires();
        time_simulation = [];
    }
}
// Función no operativa aún.
function three_compounds(compound1,compound2,option) {
    if (option == 1) {
        // Calcular el número de vueltas a estudio.
        let max_laps = compound1["lifespan"]+compound2["lifespan"]+compound1["lifespan"];
        let loops_laps = max_laps - race_length;
        let first_lap_loop = compound1["lifespan"]-loops_laps;
        lap_pit_2 = race_length - compound1["lifespan"];
    }
}

function strategy() {
    var option = 0;
    if (weather == "Dry-Dry") {
        if (soft["lifespan"]+medium["lifespan"] >= race_length) {
            option = 1;
            two_compounds(soft,medium,option);
        }
        if (soft["lifespan"]+hard["lifespan"] >= race_length) {
            option =  2;
            two_compounds(soft,hard,option);
        }
        if (medium["lifespan"]+hard["lifespan"] >= race_length) {
            option = 3;
            two_compounds(medium,hard,option);
        }
        // Opción a DOS paradas.
        if (soft["lifespan"]+medium["lifespan"]+soft["lifespan"] >= race_length) {
            option = 1;
            three_compounds(soft,medium,soft,option);
        }
        if (soft["lifespan"]+medium["lifespan"]+medium["lifespan"] >= race_length) {
            option = 2;
            three_compounds(soft,medium,medium,option);

        }
        if (soft["lifespan"]+hard["lifespan"]+soft["lifespan"] >= race_length) {
            option = 3;
            three_compounds(soft,hard,soft,option);
        }


    } else if (weather == "Dry-Wet") {
        
    } else if (weather == "Wet-Wet") {
        
    } else if (weather == "Wet-Dry") {
        
    }
    console.log(info_one_stop_1);
    console.log(info_one_stop_2);
    console.log(info_one_stop_3);
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

    get_info_race();
    if (weather != "" && race_length >= 0) {
        strategy();
    }else{
        console.log("Marque las opciones para la simulación");
    }
}