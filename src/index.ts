// from 182~183
// import { Collection } from './models/Collection';
// import { User, UserProps } from './models/User';

// const collection = new Collection<User, UserProps>(
//   'http://localhost:3000/users',
//   (json: UserProps) => User.buildUser(json)
// );

// collection.on('change', () => {
//   console.log(collection)
// });

// collection.fetch();

// from 184
// import { User } from './models/User';

// const collection = User.buildUserCollection();

// collection.on('change', () => {
//   console.log(collection);
// });

// collection.fetch();


// from 188~205
// import { UserEdit } from './views/UserEdit';
// import { User } from './models/User';

// const root = document.getElementById('root');

// if (root) {
//   const userForm = new UserEdit(root, User.buildUser({ name: 'name', age: 10 }));
//   console.log(userForm)
//   userForm.render();
// } else {
//   throw new Error('Root element not found!');
// }

// from 206~208
import { UserList } from "./views/UserList";
import { Collection } from "./models/Collection";
import { UserProps, User } from './models/User';

const users = new Collection(
  'http://localhost:3000/users',
  (json: UserProps) => {
    return User.buildUser(json);
  }
);

users.on('change', () => {
  const root = document.getElementById('root');
  
  if (root) {
    new UserList(root, users).render();
  }
});

users.fetch();
