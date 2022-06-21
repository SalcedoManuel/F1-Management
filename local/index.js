console.log("Ejecutando Javascript...");
// Asignamos a las variables la información del gran premio.
var info_race = [];

// Variables para usar en el display.
var track_name = "";
var country = "";
var right_turn = "";
var left_turn = "";
var track_sense = "";
var name_tires_most_deg = "";

// Variable del display de la información base.
display = document.getElementById("display")

// Variable que muestra la información escrita sobre la primera opción
// ESTRATEGIA A UNA PARADA BLANDO - MEDIO.
display_one_stop_1 = document.getElementById("display_one_stop_1");
display_one_stop_2 = document.getElementById("display_one_stop_2");
display_one_stop_3 = document.getElementById("display_one_stop_3");

// Display que muestra el neumático de inicio.
one = document.getElementById("one");
// Display que muestra el color del neumático de inicio.
two = document.getElementById("two");
// Display que muestra el neumático después de la parada.
three = document.getElementById("three");
// Display que muestra el color del neumático después de la parada.
four = document.getElementById("four");
// Display que muestra la bandera a cuadros.
five = document.getElementById("five");

// Display que muestra el neumático de inicio.
six = document.getElementById("six");
// Display que muestra el color del neumático de inicio.
seven = document.getElementById("seven");
// Display que muestra el neumático después de la parada.
eight = document.getElementById("eight");
// Display que muestra el color del neumático después de la parada.
nine = document.getElementById("nine");
// Display que muestra la bandera a cuadros.
ten = document.getElementById("ten");

// Display que muestra el neumático de inicio.
eleven = document.getElementById("eleven");
// Display que muestra el color del neumático de inicio.
twelve = document.getElementById("twelve");
// Display que muestra el neumático después de la parada.
thirteen = document.getElementById("thirteen");
// Display que muestra el color del neumático después de la parada.
fourteen = document.getElementById("fourteen");
// Display que muestra la bandera a cuadros.
fifteen = document.getElementById("fifteen");

// Variable que marca el clima.
var weather = "";

// Neumáticos usados.
var soft,medium,hard,inter,full_wet = [];

// Variables de tiempo.
var time_total_1,time_total_sc,time_pit,time_lost_pit,time_lost_pit_sc = 0;

// Las 3 estrategias sin paradas (SOLO MODO 5 VUELTAS)
var info_zero_stop_1,info_zero_stop_2,info_zero_stop_3 = [];

// Las 3 estrategias mas relevantes a una parada.
var info_one_stop_1,info_one_stop_2,info_one_stop_3 = [];

// Las 3 paradas mas relevantes a dos paradas.
var info_two_stop_1,info_one_stop_2,info_two_stop_3 = [];

// Variable usada que simula todas las vueltas.
var time_simulation = [];

// Variables usadas para marcar la longitud de carrera.
var race_length, race_length_type = 0;

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

// Función encargada de resetear los valores de los neumáticos.
function reset_tires() {
    time_soft = soft[0];
    lap_soft = 0;
    deg_soft = 0;

    time_medium = medium[0];
    lap_medium = 0;
    deg_medium = 0;

    time_hard = hard[0];
    lap_hard = 0;
    deg_hard = 0;
}

// Se encarga de obtener el tipo de carrera que el usuario quiere simular.
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

// Se encarga de obtener el clima que el usuario a elegido.
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

// Conociendo el tipo de carrera, se obtiene la cantidad de vueltas.
// Además se extraen del JSON de GITHUB toda la información sobre el Grand Premio.

function get_info_race() {
    track_name = info_race["track"];
    country = info_race["country"];
    right_turn = info_race["turn_right"];
    left_turn = info_race["turn_left"];
    track_sense = info_race["truck_sense"];
    name_tires_most_deg = info_race["tires_more_deg"];

    if (race_length_type != 5) {
        race_length = Math.round(info_race["laps"]*race_length_type);
    }else{
        race_length = race_length_type;
    }
    console.log("Longitud de la carrera: " + race_length);

    time_lost_pit = info_race["time_lost_pit"];
    console.log("Tiempo perdido en los boxes: " + time_lost_pit);

    time_lost_pit_sc = info_race["time_lost_pit_sc"];
    console.log("Tiempo perdido en los boxes: " + time_lost_pit_sc);

    time_earn_fuel = info_race["time_earn_fuel"];
    console.log("Tiempo ganado por tener menos peso por el fuel: " + time_earn_fuel);

    max_degradation = info_race["max_degradation"];
    console.log("Degradación máxima de los neumáticos: " + max_degradation);

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

// Función que busca la estrategia más rápida a UNA parada.
// Se introducen los compuestos a simular y dependiendo de la opción se guarda en una opción.
function two_compounds(compound1,compound2,option) {
    if (compound1["lifespan"]+compound2["lifespan"]>=race_length) {
        let max_laps = compound1["lifespan"]+compound2["lifespan"];
        let loops_laps = max_laps - race_length;
        let first_lap_loop = compound1["lifespan"]-loops_laps;
        for (let index = first_lap_loop; index < compound1["lifespan"]; index++) {
            // lap_stop marca la vuelta de la que sería la parada.
            let lap_stop = index;
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
                    let time_lap = compound1["time"] + compound1["time_lost_lap"];
                    time_compound1 += time_lap;
                    lap_compound1 += 1;
                    if (deg_compound1 >= max_degradation) {
                        let time_extra = deg_compound1 - max_degradation;
                        time_compound1 += (time_extra * compound1["time_lost_lap"]);
                    }
                    deg_compound1 += compound1["degradation"];
                }else{
                    best_tire = false;
                    time_pit = time_lost_pit;
                }
                console.log("dentro");
            };
            // Conociendo la vuelta de parada del neumático más blando simulamos ahora con el otro compuesto.
            for (let index = lap_stop; index < race_length; index++) {
                let time_lap = compound2["time"] + compound2["time_lost_lap"];
                time_compound2 += time_lap;
                lap_compound2 += 1;
                deg_compound2 += compound2["degradation"];                
            }
            let points = time_compound1 + time_compound2 + time_pit;
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
        type_strategy = time_simulation[lap_good][7];
        // Guardamos en info_one_stop_1 la info sobre esta estrategia.
        let info_one_stop = [lap_soft,deg_soft,lap_medium,deg_medium,lap_hard,deg_hard,points,type_strategy];
        console.log(info_one_stop);
        if (option == 1) {
            info_one_stop_1 = info_one_stop;
        }else if (option == 2) {
            info_one_stop_2 = info_one_stop;
        }else if (option == 3) {
            info_one_stop_3 = info_one_stop;
        }
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

// Función creada para simular una carrera sin paradas.
function strategy_no_pit(compound1,option) {
    if (weather == "Dry-Dry") {
        let deg_compound1 = 0;
        let points = 0;
        for (let i = 1; i <= race_legth; i++) {
           deg_compound1 += compound1["degradation"];
           points += compound1["time"] + compound1["time_lost_lap"];
        }
        if (option == 1) {
            info_zero_stop_1 = [race_length,deg_compound1,0,0,0,0,points];
        } else if (option == 2) {
            info_zero_stop_2 = [0,0,race_length,deg_compound1,0,0,points];
        } else if (option == 3) {
            info_zero_stop_3 = [0,0,0,0,race_length,deg_compound1,points];
        }
        
    }
}
// Función encargada de simular TODA la ESTRATEGIA.
function strategy() {
    var option = 0;
    if (weather == "Dry-Dry" && race_length != 5) {
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


    } else if (weather == "Dry-Wet" && race_length != 5) {
        
    } else if (weather == "Wet-Wet" && race_length != 5) {
        
    } else if (weather == "Wet-Dry" && race_length != 5) {
        
    }else{
        strategy_no_pit(soft,1);
        strategy_no_pit(medium,2);
        strategy_no_pit(hard_3);
    }

    console.log("Blando - Medio "+info_one_stop_1);
    console.log("Blando - Duro "+info_one_stop_2);
    console.log("Medio - Duro "+info_one_stop_3);
}

function show_strategy() {
    display.innerHTML = "<br>" + "El " + "<b>" + track_name + "</b>" + " situado en " + "<b>" + country +"</b>" + " es un circuito con " + 
                            "<b>" + right_turn + " curvas a derechas"+ "</b>" + " y " +"<b>" + left_turn + " curvas a izquierda " +"</b>"
                            + "siendo este de sentido " + track_sense + "."+ "<br>" +
                            " Las ruedas con mayor degradacion generalmente son los " + "<b>" + name_tires_most_deg +"</b>" + ". <br>" + "<hr>";
        
        // Ordenar dependiendo de los puntos.
        var strategy_options = [];
        if (info_one_stop_1 != null) {
            strategy_options.push(info_one_stop_1[0]);
        }
        if (info_one_stop_2 != null) {
            strategy_options.push(info_one_stop_2[0]);
        }
        if (info_one_stop_3 != null) {
            strategy_options.push(info_one_stop_3[0]);
            best_strategy = info_one_stop_3;
        }
        strategy_options.sort(function(a,b){
            return a - b
        });
        console.log(strategy_options);
        if (info_one_stop_1[0] == strategy_options[0]) {
            let fastest_strategy = " Soft - Medium";
            display_one_stop_1.innerHTML = "FASTEST STRATEGY:" + fastest_strategy;
            //Soft
            one.style.display="inline-block";
            two.style.display="inline-block";
            //Medium
            three.style.display="inline-block";
            four.style.display="inline-block";
            // End Race
            five.style.display="inline-block";
        }else if (info_one_stop_2 [0] == strategy_options[0]) {
            fastest_strategy = " Soft - Hard";
            display_one_stop_1.innerHTML = "FASTEST STRATEGY:" + fastest_strategy;
            // Soft
            one.style.display="inline-block";
            two.style.display="inline-block";
            // Hard
            three.style.display = "inline-block"; three.style.backgroundColor = "white";
            three.style.backgroundImage = "url(css/images/tires/hard.png))"
            four.style.display = "inline-block"; four.style.backgroundColor = "white";
            // End Race
            five.style.display = "inline-block";
        }else if (info_one_stop_3 [0] == strategy_options[0]) {
            fastest_strategy = " Medium - Hard";
            display_one_stop_1.innerHTML = "FASTEST STRATEGY:" + fastest_strategy;
            // Medium
            one.style.display="inline-block"; one.style.backgroundColor = "yellow";
            one.style.backgroundImage = "url(css/images/tires/medium.png)";
            two.style.display="inline-block"; two.style.backgroundColor = "yellow";
            // Hard
            three.style.display = "inline-block"; three.style.backgroundColor = "white";
            three.style.backgroundImage = "url(css/images/tires/hard.png)"
            four.style.display = "inline-block"; four.style.backgroundColor = "white";
            // End Race
            five.style.display = "inline-block";
        }

        if (info_one_stop_1[0] == strategy_options[1]) {
            let fastest_strategy = " Soft - Medium";
            display_one_stop_2.innerHTML = " 2º FASTEST STRATEGY:" + fastest_strategy;
            six.style.height = "50px";six.innerHTML = "Tire";
            seven.style.height = "50px";seven.innerHTML = "Soft";
            eight.style.height = "50px";eight.innerHTML = "Tire";
            nine.style.height = "50px";nine.innerHTML = "Medium";
            teen.style.height = "50px";teen.innerHTML = "End";
        }else if (info_one_stop_2[0] == strategy_options[1]) {
            let fastest_strategy = " Soft - Hard";
            display_one_stop_2.innerHTML = " 2º FASTEST STRATEGY:" + fastest_strategy;
            six.style.height = "50px";six.innerHTML = "Tire";
            seven.style.height = "50px";seven.innerHTML = "Soft";
            eight.style.height = "50px";eight.innerHTML = "Tire";
            nine.style.height = "50px";nine.innerHTML = "Hard";
            teen.style.height = "50px";teen.innerHTML = "End";
        }else if (info_one_stop_3[0] == strategy_options[1]) {
            let fastest_strategy = " Medium - Hard";
            display_one_stop_2.innerHTML = " 2º FASTEST STRATEGY:" + fastest_strategy;

            six.style.height = "50px";six.innerHTML = "Tire"; six.style.display = "inline-block";
            six.style.backgroundImage = "url(css/images/tires/medium.png)"; six.style.backgroundColor = "yellow";

            seven.style.height = "50px";seven.innerHTML = "Medium"; seven.style.display = "inline-block";
            seven.style.backgroundColor = "yellow";

            eight.style.height = "50px";eight.innerHTML = "Tire"; eight.style.display = "inline-block";
            eight.style.backgroundImage = "url(css/images/tires/hard.png)"; eight.style.backgroundColor = "white";

            nine.style.height = "50px";nine.innerHTML = "Hard"; nine.style.display = "inline-block";
            nine.style.backgroundColor = "white";

            ten.style.height = "50px";ten.innerHTML = "End"; ten.style.display = "inline-block";
        }

        if (info_one_stop_1[0] == strategy_options[2]) {
            let fastest_strategy = " Soft - Medium";
            display_one_stop_3.innerHTML = " LOWEST STRATEGY:" + fastest_strategy;
            // Soft
            eleven.style.display = "inline-block";
            twelve.style.display = "inline-block";
            //Medium
            thirteen.style.display = "inline-block";
            fourteen.style.display = "inline-block";
            // End Flag
            fifteen.style.display = "inline-block";
        }else if (info_one_stop_2[0] == strategy_options[2]) {
            let fastest_strategy = " Soft - Hard";
            display_one_stop_3.innerHTML = " LOWEST STRATEGY:" + fastest_strategy;
            //Soft
            eleven.style.display = "inline-block";
            twelve.style.display = "inline-block";
            // Hard
            thirteen.style.display = "inline-block";
            thirteen.style.backgroundColor = "white"; thirteen.style.backgroundImage = "url(css/images/tires/hard.png)";
            fourteen.innerHTML = "Hard"; fourteen.style.display = "inline-block";
            fourteen.style.backgroundColor = "white";
            // End Flag
            fifteen.innerHTML = "End"; fifteen.style.display = "inline-block";
        }else if (info_one_stop_3[0] == strategy_options[2]) {
            let fastest_strategy = " Medium - Hard";
            // Medium
            display_one_stop_3.innerHTML = "LOWEST STRATEGY:" + fastest_strategy;
            eleven.style.display = "inline-block"; eleven.style.backgroundColor = "yellow";
            eleven.style.backgroundImage = "url(css/images/tires/medium.png)";
            twelve.style.display = "inline-block"; twelve.style.backgroundColor = "yellow";
            // Hard
            thirteen.style.display = "inline-block"; thirteen.style.backgroundImage = "url(css/images/tires/hard.png)";
            thirteen.style.backgroundColor = "white";
            fourteen.style.display = "inline-block"; fourteen.backgroundColor = "white";
            // End Flag
            fifteen.style.display = "inline-block";
        }
}

// Esta función se encarga se iniciar el calculo de la simulación.
calculo = document.getElementsByClassName("calculo");
for (let i = 0; i < calculo.length; i++) {
    calculo[i].onclick = (ev) =>{
        set_calculo();
    }    
}
// La función que realiza la simulación.
function set_calculo(){
    // Calculamos primero la estrategia a una parada.
    // Para ello vemos si es viable la estrategia con blandos.

    get_info_race();
    if (weather != "" && race_length >= 0) {
        strategy();
        show_strategy();
    }else{
        display.innerHTML = "Marque las opciones para la simulación";
        console.log("Marque las opciones para la simulación");
    }
}