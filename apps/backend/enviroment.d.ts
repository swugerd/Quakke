declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      SERVER_PORT: string;
      SERVER_HOST: string;
      SERVER_GLOBAL_PREFIX: string;
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
      GQ_PLAYGROUND: boolean;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
