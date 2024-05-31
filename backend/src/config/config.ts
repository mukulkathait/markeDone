export const config = {
  port: process.env.PORT || 5000,
  databaseUrl: process.env.DATABASE_URL as string,
  jwtSecretKey: process.env.JWT_SECRET_KEY as string,
};
