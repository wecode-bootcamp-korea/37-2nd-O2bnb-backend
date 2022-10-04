-- migrate:up
CREATE TABLE chatting(
  id INT NOT NULL AUTO_INCREMENT,
  message_to INT NOT NULL,
  message_from INT NOT NULL,
  content VARCHAR(3000) NOT NULL,
  PRIMARY KEY (id)
);

-- migrate:down
DROP TABLE chatting;
