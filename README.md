![Versao Laravel](https://img.shields.io/badge/Laravel-11.11.1-orange?style=plastic&logo=laravel)
![versao TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.4-orange?style=plastic&logo=tailwindcss)

# O que é?

Um CRUD simples para cadastro, edição, atualização e exclusão de corretores.

# Tecnologias utilizadas

- ``PHP``
- ``Javascript``
- ``Typescript``
- ``Node.js``
- ``Laravel``
- ``TailwindCSS``
- ``Flowbite``

# Requisitos

- [PHP](https://www.php.net/)
- [Composer](https://getcomposer.org/)
- [Node.js](https://nodejs.org/en)

# Preparações para executar o projeto

1. Instalar dependências:

    Após extrair a pasta do projeto, abra um terminal na pasta raiz e digite esses dois comandos um após o outro:
    ```
    composer install
    ```
    ```
    npm install
    ```
    
2. Configurar seu banco de dados no arquivo ".env.example", e logo após, remover a extensão ".example"
3. Criar um novo banco de dados com o nome "testeimovelguide"

4. Executar as migrations do projeto:

    Digite e execute o código abaixo no terminal (o banco de dados deve estar online)
    ```
    php artisan migrate
    ```
    
5. Execute o projeto
    
    Abra dois terminais na pasta raiz e execute os comandos:
    ```
    php artisan serve
    ```
    ```
    npm run dev
    ```
    
    Abra seu navegador e entre na url: ``127.0.0.1:8000`` ou ``localhost:8000``
