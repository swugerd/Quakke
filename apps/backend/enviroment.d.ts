declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'production' | 'development';
      DATABASE_URL: string;
      CLIENT_HOST: string;
      SERVER_PORT: string;
      SERVER_HOST: string;
      SERVER_GLOBAL_PREFIX: string;
      JWT_ACCESS_SECRET: string;
      JWT_REFRESH_SECRET: string;
      JWT_ACCESS_EXP: string;
      JWT_REFRESH_EXP: string;
      STATIC_PATH: string;
      SMTP_USERNAME: string;
      SMTP_FROM: string;
      SMTP_USER_PASSWORD: string;
      SMTP_HOST: string;
      SMTP_PORT: string;
      SMTP_SECURE: boolean;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
