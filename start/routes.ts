import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/login', 'AuthController.login');
  Route.post('/logout', 'AuthController.logout');
}).prefix('/api/auth')

Route.group(() => {
  Route.get('/auth/me', 'AuthController.me');

  Route.resource('/users', 'v1/UsersController').apiOnly();
  Route.resource('/posts', 'v1/PostsController').apiOnly();
  Route.resource('/comments', 'v1/CommentsController').apiOnly();

  Route.get('/reports/posts', 'v1/ReportsController.posts');
})
.prefix('/api')
.middleware('auth')

