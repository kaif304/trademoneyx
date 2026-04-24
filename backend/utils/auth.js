import crypto from "crypto";

const TOKEN_TTL_MS = 1000 * 60 * 60 * 24 * 7;
const PASSWORD_KEY_LENGTH = 64;
const AUTH_SECRET = process.env.AUTH_SECRET || "trade-money-x-local-secret";

export const hashPassword = (password) => {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto
        .scryptSync(password, salt, PASSWORD_KEY_LENGTH)
        .toString("hex");

    return `${salt}:${hash}`;
};

export const verifyPassword = (password, storedHash) => {
    const [salt, savedHash] = storedHash.split(":");

    if (!salt || !savedHash) {
        return false;
    }

    const incomingHash = crypto
        .scryptSync(password, salt, PASSWORD_KEY_LENGTH)
        .toString("hex");

    if (incomingHash.length !== savedHash.length) {
        return false;
    }

    return crypto.timingSafeEqual(
        Buffer.from(incomingHash, "hex"),
        Buffer.from(savedHash, "hex")
    );
};

export const createAuthToken = (userId) => {
    const payload = {
        userId,
        expiresAt: Date.now() + TOKEN_TTL_MS,
    };

    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString(
        "base64url"
    );
    const signature = crypto
        .createHmac("sha256", AUTH_SECRET)
        .update(encodedPayload)
        .digest("base64url");

    return `${encodedPayload}.${signature}`;
};

export const verifyAuthToken = (token) => {
    const [encodedPayload, providedSignature] = token.split(".");

    if (!encodedPayload || !providedSignature) {
        throw new Error("Invalid token format.");
    }

    const expectedSignature = crypto
        .createHmac("sha256", AUTH_SECRET)
        .update(encodedPayload)
        .digest("base64url");

    if (providedSignature.length !== expectedSignature.length) {
        throw new Error("Invalid token signature.");
    }

    if (
        !crypto.timingSafeEqual(
            Buffer.from(providedSignature),
            Buffer.from(expectedSignature)
        )
    ) {
        throw new Error("Invalid token signature.");
    }

    const payload = JSON.parse(
        Buffer.from(encodedPayload, "base64url").toString("utf8")
    );

    if (!payload.expiresAt || payload.expiresAt < Date.now()) {
        throw new Error("Token expired.");
    }

    return payload;
};
