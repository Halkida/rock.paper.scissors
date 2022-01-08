import express from 'express';
import path from 'path';
import { dbConnect } from './init';
import { User } from './init';
import { IUser } from './models/user';

const app = express();
const PORT = process.env.PORT || 3000;

// Создание пользователя
export function createUser(firstName: string, lastName: string) {
  return User.create({ firstName, lastName });
}

// Обновление пользователя по ID
export function updateUserById(id: number, data: IUser) {
  return User.update(data, { where: { id } });
}

// Удаление пользователя по ID
export function deleteUserById(id: number) {
  return User.destroy({ where: { id } });
}

// Получение пользователя по ID
export function getUserById(id: number) {
  return User.findOne({ where: { id } });
}

// Получение пользователей по ID
export function getUsersByFirstName(firstName: string) {
  return User.findAll({ where: { firstName } });
}

export function startApp() {
  dbConnect().then(async () => {
      /*
       *  Запуск приложения только после старта БД
       */

      // Создаем нового пользователя
      await createUser('Alex', 'Ivanov');
      // Получаем пользователей с именем Alex
      const users = await getUsersByFirstName('Alex');

      // Проверяем, найдены ли пользователи
      if (!users.length) {
        throw 'Not found';
      }

      // Получаем id первого пользователя
      const { id } = users[0] as any;
      // Обновляем пользователя по ID
      await updateUserById(id, { firstName: 'Ivan', lastName: 'Ivanov' });

      // Ищем обновленного пользователя по id
      const findedUser = await getUserById(id);
      // Выводим в консоль найденного пользователя
      console.log('Finded user: ', findedUser);

      app.use(express.static('./dist'));

      app.use('*',  (req, res)=> {
        res.sendFile(path.join(__dirname, './dist', 'index.html'));
      });


      app.listen(PORT, function() {
        console.log(`Example app listening on port ${PORT}!`);
      });
  });
}
