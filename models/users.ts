/// <reference path='../typings/tsd.d.ts'/>

import M = require('mongoose');

export var userSchema:M.Schema = new M.Schema(
  {
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String
  });

export interface IUser extends M.Document {
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  email: string
}

export var userModel = M.model<IUser>("users", userSchema);
