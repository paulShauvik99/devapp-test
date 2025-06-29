import jwtEncode from 'jwt-encode';

const SECRET = 'devhub-mock-secret'; 

export const generateJWT = (payload: object, expiresIn = 3600 ) => {
    const now = Math.floor(Date.now() / 1000);
    const exp = now + ( expiresIn );
    const fullPayload = { ...payload, iat: now, exp };
    return jwtEncode(fullPayload, SECRET);
};
