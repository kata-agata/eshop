const fs = require('fs');
const crypto = require('crypto');

class UsersRepository {
  constructor(filename) {
    if (!filename) {
      throw new Error('Creating a respository requires a filename');
    }
    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, '[]');
    }
  }; //we can't have async in constructor

  async getAll() {
    //open the file called this.filename
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: 'utf8'
    })); // below done in one line
    /*//read its contents
    console.log(contents);
    //parse the contents
    const data = JSON.parse(contents);
    // returned passed data
    return data;*/
  }

  async create(attrs){
    attrs.id = this.randomId();
    //{email: 'aaaa@frf.com', passwd: 'dddd'}
    //load existing file users.JSON
    const records = await this.getAll();

    records.push(attrs);

    await this.writeAll(records);
  }

  async writeAll(records){
    //write updated attrs array to file
    await fs.promises.writeFile(this.filename, JSON.stringify(records, null,2));
    //stringify parse to json format
    // argument null => custom formater, we dont need any thats why null
    // 2 =>  two spaces when nesting
  }

  async getOne(id){
    const records = await this.getAll();
    return records.find(record => record.id === id);
    //find(testing function), itterates through array andreturn value or undefined
  }

  async delete(id){
    const records = await this.getAll();
    const filteredRecords = records.filter(record => record.id !== id);
    //filter func return only true elements, so filteredRecords will be new array
    await this.writeAll(filteredRecords);

  }

  async update(id, attrs){
    //const recordUpdate = await this.getOne(id); !acnt do like this, because we need entire records list, to write them back to json file
    const records = await this.getAll();
    const record = records.find(record => record.id === id);
    console.log(record);
     if(!record){
       throw new Error(`Record with id ${id} not found`);
     }

     Object.assign(record, attrs);//copy attrs to record, existing when not changed stay, other updated or added
     //when record updated, the records is also updated
     // this works because record is an object, and if it is changed, the array also changes because is the same reference

     await this.writeAll(records);
  }

  async getOneBy(filters){
    const records = await this.getAll();

    for(let record of records){ // itterating in array
      let found = true;

      for (let key in filters){ //itterating in object
        if(record[key] !== filters[key]){
          found = false;
        }
      }

      if (found){
        return record;
      }
    }

  }

  randomId(){
    //using crypto module nodejs
    // function randomBytes
    return crypto.randomBytes(4).toString('hex');
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
