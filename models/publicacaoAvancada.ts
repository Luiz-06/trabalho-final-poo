import { strict } from "assert";
import { Interacao } from "./interacao";
import { Perfil } from "./perfil";
import { Publicacao } from "./publicacao";
import { TipoInteracao } from "./tipoInteracao";

export class PublicacaoAvancada extends Publicacao {
  private _listaInteracoes: TipoInteracao[];

  constructor(
    id: string,
    conteudo: string,
    dataHora: Date,
    perfilAssociado: string
  ) {
    super(id, conteudo, dataHora, perfilAssociado);
    this._listaInteracoes = [];
  }

  public adicionarInteracao(interacao: TipoInteracao): void {
    this._listaInteracoes.push(interacao);
  }

  public listarInteracoes(): void {
    this._listaInteracoes.forEach((interacao: TipoInteracao) => {
      console.log(interacao);
    });
  }
}
