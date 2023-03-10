import cors from 'cors';

// change here
const allowedOrigins = ['http://localhost:3000'];

export const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
};
