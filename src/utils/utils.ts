import { randomBytes, pbkdf2Sync, BinaryLike } from "crypto";

function gererateSalt(): string {
    const hashSalt = randomBytes(20).toString('hex');
    return hashSalt;
}

function hashedPassword(password:string | BinaryLike, salt: string | BinaryLike): String {
    const hash = pbkdf2Sync(password, salt,
        1000, 64, `sha512`).toString(`hex`);
    return hash;


}

export { gererateSalt, hashedPassword }