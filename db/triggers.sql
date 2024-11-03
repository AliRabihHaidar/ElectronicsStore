-- Trigger to increment cart size on insert
CREATE TRIGGER increment_cart_size
AFTER INSERT ON Cart_Item
FOR EACH ROW
BEGIN
    UPDATE Cart
    SET size = size + 1
    WHERE cart_id = NEW.cart_id;
END;

-- Trigger to decrement cart size on delete
CREATE TRIGGER decrement_cart_size
AFTER DELETE ON Cart_Item
FOR EACH ROW
BEGIN
    UPDATE Cart
    SET size = size - 1
    WHERE cart_id = OLD.cart_id;
END;
