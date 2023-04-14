<h1>Rotas da aplicação e suas funções</h1>

<h2>API de Usuários:</h2>

<p>Rota que retorna todos os usuários cadastrados, caso o usuário esteja autenticado e tenha role igual a 'admin'</p>  
<p>GET - localhost:3000/api/users</p>
<p>Cadastra um novo usuário no sistema</p>  
<p>POST - localhost:3000/api/users</p> 
<p>Busca um usuário, necessita do parametro id, estar autenticado no sistema e possuir a role 'admin'</p>  
<p>GET - localhost:3000/api/users/{id}</p>
<p>Edita os dados do usuário cujo id seja mencionado no parametro, necessita estar autenticado no sistema e possuir a role 'admin'</p>   
<p>PUT - localhost:3000/api/users/{id}</p>
<p>Deleta um usuário do sistema, necessita estar autenticado no sistema e possuir a role 'admin'</p>   
<p>DELETE - localhost:3000/api/users/{id}</p> 

<h2>API de Playlist:</h2>

<p>Rota que retorna todas as playlists, necessita estar autenticado, caso a role seja 'admin', retorna as playlists de todos usuários, caso seja 'user', apenas as playlists do usuário logado</p>  
<p>GET - localhost:3000/api/playlist</p>
<p>Cadastra uma nova playlist, necessita estar autenticado</p>  
<p>POST - localhost:3000/api/playlist</p> 
<p>Busca uma playlist por id, necessita estar autenticado, caso a role seja 'admin', poderá trazer qualquer playlist cadastrada, caso a role seja 'user', trará, somente se a playlist pertencer ao usuário autenticado</p>  
<p>GET - localhost:3000/api/playlist/{id}</p>
<p>Edita os dados da playlist, necessita estar autenticado, caso a role seja 'admin', poderá editar qualquer playlist cadastrada, caso a role seja 'user', editará somente se a playlist pertencer ao usuário autenticado</p>   
<p>PUT - localhost:3000/api/playlist/{id}</p>
<p>Deleta uma playlist do sistema, necessita estar autenticado, caso a role seja 'admin', poderá excluir qualquer playlist cadastrada, caso a role seja 'user', excluirá somente se a playlist pertencer ao usuário autenticado</p>   
<p>DELETE - localhost:3000/api/playlist/{id}</p> 

<h2>Rota de login:</h2>

POST - localhost:3000/api/auth/login

Para testar a aplicação eu utilizei o postman, após autenticar, incluí o token gerado na aba "Authorization", na opção Bearer token.

<h1>Criação do usuário admin:</h2>
Chamar a rota: localhost:3000/api/users, utilizando o verbo "Post", enviando o payload conforme o exemplo a baixo:

{
    "firstName": "admin",
    "lastName": "admin",
    "email": "admin@teste.com",
    "password": "123456",
    "role": "admin"
}

Em caso de criação de usuário cuja role seja "user", não é necessário passar a role no payload, pois o default da role já é a role user.

Para o banco de dados utilizei o PostgreSQL, versão 15. 

Para autenticação utilizei JWT, seguindo um tutorial muito prático. Link do tutorial utilizado:
 https://www.youtube.com/watch?v=jMprSQlDLGo
