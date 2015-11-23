/// <reference path='../models/users.ts'/>

var User = require('./../models/users');
var UserModel = User.userModel;
var Promise = require('promise');

export function addUser(user) {
  if (!user.username  || !user.password || !user.firstName || !user.lastName ||
  !user.email) {
    return Promise.reject('Fields must not be empty!');
  }

  return findUserByUsername(user.username)
  .then(function (users) {
    if (users.length > 0) {
      return Promise.reject("Username taken.");
    } else {
      return UserModel.create(user);
    }
  });
}

export function findUserByUsername(username) {
  return UserModel.find({username: username}).exec();
}

export function allUsers() {
  return UserModel.find().exec();
}
