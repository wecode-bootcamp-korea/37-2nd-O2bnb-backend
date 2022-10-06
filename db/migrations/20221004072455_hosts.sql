-- migrate:up
CREATE TABLE hosts(
  id INT NOT NULL AUTO_INCREMENT,
  grade VARCHAR(50) DEFAULT '일반 호스트',
  user_id INT,
  content VARCHAR(500),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users (id)
);

-- migrate:down
DROP TABLE hosts;
