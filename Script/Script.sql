DROP DATABASE IF EXISTS financeiro;

CREATE DATABASE financeiro;

USE financeiro;

CREATE TABLE usuario(
	id INT AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(30) NOT NULL,
    data_cadastro date,
    cpf CHAR(11) NOT NULL,
    rg VARCHAR(15) NOT NULL,
    cep VARCHAR(15) NOT NULL,
    rua VARCHAR(25) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    complemento VARCHAR(10),
    cidade VARCHAR(30) NOT NULL,
    bairro VARCHAR(30) NOT NULL,
    estado VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE transacao(
	id INT AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    descricao VARCHAR(50) NOT NULL,
    valor DECIMAL NOT NULL,
	`data` DATE,
    PRIMARY KEY(id),
    FOREIGN KEY(usuario_id) REFERENCES usuario(id)
);