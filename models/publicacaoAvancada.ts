import { Interacao } from "./interacao";
import { Perfil } from "./perfil";
import { Publicacao } from "./publicacao";

export class PublicacaoAvancada extends Publicacao {
  private _listaInteracoes: Interacao[];

  constructor(
    id: number,
    conteudo: string,
    dataHora: Date,
    perfilAssociado: Perfil
  ) {
    super(id, conteudo, dataHora, perfilAssociado);
    this._listaInteracoes = [];
  }

  public adicionarInteracao(interacao: Interacao): void {
    this._listaInteracoes.push(interacao);
  }

  public listarInteracoes(): void {
    this._listaInteracoes.forEach((interacao: Interacao) => {
      console.log(interacao);
    });
  }
}
