const {
  ENVIRONMENT: env,
  PROD_CLIENT_URL: prodUrl,
  DEV_CLIENT_URL: devUrl,
  PROD_MEDIASERVER_URL: prodMediaServer,
  DEV_MEDIASERVER_URL: devMediaServer,
} = process.env;

const getEnvironment = () => {
  return env || "DEV";
};

const getVariables = () => {
  switch (getEnvironment()) {
    case "PROD":
      return {
        clientUrl: prodUrl,
        mediaServer: prodMediaServer,
      };
    case "DEV":
      return {
        clientUrl: devUrl,
        mediaServer: devMediaServer,
      };
  }
};

export const ENV = getVariables();
