import crypto from 'crypto'
import User from '../models/users'


export function hashUser({ email, password }:User ) {
    // Here you should create the user and save the salt and hashed password (some dbs may have
    // authentication methods that will do it for you so you don't have to worry about it):
    const salt = crypto.randomBytes(16).toString('hex')
    const hashedPassword = crypto
      .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
      .toString('hex')
    const user: User = {
      createdAt: new Date(),
      email,
      password: hashedPassword,
      salt,
    }

    return user
};