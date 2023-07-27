-- Seed data for Order table
INSERT INTO [Order] ([CustomerId], [TotalPrice], [ShippingAddress], [PaymentTypeId], [OrderDate], [ConfirmNum], [ShoppingCartId])
SELECT
    3 AS [CustomerId], -- Assuming customer with ID 1
  90.50 AS [TotalPrice], -- Calculate total price for 3 randomly selected products
    '123 Main St, City' AS [ShippingAddress], -- Sample shipping address
    1 AS [PaymentTypeId], -- Assuming payment type with ID 1
    DATEADD(DAY, -ABS(CHECKSUM(NEWID())) % 7, GETDATE()) AS [OrderDate], -- Random order date within the last week
    '109332' AS [ConfirmNum],
    1 AS [ShoppingCartId] 