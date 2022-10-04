-- migrate:up
CREATE TABLE host_reviews(
  id INT NOT NULL AUTO_INCREMENT,
  host_id INT NOT NULL,
  review_id INT NOT NULL,
  content VARCHAR(3000) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (host_id) REFERENCES hosts (id),
  FOREIGN KEY (review_id) REFERENCES reviews (id)
);

-- migrate:down
DROP TABLE host_reviews;
