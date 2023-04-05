# definición de la table person
PRINT ('Looking for id', 7, 'or', 10, '.');



person(id INT,first_name STRING, gender STRING,age INT);
id=1,first_name="Ivan",gender="Male",age=39+323/434*2;
id=2,first_name="Roderich",gender="Polygender",age=32;
id=3,first_name="Haley",gender="Male",age=33;
id=4,first_name="Sheelagh",gender="Female",age=35;
id=5,first_name="Hy",gender="Male",age=35;
id=6,first_name="Hillery",gender="Male",age=38;
id=7,first_name="Ema",gender="Female",age=22;
id=8,first_name="Saundra",gender="Male",age=23;
id=9,first_name="Tiler",gender="Male",age=20;
id=10,first_name="Deane",gender="Male",age=30;
# definición de la table actor
actor(name STRING, active BOOLEAN, location STRING);
name="Thom", active= false && true, location="Baraçais";
name="Carmel", active=true, location="Huaqiao";
name="Darwin", active=true, location="København";
name="Clarance", active=true, location="Dobrzeń Wielki";
name="Archibold", active=false, location="Khotsimsk";
name="Dione", active=true, location="Urpay";
name="Perceval", active=true, location="Wohyń";
name="Linn", active=false, location="Zarumilla";
name="Darb", active=true, location="Novaya Lyalya";
name="Lazar", active=true, location="Slobozia";
#fin

DECLARE @name AS TEXT = "hello";
DECLARE @email AS TEXT;
DECLARE @id AS INT;
DECLARE @dec, @dec1 AS DECIMAL;
DECLARE @flag AS BOOLEAN;
SET @id = 1 + 3 * 2;
SET @name = "Cameron";
SET @email = "ssullerree@amazon.co.jp";
SET @flag = 12 > @id AND @name = "Cameron";
SET @dec = 12.5, @dec1 = 12 / 4;
SET @name = INPUT("Ingrese el nombre a buscar: ");
SET @dec = INPUT("Ingrese la edad a buscar: ");


IF @id = 7 OR @id = 10 THEN
SET @name = INPUT("Ingrese el nombre a buscar: ");
SET @dec = INPUT("Ingrese la edad a buscar: ");
PRINT ('Looking for id', 7, 'or', 10, '.');
ELSEIF @id = 12 * 2 THEN
SET @dec1 = 12.5 * 2;
ELSE
SET @dec1 = 1;
SET @id = 1;
END IF;
IF @name = "Cameron" AND (@dec = 12.5 OR @dec + 1 >= 100) THEN
SET @dec1 = @id;
SET @id = INPUT("Ingrese el id a buscar: ");
ELSEIF @name = 'Jose' THEN
SET @id = 100;
PRINT ('Looking for id', @id);
END IF;
IF @id = 7 OR @id = 10 THEN
IF @email = 'email@gmail.com' THEN
SET @email = 'my-email@gmail.com';
END IF;
SET @name = INPUT("Ingrese el nombre a buscar: ");
SET @dec = INPUT("Ingrese la edad a buscar: ");
ELSE
SET @dec1 = 1;
SET @id = 1;
END IF;

SELECT * FROM person WHERE id = 1;
SELECT * FROM person WHERE name = @name AND gender = "MALE";
SELECT * FROM person WHERE name = @name OR gender = "MALE";
SELECT first_name, id, age FROM person WHERE age >= 10 + 1 AND @id <> 1;
SELECT name, location FROM actor WHERE active = TRUE && location <>
'guatemala';

SELECT * FROM person WHERE id = 1;
SELECT * FROM person WHERE name = @name AND gender = "MALE";
SELECT * FROM person WHERE name = @name OR gender = "MALE";
SELECT first_name, id, age FROM person WHERE age >= 10 + 1 AND @id <> 1;
SELECT name, location FROM actor WHERE active = TRUE AND location <>
'guatemala';
SELECT name, location FROM actor WHERE NOT (active = TRUE AND location <>
'guatemala');
SELECT * FROM student LIMIT 10 OFFSET 15 + 5 ;



-- área de declaración de variables
DECLARE @name AS TEXT = "hello";
DECLARE @email AS TEXT;
DECLARE @id AS INT;
DECLARE @dec AS DECIMAL;
DECLARE @flag AS BOOLEAN;
-- asignación de variables
SET @id = 1 + 3 * 2;
SET @name = "Cameron";
SET @email = "ssullerree@amazon.co.jp";
SET @flag = 12 > @id AND @name = "Cameron";
SET @dec = 12.5, @dec1 = 12 / 4;
IF @id = 7 OR @id = 10 THEN
IF @email = 'email@gmail.com' THEN
SET @email = 'my-email@gmail.com';
END IF;
SET @name = INPUT("Ingrese el nombre a buscar: ");
SET @dec = INPUT("Ingrese la edad a buscar: ");
ELSE
SET @dec1 = 1;
SET @id = 1;
END IF;
IF @name = "Cameron" AND (@dec = 12.5 OR @dec + 1 >= 100) THEN
SET @dec1 = @id;
SET @id = INPUT("Ingrese el id a buscar: ");
ELSEIF @name = 'Jose' THEN
SET @id = 100;
PRINT ('Looking for id', @id);
END IF;
-- consultas
SELECT * FROM person WHERE id = 1;
SELECT * FROM person WHERE name = @name AND gender = "MALE";
SELECT * FROM person WHERE name = @name OR gender = "MALE";
SELECT first_name, id, age FROM person WHERE age >= 10 + 1 AND @id <> 1;
SELECT name, location FROM actor WHERE active = TRUE AND location <>
'guatemala';
SELECT name, location FROM actor WHERE NOT (active = TRUE AND location <>
'guatemala');