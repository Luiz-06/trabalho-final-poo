class Perfil {
    private _idUnico: number
    private _apelido: string
    private _foto
    private _stats: boolean
    private _amigos: Amigo[]
    private _postagens: Postagens[]

    public set id(id: number){
        this._idUnico = id
    }

    public adicionarAmigo(amigo: Amigo): void{
        let amigoBuscado = buscarAmigo(apelido: string)
    }
}