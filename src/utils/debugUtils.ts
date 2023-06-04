const isDevelopment = process.env.NODE_ENV === "development";

const logError = (error: string) => {
  if (isDevelopment) {
    console.error(error); // Log the error in development environment
  }
};

const logResult = (result: any) => {
  if (isDevelopment) {
    console.log(result);
  }
};

export { logError, logResult };
