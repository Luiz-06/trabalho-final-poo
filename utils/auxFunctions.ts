import { question } from "readline-sync";
import * as fs from "fs";
import * as path from "path";
import { log } from "console";
import { Perfil } from "../models/perfil";
import { Publicacao } from "../models/publicacao";

function print(mensagem: any): void {
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
  //getData("Pressione Enter para sair");
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

const salvarDadosPerfis = (perfis: Perfil[]) => {
  const filePath = path.join(process.cwd(), "data.json");

  const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  jsonData.data.perfil = [];

  perfis.forEach((perfil: any) => {
    jsonData.data.perfil.push(perfil);
  });
  fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8");
};

function lerDadosPerfis(): Perfil[] {
  try {
    const dados = fs.readFileSync("data.json", "utf-8"); // Lê o arquivo JSON
    const parsedData = JSON.parse(dados); // Converte a string JSON em um objeto JavaScript

    // Retorna a lista de perfis contida em parsedData.data.perfil
    const dadosPerfisLidos = parsedData.data.perfil;
    return parsedData.data.perfil;
  } catch (error) {
    console.log("Erro ao ler os dados: ", error);
    return []; // Se houver erro, retorna um array vazio
  }
}

const salvarDadosPublicacoes = (publicacoes: Publicacao[]) => {
  const filePath = path.join(process.cwd(), "data.json");

  const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  jsonData.data.publicacao = [];

  publicacoes.forEach((publicacao: any) => {
    jsonData.data.publicacao.push(publicacao);
  });
  fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8");
};

const carregarDadosPublicacoes = (): Publicacao[] => {
  const filePath = path.join(process.cwd(), "data.json");

  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    
    // Verifica se existe a propriedade publicacao
    if (!data.data.publicacao) {
      data.data.publicacao = [];
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    }

    // Converte os dados para objetos Publicacao
    return data.data.publicacao.map((pub: any) => 
      new Publicacao(
        pub._id, 
        pub._conteudo, 
        new Date(pub._dataHora), 
        pub._perfilAssociado
      )
    );
  } catch (error) {
    console.error("Erro ao carregar publicações:", error);
    return [];
  }
};

export const salvarPublicacoes = (publicacoes: Publicacao[]) => {
  const filePath = path.join(process.cwd(), "data.json");

  try {
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    
    // Mapeia as novas publicações para o formato correto
    const novasPublicacoes = publicacoes.map(pub => ({
      _id: pub.id,
      _conteudo: pub.conteudo,
      _dataHora: pub.dataHora,
      _perfilAssociado: pub.perfilAssociado
    }));

    // Verifica se já existe uma lista de publicações
    if (!jsonData.data.publicacao) {
      jsonData.data.publicacao = [];
    }

    // Remove publicações duplicadas
    const publicacoesUnicas = novasPublicacoes.filter(novaPub => 
      !jsonData.data.publicacao.some((existente: any) => existente._id === novaPub._id)
    );

    // Adiciona as novas publicações
    jsonData.data.publicacao.push(...publicacoesUnicas);

    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8");
  } catch (error) {
    console.error("Erro ao salvar publicações:", error);
  }
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
  salvarDadosPublicacoes,
  lerDadosPerfis,
};
