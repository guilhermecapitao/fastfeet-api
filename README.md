<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="https://github.com/guilhermecapitao/fastfeet-api/blob/master/src/others/logo-fastfeet.png" width="300px" />
</h1>

<h3 align="center">
  :rocket: Bootcamp GoStack - Rocketseat
</h3>

### Sobre o desafio
Fastfeet foi uma aplicação desenvolvida no bootcamp GoStack da Rocketseat. O objetivo era construir a API de uma transportadora fictícia. Nos módulos seguintes trarei o front-end mobile e web da aplicação.


<p><a href="https://github.com/Rocketseat/bootcamp-gostack-desafio-02/blob/4e6c5db70ac176f78545d5c8a71b5930f72dc13a/README.md">1º do desafio</a></p>
<p><a href="https://github.com/Rocketseat/bootcamp-gostack-desafio-03/blob/d0c8f32222938cec6719637a1d21616531da9644/README.md">2º do desafio</a></p>

### Funcionalidades disponíveis
* Admin consegue se autenticar via Token JWT
* Cadastrar e Editar destinatários.
* Listar/cadastrar/editar/deletar entregadores e entregas.
* Visualização de encomendas
* Alterar status das encomendas
* Cadastrar problemas na entregas
* Cancelar uma entrega
* Envio de e-mail sobre novas entregas e cancelamento de encomendas.

### Instalando dependências
```sh
git clone ...
cd FastFeet
yarn
```

### Banco de dados
```sh
Crie uma imagem do PostgreSQL no docker, e inclua as configurações no /src/config/database.js
(Estou devendo as variáveis de ambiente)
```

### Rodando as migrations e seeds
```sh
yarn sequelize db:migrate
yarn sequelize db:seed:all
```

### Iniciando o servidor
```sh
yarn dev
```
<hr />

### Rotas (import)
[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Fastfeet&uri=https%3A%2F%2Fgithub.com%2Fguilhermecapitao%2Ffastfeet-api%2Ftree%2Fmaster%2Fsrc%2Fothers)

### Tarefas
[Kanban](https://github.com/guilhermecapitao/fastfeet-api/projects)

## 📝 License

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](https://github.com/guilhermecapitao/fastfeet-api/blob/master/LICENSE) para mais detalhes.

