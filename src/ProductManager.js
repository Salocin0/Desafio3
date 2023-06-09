import fs from 'fs';

export default class ProductManager {
  constructor(path = '') {
    this.products = [];
    this.path = path;
    
    try {
      fs.writeFileSync(this.path + "archivo.txt", JSON.stringify(this.products));
    } catch (error) {
      console.log("error al crear archivo: " + error);
    }
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    let product = {
      id: this.#newId(),
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
    };
    if (this.products.find((x) => x.code === code) === undefined) {
      this.products.push(product);
      fs.writeFileSync(this.path+"archivo.txt",JSON.stringify(this.products));
    } else {
      console.log("code used");
      return "code used";
    }
  }

  #newId() {
    let max = 0;
    for (let i = 0; i < this.products.length; i++) {
      const element = this.products[i];
      if (element.id > max) {
        max = element.id;
      }
    }
    return ++max;
  }

  getProducts() {
    const data = fs.readFileSync(this.path + 'archivo.txt', 'utf-8');
    this.products = JSON.parse(data);
    return this.products;
  }

  getProductsById(id) {
    this.products = JSON.parse(fs.readFileSync(this.path + 'archivo.txt', 'utf-8'));
    const product = this.products.find(x => x.id == id);
    if (product) {
      return product;
    } else {;
      return `No se encontró ningún producto con el ID ${id}`;
    }
  }

  updateProduct(id, product) {
    const pActual = this.getProductsById(id);
    if (pActual) {
      Object.assign(pActual, product);
      fs.writeFileSync(this.path + "archivo.txt", JSON.stringify(this.products));
    } else {
      console.log(`No se encontró ningún producto con el ID ${id}`);
    }
  }

  deleteProduct(id) {
    const initialLength = this.products.length;
    this.products = this.products.filter(x => x.id !== id);
    if (initialLength === this.products.length) {
      console.log(`No se encontró ningún objeto con el ID ${id}, no se puede eliminar`);
    } else {
      fs.writeFileSync(this.path + "archivo.txt", JSON.stringify(this.products));
    }
  }
}

