//------------------------------------------------------------------------------------------
// SECCION VARIABLES GLOBALES
//------------------------------------------------------------------------------------------
//DATOS DE JUGADORES
var jugadores = new Array();
//INICIO DEL JUEGO
var contenidoCargado = false;
var iniciarJuego=false;

//PARTIDA
var global_transicion_nivel=false;
var global_nivel_actual=1;
var global_nivel_maximo=4;
var global_pausado=false;
var global_modo_ataque=false;
var global_puntaje=0;
var gameLoop=null;
var global_tiempo_vulnerable=350;
var global_nivel_completado=false;
var global_tiempo_repintar=45;//SI ES MENOR ES MAS VELOZ, SI ES MAYOR ES MAS LENTO
//DATOS DEL MAPA
var global_tamanio=64;//TAMAÑO DE LOS BLOQUES,PERSONAJE,ENEMIGOS E ITEMS (MULTIPLO DE 8)
//DATOS DE MOVIMIENTO
var global_incremento=4;//CANTIDAD DE PASOS (DIVISOR DEL TAMAÑO)
var global_incremento_muerte=32;//CANTIDAD DE PASOS (MITAD DEL TAMAÑO)
//PLAYER 1
var global_p1_dir="l";
var global_p1_pos_fil=11;
var global_p1_pos_col=12;
var global_p1_colision=false;
var global_p1_vidas=3;
//PLAYER 2
var global_p2_dir="r";
var global_p2_pos_fil=11;
var global_p2_pos_col=12;
var global_p2_colision=false;
var global_p2_vidas=3;

//FANTASMAS GENERAL (LUGAR A DONDE VUELVEN AL MORIR)
var global_f_pos_fil=7;
var global_f_pos_col=12;

//FANSTASMA 1
var global_f1_pos_fil=4;
var global_f1_pos_col=12;
var global_f1_skin="skin1";
var global_f1_tiempo_de_salida=100;
//FANSTASMA 2
var global_f2_pos_fil=5;
var global_f2_pos_col=12;
var global_f2_skin="skin1";
var global_f2_tiempo_de_salida=50;
//FANSTASMA 3
var global_f3_pos_fil=6;
var global_f3_pos_col=12;
var global_f3_skin="skin1";
var global_f3_tiempo_de_salida=200;
//FANSTASMA 4
var global_f4_pos_fil=7;
var global_f4_pos_col=12;
var global_f4_skin="skin1";
var global_f4_tiempo_de_salida=400;




//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//AGREGADA TEMPORAL
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var jugador =
{
    nombre: "VICTOR",
    avatar: "1",
    tablet: "LG"
};
jugadores.push(jugador);
jugador =
{
    nombre: "DAVID",
    avatar: "3",
    tablet: "TABLET"
};
jugadores.push(jugador);
//++++++++++++++++++++++++++++++++++++++++++++++++++

function mostrarJugadores(){
    //Limpiar los jugadores
    $('#seccionJugadores').children().remove();
    //Mostar vidas
    var vidasActuales=3;

    for (var i = 0; i < jugadores.length; i++) {
        if(i==0)
        {
          vidasActuales=global_p1_vidas.toString();
        }
        else 
        {
          vidasActuales=global_p2_vidas.toString();
        }
        $('#seccionJugadores').append("<div class=\"contenedor-jugador\">" +
                                        "<img class=\"jugador\" src=\"assets/images/juego/per" + jugadores[i].avatar + "/0.png\">" +
                                        "<label class=\"jugador-nombre\">" + (jugadores[i].nombre).toUpperCase() + "</label>" +
                                        "</div>");
        if(i==jugadores.length-1)
        {
          $('#seccionJugadores').append("<div class=\"contenedor-puntaje\">" +
                                        "<label id=\"jugador-puntaje\" class=\"jugador-puntaje\">" + "Puntaje: "+ global_puntaje + "</label>" +
                                        "</div>");
        }
    }
}
function borrarPopUp() {
    //DESAPARECE EL POPUP MOSTRADO
    $('#popups').children().remove();
    $('#popups').hide();
}
function mostrarPopUp() {
    //APARECE EL POPUP MOSTRADO
    $('#popups').children().remove();
    $('#popups').show();
}
function mostrarPopUpGanador(nivel) {
    mostrarPopUp();
    $('#popups').append('<img class=\"pop-up-ganador\" src=\'assets/images/juego/popup_ganador.png\'>')
    //SE PUEDE INDICAR EL NIVEL SUPERADO
    //$('#popups').append('<img class=\"pop-up-ganador\" src=\'assets/images/juego/popup_ganador.png\'>' +
    //                    '<div class=\"pop-up-ganador-texto \">' + nivel + '</div>');
}
function mostrarPopUpGameOver() {
    mostrarPopUp();
    $('#popups').append('<img class=\"pop-up-ganador\" src=\'assets/images/juego/popup_gameover.png\'>');
}
function mostrarPopUpPausa() {

    mostrarPopUp();
    $('#popups').append('<img class=\"pop-up-ganador\" src=\'assets/images/juego/popup_pausa.png\'>');
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//AGREGADA TEMPORAL
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//---------------------------------------------------------
//SECCION - FANSTAMA
//---------------------------------------------------------
function fantasma(x,y,tamanio,color,spriteInicial,tiempoInicial)
{
    //DIRECCION ACGTUAL DEL FANTASMA
    this.direccionActual=null;
    //PAUSAR JUEGO
    this.pausado=false;

    //DETENER LUEGO DE MATAR AL PERSONAJE
    this.detener=false;

    //TIEMPO ANTES DE SALIR EN BUSCA DEL PERSONAJE INICIAL
    this.tiempoInicial=tiempoInicial; 
    this.tiempoInicialAux=0;

    //VUELVE A LA POSICION DE MUERTE
    this.xAbsInicial=global_f_pos_col;
    this.yAbsInicial=global_f_pos_fil;

    //TIEMPO VULNERABLE
    this.tiempoVulnerable=global_tiempo_vulnerable; //variable para volver al tiempo normal
    this.tiempoVulnerableAux=0;

    this.xAbs;
    this.yAbs;
    this.x=x;
    this.xDireccion=0;                
    this.y=y;
    this.yDireccion=1;
    this.incremento=global_incremento;
    this.sprites=
    [
      new Image(),new Image(),new Image(),new Image(),
      new Image(),new Image(),new Image(),new Image(),
      new Image(),new Image(),new Image(),new Image(),
      new Image(),new Image(),new Image(),new Image()
    ];

    this.spritesActual=spriteInicial;
    this.tamanio=tamanio;
    this.color=color; //variable para saber cual es el color del fantasma
    this.estado=1; //me permite saber en que estado se encuentran los fantasmas
    this.dibujar=dibujar;


    this.crearSprites=crearSprites;
    this.crearSprites(this.color,this.sprites);//COLOR BASE

    this.mover=mover;
    this.cambiarEstado=cambiarEstado;
    this.tiempoEstado=tiempoEstado;
    this.verificarColision=verificarColision;
    this.movimientoInicial=movimientoInicial;
   
   //SI SE COLISIONA CON CUALQUIER JUGADOR AMBOS PIERDEN PARA EVITAR QUE SE GANE FACILMENTE
   function verificarColision()
   {
       //PLAYER 1
       //puntos de las direcciones del pacman
       var px1=pc.x+pc.ancho*3/8;
       var py1=pc.y+pc.alto*3/8;
       var px2=pc.x+pc.ancho*5/8;
       var py2=pc.y+pc.alto*5/8;

       //PLAYER 2
       if(jugadores.length==2)
       {
        //puntos de las direcciones del pacman
         var p2x1=pc2.x+pc2.ancho*3/8;
         var p2y1=pc2.y+pc2.alto*3/8;
         var p2x2=pc2.x+pc2.ancho*5/8;
         var p2y2=pc2.y+pc2.alto*5/8;
       }
       
       //puntos de las direcciones del fantasma
       var fx1=this.x;
       var fy1=this.y;
       var fx2=this.x+this.tamanio;
       var fy2=this.y+this.tamanio;
       /////////////////////////////////////////
       
       
       //COLISION CON JUGADOR 1
       var colision=false;
       if((px1>fx1 && px1<fx2) && (py1>fy1 && py1<fy2))
       {
           colision=true;
       }
       if((px1>fx1 && px1<fx2) && (py2>fy1 && py2<fy2))
       {
           colision=true;
       }
       if((px2>fx1 && px2<fx2) && (py1>fy1 && py1<fy2))
       {
           colision=true;
       }
       if((px2>fx1 && px2<fx2) && (py2>fy1 && py2<fy2))
       {
           colision=true;
       }
       global_p1_colision=colision;//VERIFICAR SI COLISIONO EL PLAYER 1

       //COLISION CON JUGADOR 2
       colision=false;
       if(jugadores.length==2)
       {
         if((p2x1>fx1 && p2x1<fx2) && (p2y1>fy1 && p2y1<fy2))
         {
             colision=true;
         }
         if((p2x1>fx1 && p2x1<fx2) && (p2y2>fy1 && p2y2<fy2))
         {
             colision=true;
         }
         if((p2x2>fx1 && p2x2<fx2) && (p2y1>fy1 && p2y1<fy2))
         {
             colision=true;
         }
         if((p2x2>fx1 && p2x2<fx2) && (p2y2>fy1 && p2y2<fy2))
         {
             colision=true;
         }
         global_p2_colision=colision;//VERIFICAR SI COLISIONO EL PLAYER 1
       }
       
       if(global_p1_colision==true || global_p2_colision==true)
       {
        return true;
       }
       else
       {
        return false;
       }
   }
   
   function cambiarEstado(estado)
   {
       //document.getElementById("prueba").value=color;
       if(estado==1) //estado vivo
       {                      
           //alert(this.color);
           this.incremento=4;
          // this.crearSprites(this.color);
           this.estado=1;
       }
       
       if(estado==2) //estado vulnerable
       {
           this.incremento=2;
          // this.crearSprites("Azul");
           this.estado=2;
       }
       
       if(estado==3) //estado intermedio entre vulnerable y con color
       {
           this.estado=3;
           //this.crearSprites("Mix");
           
       }
       
       if(estado==4) //estado para comprobar que esta muerto
       {
           this.tiempoVulnerableAux=0;
           this.incremento=global_incremento_muerte;
           this.x=Math.floor(this.x/this.incremento)*this.incremento;
           this.y=Math.floor(this.y/this.incremento)*this.incremento;
           this.estado=4;                       
       }
       
   }
   
   function crearSprites(skin,sprites)
   {
      //IZQUIERDA
      sprites[0].src="assets/images/Enemigos/"+skin+"/l1.png";
      sprites[1].src="assets/images/Enemigos/"+skin+"/l2.png";
      sprites[2].src="assets/images/Enemigos/"+skin+"/l3.png";
      sprites[3].src="assets/images/Enemigos/"+skin+"/l2.png";
      //DERECHA
      sprites[4].src="assets/images/Enemigos/"+skin+"/r1.png";
      sprites[5].src="assets/images/Enemigos/"+skin+"/r2.png";
      sprites[6].src="assets/images/Enemigos/"+skin+"/r3.png";
      sprites[7].src="assets/images/Enemigos/"+skin+"/r2.png";
      //ARRIBA
      sprites[8].src="assets/images/Enemigos/"+skin+"/b1.png";
      sprites[9].src="assets/images/Enemigos/"+skin+"/b2.png";
      sprites[10].src="assets/images/Enemigos/"+skin+"/b3.png";
      sprites[11].src="assets/images/Enemigos/"+skin+"/b2.png";
      //ABAJO
      sprites[12].src="assets/images/Enemigos/"+skin+"/f1.png";
      sprites[13].src="assets/images/Enemigos/"+skin+"/f2.png";
      sprites[14].src="assets/images/Enemigos/"+skin+"/f3.png";
      sprites[15].src="assets/images/Enemigos/"+skin+"/f2.png";
   }
    function dibujar(contexto)
    {
        if(this.estado!=4) //verifica si se tiene que dibujar el cuerpo
        {
            contexto.drawImage(this.sprites[this.spritesActual],this.x,this.y,this.tamanio,this.tamanio);
        }

       //NUEVA DIRECCION DEL SPRITE
       if(this.direccionActual=="l")
        {
          //0-3
          //Limite: 4
          if(this.spritesActual+1==4)
          {
              this.spritesActual=0;
          }
          else
          {
              this.spritesActual++;
          }
        }
        else if(this.direccionActual=="r")
        {
          //4-7
          //Limite: 8
          if(this.spritesActual+1==8)
          {
              this.spritesActual=4;
          }
          else
          {
              this.spritesActual++;
          }
        }
        else if(this.direccionActual=="u")
        {
          //8-11
          //Limite: 12
          if(this.spritesActual+1==12)
          {
              this.spritesActual=8;
          }
          else
          {
              this.spritesActual++;
          }
        }
        else if(this.direccionActual=="d")
        {
          //12-15
          //Limite: 16
          if(this.spritesActual+1==16)
          {
              this.spritesActual=12;
          }
          else
          {
              this.spritesActual++;
          }
        }
    }
    
    function tiempoEstado()
    {
       // this.cambiarEstado(1);
        if(this.tiempoVulnerableAux<this.tiempoVulnerable)
        {
            if(this.tiempoVulnerableAux>this.tiempoVulnerable*3/4)
            {
                //if(this.tiempoVulnerableAux%this.incremento==0)
               // {
               if(this.estado!=3)
                  this.cambiarEstado(3);
               // }
            }
            this.tiempoVulnerableAux++;
            
        }
        else
        {
            global_modo_ataque=false;
            this.tiempoVulnerableAux=0;
            this.cambiarEstado(1);
            //Volver a musica de perecucion del personaje
            escenario.cambiarSonido(1);
        }
        
        
    }
    
    
    function movimientoInicial()
    {
        var mover=false;
        if(this.tiempoInicialAux<this.tiempoInicial)
        {
            this.tiempoInicialAux++;
        }
        else
        {
            //this.tiempoInicialAux=0;
            mover=true;
        }
        return mover;
    }
    
    //FANTASMA BUSCA A PACMAN, ESCAPA DE EL Y VAGA POR EL MAPA LUEGO DE MATARLO
    function mover(stage,x,y)
    {
        //DETIENE AL FANSTASMA
        if(this.pausado==true)
        {
          return;
        }
        if(this.estado==4) //comprobacion para revivir
        {
            if(this.xAbsInicial==this.xAbs && this.yAbsInicial==this.yAbs)
            {
                this.tiempoInicialAux=0;
                this.cambiarEstado(1);
            }
        }
       
                          
       if(this.estado==2 || this.estado==3) //funcion para indicar que esta muerto
       {
           this.tiempoEstado();
       }
      
       if(this.verificarColision())
       {
           if(this.estado==1) //validacion para matar al pacman
           {
               enemigo.detener=true;
               enemigo2.detener=true;
               enemigo3.detener=true;
               enemigo4.detener=true;

               //PLAYER 1
               if(global_p1_colision==true)
               {
                pc.incremento=0;
                pc.muerto=true;
                pc.sonidoMuerte.play();
                global_p1_colision=false;
               }
               //PLAYER 2
               if(global_p2_colision==true)
               {
                pc2.incremento=0;
                pc2.muerto=true;
                pc2.sonidoMuerte.play();
                global_p2_colision=false;
               }
               //borrar pause en colision
           }
           
           if(this.estado==2 || this.estado==3)
           {
              pc.sonidoComerFantasma.play();
              this.cambiarEstado(4);
           }                         
       }
       this.xAbs=this.x/stage.tamanio;
       this.yAbs=this.y/stage.tamanio;

       //PERSEGUIR A PACMAN
       if(this.x%stage.tamanio==0 && this.y%stage.tamanio==0) 
        {
            ////////asigno probabilidades a cada direccion
            var izq,der,arriba,aba;
            if(this.estado==1) //movimiento cuando el pacman esta en estado normal
            {
                if(this.x<x)
                {
                    der={porcentaje:45,direccion:"r"};
                    izq={porcentaje:10,direccion:"l"};
                }
                else
                {
                    der={porcentaje:10,direccion:"r"};
                    izq={porcentaje:45,direccion:"l"};
                }

                if(this.y<y)
                {
                    arriba={porcentaje:10,direccion:"u"};
                    aba={porcentaje:35,direccion:"d"};
                }
                else
                {
                    arriba={porcentaje:35,direccion:"u"};;
                    aba={porcentaje:10,direccion:"d"};
                }
            }
            else
            {
                if(this.estado==2 || this.estado==3) //movimiento cuando el pacman esta en azul
                {
                    if(this.x<x)
                    {
                        der={porcentaje:5,direccion:"r"};
                        izq={porcentaje:50,direccion:"l"};
                    }
                    else
                    {
                        der={porcentaje:50,direccion:"r"};
                        izq={porcentaje:5,direccion:"l"};
                    }

                    if(this.y<y)
                    {
                        arriba={porcentaje:5,direccion:"u"};
                        aba={porcentaje:40,direccion:"d"};
                    }
                    else
                    {
                        arriba={porcentaje:40,direccion:"u"};;
                        aba={porcentaje:5,direccion:"d"};
                    }
                    
                }
                if(this.estado==4) //movimiento cuando el pacmna esta muerto
                {
                   
                    if(this.yAbs==3) //hacer cuando ya esta alineado horizontalmente
                    {
                        if(this.xAbs==this.xAbsInicial) //cuando ya esta alineado verticalmente
                        {
                            
                            der={porcentaje:0,direccion:"r"};
                            izq={porcentaje:0,direccion:"l"};
                            arriba={porcentaje:0,direccion:"u"};
                            aba={porcentaje:100,direccion:"d"};
                        }
                        else //cuando todavia no esta alineado en forma horizontal
                        {                                    
                            if(this.x<this.xAbsInicial*this.tamanio)
                            {
                                der={porcentaje:100,direccion:"r"};
                                izq={porcentaje:0,direccion:"l"};
                            }
                            else
                            {
                                der={porcentaje:0,direccion:"r"};
                                izq={porcentaje:100,direccion:"l"};
                            }

                            arriba={porcentaje:0,direccion:"u"};
                            aba={porcentaje:0,direccion:"d"};
                        }
                    }
                    else
                    {
                         if(this.yAbs==9)
                         {
                                if(this.xAbs==this.xAbsInicial+2) //aliniar a la parte superior
                                {
                                    der={porcentaje:0,direccion:"r"};
                                    izq={porcentaje:0,direccion:"l"};
                                    arriba={porcentaje:100,direccion:"u"};
                                    aba={porcentaje:0,direccion:"d"};
                                }
                                else
                                {
                                    if(this.x<(this.xAbsInicial+2)*this.tamanio) //alinear a la parte inferior
                                    {
                                        der={porcentaje:100,direccion:"r"};
                                        izq={porcentaje:0,direccion:"l"};
                                        arriba={porcentaje:0,direccion:"u"};
                                        aba={porcentaje:0,direccion:"d"};
                                    }
                                    else
                                    {
                                        der={porcentaje:0,direccion:"r"};
                                        izq={porcentaje:100,direccion:"l"};
                                        arriba={porcentaje:0,direccion:"u"};
                                        aba={porcentaje:0,direccion:"d"};
                                    }
                                }
                            }
                            else
                            {
                                if(this.x<this.xAbsInicial*this.tamanio)
                                {
                                    der={porcentaje:25,direccion:"r"};
                                    izq={porcentaje:20,direccion:"l"};
                                }
                                else
                                {
                                    der={porcentaje:20,direccion:"r"};
                                    izq={porcentaje:25,direccion:"l"};
                                }
                                //para del x
                                if(this.y<this.yAbsInicial*this.tamanio)
                                {
                                    arriba={porcentaje:20,direccion:"u"};
                                    aba={porcentaje:35,direccion:"d"};
                                }
                                else
                                {
                                    arriba={porcentaje:35,direccion:"u"};
                                    aba={porcentaje:20,direccion:"d"};
                                }
                            }
                    }
                    
                }
            }
            
            
            
            ///verifico que posiciones son las validas
            var opcionesValidas=[];
            var totalPorcentaje=0;
            var i=0;
            

            if(stage.colisionPacman(this.xAbs-1,this.yAbs)==0 || stage.colisionPacman(this.xAbs-1,this.yAbs)==9)
            {
                opcionesValidas[i++]=izq;
                totalPorcentaje+=izq.porcentaje;
            }
            
            if(stage.colisionPacman(this.xAbs+1,this.yAbs)==0 || stage.colisionPacman(this.xAbs+1,this.yAbs)==9)
            {
                opcionesValidas[i++]=der;
                totalPorcentaje+=der.porcentaje;
            }

            if(stage.colisionPacman(this.xAbs,this.yAbs-1)==0 || stage.colisionPacman(this.xAbs,this.yAbs-1)==9 || stage.colisionPacman(this.xAbs,this.yAbs-1)==8)
            {
                if(stage.colisionPacman(this.xAbs,this.yAbs-1)==8)
                {
                    if(this.movimientoInicial())
                    {
                        opcionesValidas[i++]=arriba;
                        totalPorcentaje+=arriba.porcentaje;
                    }
                    
                }
                else
                {
                    opcionesValidas[i++]=arriba;
                    totalPorcentaje+=arriba.porcentaje;
                }
            }

            if(stage.colisionPacman(this.xAbs,this.yAbs+1)==0 || stage.colisionPacman(this.xAbs,this.yAbs+1)==9 || stage.colisionPacman(this.xAbs,this.yAbs+1)==8 )
            {
                //if(this.estado==4)
                if(stage.colisionPacman(this.xAbs,this.yAbs+1)==8)
                {
                    if(this.estado==4)
                    {
                        opcionesValidas[i++]=aba;
                        totalPorcentaje+=aba.porcentaje;
                    }
                }
                else
                {
                    opcionesValidas[i++]=aba;
                    totalPorcentaje+=aba.porcentaje;
                }
            }
            
            /////////////////calculo el porcentaje y cual es la opcion final
            var random=Math.floor((Math.random()*totalPorcentaje)+1);
            var acumulado=0;
            var bandera=true;
            
            if(opcionesValidas.length==2)
            {
               
               var auxDireccion="n"; 
               
               if(this.xDireccion==1)auxDireccion="r"; 
               if(this.xDireccion==-1)auxDireccion="l"; 
               if(this.yDireccion==1)auxDireccion="d"; 
               if(this.yDireccion==-1)auxDireccion="u"; 
               
               if(auxDireccion==opcionesValidas[0].direccion || auxDireccion==opcionesValidas[1].direccion)
               {
                   bandera=false;
               }
               
            }
            
            if(bandera)
            {
                ///encerar los valores de la direccion
                this.xDireccion=0;
                this.yDireccion=0;


                for(var k=0;k<opcionesValidas.length;k++)
                {

                   if(random>acumulado && random<=(acumulado+opcionesValidas[k].porcentaje))
                   {
                       if(opcionesValidas[k].direccion=="l")
                       {
                          this.xDireccion=-1;
                          //DIRECCION SELECCIONADA
                          this.direccionActual="l";
                          this.spritesActual=0;
                       }

                       if(opcionesValidas[k].direccion=="r")
                       {
                          this.xDireccion=+1;
                          //DIRECCION SELECCIONADA
                          this.direccionActual="r";
                          this.spritesActual=4;
                       }

                       if(opcionesValidas[k].direccion=="u")
                       {
                          this.yDireccion=-1;
                          //DIRECCION SELECCIONADA
                          this.direccionActual="u";
                          this.spritesActual=8;
                       }


                       if(opcionesValidas[k].direccion=="d")
                       {
                          this.yDireccion=1;
                          //DIRECCION SELECCIONADA
                          this.direccionActual="d";
                          this.spritesActual=12;
                       }

                       break;

                   }

                   acumulado=acumulado+opcionesValidas[k].porcentaje;
                }
            }
        }
        this.movimientoInicial();
        //if(this.movimientoInicial())
        //{
            this.x=this.x+this.xDireccion*this.incremento;
            this.y=this.y+this.yDireccion*this.incremento;
        //}
         
        
    }
}
            
    
//---------------------------------------------------------
//SECCION - NIVEL
//---------------------------------------------------------
function stage()
{
    //SONIDO DEL ENEMIGO
    this.sonido=new Audio();
    this.sonido.src="sonido/enemigo.wav";
    this.sonido.loop=true;
    this.sonido.play();

    //DATOS DEL NIVEL
    this.tamanio=global_tamanio;
    this.nombre="stage Prueba";

    //ITEMS EN EL MAPA
    this.imgBoton=new Image();
    this.imgBoton.src="assets/images/Items/item2.png";
    this.imgBoton2=new Image();
    this.imgBoton2.src="assets/images/Items/item1.png";
    //ITEM ESPECIAL
    this.imgBoton3=new Image();
    this.imgBoton3.src="assets/images/Items/itemEspecial.png";

    //FONDO DEL MAPA
    this.wallapaper=new Image();
    this.wallapaper.src="assets/images/Fondo/wallpaper.png"

    //TEXTURA ESTANDAR
    this.imgFondoAzul=new Image();
    this.imgFondoAzul.src="assets/images/Bloques/textura1_estandar.png";
    //TEXTURA 3D
    this.imgFondoAmarillo=new Image();
    this.imgFondoAmarillo.src="assets/images/Bloques/textura1_relieve.png";
    //TEXTURA ENTRADA DE LOS FANSTASMAS
    this.imgEntrada=new Image();
    this.imgEntrada.src="assets/images/Bloques/entrada1.png";
    //TEXTURA BORDE
    this.img=new Image();
    this.img.src="assets/images/Bloques/textura1_borde.png";
    
    //-----------------------------------
    //MATRIZ DE JUEGO
    //-----------------------------------
    //0: Items tipo 1
    //7: Movimiento invalido para los fantasmas
    //5: Items tipo especial

    //8: Salida de fantasmas
    //1: Bordes del mapa
    //2: Bloque normal
    //3: Bloque 3D
    //9: Vacio transaparente

    //4: NADA...
    //6: NADA...

    this.matrizCamino= 
    [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,9,9,9,9,9,9,9,9,9,9,2,9,9,9,9,9,1],
      [1,9,9,3,3,3,3,9,3,3,9,3,9,3,9,3,3,1],
      [1,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,1],
      [1,9,9,9,9,9,9,9,9,9,9,2,8,2,9,9,9,1],
      [1,9,9,9,9,9,9,9,9,9,9,2,9,2,9,9,9,1],
      [1,9,9,9,9,9,9,9,9,9,9,2,9,2,9,9,2,1],
      [1,9,9,9,9,9,9,9,9,9,9,2,9,2,9,9,2,1],
      [1,9,9,9,9,9,9,9,9,9,9,3,3,3,9,9,3,1],
      [1,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,1],
      [1,9,9,9,9,0,0,0,0,0,0,0,9,9,9,9,9,1],
      [1,9,9,9,9,0,3,3,3,9,2,0,9,3,3,9,9,1],
      [1,5,0,0,0,0,9,9,9,9,3,9,9,9,9,9,9,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ];

    this.dibujar=dibujar;
    this.colisionPacman=colisionPacman;
    this.comer=comer;
    this.cambiarSonido=cambiarSonido;
    
    function cambiarSonido(op)
    {
        if(op==1)
        {
            this.sonido.src="sonido/enemigo.wav";
        }
        
        if(op==2)
        {
            this.sonido.src="sonido/modo_ataque.wav";
        }
        this.sonido.play();
    }
    
    function colisionPacman(x,y)
    {
        var fila=this.matrizCamino[y];
        return fila[x];
    }
    
    function comer(x,y)
    {
        var fila=this.matrizCamino[y];
        if(fila[x]==0 || fila[x]==7 )
        {
            fila[x]=9;
            pc.sonidoCogerItem.play();
            ++global_puntaje;
            document.getElementById("jugador-puntaje").innerHTML = "Puntaje: " + global_puntaje;
                                    
        }
        //SI COME LA PASTILLA AZUL
        if(fila[x]==5)
        {
            global_modo_ataque=true;
            if(enemigo.estado!=4 && enemigo.tiempoInicialAux==enemigo.tiempoInicial)
                enemigo.cambiarEstado(2);
        
            if(enemigo2.estado!=4 && enemigo2.tiempoInicialAux==enemigo2.tiempoInicial)    
                enemigo2.cambiarEstado(2);
            
            if(enemigo3.estado!=4 && enemigo3.tiempoInicialAux==enemigo3.tiempoInicial)
                enemigo3.cambiarEstado(2);
            
            if(enemigo4.estado!=4 && enemigo4.tiempoInicialAux==enemigo4.tiempoInicial)
                enemigo4.cambiarEstado(2);
            
            this.cambiarSonido(2);
            
            fila[x]=9;
        }
    }
    //DIBUJAR Y VALIDAR GANADOR
    function dibujar(contexto)
    {
        //DIMENSIONES DEL TABLERO EN BASE A LA MATRIZ DEFINIDA
        var matriz_fil=escenario.matrizCamino.length;
        var matriz_col=escenario.matrizCamino[0].length;

        //DIBUJA EL FONDO DEL MAPA
        contexto.drawImage(this.wallapaper,0,0,matriz_col*global_tamanio,matriz_fil*global_tamanio);

        var gano=true;

        for(var i=0;i<this.matrizCamino.length;i++)
        {
            var fila=this.matrizCamino[i];
            for(var j=0;j<fila.length;j++)
            {
                //verificar si gano, SI ESTA COMIENDO LOS ITEMS (NORMAL O ESPECIAL)
                if(fila[j]==0 || fila[j]==5)
                {
                    gano=false;
                }
                //DIBUJA LOS BORDES DEL MAPA
                if(fila[j]==1)
                {
                    contexto.drawImage(this.img,j*this.tamanio,i*this.tamanio,this.tamanio,this.tamanio);
                }
                else
                {
                    //DIBUJA LA SALIDA DEL FANTASMA
                    if(fila[j]==8)
                    {
                        contexto.drawImage(this.imgEntrada,j*this.tamanio,i*this.tamanio,this.tamanio,this.tamanio);
                    }
                    //DIBUJAR EL BLOQUE NORMAL
                    else
                    if(fila[j]==2)
                    {
                        contexto.drawImage(this.imgFondoAzul,j*this.tamanio,i*this.tamanio,this.tamanio,this.tamanio);
                        
                    }
                    else
                    {
                        //DIBUJA EL BLOQUE 3D
                        if(fila[j]==3)
                        {
                            contexto.drawImage(this.imgFondoAmarillo,j*this.tamanio,i*this.tamanio,this.tamanio,this.tamanio);
                        }
                        else
                        {
                            //SI NO ES TRANSPARENTE
                            if(fila[j]!=9) //determino si esta vacia
                            {
                                //DIBUJA SI ES UN ITEM ESPECIAL
                                if(fila[j]==5)
                                {
                                    contexto.drawImage(this.imgBoton3,j*this.tamanio+this.tamanio*1/4,i*this.tamanio+this.tamanio*1/4,this.tamanio/2,this.tamanio/2);
                                }
                                //DA EL EFECTO DE QUE LOS ITEMS BRILLAN
                                else
                                {
                                    var aleatorioAux=Math.floor((Math.random()*25)+1); 
                                    if(aleatorioAux==1)
                                    {
                                        var aleatorio=Math.floor((Math.random()*2)+1); 
                                        if(aleatorio==1)
                                        {
                                            contexto.drawImage(this.imgBoton2,j*this.tamanio+this.tamanio*1/4,i*this.tamanio+this.tamanio*1/4,this.tamanio/2,this.tamanio/2);
                                        }
                                        else
                                        {
                                            contexto.drawImage(this.imgBoton,j*this.tamanio+this.tamanio*1/4,i*this.tamanio+this.tamanio*1/4,this.tamanio/2,this.tamanio/2);
                                        }
                                    }
                                    else
                                    {
                                        contexto.drawImage(this.imgBoton,j*this.tamanio+this.tamanio*1/4,i*this.tamanio+this.tamanio*1/4,this.tamanio/2,this.tamanio/2);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            
        }
       

       if(gano==true && global_transicion_nivel!=true)
       {
        //Evita que se ejecute esta secion multiples veces
        global_transicion_nivel=true;
        global_nivel_completado=true;
        

        //AVISAR QUE ES EL FIN DE LA PARTIDA <- SDK
        //ENVIA JSON A LOS DISPOSITIVOS PARA INDICAR EL FIN DE LA PARTIDA
        //finDePartida();
        mostrarPopUpGanador("Nivel Completado");

        if(global_nivel_actual!=global_nivel_maximo)
        {
          setTimeout(borrarPopUp, 7000);
          global_nivel_actual++;
          //Volver a musica de perecucion del personaje
          escenario.cambiarSonido(1);
          setTimeout(nuevoNivel(global_nivel_actual), 20000);
        }
       }
    }
    
    
}
    

//---------------------------------------------------------
//SECCION - PERSONAJE
//---------------------------------------------------------
function pacman(x,y,ancho,alto,skin)
//function pacman(x,y,ancho,alto,tamanio,skin)
{
    //PAUSAR EL JUEGO
    this.pausado=false;

    this.spritefinPacman=0;
    //Sentido donde se mueve actualmente
    this.direccionActual="n";

    //Skin seleccionado
    this.skinActual=skin;
    this.skinDefault="skin1";
    this.muerto=false;
    ///variables para el sonido
    this.sonidoCogerItem=new Audio();
    this.sonidoCogerItem.src="sonido/coger_item.wav";
    this.sonidoComerFantasma=new Audio();
    this.sonidoComerFantasma.src="sonido/enemigo_eliminado.wav";
    this.sonidoMuerte=new Audio();
    this.sonidoMuerte.src="sonido/jugador_muerto.wav";
    //this.sonido.loop=true;
    //this.sonido.play();

    //////////variables iniciables
    this.xAbs; //posicion x absoluta respecto al stage
    this.yAbs; //posicion y absoluta respecto al stage
    this.numeroPasos=10; //variable para identificar el numero de pasos automaticos que camina
    this.numeroPasosContador=0;//variable para contar el numerod e pasos
    this.direccionFutura='n'; //variable para identificar el posible giro
    this.direccionAnterior='n';//variable para verificar que hice un cambio de direccion antes de llegar a un punto absoluto
    this.detenido=false;//variable para determinar si pacman esta parado
    
    this.x=x; //posicion inicial x
    this.y=y; //posicion inicial y
    this.ancho=ancho;
    this.alto=alto;
    this.anguloRotacion=0;
    this.incremento=global_incremento; //variable para aumentar el dezplazamiento
    this.direccion="n"  /// n-> nulo , l -> left , r -> right , u -> up , d-> down
    this.spriteActual=0; //indice que controla el sprite actual


    //SPRITES DE MOVIMIENTO
    //this.tamanio=tamanio;//CANTIDAD DE SPRITES USADOS
    this.sprites=
    [
      //IZQUIERDA
      new Image(),new Image(),new Image(),new Image(),
      //DERECHA
      new Image(),new Image(),new Image(),new Image(),
      //ARRIBA
      new Image(),new Image(),new Image(),new Image(),
      //ABAJO
      new Image(),new Image(),new Image(),new Image()
    ];
    this.spritesAtaque=
    [
      //IZQUIERDA
      new Image(),new Image(),new Image(),new Image(),
      //DERECHA
      new Image(),new Image(),new Image(),new Image(),
      //ARRIBA
      new Image(),new Image(),new Image(),new Image(),
      //ABAJO
      new Image(),new Image(),new Image(),new Image()
    ];
    //SKINS DEL JUGADOR
    //MODO NORMAL
    this.sprites[0].src="assets/images/Personajes/personaje"+this.skinActual+"/NORMAL/"+"l1.png";
    this.sprites[1].src="assets/images/Personajes/personaje"+this.skinActual+"/NORMAL/"+"l2.png";
    this.sprites[2].src="assets/images/Personajes/personaje"+this.skinActual+"/NORMAL/"+"l3.png";
    this.sprites[3].src="assets/images/Personajes/personaje"+this.skinActual+"/NORMAL/"+"l2.png";

    this.sprites[4].src="assets/images/Personajes/personaje"+this.skinActual+"/NORMAL/"+"r1.png";
    this.sprites[5].src="assets/images/Personajes/personaje"+this.skinActual+"/NORMAL/"+"r2.png";
    this.sprites[6].src="assets/images/Personajes/personaje"+this.skinActual+"/NORMAL/"+"r3.png";
    this.sprites[7].src="assets/images/Personajes/personaje"+this.skinActual+"/NORMAL/"+"r2.png";

    this.sprites[8].src="assets/images/Personajes/personaje"+this.skinActual+"/NORMAL/"+"b1.png";
    this.sprites[9].src="assets/images/Personajes/personaje"+this.skinActual+"/NORMAL/"+"b2.png";
    this.sprites[10].src="assets/images/Personajes/personaje"+this.skinActual+"/NORMAL/"+"b3.png";
    this.sprites[11].src="assets/images/Personajes/personaje"+this.skinActual+"/NORMAL/"+"b2.png";

    this.sprites[12].src="assets/images/Personajes/personaje"+this.skinActual+"/NORMAL/"+"f1.png";
    this.sprites[13].src="assets/images/Personajes/personaje"+this.skinActual+"/NORMAL/"+"f2.png";
    this.sprites[14].src="assets/images/Personajes/personaje"+this.skinActual+"/NORMAL/"+"f3.png";
    this.sprites[15].src="assets/images/Personajes/personaje"+this.skinActual+"/NORMAL/"+"f2.png";

    //MODO ATAQUE
    this.spritesAtaque[0].src="assets/images/Personajes/personaje"+this.skinActual+"/AT/"+"l1.png";
    this.spritesAtaque[1].src="assets/images/Personajes/personaje"+this.skinActual+"/AT/"+"l2.png";
    this.spritesAtaque[2].src="assets/images/Personajes/personaje"+this.skinActual+"/AT/"+"l3.png";
    this.spritesAtaque[3].src="assets/images/Personajes/personaje"+this.skinActual+"/AT/"+"l2.png";

    this.spritesAtaque[4].src="assets/images/Personajes/personaje"+this.skinActual+"/AT/"+"r1.png";
    this.spritesAtaque[5].src="assets/images/Personajes/personaje"+this.skinActual+"/AT/"+"r2.png";
    this.spritesAtaque[6].src="assets/images/Personajes/personaje"+this.skinActual+"/AT/"+"r3.png";
    this.spritesAtaque[7].src="assets/images/Personajes/personaje"+this.skinActual+"/AT/"+"r2.png";

    this.spritesAtaque[8].src="assets/images/Personajes/personaje"+this.skinActual+"/AT/"+"b1.png";
    this.spritesAtaque[9].src="assets/images/Personajes/personaje"+this.skinActual+"/AT/"+"b2.png";
    this.spritesAtaque[10].src="assets/images/Personajes/personaje"+this.skinActual+"/AT/"+"b3.png";
    this.spritesAtaque[11].src="assets/images/Personajes/personaje"+this.skinActual+"/AT/"+"b2.png";

    this.spritesAtaque[12].src="assets/images/Personajes/personaje"+this.skinActual+"/AT/"+"f1.png";
    this.spritesAtaque[13].src="assets/images/Personajes/personaje"+this.skinActual+"/AT/"+"f2.png";
    this.spritesAtaque[14].src="assets/images/Personajes/personaje"+this.skinActual+"/AT/"+"f3.png";
    this.spritesAtaque[15].src="assets/images/Personajes/personaje"+this.skinActual+"/AT/"+"f2.png";
    
    
    this.spritesMuerto=
    [
      new Image(),new Image(),
      new Image(),new Image(),
      new Image(),new Image()
    ];
    this.spritesMuerto[0].src="assets/images/Personajes/m1.png";
    this.spritesMuerto[1].src="assets/images/Personajes/m2.png";
    this.spritesMuerto[2].src="assets/images/Personajes/m3.png";
    this.spritesMuerto[3].src="assets/images/Personajes/m4.png";
    this.spritesMuerto[4].src="assets/images/Personajes/m5.png";
    this.spritesMuerto[5].src="assets/images/Personajes/m6.png";
    ///////////// descricpcion funciones ///////////////////
    
    this.suma=suma;
    this.mover=mover;
    this.getSprite=getSpriteActual;
    /////////////implementacion funciones //////////////////
            
    function suma()
    {
       return this.x+this.y;                    
    }
    
    function mover(stage)
    {
      //PAUSA EL JUEGO
      if(this.pausado==true)
      {
        return;
      }

        if(!(this.x%stage.tamanio==0 && this.y%stage.tamanio==0)) //condicion cuando el pacman este en punto intermedio
        {
            if(this.detenido)
            {
                this.numeroPasosContador=this.numeroPasos;
            }
            else
            {
                if((this.direccion=='l' && this.direccionFutura=='r') || (this.direccion=='r' && this.direccionFutura=='l')|| (this.direccion=='u' && this.direccionFutura=='d')|| (this.direccion=='d' && this.direccionFutura=='u'))
                {
                    this.direccion=this.direccionFutura;
                    this.numeroPasosContador=(this.numeroPasos-1)-this.numeroPasosContador;
                    this.cambioSentido=true;
                   
                }
                else
                {
                    this.numeroPasosContador++;
                }
            }
            
        }
        else
        {   
            if(!this.detenido) //verifica que no incremente si esta detenido l
            {
                this.xAbs=this.x/stage.tamanio;
                this.yAbs=this.y/stage.tamanio; 
            }
            
            /////////para encontrar el indice de la siguiente direccion del pacman
            var xAux=this.xAbs;
            var yAux=this.yAbs;
            //busca la futura direccion para ver si puede avanzar
            switch(this.direccionFutura)
            {
                case "l": xAux=xAux-1;break;

                case "r": xAux=xAux+1;break;

                case "u": yAux=yAux-1;break;

                case "d": yAux=yAux+1;break;

            }
            
            if(this.detenido)
            {
                    if(stage.colisionPacman(xAux,yAux)==0 || stage.colisionPacman(xAux,yAux)==9 || stage.colisionPacman(xAux,yAux)==5 || stage.colisionPacman(xAux,yAux)==7 )
                    {
                        this.direccion=this.direccionFutura;
                        this.detenido=false;
                    }
                
            }
            else
            {
                if(this.direccion==this.direccionFutura) //cuando la direccion es la misma
                { 
                    if(stage.colisionPacman(xAux,yAux)==0 || stage.colisionPacman(xAux,yAux)==9 || stage.colisionPacman(xAux,yAux)==5 || stage.colisionPacman(xAux,yAux)==7 )
                    {
                        this.direccion=this.direccionFutura;      
                       // this.direccionFutura=this.direccion;

                    }
                    else
                    {
                        this.detenido=true;
                    }

                }
                else //cuando la direccion futura es diferente
                {
                    if(stage.colisionPacman(xAux,yAux)==0 || stage.colisionPacman(xAux,yAux)==9 || stage.colisionPacman(xAux,yAux)==5 || stage.colisionPacman(xAux,yAux)==7 )
                    {
                        this.direccion=this.direccionFutura;                                  
                    }
                    else
                    {
                            var xAux=this.xAbs;
                            var yAux=this.yAbs;
                            //busca la futura ruta con mi direccion actual
                            switch(this.direccion)
                            {
                                case "l": xAux=xAux-1;break;

                                case "r": xAux=xAux+1;break;

                                case "u": yAux=yAux-1;break;

                                case "d": yAux=yAux+1;break;

                            }
                            if(stage.colisionPacman(xAux,yAux)==0 || stage.colisionPacman(xAux,yAux)==9 || stage.colisionPacman(xAux,yAux)==5 || stage.colisionPacman(xAux,yAux)==7 )
                            {
                               // this.direccion=this.direccionFutura;      
                                this.direccionFutura=this.direccion;

                            }
                            else
                            {
                                this.detenido=true;
                            }

                        
                        //this.direccionFutura=this.direccion;                                  
                    }
                    
                }
           
            }
            
            stage.comer(this.xAbs,this.yAbs);    
            this.numeroPasosContador=0;              
           
            
        }
        
        if(!this.detenido)
        {
            switch(this.direccion) //verifica a donde tiene que moverse
                {
                    //Guardo la direccion actual donde se mueve
                    case "l": this.x-=this.incremento;
                              if(this.direccionActual!="l")
                              {
                                this.spriteActual=0;
                              }
                              this.direccionActual="l";
                              break;

                    case "r": this.x+=this.incremento;
                              if(this.direccionActual!="r")
                              {
                                this.spriteActual=4;
                              }
                              this.direccionActual="r";
                              break;

                    case "u": this.y-=this.incremento;
                              if(this.direccionActual!="u")
                              {
                                this.spriteActual=8;
                              }
                              this.direccionActual="u";
                              break;

                    case "d": this.y+=this.incremento;
                              if(this.direccionActual!="d")
                              {
                                this.spriteActual=12;
                              }
                              this.direccionActual="d";
                              break;

                    default : this.x=this.x;
                              this.y=this.y;
                }
        }                                    
        
    }
    

    
    function getSpriteActual()
    {
        if(this.direccionActual=="l")
        {
          //0-3
          //Limite: 4
          if(this.spriteActual+1==4)
          {
              this.spriteActual=0;
          }
          else
          {
              this.spriteActual++;
          }
        }
        else if(this.direccionActual=="r")
        {
          //4-7
          //Limite: 8
          if(this.spriteActual+1==8)
          {
              this.spriteActual=4;
          }
          else
          {
              this.spriteActual++;
          }
        }
        else if(this.direccionActual=="u")
        {
          //8-11
          //Limite: 12
          if(this.spriteActual+1==12)
          {
              this.spriteActual=8;
          }
          else
          {
              this.spriteActual++;
          }
        }
        else if(this.direccionActual=="d")
        {
          //12-15
          //Limite: 16
          if(this.spriteActual+1==16)
          {
              this.spriteActual=12;
          }
          else
          {
              this.spriteActual++;
          }
        }
        if(global_modo_ataque==false)
        {
          return this.sprites[this.spriteActual];
        }
        else
        {
          return this.spritesAtaque[this.spriteActual]; 
        }
    }
    
                    
}

//////////////////// MENU PRINCIPAL ///////////////////////
//---------------------------------------------------------
//SECCION - MENU
//---------------------------------------------------------
function menu()
{
  global_puntaje=0;

  //-----------------------------------
  //TESTING - NO SMART TV
  //-----------------------------------
  window.addEventListener("keydown",tecladoPresionado,false);
  mostrarJugadores();
  borrarPopUp();
  //-----------------------------------
  //TESTING - NO SMART TV
  //-----------------------------------



  //CANVAS Y CONTEXTO
  var canvas=document.getElementById("lienzo");
  var contexto=canvas.getContext("2d");

  //INTERVALO CON EL QUE VUELVE A DIBUJAR TODO
  gameLoop=window.setInterval(repaint,global_tiempo_repintar);

  //NUEVO ESCENARIO
  escenario=new stage();
  nuevoNivel(global_nivel_actual);//Carga el primer mapa
  
   
    
    function repaint()
    {
      if(!global_nivel_completado)
      {
        contexto.save();
        
        ////////dibuja el fondo del juego /////////////
        //contexto.fillStyle="white";
        //contexto.fillRect(0,0,800,600);

        ////////fin del fondo del juego ////////////////
        escenario.dibujar(contexto);

        //-------------------------------------------------------
        //JUGADOR 1
        //-------------------------------------------------------
        if(!pc.muerto)
        {
            contexto.drawImage(pc.getSprite(),pc.x,pc.y,pc.alto,pc.ancho);
        }
        else
        {
            //INDICAR CANTIDAD DE SPRITES USADOS EN LA MUERTE
            if(pc.spritefinPacman==pc.spritesMuerto.length)
            {
                global_p1_vidas=--global_p1_vidas;
                mostrarJugadores();
                if(global_p1_vidas==0)
                {
                    global_nivel_completado=true;
                    mostrarPopUpGameOver();
                }
                else
                {
                    continuarJuego();
                }
            }
            else
            {
              contexto.drawImage(pc.spritesMuerto[pc.spritefinPacman++],pc.x,pc.y,pc.alto,pc.ancho);  
            }
        }
        //-------------------------------------------------------
        //JUGADOR 2
        //-------------------------------------------------------
        if(jugadores.length==2)
        {
          if(!pc2.muerto)
          {
              contexto.drawImage(pc2.getSprite(),pc2.x,pc2.y,pc2.alto,pc2.ancho);
          }
          else
          {
              //INDICAR CANTIDAD DE SPRITES USADOS EN LA MUERTE
              if(pc2.spritefinPacman==pc2.spritesMuerto.length)
              {
                  global_p2_vidas=--global_p2_vidas;
                  mostrarJugadores();
                  if(global_p2_vidas==0)
                  {
                      global_nivel_completado=true;
                      mostrarPopUpGameOver();
                  }
                  else
                  {
                      continuarJuego();
                  }
              }
              else
              {
                contexto.drawImage(pc2.spritesMuerto[pc2.spritefinPacman++],pc2.x,pc2.y,pc2.alto,pc2.ancho);  
              }
          }
        }
        contexto.restore();

        //MOVER PERSONAJES
        pc.mover(escenario);
        if(jugadores.length==2)
        {
          pc2.mover(escenario);
        }



        //-------------------------------------------------------
        //ENEMIGO 1
        //MOVER 2 ENEMIGOS EN LA DIRECCION DEL 2DO JUIGADOR SI ESTE EXISTE
        //VALIDAR QUE SE COME AL SEGUNDO JUGADOR
        //-------------------------------------------------------
        if(!enemigo.detener)
        {
            enemigo.dibujar(contexto);
            enemigo.mover(escenario,pc.x,pc.y);
        }
        //-------------------------------------------------------
        //ENEMIGO 2
        //-------------------------------------------------------
        if(!enemigo2.detener)
        {
            enemigo2.dibujar(contexto);
            enemigo2.mover(escenario,pc.x,pc.y);
        }
        //-------------------------------------------------------
        //ENEMIGO 3
        //-------------------------------------------------------
        if(!enemigo3.detener)
        {
            enemigo3.dibujar(contexto);
            if(jugadores.length==2)//BUSCAR AL JUGADOR 2
            {
              enemigo3.mover(escenario,pc2.x,pc2.y);  
            }
            else
            {
              enemigo3.mover(escenario,pc.x,pc.y);  
            }
        }
        //-------------------------------------------------------
        //ENEMIGO 1
        //-------------------------------------------------------
        if(!enemigo4.detener)
        {
            enemigo4.dibujar(contexto);
            if(jugadores.length==2)//BUSCAR AL JUGADOR 2
            {
              enemigo4.mover(escenario,pc2.x,pc2.y);
            }
            else
            {
              enemigo4.mover(escenario,pc.x,pc.y); 
            }
        }
      }
    }
    
    //USAR LA SIGUIENTE VIDA
    function continuarJuego()
    {
      global_modo_ataque=false;

      cargarPersonajes();
      cargarEnemigos();

      //Volver a musica de perecucion del personaje
      escenario.cambiarSonido(1);
    }



    //TESTING - NO SMART TV
    function tecladoPresionado(event)
    {
      //CONOCER LAS TECLAS
      //https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_event_which
      var key = event.which;
      switch(key)
      {
          //PLAYER 1 (IZQUIERDA,ARRIBA,ABAJO,DERECHA)
          case 37:pc.direccionFutura="l";break;
          case 39:pc.direccionFutura="r";break;
          case 38:pc.direccionFutura="u";break;
          case 40:pc.direccionFutura="d";break;
          //PLAYER 2 (AWSD)
          case 65:pc2.direccionFutura="l";break;
          case 68:pc2.direccionFutura="r";break;
          case 87:pc2.direccionFutura="u";break;
          case 83:pc2.direccionFutura="d";break;
          //PAUSA
          case 80:pausarJuego();break;//P: Paausar, continuar partida
          case 73:iniciarNuevoJuego();break;//I: Iniciar nuevo juego, reiniciar
      }
    }
}


//---------------------------------------------------------
//SECCION - OPCIONES DE JUEGO
//---------------------------------------------------------
function cargarPersonajes()
{
  //JUGADORES CONECTADOS
  //JUGADOR 1
  pc=new pacman(global_tamanio*global_p1_pos_col,global_tamanio*global_p1_pos_fil,global_tamanio,global_tamanio,jugadores[0].avatar);//COL,FIL,ALTO,ANCHO,SKIN
  pc.direccion=global_p1_dir;//DONDE SE MUEVE AL INICIAR EL JUEGO
  pc.direccionFutura=global_p1_dir;//DONDE SE MUEVE AL INICIAR EL JUEGO
  if(jugadores.length==2)
  {
   //JUGADOR 2
   pc2=new pacman(global_tamanio*global_p2_pos_col,global_tamanio*global_p2_pos_fil,global_tamanio,global_tamanio,jugadores[1].avatar);//COL,FIL,ALTO,ANCHO,SKIN
   pc.direccion=global_p2_dir;//DONDE SE MUEVE AL INICIAR EL JUEGO
   pc.direccionFutura=global_p2_dir;//DONDE SE MUEVE AL INICIAR EL JUEGO
  }
}
function cargarEnemigos()
{
  //ENEMIGOS
  enemigo =new fantasma(global_tamanio*global_f1_pos_col,global_tamanio*global_f1_pos_fil,global_tamanio,global_f1_skin,0,global_f1_tiempo_de_salida);//(x,y,tamanio,color,spriteInicial,tiempoInicial)
  enemigo2=new fantasma(global_tamanio*global_f2_pos_col,global_tamanio*global_f2_pos_fil,global_tamanio,global_f2_skin,0,global_f2_tiempo_de_salida);
  enemigo3=new fantasma(global_tamanio*global_f3_pos_col,global_tamanio*global_f3_pos_fil,global_tamanio,global_f3_skin,0,global_f3_tiempo_de_salida);
  enemigo4=new fantasma(global_tamanio*global_f4_pos_col,global_tamanio*global_f4_pos_fil,global_tamanio,global_f4_skin,0,global_f4_tiempo_de_salida);
}

//REINICIA EL JUEGO
function iniciarNuevoJuego()
{    
    //RECARGAR VIDAS
    global_p1_vidas=3;
    global_p2_vidas=3;
    global_puntaje=0;
    //DESACTIVAR MODO ATAQUE
    global_modo_ataque=false;
    //INDICAR QUE EL NIVEL NO HA SIDO SUPERADO
    global_nivel_completado=false;
    //ACTUALIZAR LAS VIDAS DE LOS JUGADORES Y PUNTAJE
    mostrarJugadores();
    //RESETEAR LOS VALORES DEL NIVEL
    AsignarVariablesGlobales();
    global_nivel_actual=1;
    nuevoNivel(global_nivel_actual);
}

function nuevoNivel(nivel_actualizado)
{
  //El siguiente nivel es el 2, pero la matriz empieza a contrar de 0 así que le resto 1
  var z=nivel_actualizado-1;

  global_nivel_completado=false;//Este nivel no se ha superado
  global_transicion_nivel=false;//Ya acabo la transicion de nivel
  global_modo_ataque=false;//Desactiva el modo ataque

  //PLAYER 1
  global_p1_dir=n_jugador_1_general[z].global_dir;
  global_p1_pos_fil=n_jugador_1_general[z].global_pos_fil;
  global_p1_pos_col=n_jugador_1_general[z].global_pos_col;

  //PLAYER 2
  global_p2_dir=n_jugador_2_general[z].global_dir;
  global_p2_pos_fil=n_jugador_2_general[z].global_pos_fil;
  global_p2_pos_col=n_jugador_2_general[z].global_pos_col;

  //FANTASMAS GENERAL (LUGAR A DONDE VUELVEN AL MORIR)
  global_f_pos_col=n_enemigo_muerto_general[z].global_f_pos_col;
  global_f_pos_fil=n_enemigo_muerto_general[z].global_f_pos_fil;

  //FANTASMA 1
  global_f1_pos_col=n_enemigo_1_general[z].global_pos_col;
  global_f1_pos_fil=n_enemigo_1_general[z].global_pos_fil;
  global_f1_skin=n_enemigo_1_general[z].global_skin;
  global_f1_tiempo_de_salida=n_enemigo_1_general[z].global_tiempo_de_salida;

  //FANTASMA 2
  global_f2_pos_col=n_enemigo_2_general[z].global_pos_col;
  global_f2_pos_fil=n_enemigo_2_general[z].global_pos_fil;
  global_f2_skin=n_enemigo_2_general[z].global_skin;
  global_f2_tiempo_de_salida=n_enemigo_2_general[z].global_tiempo_de_salida;

  //FANTASMA 3
  global_f3_pos_col=n_enemigo_3_general[z].global_pos_col;
  global_f3_pos_fil=n_enemigo_3_general[z].global_pos_fil;
  global_f3_skin=n_enemigo_3_general[z].global_skin;
  global_f3_tiempo_de_salida=n_enemigo_3_general[z].global_tiempo_de_salida;

  //FANTASMA 4
  global_f4_pos_col=n_enemigo_4_general[z].global_pos_col;
  global_f4_pos_fil=n_enemigo_4_general[z].global_pos_fil;
  global_f4_skin=n_enemigo_4_general[z].global_skin;
  global_f4_tiempo_de_salida=n_enemigo_4_general[z].global_tiempo_de_salida;

  //MATRIZ
  escenario.matrizCamino=matrizCamino_general[z];

  //REFRESH
  cargarPersonajes();
  cargarEnemigos();
}

function pausarJuego()
{
  //PAUSAR JUEGO
  if(global_pausado==false)
  {
    //JUGADOR 1
    pc.pausado=true;
    //JUGADOR 2
    if(jugadores.length==2)
    {
     pc2.pausado=true;
    }
    //ENEMIGOS
    enemigo.pausado=true;
    enemigo2.pausado=true;
    enemigo3.pausado=true;
    enemigo4.pausado=true;

    global_pausado=true;
    escenario.sonido.pause();
    mostrarPopUpPausa();
  }
  //REANUDAR JUEGO
  else
  {
    //JUGADOR 1
    pc.pausado=false;
    //JUGADOR 2
    if(jugadores.length==2)
    {
     pc2.pausado=false;
    }
    //ENEMIGOS
    enemigo.pausado=false;
    enemigo2.pausado=false;
    enemigo3.pausado=false;
    enemigo4.pausado=false;

    global_pausado=false;
    escenario.sonido.play();
    borrarPopUp();
  }
}

//---------------------------------------------------------
//SECCION - ACTIVAR JUEGO
//---------------------------------------------------------
//////////////////// INICIAR JUEGO ////////////////////   
window.addEventListener('DOMContentLoaded',menu,false);
//gameLoop=null;