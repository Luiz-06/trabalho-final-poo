"use strict";
exports.__esModule = true;
exports.lerDadosPerfis = exports.salvarDadosPublicacoes = exports.salvarDadosPerfis = exports.carregarDadosPublicacoes = exports.carregarDadosPerfis = exports.choosePhoto = exports.clear = exports.getNegativeNumber = exports.removeList = exports.addList = exports.mapList = exports.filterList = exports.getPositiveNumber = exports.getNaturalNumber = exports.print = exports.getNumber = exports.getData = void 0;
var readline_sync_1 = require("readline-sync");
var fs = require("fs");
var path = require("path");
var perfil_1 = require("../models/perfil");
function print(mensagem) {
    console.log(mensagem);
}
exports.print = print;
function getNumber(mensagem) {
    return Number((0, readline_sync_1.question)(mensagem));
}
exports.getNumber = getNumber;
function getData(mensagem) {
    return (0, readline_sync_1.question)(mensagem);
}
exports.getData = getData;
function getNaturalNumber(numero) {
    if (numero >= 0)
        return numero;
    throw new Error("Apenas valores positivos");
}
exports.getNaturalNumber = getNaturalNumber;
function getPositiveNumber(numero) {
    if (numero > 0)
        return numero;
    throw new Error("Apenas valores positivos");
}
exports.getPositiveNumber = getPositiveNumber;
function getNegativeNumber(numero) {
    if (numero < 0)
        return numero;
    throw new Error("Apenas valores negativos");
}
exports.getNegativeNumber = getNegativeNumber;
function filterList(colecao, criterio) {
    return colecao.filter(criterio);
}
exports.filterList = filterList;
function mapList(colecao, criterio) {
    return colecao.map(criterio);
}
exports.mapList = mapList;
function addList(colecao, item) {
    colecao.push(item);
    return colecao;
}
exports.addList = addList;
function removeList(colecao, item) {
    return colecao.filter(function (i) { return i !== item; });
}
exports.removeList = removeList;
function clear() {
    getData("Pressione Enter para sair");
    console.clear();
}
exports.clear = clear;
var choosePhoto = function () {
    var emojisArray = [
        "\ud83d\ude00",
        "\ud83d\ude03",
        "\ud83d\ude42",
        "\ud83d\ude43",
        "\ud83e\udee0",
        "\ud83e\udd70",
        "\ud83e\udd72",
        "\ud83e\udd11",
        "\ud83e\udee3",
        "\ud83d\ude34",
    ];
    emojisArray.forEach(function (emoji, index) {
        print(index + 1 + " - " + emoji);
    });
    var emojiOption = getNumber("Qual opção de foto voce deseja? \n>> ");
    return emojisArray[emojiOption - 1];
};
exports.choosePhoto = choosePhoto;
var carregarDadosPerfis = function () {
    var filePath = path.join(process.cwd(), "data.json");
    var data = JSON.parse(fs.readFileSync(filePath, "utf-8")).data.perfil;
    var perfisArray = [];
    data.forEach(function (perfil) {
        var novo = new perfil_1.Perfil(perfil._id, perfil._apelido, perfil._email, perfil._foto, perfil._senha, perfil._stats, perfil._amigos, perfil._publicacoes, perfil._solicitacoesAmizade);
        perfisArray.push(novo);
    });
    return perfisArray;
};
exports.carregarDadosPerfis = carregarDadosPerfis;
carregarDadosPerfis();
var salvarDadosPerfis = function (perfis) {
    var filePath = path.join(process.cwd(), "data.json");
    var jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    jsonData.data.perfil = [];
    perfis.forEach(function (perfil) {
        jsonData.data.perfil.push(perfil);
    });
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8");
};
exports.salvarDadosPerfis = salvarDadosPerfis;
function lerDadosPerfis() {
    try {
        var dados = fs.readFileSync("data.json", "utf-8"); // Lê o arquivo JSON
        var parsedData = JSON.parse(dados); // Converte a string JSON em um objeto JavaScript
        // Retorna a lista de perfis contida em parsedData.data.perfil
        var dadosPerfisLidos = parsedData.data.perfil;
        return parsedData.data.perfil;
    }
    catch (error) {
        console.log("Erro ao ler os dados: ", error);
        return []; // Se houver erro, retorna um array vazio
    }
}
exports.lerDadosPerfis = lerDadosPerfis;
var salvarDadosPublicacoes = function (publicacoes) {
    var filePath = path.join(process.cwd(), "data.json");
    var jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    jsonData.data.publicacao = [];
    publicacoes.forEach(function (publicacao) {
        jsonData.data.publicacao.push(publicacao);
    });
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8");
};
exports.salvarDadosPublicacoes = salvarDadosPublicacoes;
var carregarDadosPublicacoes = function () {
    var filePath = path.join(process.cwd(), "data.json");
    var data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    return data.data.publicacao;
};
exports.carregarDadosPublicacoes = carregarDadosPublicacoes;
