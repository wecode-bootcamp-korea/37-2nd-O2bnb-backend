-- migrate:up
CREATE TABLE products_options(
  id INT NOT NULL AUTO_INCREMENT,
  product_id INT NOT NULL,
  option_id INT NOT NULL,
  PRIMARY KEY (id)
);

-- migrate:down
DROP TABLE products_options;
