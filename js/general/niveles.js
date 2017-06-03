//------------------------------------------------------------------------------------------
// SECCION VARIABLES GLOBALES
//------------------------------------------------------------------------------------------
var n_jugador_1_general = new Array();
var n_jugador_2_general = new Array();

var n_enemigo_muerto_general = new Array();

var n_enemigo_1_general = new Array();
var n_enemigo_2_general = new Array();
var n_enemigo_3_general = new Array();
var n_enemigo_4_general = new Array();

var matrizCamino_general = new Array();
var matrizCamino = null
//------------------------------------------------------------------------------------------
// FIN SECCION VARIABLES GLOBALES
//------------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------------
// SECCION FUNCIONES
//------------------------------------------------------------------------------------------
//jugador,direccion donde camina, fila y columna donde aparece
function agregarPersonaje(jugador,dir,fil,col)
{
	var n_jugador =
	{
		global_dir: null,
		global_pos_fil: null,
		global_pos_col: null
	};
    n_jugador.global_dir=dir;
    n_jugador.global_pos_fil=fil;
    n_jugador.global_pos_col=col;

    if(jugador==1)
    {
        n_jugador_1_general.push(n_jugador);
    }
    else if(jugador==2)
    {
        n_jugador_2_general.push(n_jugador);
    }
}

//fila y columna donde renance
function agregarPosicionesRenacer(fil,col)
{
	var n_enemigo_muerto =
	{
		global_f_pos_fil: null,
		global_f_pos_col: null
	}
    n_enemigo_muerto.global_f_pos_fil=fil;
    n_enemigo_muerto.global_f_pos_col=col;
    n_enemigo_muerto_general.push(n_enemigo_muerto);    
}
//enemigo, fila y columna donde aparece, skin del enemigo, tiempo para salir
function agregarEnemigo(enemigo,fil,col,skin,tiempo)
{
	var n_enemigo =
	{
		global_pos_fil: null,
		global_pos_col: null,
		global_skin: null,
		global_tiempo_de_salida: null
	}
    n_enemigo.global_pos_fil=fil;
    n_enemigo.global_pos_col=col;
    n_enemigo.global_skin=skin;
    n_enemigo.global_tiempo_de_salida=tiempo;
    if(enemigo==1)
    {
        n_enemigo_1_general.push(n_enemigo);
    }
    else if(enemigo==2)
    {
        n_enemigo_2_general.push(n_enemigo);
    }
    else if(enemigo==3)
    {
        n_enemigo_3_general.push(n_enemigo);
    }
    else if(enemigo==4)
    {
        n_enemigo_4_general.push(n_enemigo);
    }
}

//------------------------------------------------------------------------------------------
// FIN SECCION FUNCIONES
//------------------------------------------------------------------------------------------




function RestaurarVariablesGlobales()
{
  n_jugador_1_general = new Array();
  n_jugador_2_general = new Array();

  n_enemigo_muerto_general = new Array();

  n_enemigo_1_general = new Array();
  n_enemigo_2_general = new Array();
  n_enemigo_3_general = new Array();
  n_enemigo_4_general = new Array();

  matrizCamino_general = new Array();
  matrizCamino = null
}


function AsignarVariablesGlobales()
{
  RestaurarVariablesGlobales();

  //------------------------------------------------------------------------------------------
  // SECCION NIVEL 1
  //------------------------------------------------------------------------------------------

  //PLAYER 1
  agregarPersonaje(1,"n",1,7);
  //PLAYER 2
  agregarPersonaje(2,"n",1,10);
  //FANTASMAS GENERAL (LUGAR A DONDE VUELVEN AL MORIR)
  agregarPosicionesRenacer(12,8);

  //FANSTASMA 1
  agregarEnemigo(1,12,7,"z1",100);
  //FANSTASMA 2
  agregarEnemigo(2,12,8,"z2",50);
  //FANSTASMA 3
  agregarEnemigo(3,12,9,"z3",200);
  //FANSTASMA 4
  agregarEnemigo(4,12,10,"z4",400);

  //MATRIZ
  matrizCamino=
  [
    [2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2],
    [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
    [2,0,2,3,3,3,2,0,3,3,0,2,3,3,3,2,0,2],
    [2,0,2,5,0,0,3,0,0,0,0,3,0,0,5,2,0,2],
    [2,0,3,0,2,0,0,0,0,0,0,0,0,2,0,3,0,2],
    [2,0,0,0,2,0,3,3,3,3,3,3,0,2,0,0,0,2],
    [2,0,2,0,2,0,0,0,0,0,0,0,0,2,0,2,0,2],
    [2,0,2,0,3,3,3,3,2,2,3,3,3,3,0,2,0,2],
    [2,0,2,0,0,0,0,0,2,2,0,0,0,0,0,2,0,2],
	[2,0,3,3,3,3,3,0,3,3,0,3,3,3,3,3,0,2],
    [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
    [2,0,3,3,3,0,2,8,3,3,8,2,0,3,3,3,0,2],
    [2,5,0,0,0,0,2,9,9,9,9,2,0,0,0,0,5,2],
    [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]
  ];


  	

  matrizCamino_general.push(matrizCamino);
  //------------------------------------------------------------------------------------------
  // FIN SECCION NIVEL 1
  //------------------------------------------------------------------------------------------






  //------------------------------------------------------------------------------------------
  // SECCION NIVEL 2
  //------------------------------------------------------------------------------------------

  //PLAYER 1
  agregarPersonaje(1,"n",10,7);
  //PLAYER 2
  agregarPersonaje(2,"n",10,10);
  //FANTASMAS GENERAL (LUGAR A DONDE VUELVEN AL MORIR)
  agregarPosicionesRenacer(6,8);

  //FANSTASMA 1
  agregarEnemigo(1,5,8,"z1",100);
  //FANSTASMA 2
  agregarEnemigo(2,5,9,"z2",50);
  //FANSTASMA 3
  agregarEnemigo(3,6,8,"z3",200);
  //FANSTASMA 4
  agregarEnemigo(4,6,9,"z4",400);

  //MATRIZ
  matrizCamino=
  [
    [2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2],
    [2,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,2],
    [2,0,3,2,0,2,3,3,3,3,3,3,2,0,2,3,0,2],
    [2,0,0,2,0,3,0,0,0,0,0,0,3,0,2,0,0,2],
    [2,2,0,2,0,0,0,2,8,8,2,0,0,0,2,0,2,2],
    [2,3,0,2,0,2,0,2,9,9,2,0,2,0,2,0,3,2],
    [2,0,0,3,0,3,0,2,9,9,2,0,3,0,3,0,0,2],
    [2,0,0,0,0,0,0,3,3,3,3,0,0,0,0,0,0,2],
    [2,2,0,2,0,2,0,0,0,0,0,0,2,0,2,0,2,2],
    [2,3,0,2,0,3,3,3,3,3,3,3,3,0,2,0,3,2],
    [2,0,0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,2],
    [2,0,3,3,0,3,3,3,0,0,3,3,3,0,3,3,0,2],
    [2,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,2],
    [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]
  ];



  matrizCamino_general.push(matrizCamino);
  //------------------------------------------------------------------------------------------
  // FIN SECCION NIVEL 2
  //------------------------------------------------------------------------------------------







  //------------------------------------------------------------------------------------------
  // SECCION NIVEL 3
  //------------------------------------------------------------------------------------------

  //PLAYER 1
  agregarPersonaje(1,"n",5,7);
  //PLAYER 2
  agregarPersonaje(2,"n",5,10);
  //FANTASMAS GENERAL (LUGAR A DONDE VUELVEN AL MORIR)
  agregarPosicionesRenacer(12,16);

  //FANSTASMA 1
  agregarEnemigo(1,10,1,"z1",100);
  //FANSTASMA 2
  agregarEnemigo(2,10,16,"z2",50);
  //FANSTASMA 3
  agregarEnemigo(3,12,1,"z3",200);
  //FANSTASMA 4
  agregarEnemigo(4,12,16,"z4",400);

  //MATRIZ
  matrizCamino=
  [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,1],
    [1,0,2,0,2,3,3,3,0,3,3,3,3,2,0,2,0,1],
    [1,5,3,0,2,0,0,0,0,0,0,0,0,2,0,3,5,1],
    [1,0,0,0,3,0,2,3,0,3,3,2,0,3,0,0,0,1],
    [1,0,2,0,0,0,2,0,0,0,0,2,0,0,0,2,0,1],
    [1,0,2,0,2,0,2,0,2,2,0,2,0,2,0,2,0,1],
    [1,0,3,0,3,0,2,0,3,3,0,2,0,3,0,3,0,1],
    [1,0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,1],
    [1,8,2,0,2,0,3,3,3,0,3,3,0,2,0,2,8,1],
    [1,9,2,0,2,0,0,0,0,0,0,0,0,2,0,2,9,1],
    [1,9,2,0,3,3,3,3,3,0,3,3,3,3,0,2,9,1],
    [1,9,3,0,0,0,0,0,0,5,0,0,0,0,0,3,9,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  ];

  matrizCamino_general.push(matrizCamino);
  //------------------------------------------------------------------------------------------
  // FIN SECCION NIVEL 3
  //------------------------------------------------------------------------------------------





  //------------------------------------------------------------------------------------------
  // SECCION NIVEL 4
  //------------------------------------------------------------------------------------------

  //PLAYER 1
  agregarPersonaje(1,"n",12,7);
  //PLAYER 2
  agregarPersonaje(2,"n",12,10);
  //FANTASMAS GENERAL (LUGAR A DONDE VUELVEN AL MORIR)
  agregarPosicionesRenacer(6,8);

  //FANSTASMA 1
  agregarEnemigo(1,7,8,"z1",100);
  //FANSTASMA 2
  agregarEnemigo(2,6,1,"z2",50);
  //FANSTASMA 3
  agregarEnemigo(3,7,16,"z3",200);
  //FANSTASMA 4
  agregarEnemigo(4,8,9,"z4",400);

  //MATRIZ
  matrizCamino=
  [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,2,0,2,3,3,3,0,0,3,3,3,2,0,2,0,1],
    [1,0,3,0,2,5,0,0,0,0,0,0,5,2,0,3,0,1],
    [1,0,0,0,2,0,3,3,3,3,3,3,0,2,0,0,0,1],
    [1,8,2,0,3,0,0,0,0,0,0,0,0,3,0,2,8,1],
    [1,9,2,0,0,0,0,2,8,8,2,0,0,0,0,2,9,1],
    [1,9,2,0,3,2,0,2,9,9,2,0,2,3,0,2,9,1],
    [1,3,3,0,0,2,0,2,9,9,2,0,2,0,0,3,3,1],
    [1,0,0,0,0,3,0,3,3,3,3,0,3,0,0,0,0,1],
    [1,0,2,0,0,5,0,0,0,0,0,0,5,0,0,2,0,1],
    [1,0,3,0,3,3,3,3,0,0,3,3,3,3,0,3,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  ];

  matrizCamino_general.push(matrizCamino);
  //------------------------------------------------------------------------------------------
  // FIN SECCION NIVEL 4
  //------------------------------------------------------------------------------------------
}

AsignarVariablesGlobales();