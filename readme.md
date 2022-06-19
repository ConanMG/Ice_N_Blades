<img align="left" src="https://i.imgur.com/3Ya2bjq.png">
<h1>ICE & BLADES</h1>
<h3><i>Proyecto de fin de grado</i></h3>
<br>

<hr></hr>

<section id="description">
	<h2>DESCRIPCIÓN</h2>
		<p>
			Este proyecto consistirá en la creación de un videojuego a partir de un framework de
			javascript llamado Phaser 3 con un backend creado con Node.JS.
		</p>
		<p>
			El juego esta programado en TypeScript y consta de una pantalla de carga
			que precarga el resto de escenas y una serie de pantallas de ayuda (UI y pausa).
			El juego recoge información sobre las puntuaciones de los jugadores de una base de
			datos mongoDB a través de un backend de Node.JS con Mongoose posteado en Heroku. Al estar
			programado en TypeScript, el juego esta en una página web desde la que
			poder jugarlo.
		</p>
</section>

<section id="tecnologies">
	<h2>TECNOLOGÍAS</h2>
	<ul>
		<section id="phaser3">
			<li><h3>Phaser 3</h3></li>
				<p>
					Phaser 3 es un framework destinado a la creación de videojuegos web para HTML5. Phaser funciona a partir de escenas que se gestionan a partir de
					tres métodos principalmente: preload, create y update. En el método preload se precargan los recursos que va a usar la escena, en el método create
					se instancian todas las entidades que vayan a aparecer en la escena y se declara toda acción que vaya a tener lugar en el juego y el método update
					es un bucle que corre constantemente actualizando todos los componentes de la escena (animaciones, eventos, etc.)
				</p>
		</section>
		<section id="parcel">
			<li><h3>Parcel</h3></li>
			<p>
				Parcel es una herramienta para construir aplicaciones de javascript y css de forma sencilla y sin tener que configurarlo. Para iniciar tu proyacto
				usas el comando "parcel [tu-índice]--open" y para construirlo "parcel build [tu-índice] --no-minify --out-dir [directorio-destino-build]".
			</p>
		</section>
		<section id="node">
			<li><h3>Node.js</h3></li>
			<p>
				Node.js es un entorno de ejecución de Javascript muy útil para el desarrollo de aplicaciones de backend. Node.js junto con mongoose (librería ODM)
				constituyen el backend de la aplicación (la API)
			</p>
		</section>
	</ul>
</section>
	
<section id="manualProg">
	<h2>MANUAL DEL PROGRAMADOR</h2>
	<p>
		Para la edición de esta aplicación es necesario entender todos los puntos del apartado anterior. Además de esto, es necesario entender la estructura de la
		aplicación. Las carpetas están estructuradas de la siguiente forma:
			<ul>
				<li>public: contiene los recursos del juego (sprites, mapas, casillas, etc.)</li>
				<li>src: contiene todo el código de la aplicación</li>
				<li>docs: contiene la aplicación construida</li>
			</ul>
				Los enemigos tienen una clase abstracta con una serie de métodos comunes entre ellos de forma que resulte más sencillo la creación de enemigos nuevos.
				Lo mismo ocurre con los PCs (Player Character) en caso de que se quisiera agregar otro personaje pricipal que poder selecionar.
				Las escenas están ordenadas en una carpeta y algunas como la de pausa pueden ser reutilizables al igual que los contenidos la carpeta de utilidades que pueden				ser útiles para cualquier escena (barras de vida, debuggers de colsiones, etc.).
	</p>
</section>
	
<section id="manualUser">
	<h2>MANUAL DE USUARIO</h2>
	<p>
		<ul>
			<li>↑ flecha arriba, ↓ flecha abajo, ← flecha izquierda, → flecha derecha para moverse</li>
			<li>⎵ Barra espaciadora para atacar</li>
			<li>⇧ Shift para dashear</li>
			<li>↵ Enter para generar enemigos cada vez que termina una oleada.</li>
			<li>R para reiniciar el juego una vez el personaje pricipal muera.</li>
		</ul>
	</p>
</section>
	
<section id="api">
	<h2>USO DE LA API</h2>
	<p>
		La API de está aplicación consta de dos peticiones, un post y u get. Para la información de la API seguir el siguiente enlace:
		<a href="https://documenter.getpostman.com/view/20952107/UzBmM7Lq">API Docs</a>
	</p>
</section>
