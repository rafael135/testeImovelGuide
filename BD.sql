

CREATE DATABASE testeimovelguide;

USE testeimovelguide;


CREATE TABLE corretores(
    id INT PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    creci VARCHAR(30) NOT NULL
);

