declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'production' | 'development';
      DATABASE_URL: string;
      SERVER_PORT: string;
      SERVER_HOST: string;
      SERVER_GLOBAL_PREFIX: string;
      JWT_ACCESS_SECRET: string;
      JWT_REFRESH_SECRET: string;
      JWT_ACCESS_EXP: string;
      JWT_REFRESH_EXP: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      YANDEX_APP_ID: string;
      YANDEX_APP_SECRET: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
