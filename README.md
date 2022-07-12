# Teste prático desenvolvido por Carlos Aires

<h3>Seja muito bem-vindo(a)!</h3>

Este é o projeto que desenvolvi para a vaga de backend para a empresa QuickDev.
Por ter experiência como programador PHP, e utilizar do Laravel para desenvolvimento, optei por usar o framework <a href="https://adonisjs.com">Adonis Js</a> para realizar este teste técnico.

Tenho estudado este framework nos últimos meses. Por ter experiência prévia com o Laravel e o Adonis ser inspirado em sua estrtutura, a curva de aprendizado foi muito tranquila.

Bom, vamos lá!

## Começando

**Para maiores detalhes sobre o framework, leia a <a href="https://docs.adonisjs.com/guides/introduction">documentação do Adonis</a>**

### Configuração do ambiente
***

Dentro da pasta do projeto, rode os seguintes comandos:
- ``json npm install`` para poder baixar todos os pacotes necessários
- `cp .env.example .env` para copiar o arquivo de environment

- Lembre-se de setar as varíaveis do Banco de dados e outros serviços(como SMTP) no arquivo `.env`

- `node ace migration:run` para rodar todas as migrations e criar as tabelas do projeto
- `node ace db:seed UserSeeder` para rodar o Seeder que irá gerar alguns usuários e posts iniciais

- `node ace serve --watch` para iniciar o servidor

***
Se você não alterou nenhuma configuração de server, o projeto estará rodando na url `http://127.0.0.1:3333`

URL da api: `http://127.0.0.1:3333/api/v1/`

Usuário de acesso: <br>
enail: user.test@gmail.com <br>
password: 123456
***

Para maiores informações dos comandos do Adonis, use o comando `node ace`, assim ele listará todos os comandos disponíveis


