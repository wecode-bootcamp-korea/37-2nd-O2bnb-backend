-- migrate:up
CREATE TABLE options(
  id INT NOT NULL AUTO_INCREMENT,
  amenity VARCHAR(20),
  icon_url VARCHAR(1000),
  PRIMARY KEY (id)
);

-- migrate:down
DROP TABLE options;
