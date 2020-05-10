const {
  ENVIRONMENT: env,
  PROD_CLIENT_URL: prodUrl,
  DEV_CLIENT_URL: devUrl,
} = process.env;

export const getEnvironment = () => {
  return env || "DEV";
};

export const getClientUrl = () => {
  switch (env) {
    case "PROD":
      return prodUrl;
    case "DEV":
      return devUrl;
    default:
      return devUrl;
  }
};
