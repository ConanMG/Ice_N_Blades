<img align="left" src="https://i.imgur.com/3Ya2bjq.png">
<h1>ICE & BLADES</h1>
<h3><i>Proyecto de fin de grado</i></h3>
<br>

<ol>
	<h3><li><a href="#description">Descripción</a></li></h3>
	<h3><li><a href="#tecnologies">Tecnologías</a></li></h3>
		<ul>
			<h4><li><a href="#phaser3">Phaser 3</a></li></h4>
			<h4><li><a href="#parcel">Parcel</a></li></h4>
			<h4><li><a href="#babel">Babel</a></li></h4>
			<h4><li><a href="#node">Node.js</a></li></h4>
		</ul>
	<h3><li><a href="#manualProg">Manual de programador</a></li></h3>
	<h3><li><a href="#manualUser">Manual de usuario</a></li></h3>
	<h3><li><a href="#api">Llamadas a API</a></li></h3>
</ol>
<hr></hr>

<section id="description">
	<h2>DESCRIPCIÓN</h2>
		<p>
			Este proyecto consistirá en la creación de un videojuego a partir de un framework de
			javascript llamado Phaser 3 con un backend creado con Node.JS.
		</p>
		<p>
			El juego esta programado en TypeScript y consta de una pantalla de carga
			que precarga el resto de escenas y una serie de pantallas de pantallas de ayuda (UI y pausa).
			El juego recoge información sobre las puntuaciones de los jugadores de una base de
			datos mongoDB a través de un backend de Node.JS con Mongoose posteado en Heroku. Al estar
			programado en TypeScript, el juego esta embebido en una página web desde la que
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
			</section>
			<section id="babel">
				<li><h3>Babel</h3></li>
			</section>
			<section id="node">
				<li><h3>Node.js</h3></li>
			</section>
		</ul>
	</section>
