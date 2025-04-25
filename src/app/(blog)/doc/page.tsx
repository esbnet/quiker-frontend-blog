import { metadata } from "@/app/layout";

metadata.title.default = "Quiker News | Documentação";

export default async function Blog() {
	return (
		<div className="flex flex-col flex-1 min-h-[79vh]">
			<h1 className="mb-4 font-extrabold text-3xl"># Quiker News</h1>

			<p className="mb-2">
				Esta aplicação se propõe a ser um site de notícias compartilhado. Nele
				qualquer pesso podera se cadastrar e criar artigos que ficaram
				disponíveis ao público da internet.
			</p>
			<p className="mb-8">
				Para utilizá-lo, basta registrar-se no aplicativo e já será hapto a
				realizar postage, commentários em postagens de terceiros e dar
				manutenção em seus próprios comentários, como excluír, por exemplo.
			</p>
			<h2 className="mb-4 font-extrabold text-xl">Techs</h2>
			<ul className="mb-8 pl-5 list-disc list-inside">
				<li>React - 18.3 - Linguagem de programação</li>
				<li>Next - 15.0 - Framework para melhor desempenho, CEO</li>
				<li>Typescript - 4.5 - Typagem, Segurança e Produtividade</li>
				<li>Shadcn - Lib de componentes copiar colar, sem dependências</li>
				<li>
					Prisma - ORM que otimiza o processo de criação do DB e manipulação de
					dados
				</li>
				<li>Axios - 1.7 - Gerenciar requisiçõe HTTP </li>
				<li>
					Tailwind Css - 3.3 - Framework de estilo CSS poderoso, flexível e
					rápido
				</li>
				<li>Jest - Framework para testes unitários</li>
			</ul>

			<h2 className="mb-4 font-extrabold text-xl">Pré-requisitos</h2>

			<ul className="mb-8 pl-5 list-disc list-inside">
				<li>Node (20.0 - utilizado)</li>
				<li>Genrenciador de pacotes (npm, pnpm, yarn)</li>
				<li>
					Back-end em execução (https://github.com/esbnet/quiker-backend-blog)
				</li>
				<li>Configurar banco de dados</li>
			</ul>

			<h2 className="mb-4 font-extrabold text-xl">Impantação</h2>
			<h3 className="mb-2 font-extrabold text-md">1. Clonar o projeto</h3>
			<code className="bg-slate-200 mb-2 p-2 pl-5 rounded-md">
				git clone https://github.com/esbnet/quiker-backend-blog.git
			</code>
			<h3 className="my-2 font-extrabold text-md">2. Instalar dependências</h3>
			<code className="bg-slate-200 mb-2 p-2 pl-5 rounded-md">npm install</code>
			<h2 className="my-2 font-extrabold text-md">3. Configurar ambiente</h2>
			<p className="my-4">
				Criar um arquivo .env na pasta raíz do projeto e inserir a variável de
				ambiente abaixo: (ver modelo na pasta root, arquivo env.sample)
			</p>
			<code className="bg-slate-200 mb-8 p-2 pl-5 rounded-md">
				NEXT_PUBLIC_API_URL=`&quot`http://localhost:3333`&lquot`
			</code>
			<h2 className="font-extrabold text-xl">Rodar o projeto</h2>
			<p className="my-4">
				Após providenciar os pré-requisitos, na pasta root, digite o comando
				abaixo:
			</p>
			<code className="bg-slate-200 p-2 pl-5 rounded-md">npm run dev</code>
		</div>
	);
}
