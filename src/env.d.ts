declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      SERVER_PORT: number;

      //MONGODB
      MONGODB_URI: string;
    }
  }

  interface JSONResponseFormat {
    success: boolean;
    message: string;
    data: [] | {} | null;
    pagination: {
      limit: number;
      offset: number;
      currentPage: number;
      totalItems: number;
      totalPages: number;
    } | null;
    error?: {
      code: number;
      message: string[];
    };
  }
}

export {};
