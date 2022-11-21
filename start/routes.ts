import Route from '@ioc:Adonis/Core/Route'

/**
 * Login/Register
 */
Route.get('/login', 'AuthController.loginView').as('loginView');
Route.post('/login', 'AuthController.login').as('login');
Route.get('/register', 'AuthController.registerView').as('registerView');
Route.post('/register', 'AuthController.register').as('register');

Route.group(() => {

  Route.group(()=>{
    Route.get('/articulations', 'MusclesController.articulations').as('articulations')
  }).prefix('/new-data')

  /**
   * Register type of profile
   */
  Route.group(() => {
    Route.get('/aluno', 'AlunoController.registerAlunoProfile').as('registerAlunoView')
    Route.post('/aluno', 'AlunoController.register').as('registerAluno')
    Route.get('/personal', 'PersonalController.registerPersonalProfile').as('registerPersonalView')
    Route.post('/personal', 'PersonalController.register').as('registerPersonal')
  }).prefix('/register')

  /**
   * Aluno
   */
  Route.group(() => {
    Route.get('/dashboard', 'AlunoController.index').as('alunoDashboard')
  }).prefix('aluno')

  /**
   * Personal
   */
  Route.group(() => {
    Route.get('/dashboard', 'PersonalController.index').as('personalDashboard')
    Route.get('/alunos', 'PersonalController.alunos').as('personalAlunos')
    Route.get('/alunos/:id', 'PersonalController.aluno').as('personalAluno')
    Route.get('/aluno/criar', 'PersonalController.createAlunoView').as('personalCriarAluno')
  }).prefix('personal')

  Route.get('/choose-profile', 'AuthController.chooseProfile').as('chooseProfile')
  Route.get('/dashboard', 'DashboardController.index').as('dashboard')
}).middleware(['auth']);