-- migrate:up
CREATE TABLE products_options(
  id INT NOT NULL AUTO_INCREMENT,
  product_id INT NOT NULL,
  option_id INT NOT NULL,
  PRIMARY KEY (id)
  FOREIGN KEY (product_id) REFERENCES products (id),
  FOREIGN KEY (option_id) REFERENCES options (id)
);

-- migrate:down
DROP TABLE products_options;
