import { Interacao } from "./interacao";
import { Perfil } from "./perfil";
import { Publicacao } from "./publicacao";
import { TipoInteracao } from "./tipoInteracao";

export class PublicacaoAvancada extends Publicacao {
  private _listaInteracoes: TipoInteracao[];

  constructor(
    id: number,
    conteudo: string,
    dataHora: Date,
    perfilAssociado: Perfil
  ) {
    super(id, conteudo, dataHora, perfilAssociado);
    this._listaInteracoes = [];
  }

  public adicionarInteracao(interacao: TipoInteracao): void {
    this._listaInteracoes.push(interacao);
  }

  public listarInteracoes(): TipoInteracao[] {
    return [...this._listaInteracoes];
  }
}
