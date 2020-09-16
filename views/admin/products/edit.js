const layout = require('../layout');
//const {getError} = require('../../helpers');

module.exports = ({product})=> {
  return layout({
    content: `
    <div class="columns is-centered">
      <div class="column is-half">
        <h1 class="subtitle">Edit a Product</h1>

        <form method="POST" enctype="multipart/form-data">
          <div class="field">
            <label class="label">Title</label>
            <input class="input"  name="title" value="${product.title}" >

          </div>

          <div class="field">
            <label class="label">Price</label>
            <input class="input" name="price" value="${product.price}" >

          </div>

          <div class="field">
            <label class="label">Image</label>
            <input type="file" name="image" />
          </div>
          <br />
          <button class="button is-primary">Edit</button>
        </form>
      </div>
    </div>
    `
  });
};

//    <!--<p class="help is-danger">${getError(errors, 'title')}</p>
//            <p class="help is-danger">${getError(errors, 'price')}</p>
