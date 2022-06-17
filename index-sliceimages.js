console.log("Ejecutando JS del carrusel");

var Index_Img = 1;
const max_img = 5;
const min_img = 1;
const img_default = "local/items/point-hueco.png";
const img_select = "local/css/images/tires/soft.png";

function plusImg(n) {
  Index_Img +=n;
  if (Index_Img<min_img) {
    Index_Img=max_img;
  }
  if(Index_Img>max_img){
    Index_Img=min_img;
  }
  document.getElementById("botoncitos1").src=img_default;
  document.getElementById("botoncitos2").src=img_default;
  document.getElementById("botoncitos3").src=img_default;
  document.getElementById("botoncitos4").src=img_default;
  document.getElementById("botoncitos5").src=img_default;
  if (Index_Img==1){
    document.getElementById("Azerbai").src="local/css/images/background/azerbaiyan-background.png";
    console.log("Cambiando la fuente");
    document.getElementById("botoncitos1").src=img_select;
  }
  if (Index_Img==2) {
    document.getElementById("Azerbai").src = "local/css/images/background/barhein-background.jpeg";
    console.log("Cambiando la fuente a Barhein");
    document.getElementById("botoncitos2").src=img_select;
  }
  if (Index_Img==3) {
    document.getElementById("Azerbai").src = "local/css/images/background/azerbaiyan_live.png";
    console.log("Cambiando la fuente a Barhein");
    document.getElementById("botoncitos3").src=img_select;
  }
  if (Index_Img==4) {
    document.getElementById("Azerbai").src = "local/css/images/tracks/canada.png";
    console.log("Cambiando la fuente a Canada");
    document.getElementById("botoncitos4").src=img_select;
  }
  if(Index_Img==5){
    document.getElementById("Azerbai").src = "local/css/images/tracks/monaco.png";
    console.log("Cambiando la fuente a Barhein");
    document.getElementById("botoncitos5").src=img_select;
  }
  console.log(Index_Img);
}

function change_Img(n) {
  Index_Img = n;

  document.getElementById("botoncitos1").src=img_default;
  document.getElementById("botoncitos2").src=img_default;
  document.getElementById("botoncitos3").src=img_default;
  document.getElementById("botoncitos4").src=img_default;
  document.getElementById("botoncitos5").src=img_default;
  if (Index_Img == 1) {
    document.getElementById("Azerbai").src="local/css/images/background/azerbaiyan-background.png";
    document.getElementById("botoncitos1").src="local/css/images/tires/soft.png";
  }
  if (Index_Img == 2) {
    document.getElementById("Azerbai").src = "local/css/images/background/barhein-background.jpeg";
    document.getElementById("botoncitos2").src="local/css/images/tires/soft.png";
  }
  if (Index_Img == 3) {
    document.getElementById("Azerbai").src = "local/css/images/background/azerbaiyan_live.png";
    document.getElementById("botoncitos3").src="local/css/images/tires/soft.png";
  }
  if (Index_Img == 4) {
    document.getElementById("Azerbai").src = "local/css/images/tracks/miami.png";
    document.getElementById("botoncitos4").src="local/css/images/tires/soft.png";
  }
  if (Index_Img == 5) {
    document.getElementById("Azerbai").src = "local/css/images/tracks/japon.png";
    document.getElementById("botoncitos5").src="local/css/images/tires/soft.png";
  }
}