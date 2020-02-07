
IRONEWS


###############################

DESCRIPCIÓN/IDEA

###############################

La idea consiste en crear un agregador de noticias que permita al usuario 
filtrar y almacenar los contenidos que desea recibir en su perfil.

Al mismo tiempo, se permitirá seleccionar algunos de estos contenidos para 
verlos luego.  

Los filtros podrán ser por temas, fuente, fuente etc etc

Una mezcla de Evernote y cualquier feed de noticias. 

La SPA se dividirá en tres partes: 	
	
	-Navbar => perfil, logout, 
	-Una barra lateral a la izquierda que con dos grandes espacios
	-Y un panel central que desplegará las noticias de la API o del servidor dependiendo de lo que hayamos seleccionado. => En este panel se iran desplegando los diferentes componentes. 


Para conseguir las noticias utilizaré News Api: https://newsapi.org/

*Ojo* No se pueden recibir noticias de España :(



###############################

MODELOS

###############################


USUARIO 
	nombre, 
	email, 
	contraseña, 
	foto de perfil, 
	organización,
	amigos/colaboradores,  
	intereses => que se podrán utilizar para un primer filtrado, 
	filtros, 
	
	carpetas por proyectos/interses (leer luego, interesante, proyecto?) => 
	noticias guardadas => 

CARPETAS (almacenarán las noticias que tengan un mismo propósito, habrá algunas por defecto. )

	tema: 
	descripción
	noticias: populate
	color_tag (que reflejará el interés/urgencia de la carpeta )


NOTICIAS (la API nos devuelve un objeto del cual nos interesa el nombre de la fuente, el título, la fecha, la url y la imagen)

	user_id, 
	carpeta_id	
	nombre de la fuente, 
	titulo, 
	url, 
	imagen, 
	fecha, 
	carpeta: Boolean, 
	color_tag (que reflejará el interés/urgencia de la noticia )
	leida?
	notas
	
ARCHIVO 
	
	user_id, 
	carpeta_id	
	nombre de la fuente, 
	titulo, 
	url, 
	imagen, 
	fecha, 
	color_tag (que reflejará el interés/urgencia de la noticia )
	

###############################

CRUD

###############################

USUARIO 	
	Creación de usuario => se permitirá la elección de una serie de temáticas por defecto. (nube de conceptos?)
	Actualización de perfil => lo habitual + cambio de temáticas.

CARPETAS 
	Creación de nueva carpeta 
	Actualización 
	Borrado		

NOTICIAS
	Creación de nueva noticia 
	Actualización 
	Borrado	


ARCHIVO

	Actualización estado = (restaurar)	
	Borrado	

###############################

RUTAS

###############################

USUARIO 

POST("login", mail && password) => user
POST("/logoout") => ()
PUT("/profile", body) => user

CARPETAS

GET("/noticias/q=tema") => listado de noticias
GET("/noticias/q=param") => parametro de filtrado
GET("/noticias/:user_id") => noticias guardadas por el usuario
POST("/noticias/:user_id/id") => agregar noticias
PUT("/carpeta/:user_id/id") => editar info noticia
POST("/carpeta/:user_id/new", noticia) => agregar noticia
DELETE("/carpeta/:user_id/:noticia_id") => borrar noticia

CARPETAS

GET("/carpetas") => listar carpetas
GET("/q=tema") => temas
GET("/carpetas") => noticias desde el servidor por carpeta
GET("/carpeta/:id") => noticias carpeta
PUT("/carpeta/:id") => editar info carpeta
POST("/carpeta/:id/new", noticia) => agregar carpeta
DELETE("/carpeta/:id/delete")

ARCHIVO

GET("/archivo") => Archivo de noticias
DELETE("/archivo/:noticia_id/delete")

###############################

BONUS

###############################



COLABORACIÓN => Compartir carpetas de proyectos con trabajadores de la organización, amigos, etc

ARRASTRAR/EXPANDIR TARJETAS => para mejorar la experiencia de usuario

PROCESAMIENTO DEL LENGUAJE NATURAL => la idea es usar la librería Natural para analizar el sentimiento de la noticia y adjudicarle el color_tag automáticamente. 

LIKES DENTRO DE LA ORGANIZACIÓN // CARPETAS COMPARTIDAS

AÑADIR FUENTES PROPIAS DESDE RSS

HERRAMIENTAS DE MONITORIZACIÓN => Gráficas que pinten el impacto mediático de una empresa, un tema etc etc. 

IMPLEMENTAR TESTS

###############################

OBJETIVOS MVP

###############################

FEED DE NEWS DESDE LA API Y DESDE EL SERVIDOR

CARPETAS POR TEMÁTICAS CON CÓDIGOS DE COLORES QUE PERMITAN UNA FÁCIL CLASIFICACIÓN. 

CLASIFICACIÓN TEMÁTICA DE LAS NOTICIAS DE ACUERDO A LOS INTERESES DEL USUARIO


###############################

OBJETIVOS PERSONALES

###############################


TRABAJAR CON TRELLO => Planificar detalladamente / estimación de tiempo / prioridades. 

BUEN DISEÑO FRONT => Más CSS menos Bootstrap. 

APRENDER MÁS SOBRE API REST , AUTENTICACIÓN, CONTEXTOS EN REACT, EL DICHOSO POPULATE :) etc etc

EQUILIBRIO SIMPLICIDAD / FUNCIONALIDADES aunque su hay que priorizar siempre nos decantaremos por la FUNCIONALIDAD

NO VENIRSE ARRIBA Y EMPEZAR A IMAGINAR NUEVAS FUNCIONALIDADES SIN HABER ACABADO EL MVP. 
