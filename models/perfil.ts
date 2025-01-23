class Perfil {
    private _idUnico: number
    private _apelido: string
    private _foto
    private _stats: boolean
    private _amigos: Perfil[]
    private _postagens: Publicacao[]

    public set id(id: number){
        this._idUnico = id
    }

    public adicionarAmigo(amigo: Amigo): void{
        let amigoBuscado = buscarAmigo(apelido: string)
    }
}