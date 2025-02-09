import { strict } from "assert";
import { Interacao } from "./interacao";
import { Perfil } from "./perfil";
import { Publicacao } from "./publicacao";
import { TipoInteracao } from "./tipoInteracao";

export class PublicacaoAvancada extends Publicacao {
  private _interacoes: Interacao[];

  constructor(
    id: string,
    conteudo: string,
    dataHora: Date,
    perfilAssociado: string
  ) {
    super(id, conteudo, dataHora, perfilAssociado);
    this._interacoes = [];
  }

  public adicionarInteracao(interacao: Interacao): void {
    this._interacoes.push(interacao);
  }

  public listarInteracoes(): Interacao[] {
    return this._interacoes;
  }

  public static isPublicacaoAvancada(publicacao: any): boolean {
    return publicacao._id.slice(0, 5) === 'SUPER'; 
  }

  public listarInteracoesDetalhadas(): string[] | any {
    return this._interacoes.map(interacao => 
      `${interacao.tipo} por ${interacao.perfilAutor}`
    );
  }

  public contarInteracoesPorTipo(): { [key in TipoInteracao]: number } {
    const contagem = {
      [TipoInteracao.Curtir]: 0,
      [TipoInteracao.NaoCurtir]: 0,
      [TipoInteracao.Riso]: 0,
      [TipoInteracao.Surpresa]: 0
    };

    this._interacoes.forEach(interacao => {
      contagem[interacao.tipo]++;
    });

    return contagem;
  }
}
