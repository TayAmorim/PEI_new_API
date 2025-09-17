# Pei - API da Plataforma de Educação Inclusiva

![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow.svg)

## 🚀 Sobre o Projeto

Esta é a API  que serve como o back-end para a **Pei - Plataforma de Educação Inclusiva**.

A Pei é uma solução digital especializada para apoiar o trabalho dos Auxiliares de Desenvolvimento da Educação Especial (ADEE). O principal objetivo é automatizar o diário de classe, proporcionando um registro eficaz e centralizado das atividades escolares. O projeto visa melhorar a eficiência dos ADEEs, facilitando o acompanhamento e o registro das atividades de forma mais organizada e acessível.

## ✨ Principais Funcionalidades

- **Gestão de Atividades:** Sistema completo (CRUD - Criar, Ler, Atualizar, Deletar) para o registro de atividades escolares.
- **Autenticação de Usuários:** Sistema de login seguro para os ADEEs utilizando JSON Web Tokens (JWT).
- **Gerenciamento de Alunos:** Estrutura para cadastrar e vincular alunos às atividades e aos seus respectivos ADEEs.
- **Rotas Protegidas:** Endpoints da API protegidos para garantir que apenas usuários autenticados possam acessar e modificar os dados.

### 🛠️ Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

- **[Fastify](https://fastify.dev/):** Um framework web de alta performance e baixo overhead para Node.js, focado em velocidade e uma arquitetura baseada em plugins.
- **[Supabase](https://supabase.com/):** Uma plataforma de back-end de código aberto, alternativa ao Firebase. Fornece o banco de dados PostgreSQL, sistema de autenticação, e armazenamento de arquivos.
- **[TypeScript](https://www.typescriptlang.org/):** Um superset do JavaScript que adiciona tipagem estática ao código, aumentando a robustez e a manutenibilidade.


## 📋 Pré-requisitos

Antes de começar, você vai precisar ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/en/) (versão 18.x ou superior recomendada)
- [Yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)
- Uma instância do [PostgreSQL](https://www.postgresql.org/download/) rodando (ou um container [Docker](https://www.docker.com/) com a imagem do Postgres).

## 📝 Endpoints da API (Exemplos)

Aqui estão alguns dos principais endpoints disponíveis:

| Método HTTP | Rota              | Descrição                                           | Protegida? |
| :---------- | :---------------- | :-------------------------------------------------- | :--------- |
| `POST`      | `/auth/login`     | Autentica um usuário (ADEE) e retorna um token JWT. | Não        |
| `POST`      | `/users`          | Cria um novo usuário.                               | Não/Admin  |
| `GET`       | `/activities`     | Retorna todas as atividades do usuário logado.      | Sim        |
| `POST`      | `/activities`     | Cria uma nova atividade para o usuário logado.      | Sim        |
| `PUT`       | `/activities/:id` | Atualiza uma atividade específica.                  | Sim        |
| `DELETE`    | `/activities/:id` | Deleta uma atividade específica.                    | Sim        |

---

Feito com ❤️ por [Tayanna Amorim](<[https://seu-link-aqui.com](https://github.com/TayAmorim)>)
