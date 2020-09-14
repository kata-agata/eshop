const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const Repository = require('./repository');

const scrypt = util.promisify(crypto.scrypt);//we can use as async and await

class UsersRepository extends Repository {
  async create(attrs){
    //{email: '', password: ''}
    attrs.id = this.randomId();

    const salt = crypto.randomBytes(8).toString('hex');
    const buf = await scrypt(attrs.password, salt, 64);//hashing password
    //{email: 'aaaa@frf.com', passwd: 'dddd'}
    //load existing file users.JSON
    const records = await this.getAll();

    const record = {
      ...attrs,
      password: `${buf.toString('hex')}.${salt}`
    };
    records.push(record);// overriding password

    await this.writeAll(records);
    return record; // we need return id, and hashed password with salt
  }

  async comparePasswords(saved, supplied){
    //saved => password saved in our database 'hash.salt'
    //const result = saved.split('.'); //array with 2 elements
    //const hashed = result[0];
    //const salt = result[1];

    const [hashed,salt] = saved.split('.');// in one line, destructure this array
    const hashedSuppliedBuf = await scrypt(supplied, salt, 64);//hashing typed password, this is buffer thats why we need toString
    return hashed === hashedSuppliedBuf.toString('hex');
    //supplied => password gibven by user trying sign in
  }
}

//module.exports = UsersRepository; // inside other file we should have:
//const UsersRepository = require('./users');
//const repo = new UsersRepository('users.json');
//this is not good, because if we use it in diffrent file we can made as accident two writeFileSync

//better way:
module.exports = new UsersRepository('users.json');
//we will receive the instance of users repository
//in other file:
//const repo = require('./users');
//repo.getAll();
