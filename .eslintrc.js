module.exports = {
  // Основные настройки
  env: {
    browser: true, // Доступ к глобальным переменным браузера (window, document и т.д.)
    es2021: true, // Поддержка ES2021
    node: true, // Глобальные переменные Node.js
    jest: true, // Глобальные переменные Jest (для тестов)
  },

  // Наследование правил
  extends: [
    'eslint:recommended', // Базовые правила ESLint
    'plugin:prettier/recommended', // Интеграция с Prettier (опционально)
  ],

  // Парсер для анализа кода
  parserOptions: {
    ecmaVersion: 'latest', // Версия ECMAScript
    sourceType: 'module', // Использование модулей (import/export)
  },

  // Плагины (дополнительные правила)
  plugins: [
    'prettier', // Плагин для интеграции с Prettier
    'react', // Для React-проектов
    '@typescript-eslint', // Для TypeScript
  ],

  // Кастомные правила
  rules: {
    // Основные правила
    'no-console': 'warn', // Предупреждение при использовании console.log
    'no-unused-vars': 'warn', // Предупреждение о неиспользуемых переменных
    'no-undef': 'error', // Ошибка при использовании необъявленных переменных
    'prettier/prettier': 'error',

    // Стиль кода
    indent: ['error', 2], // Отступы: 2 пробела
    quotes: ['error', 'single'], // Одинарные кавычки
    semi: ['error', 'always'], // Точки с запятой обязательны
    'comma-dangle': ['error', 'always-multiline'], // Висящая запятая в многострочных объектах

    // Лучшие практики
    eqeqeq: 'error', // Запрет на == и != (только === и !==)
    curly: 'error', // Обязательные фигурные скобки для условий
  },

  // Переопределение правил для специфичных файлов
  overrides: [
    {
      files: ['**/*.test.js'], // Для тестовых файлов
      env: {
        jest: true,
      },
      rules: {
        'no-undef': 'off', // Отключить проверку для переменных Jest
      },
    },
  ],
};
