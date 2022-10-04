-- migrate:up
CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  price DECIMAL NOT NULL,
  address VARCHAR(200) NOT NULL,
  content VARCHAR(3000) NOT NULL,
  guest_count INT NOT NULL,
  bed_count INT NOT NULL,
  bathroom_count INT NOT NULL,
  host_id INT NOT NULL,
  latitude DECIMAL(20,15) NOT NULL,
  longitude DECIMAL(20,15) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (host_id) REFERENCES hosts (id)
);

-- migrate:down
DROP TABLE products;
