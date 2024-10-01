<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


# Swapi API

-- Pasos para levantar el proyecto -- 

1. Clonar proyecto
2. ```npm install```
3. Usar el archivo ```local.env``` si es útil o cambiar las variables de entorno si es necesario.
4. Cambiar los datos de conexión a la base de datos si se requiere usar una base de datos con distintos valores.
5. En caso de ser necesario, crear la base de datos con los valores incluidos en las variables de entorno, tiene que ser SQL Server ya que el conector elegido es ese.
6. Levantar: ```npm run start:dev``` para levantar el proyecto local.
7. Una vez levantado, deberían correr automáticamente las migraciones con la creación de las tablas y el insert de algunos datos.
8. Ejecutar npm test movie.service para ejecutar los test.
9. El swagger se encuentra en la url --> http://localhost:3000/swagger , se puede acceder una vez que esté levantado el proyecto, en caso de haber cambiado el puerto, se deberá colocar el puerto elegido en la url.
