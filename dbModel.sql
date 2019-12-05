CREATE DATABASE IF NOT EXISTS domibot DEFAULT COLLATE = utf8_spanish2_ci;

USE domibot;

-- drop database domibot;

CREATE TABLE cliente (
    cedula VARCHAR(15) PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL,
    telefono VARCHAR(7),
    celular VARCHAR(10) NOT NULL,
    direccion VARCHAR(50) NOT NULL,
    ciudad VARCHAR(20) NOT NULL
);

CREATE TABLE orden (
    id INT PRIMARY KEY,
    id_cliente VARCHAR(15),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    metodo VARCHAR(10),
    CONSTRAINT fk_orden_id_cliente FOREIGN KEY (id_cliente) 
        REFERENCES cliente (cedula)
        ON DELETE NO ACTION
        ON UPDATE CASCADE
);

-- CREATE TABLE adicional (
--     id VARCHAR(5) PRIMARY KEY,
--     descripcion VARCHAR(20) NOT NULL,
--     precio DECIMAL(9,2) NOT NULL
-- );

CREATE TABLE pizza (
    id VARCHAR(5) PRIMARY KEY,
    descripcion VARCHAR(20) NOT NULL,
    tamanyo VARCHAR(20) NOT NULL,
    precio DECIMAL(9,2) NOT NULL
);

CREATE TABLE bebida (
    id VARCHAR(5) PRIMARY KEY,
    descripcion VARCHAR(20) NOT NULL,
    volumen VARCHAR(5) NOT NULL,
    precio DECIMAL(9,2) NOT NULL
);

CREATE TABLE orden_bebida (
    id_orden INT,
    id_bebida VARCHAR(5),
    precio DECIMAL(9,2) NOT NULL,
    cantidad SMALLINT NOT NULL DEFAULT 0,
    CONSTRAINT fk_orden_bebida_id_orden FOREIGN KEY (id_orden) 
        REFERENCES orden (id)
        ON DELETE NO ACTION
        ON UPDATE CASCADE,
    CONSTRAINT fk_orden_bebida_id_bebida FOREIGN KEY (id_bebida) 
        REFERENCES bebida (id)
        ON DELETE NO ACTION
        ON UPDATE CASCADE
);

CREATE TABLE orden_pizza (
    id_orden INT,
    id_pizza VARCHAR(5),
    -- id_adicional VARCHAR(5),
    precio_pizza DECIMAL(9,2) NOT NULL,
    -- precio_adicional DECIMAL(9,2) NOT NULL,
    cantidad SMALLINT NOT NULL DEFAULT 0,
    CONSTRAINT fk_orden_pizza_id_orden FOREIGN KEY (id_orden) 
        REFERENCES orden (id)
        ON DELETE NO ACTION
        ON UPDATE CASCADE,
    CONSTRAINT fk_orden_pizza_id_pizza FOREIGN KEY (id_pizza) 
        REFERENCES pizza (id)
        ON DELETE NO ACTION
        ON UPDATE CASCADE
);

INSERT INTO pizza VALUES ('PIZ01', 'Nativa', 'Small', 27900);
INSERT INTO pizza VALUES ('PIZ02', 'Nativa', 'Medium', 32000);
INSERT INTO pizza VALUES ('PIZ03', 'Nativa', 'Large', 40000);
INSERT INTO pizza VALUES ('PIZ04', 'Nativa', 'Extra large', 50000);
INSERT INTO pizza VALUES ('PIZ05', 'Pepperoni', 'Small', 24900);
INSERT INTO pizza VALUES ('PIZ06', 'Pepperoni', 'Medium', 30000);
INSERT INTO pizza VALUES ('PIZ07', 'Pepperoni', 'Large', 40000);
INSERT INTO pizza VALUES ('PIZ08', 'Pepperoni', 'Extra large', 50000);
INSERT INTO pizza VALUES ('PIZ09', 'Hawaiana', 'Small', 24900);
INSERT INTO pizza VALUES ('PIZ10', 'Hawaiana', 'Medium', 30000);
INSERT INTO pizza VALUES ('PIZ11', 'Hawaiana', 'Large', 40000);
INSERT INTO pizza VALUES ('PIZ12', 'Hawaiana', 'Extra large', 50000);
INSERT INTO pizza VALUES ('PIZ13', 'Pollo hawaiana', 'Small', 27900);
INSERT INTO pizza VALUES ('PIZ14', 'Pollo hawaiana', 'Medium', 32000);
INSERT INTO pizza VALUES ('PIZ15', 'Pollo hawaiana', 'Large', 40000);
INSERT INTO pizza VALUES ('PIZ16', 'Pollo hawaiana', 'Extra large', 50000);
INSERT INTO pizza VALUES ('PIZ17', 'Jamon', 'Small', 24900);
INSERT INTO pizza VALUES ('PIZ18', 'Jamon', 'Medium', 30000);
INSERT INTO pizza VALUES ('PIZ19', 'Jamon', 'Large', 40000);
INSERT INTO pizza VALUES ('PIZ20', 'Jamon', 'Extra large', 50000);
INSERT INTO pizza VALUES ('PIZ21', 'Vegetariana', 'Small', 27900);
INSERT INTO pizza VALUES ('PIZ22', 'Vegetariana', 'Medium', 32000);
INSERT INTO pizza VALUES ('PIZ23', 'Vegetariana', 'Large', 40000);
INSERT INTO pizza VALUES ('PIZ24', 'Vegetariana', 'Extra large', 50000);
INSERT INTO pizza VALUES ('PIZ25', 'Cuatrocarnes', 'Small', 27900);
INSERT INTO pizza VALUES ('PIZ26', 'Cuatrocarnes', 'Medium', 32000);
INSERT INTO pizza VALUES ('PIZ27', 'Cuatrocarnes', 'Large', 40000);
INSERT INTO pizza VALUES ('PIZ28', 'Cuatrocarnes', 'Extra large', 50000);
INSERT INTO pizza VALUES ('PIZ29', 'Caprichosa', 'Small', 27900);
INSERT INTO pizza VALUES ('PIZ30', 'Caprichosa', 'Medium', 32000);
INSERT INTO pizza VALUES ('PIZ31', 'Caprichosa', 'Large', 40000);
INSERT INTO pizza VALUES ('PIZ32', 'Caprichosa', 'Extra large', 50000);
INSERT INTO pizza VALUES ('PIZ33', 'BBQ', 'Small', 27900);
INSERT INTO pizza VALUES ('PIZ34', 'BBQ', 'Medium', 32000);
INSERT INTO pizza VALUES ('PIZ35', 'BBQ', 'Large', 40000);
INSERT INTO pizza VALUES ('PIZ36', 'BBQ', 'Extra large', 50000);

INSERT INTO bebida VALUES ('BEB01', 'Coca Cola', '1.5L', 2300);
INSERT INTO bebida VALUES ('BEB02', 'Coca Cola', '2.5L', 4500);
INSERT INTO bebida VALUES ('BEB03', 'Pepsi', '1.5L', 2000);
INSERT INTO bebida VALUES ('BEB04', 'Pepsi', '2.5L', 4000);
INSERT INTO bebida VALUES ('BEB05', 'Colombiana', '1.5L', 2000);
INSERT INTO bebida VALUES ('BEB06', 'Colombiana', '2.5L', 4500);
INSERT INTO bebida VALUES ('BEB07', '7Up', '1.5L', 2700);
INSERT INTO bebida VALUES ('BEB08', '7Up', '2.5L', 4400);
INSERT INTO bebida VALUES ('BEB09', 'Postobon', '1.5L', 2000);
INSERT INTO bebida VALUES ('BEB10', 'Postobon', '2.5L', 4500);
INSERT INTO bebida VALUES ('BEB11', 'H2OH', '1.5L', 2500);
INSERT INTO bebida VALUES ('BEB12', 'H2OH', '2.5L', 4300);
