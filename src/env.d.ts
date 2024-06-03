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

      //Kafka
      BROKERS: string;
    }
  }

  //the format in which express js will response
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

  //the format of the data that user will send to the connections
  interface UserData {
    ts: number;
    name: string;
    value: string;
  }
  //the format of the data that will be saved to InfluxDB
  interface InfluxUserData extends UserData {
    tag: string;
  }
}

export {};
