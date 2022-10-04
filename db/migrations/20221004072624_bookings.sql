-- migrate:up
CREATE TABLE bookings(
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  message VARCHAR(3000),
  price DECIMAL NOT NULL,
  guest_count INT NOT NULL,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  booking_status_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (product_id) REFERENCES products (id),
  FOREIGN KEY (booking_status_id) REFERENCES booking_status (id)
);

-- migrate:down
DROP TABLE bookings;
