
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

API EndPoints

###############################

Newsapi tiene tres endpoints: 

	TOPHEADLINES => 

		Parámetros=> {

			q = Keywords or phrases to search for in the article title and body.
				Advanced search is supported here:

					Surround phrases with quotes (") for exact match.
					Prepend words or phrases that must appear with a + symbol. Eg: +bitcoin
					Prepend words that must not appear with a - symbol. Eg: -bitcoin
					Alternatively you can use the AND / OR / NOT keywords, and optionally group these with parenthesis. Eg: crypto AND (ethereum OR litecoin) NOT bitcoin.

			qInTitle = Keywords or phrases to search for in the article title only.

					Advanced search is supported here:

					Surround phrases with quotes (") for exact match.
					Prepend words or phrases that must appear with a + symbol. Eg: +bitcoin
					Prepend words that must not appear with a - symbol. Eg: -bitcoin
					Alternatively you can use the AND / OR / NOT keywords, and optionally group these with parenthesis. Eg: crypto AND (ethereum OR litecoin) NOT bitcoin.
					The complete value for qInTitle must be URL-encoded.

			sources = A comma-seperated string of identifiers (maximum 20) for the news sources or blogs you want headlines from. Use the /sources endpoint to locate these programmatically or look at the sources index.

			domains = A comma-seperated string of domains (eg bbc.co.uk, techcrunch.com, engadget.com) to restrict the search to.

			excludeDomains = A comma-seperated string of domains (eg bbc.co.uk, techcrunch.com, engadget.com) to remove from the results.

			from = A date and optional time for the oldest article allowed. This should be in ISO 8601 format (e.g. 2020-02-12 or 2020-02-12T18:05:00) Default: the oldest according to your plan.

			to = A date and optional time for the newest article allowed. This should be in ISO 8601 format (e.g. 2020-02-12 or 2020-02-12T18:05:00) Default: the newest according to your plan.

			language = The 2-letter ISO-639-1 code of the language you want to get headlines for. Possible options: ardeenesfrheitnlnoptruseudzh. Default: all languages returned.

			sortBy = {
					The order to sort the articles in. Possible options: relevancy, popularity, publishedAt.
					relevancy = articles more closely related to q come first.
					popularity = articles from popular sources and publishers come first.
					publishedAt = newest articles come first.
					Default: publishedAt


			}


			
		}

	Respuesta ={
						status
			string
			If the request was successful or not. Options: ok, error. In the case of error a code and message property will be populated.

			totalResults
			int
			The total number of results available for your request. Only a limited number are shown at a time though, so use the page parameter in your requests to page through them.

			articles
			arrayof articles 
			The results of the request. => {

				source
			object
			The identifier id and a display name name for the source this article came from.

			author
			string
			The author of the article

			title
			string
			The headline or title of the article.

			description
			string
			A description or snippet from the article.

			url
			string
			The direct URL to the article.

			urlToImage
			string
			The URL to a relevant image for the article.

			publishedAt
			string
			The date and time that the article was published, in UTC (+000)

			content
			string
			The unformatted content of the article, where available. This is truncated to 260 chars for Developer plan users.


}

source
object
The identifier id and a display name name for the source this article came from.

author
string
The author of the article

title
string
The headline or title of the article.

description
string
A description or snippet from the article.

url
string
The direct URL to the article.

urlToImage
string
The URL to a relevant image for the article.

publishedAt
string
The date and time that the article was published, in UTC (+000)

content
string
The unformatted content of the article, where available. This is truncated to 260 chars for Developer plan users.





	}

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
