const mongoose = require('mongoose');
const Promise = require('bluebird');
const validator = require('validator');
const UserModel = require('./model/User.js');
require('dotenv').config({ path: './variables.env' });
const { v4: uuidv4 } = require('uuid');

mongoose.Promise = Promise;

const mongoString = process.env.DB

// MongoDB Url

const createErrorResponse = (statusCode, message) => ({
  statusCode: statusCode || 501,
  headers: { 'Content-Type': 'text/plain' },
  body: message || 'Incorrect id',
});

const dbExecute = (db, fn) => db.then(fn).finally(() => mongoose.connection.close());

function dbConnectAndExecute(dbUrl, fn) {
  return dbExecute(mongoose.connect(dbUrl, {useNewUrlParser: true}), fn);
}

module.exports.getUser = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  dbConnectAndExecute(mongoString, () => (
    UserModel
      .findOne({ id: event.pathParameters.id })
      .then(user => 
        callback(null, { 
          statusCode: 200, 
          headers: { 
            'Content-Type': 'application/json', 
            'Access-Control-Allow-Origin': '*' 
          }, 
          body: JSON.stringify(user) 
        })
      )
      .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  ));
};

module.exports.createUser = (event, context, callback) => {
  const data = JSON.parse(event.body);

  const user = new UserModel({
    id: uuidv4(),
    details : {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone
    }
  });
  // if (user.validateSync()) {
  //   callback(null, createErrorResponse(400, 'Incorrect user data'));
  //   return;
  // }
  dbConnectAndExecute(mongoString, () => (
    user
      .save()
      .then(() => callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
        body: JSON.stringify({ id: user.id }),
      }))
      .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  ));
};


module.exports.users = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  dbConnectAndExecute(mongoString, () => (
    UserModel
      .find({})
      .then(users => {
        users = users.map(user =>  user.id)
        callback(null, { 
          statusCode: 200,
          headers: { 
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        }, 
        body: JSON.stringify(users)})
      })
      .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  ));
};

