declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      SERVER_PORT: number;

      //MONGODB
      MONGODB_URI: string;

      //SSL Certificates
      SSL_KEY_PATH: string;
      SSL_CERT_PATH: string;
    }
  }

  interface JSONResponseFormat {
    success: boolean;
    message: string;
    data: [] | {} | null;
    pagination?: {
      limit: number;
      currentPage: number;
      totalItems: number;
      totalPages: number;
    } | null;
    error?: {
      code: number;
      body: [{ [keys: string]: string | number }];
    };
  }
}

export {};
