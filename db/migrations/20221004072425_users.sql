-- migrate:up
CREATE TABLE users(
  id INT NOT NULL AUTO_INCREMENT,
  social_id INT,
  email VARCHAR(200),
  password VARCHAR(200),
  phone_number VARCHAR(50),
  name VARCHAR(50),
  birth VARCHAR(50),
  profile_image VARCHAR(1000),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- migrate:down
DROP TABLE users;
