const mockTopicData = {
  id: 1,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  author: {
    email: 'dummy@email.com',
    firstName: 'Некое имя',
    secondName: 'Некая фамилия',
    phone: '+79999999999',
    nickName: 'super_user',
    avatar: ''
  },
  title: 'Название топика',
  commentsCount: 3000,
  comments: [{
    id: 1,
    author: {
      email: 'dummy@email.com',
      firstName: 'Имя Автор 1',
      secondName: 'Некая фамилия',
      phone: '+79999999999',
      nickName: 'super_user',
      avatar: ''
    },
    content: 'Контент первого коммента'
  }, {
    id: 2,
    author: {
      email: 'dummy@email.com',
      firstName: 'Имя Автор 2',
      secondName: 'Некая фамилия',
      phone: '+79999999999',
      nickName: 'super_user',
      avatar: ''
    },
    content: `Контент второго коммента
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',`
  }]
};

export default mockTopicData;