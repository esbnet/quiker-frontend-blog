# Port Next

Esta aplicação se propõe a ser um site de notícias compartilhado. Nele qualquer pesso podera se cadastrar e criar artigos que ficaram disponíveis ao público da internet. 

Para utilizá-lo, basta registrar-se no aplicativo e já será hapto a realizar postage, commentários em postagens de terceiros e dar manutenção em seus próprios comentários, como excluír, por exemplo.



## Techs

- React - 18.3 - Linguagem de programação
- Next - 15.0 - Framework para melhor desempenho, CEO
- Typescript - 4.5
- Prisma 
- Axios - 1.7
- Tailwind Css - 3.3

## Pré-requisitos

- Node (20.0 - utilizado)
- Genrenciador de pacotes (npm, pnpm, yarn)
- Back-end em execução (https://github.com/esbnet/quiker-backend-blog)
- Configurar banco de dados


## Impantação

- Clonar projeto 

``` 
git clone https://github.com/esbnet/quiker-backend-blog.git 
```
- Instalar dependências
```
npm install
```

- Configurar ambiente
Criar um arquivo .env na pasta raíz do projeto e inserir a variável de ambiente abaixo:
(ver modelo na pasta root, arquivo env.sample) 
```
NEXT_PUBLIC_API_URL="http://localhost:3333"
```

## Rodar o projeto

Após providenciar os pré-requisitos, na pasta root, digite o comando abaixo:
```
npm run dev
```

Após realizar todos os procedimentos, aparecerá a página inicial:

![Logo da Minha Empresa](https://exemplo.com/logo.png)