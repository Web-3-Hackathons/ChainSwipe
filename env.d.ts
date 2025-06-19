declare namespace NodeJS {
  interface ProcessEnv {
    RELAYER_PRIVATE_KEY: string;
    ETH_RPC_URL: string;
    POLYGON_RPC_URL: string;
  }
}
