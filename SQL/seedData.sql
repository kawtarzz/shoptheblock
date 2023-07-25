-- Insert data into Category table
INSERT INTO [Category] ([Name])
VALUES ('Original Art'),
       ('Art Prints'),
       ('Clothing'),
       ('Books'),
       ('Ceramics'),
       ('Home Decor'),
       ('Jewelry'),
       ('Photography');

-- Insert data into PaymentType table
INSERT INTO [PaymentType] ([Name])
VALUES ('Credit Card'),
       ('PayPal'),
       ('Cash on Delivery');

-- Insert data into Customer table
INSERT INTO [Customer] ([FullName], [Email], [FirebaseUserId], [ProfilePic])
VALUES ('John Doe', 'john.doe@example.com', 'firebase123', 'https://example.com/profilepic1'),
       ('Kawtar A.', 'ko.azzouzi@gmail.com', 'FUuqEipFXKVMjqeLXOEa7nMSRZl2', 'https://example.com/profilepic2'),
       ('Jane Smith', 'jerry@email.com', 'foo9Q0XkGXN52XMxupvy6nR7XDg2', 'https://example.com/profilepic2'),
       ('Jane Smith', 'jane.smith@example.com', 'firebase456', 'https://example.com/profilepic2'),
       ('Michael Johnson', 'michael.johnson@example.com', 'firebase789', 'https://example.com/profilepic3');

-- Insert data into Product table
INSERT INTO [Product] ([Name], [Price], [Description], [ProductImage], [Stock], [CategoryId])
VALUES ('Abstract Painting', 199.99, '40x60 ft original painting by artist Alexa Pelletier', 'https://example.com/product1.jpg', 50, 1),
       ('T-Shirt', 29.99, 'Casual and comfortable cotton T-shirt with original hand-screenprinted design by artist Frances Reyes.', 'https://example.com/product2.jpg', 100, 2),
       ('Houseplant Gardener', 14.99, 'Comprehensive guide to plant motherhood. Risograph printed and & bound by hand.', 'https://example.com/product3.jpg', 25, 3),
       ('Sunrise Mug', 29.99, 'Coffee/Tea Mug is 3 1/2" tall and 3 1/2" across the top, it holds approx. 12 oz. Pottery pieces are hand made on a pottery wheel, and glaze fired at different times. Mugs are made with Continental Clay Speckled Clay and Coyote Glazes.', 'https://example.com/product2.jpg', 10, 5),
       ('Ethereal Woodland Woman Drawing', 29.99, 'Ink drawing on archival paper by artist Simone Jones. Each drawing is original & will have slight variations from pictured work', 'https://example.com/product2.jpg', 10, 1),
       ('Flower Art', 29.99, 'Flowers in a meadow. Original art by Abby Grace', 'https://example.com/product2.jpg', 100, 2),
       ('Pink Desert Sunset Wall Art', 29.99, 'Vibrant colors depict this southwestern sunset.', 'https://example.com/product2.jpg', 20, 2),
       ('Tarot Star Art', 29.99, 'Inspired by the Star from the Rider Waite tarot deck. Print is borderless and is one of 50 printings of this original design by Haleigh Kleign.', 'https://example.com/product2.jpg', 30, 2),
       ('Wild West Desert', 69.99, '11x14" Photograph of the sun rising in the Arizona desert. Photograph is mounted on backing board for framing ease', 'https://example.com/product2.jpg', 50, 8);
        
-- Insert data into ShoppingCart table
INSERT INTO [ShoppingCart] ([CustomerId], [ProductId], [ShoppingComplete])
VALUES (1, 1, 0),
       (1, 2, 0),
       (2, 1, 0),
       (3, 3, 0);

-- Insert data into Order table
INSERT INTO [Order] ([CustomerId], [TotalPrice], [ShippingAddress], [PaymentTypeId], [OrderStatus], [ShoppingCartId])
VALUES (1, 619.98, '123 Main St, City', 1, 1, 1),
       (1, 19.99, '456 Park Ave, Town', 2, 1, 2),
       (2, 599.99, '789 Broad St, Village', 3, 1, 3),
       (3, 39.99, '987 Oak St, Hamlet', 2, 1, 4);
