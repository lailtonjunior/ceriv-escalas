CER IV Escalas
Formulário para geração de escalas médicas do CER IV da APAE de Colinas

Este projeto é uma aplicação web desenvolvida para facilitar a criação e gerenciamento de escalas médicas no Centro Especializado em Reabilitação (CER IV) da APAE de Colinas do Tocantins. 
Utilizando tecnologias modernas, o sistema permite que os usuários insiram dados de plantões e profissionais, gerando escalas organizadas de forma eficiente.

Tecnologias Utilizadas
Next.js – Framework React para aplicações web

TypeScript – Superset do JavaScript com tipagem estática

Tailwind CSS – Framework CSS utilitário

PNPM – Gerenciador de pacotes rápido e eficiente

Pré-requisitos
Antes de iniciar, certifique-se de ter instalado:

Node.js (versão 18 ou superior)

PNPM (versão 8 ou superior)

Como Executar Localmente
Siga os passos abaixo para executar o projeto em sua máquina local:

Clone o repositório:

bash
Copiar
Editar
git clone https://github.com/lailtonjunior/ceriv-escalas.git
cd ceriv-escalas
Instale as dependências:

bash
Copiar
Editar
pnpm install
Inicie o servidor de desenvolvimento:

bash
Copiar
Editar
pnpm dev
Acesse a aplicação:

Abra o navegador e vá para http://localhost:3000

Estrutura de Pastas
app/ – Contém as rotas e páginas da aplicação

components/ – Componentes reutilizáveis da interface

hooks/ – Hooks personalizados para lógica reutilizável

lib/ – Funções utilitárias e bibliotecas auxiliares

public/ – Arquivos públicos, como imagens e fontes

styles/ – Arquivos de estilo global e configurações do Tailwind

Configurações
tailwind.config.ts – Configuração do Tailwind CSS

postcss.config.mjs – Configuração do PostCSS

next.config.mjs – Configuração do Next.js

tsconfig.json – Configuração do TypeScript

pnpm-lock.yaml – Arquivo de bloqueio do PNPM

Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests para melhorias e correções.

Licença
Este projeto está licenciado sob a MIT License.

