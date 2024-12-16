# Fitness App 🏋️‍♂️
Um aplicativo para gerenciar atividades físicas e metas de fitness, permitindo que os usuários acompanhem seu progresso e objetivos.

## Descrição
O Fitness App é um dashboard interativo que permite aos usuários:

Registrar suas atividades físicas. <br/>
Definir e acompanhar metas de fitness.<br/>
Visualizar gráficos de progresso.<br/>
O objetivo principal deste projeto é praticar o desenvolvimento Full Stack utilizando tecnologias modernas como React, GraphQL, Node.js e MongoDB.

## Funcionalidades
### Usuários:
Criar, editar e excluir usuários.
### Atividades:
Registrar atividades físicas (data, tipo, duração).<br/>
Editar ou remover atividades.<br/>
Visualizar atividades em gráficos.
### Metas:
Criar metas personalizadas.<br/>
Editar ou remover metas.<br/>
Acompanhar progresso das metas em gráficos.

## Tecnologias Utilizadas
### Frontend
React com Next.js (Pasta app/ com suporte ao server-side rendering)<br/>
Apollo Client para consumir APIs GraphQL<br/>
TailwindCSS para estilização<br/>
Framer Motion para animações<br/>
Recharts para gráficos<br/>

### Backend
Node.js com Express.js<br/>
Apollo Server para GraphQL<br/>
Mongoose para interação com MongoDB<br/>
MongoDB para banco de dados<br/>

## Como Executar o Projeto
### Pré-requisitos
Node.js (v16 ou superior)<br/>
MongoDB (local ou em nuvem)<br/>
Gerenciador de pacotes npm ou yarn<br/>

### Instruções
Clone o repositório:

Copiar código<br/>
git clone https://github.com/seu-usuario/fitness-app.git<br/>
cd fitness-app<br/>
Configurar o Backend:<br/>

### Acesse a pasta do backend:

Copiar código<br/>
cd backend<br/>

### Instale as dependências:

Copiar código<br/>
npm install<br/>

### Configure as variáveis de ambiente no arquivo .env (exemplo abaixo):

Copiar código<br/>
MONGO_URI=mongodb://localhost:27017/fitness-app<br/>
PORT=4000<br/>

### Inicie o servidor GraphQL:

Copiar código<br/>
npm start<br/>

### Configurar o Frontend:

Acesse a pasta do frontend:

Copiar código<br/>
cd ../frontend<br/>

### Instale as dependências:

Copiar código<br/>
npm install<br/>

### Inicie o aplicativo React:

Copiar código<br/>
npm run dev<br/>

### Acesse o aplicativo no navegador:

Frontend: http://localhost:3000<br/>
Playground GraphQL: http://localhost:4000/graphql<br/>

## Contribuição
Contribuições são bem-vindas!

Faça um fork do projeto.
### Crie uma branch para sua feature ou correção:

Copiar código<br/>
git checkout -b minha-feature

### Commit suas alterações:

Copiar código<br/>
git commit -m 'Adiciona nova feature'<br/>

### Faça um push para sua branch:

Copiar código<br/>
git push origin minha-feature<br/>
Abra um Pull Request.<br/>

## Licença
Este projeto está sob a licença MIT. Para mais detalhes, veja o arquivo [LICENSE](/LICENSE).
