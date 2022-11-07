/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/login', 'AuthController.loginView').as('loginView');
Route.post('/login', 'AuthController.login').as('login');
Route.get('/register', 'AuthController.registerView').as('registerView');
Route.post('/register', 'AuthController.register').as('register');

Route.group(() => {
  Route.group(() => {
    Route.get('/aluno', 'AlunoController.registerAlunoProfile').as('registerAlunoView')
    Route.post('/aluno', 'AlunoController.register').as('registerAluno')
    Route.get('/personal', 'PersonalController.registerPersonalProfile').as('registerPersonalView')
    Route.post('/personal', 'PersonalController.register').as('registerPersonal')
  }).prefix('/register')

  Route.group(() => {
    Route.get('/dashboard', 'AlunoController.index').as('alunoDashboard')
  }).prefix('aluno')

  Route.group(() => {
    Route.get('/dashboard', 'PersonalController.index').as('personalDashboard')
  }).prefix('personal')

  Route.get('/choose-profile', 'AuthController.chooseProfile').as('chooseProfile')
  Route.get('/dashboard', 'DashboardController.index').as('dashboard')
}).middleware(['auth']);