import admin from '../config/firebase'; 
const authenticateToken = (req: { headers: { [x: string]: string; }; user: any; }, res: { sendStatus: (arg0: number) => any; }, next: () => void) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    admin.auth().verifyIdToken(token)
        .then((decodedToken: any) => {
            req.user = decodedToken; // Attach user info to the request
            next(); // Proceed to the next middleware or route handler
        })
        .catch((error: any) => {
            console.error("Token verification error:", error);
            return res.sendStatus(403); // Forbidden
        });
};
