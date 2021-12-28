const mockTopicData = {
  id: 1,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  author: {
    id: 1,
    login: 'asdas',
    email: 'dummy@email.com',
    first_name: 'Некое имя',
    second_name: 'Некая фамилия',
    phone: '+79999999999',
    display_name: 'super_user',
    avatar: 'https://picsum.photos/400/500?random=1'
  },
  title: 'Название топика',
  commentsCount: 3000,
  comments: [{
    id: 1,
    author: {
      id: 2,
      login: 'asdas',
      email: 'dummy@email.com',
      first_name: 'Имя Автор 1',
      second_name: 'Некая фамилия',
      phone: '+79999999999',
      display_name: 'super_user',
      avatar: 'https://picsum.photos/400/500?random=2'
    },
    content: 'Контент первого коммента'
  }, {
    id: 2,
    author: {
      id: 3,
      login: 'asdas',
      email: 'dummy@email.com',
      first_name: 'Имя Автор 2',
      second_name: 'Некая фамилия',
      phone: '+79999999999',
      display_name: 'super_user',
      avatar: 'https://picsum.photos/400/500?random=3'
    },
    content: `Контент второго коммента
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',`
  }]
};

export default mockTopicData;