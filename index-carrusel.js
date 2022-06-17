
var Index_Img = 0;

carrusel();

function carrusel() {

    Index_Img++;
    if (Index_Img<0) {
      Index_Img = 1;
    }
    if (Index_Img>1) {
      Index_Img = 0;
    }
    if (Index_Img==0){
      console.log("Cambiando la fuente a Azerbaiyan");
      document.getElementById("Azerbi").src='local/css/images/background/azerbaiyan-background.png';
    }
    if (Index_Img==1) {
      console.log("Cambiando la fuente a Barhein");
      document.getElementById("Azerbi").src="local/css/images/background/barhein-background.jpeg";
    }
    setTimeout(carrusel,1000);
    console.log("Carrusel funciona");
  }