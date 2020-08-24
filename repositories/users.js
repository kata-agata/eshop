const fs = require('fs');

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
  }; //we can't hane async in constructor

  async getAll() {
    //open the file called this.filename
    const contents = await fs.promises.readFile(this.filename, {
      encoding: 'utf8'
    });
    //read its contents
    console.log(contents);
    //parse the contents

    // returned passed data
  }

}

const test = async () => {
  const repo = new UsersRepository('users.json'); // create file in current directory

  await repo.getAll();
}

test();
