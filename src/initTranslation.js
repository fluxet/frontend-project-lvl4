import i18next from 'i18next';

export default () => {
  i18next.init({
    lng: 'ru',
    debug: true,
    resources: {
      ru: {
        translation: {
          password: 'Пароль',

          authorizationComponent: {
            username: 'Ваш ник',
            invalidFeedback: 'Неверные имя пользователя или пароль',
            login: 'Войти',
            noAccount: 'Нет аккаунта?',
            signup: 'Регистрация',
          },
          signupComponent: {
            username: 'Имя пользователя',
            usernamePlaceholder: 'От 3 до 20 символов',
            invalidFeedback: 'Обязательное поле',
            passwordPlaceholder: 'Не менее 6 символов',
            confirmPassword: 'Подтвердите пароль',
            confirmPasswordFeedback: 'Пароли должны совпадать',
            signup: 'Зарегистрироваться',
          },
        },
      },
    },
  });
};
