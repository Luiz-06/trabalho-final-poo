import { question } from "readline-sync";
import * as fs from "fs";
import * as path from "path";
import { log } from "console";
import { Perfil } from "../models/perfil";

function print(mensagem: string): void {
  console.log(mensagem);
}

function getNumber(mensagem: string): number {
  return Number(question(mensagem));
}

function getData(mensagem: string): string {
  return question(mensagem);
}

function getNaturalNumber(numero: number): number {
  if (numero >= 0) return numero;
  throw new Error("Apenas valores positivos");
}

function getPositiveNumber(numero: number): number {
  if (numero > 0) return numero;
  throw new Error("Apenas valores positivos");
}

function getNegativeNumber(numero: number): number {
  if (numero < 0) return numero;
  throw new Error("Apenas valores negativos");
}

function filterList<T>(colecao: T[], criterio: (item: T) => boolean): T[] {
  return colecao.filter(criterio);
}

function mapList<T, R>(colecao: T[], criterio: (item: T) => R): R[] {
  return colecao.map(criterio);
}

function addList<T>(colecao: T[], item: T): T[] {
  colecao.push(item);
  return colecao;
}

function removeList<T>(colecao: T[], item: T): T[] {
  return colecao.filter((i) => i !== item);
}

function clear(): void {
  getData("Pressione Enter para sair");
  console.clear();
}

const choosePhoto = (): string => {
  const emojisArray = [
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

  emojisArray.forEach((emoji: string, index: number) => {
    print(index + 1 + " - " + emoji);
  });
  const emojiOption: number = getNumber(
    "Qual opção de foto voce deseja? \n>> "
  );
  return emojisArray[emojiOption - 1];
};

const carregarDadosPerfis = (): Perfil[] => {
  const filePath = path.join(process.cwd(), "data.json");

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8")).data.perfil;

  const perfisArray: Perfil[] = [];

  data.forEach((perfil: any) => {
    const novo = new Perfil(
      perfil._id,
      perfil._apelido,
      perfil._email,
      perfil._foto,
      perfil._senha,
      perfil._stats,
      perfil._amigos,
      perfil._publicacoes,
      perfil._solicitacoesAmizade
    );
    perfisArray.push(novo);
  });
  return perfisArray;
};

carregarDadosPerfis();

const carregarDadosPublicacoes = () => {
  const filePath = path.join(process.cwd(), "data.json");

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  return data.data.publicacao;
};

const salvarDadosPerfis = (perfis: Perfil[]) => {
  const filePath = path.join(process.cwd(), "data.json");

  const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  jsonData.data.perfil = [];

  perfis.forEach((perfil: any) => {
    jsonData.data.perfil.push(perfil);
  });
  fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8");
};

const salvarDadosPublicacoes = (perfis: Perfil[]) => {
  const filePath = path.join(process.cwd(), "data.json");

  const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  jsonData.data.publicacao = [];

  perfis.forEach((perfil: any) => {
    jsonData.data.perfil.push(perfil);
  });
  fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8");
};

export {
  getData,
  getNumber,
  print,
  getNaturalNumber,
  getPositiveNumber,
  filterList,
  mapList,
  addList,
  removeList,
  getNegativeNumber,
  clear,
  choosePhoto,
  carregarDadosPerfis,
  carregarDadosPublicacoes,
  salvarDadosPerfis,
};
