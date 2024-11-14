// const baseFrontUrl=process.env.BASE_FRONT_URL

const allowOrigins = [ 'https://qryptogenia.disruptiveinfotech.com' ,'http://localhost:5173']

export const CorsConfig  = { 
    'origin': allowOrigins,
    'methods': "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    'credentials': true,
    'allowedHeaders': ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'], // Encabezados permitidos
}