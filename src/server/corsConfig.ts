import cors from 'cors';

// CHANGEHERE
const allowedOrigins = '*';

export const corsConfig: cors.CorsOptions = {
  origin: allowedOrigins,
};
