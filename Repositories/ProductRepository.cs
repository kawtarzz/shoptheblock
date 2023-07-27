using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Fullstack_ECommerce_.Models;
using Fullstack_ECommerce_.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;


namespace Fullstack_ECommerce_.Repositories
{
    public class ProductRepository : BaseRepository, IProductRepository
    {
        public ProductRepository(IConfiguration config) : base(config) { }

        public List<Product> GetProducts()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT p.Id AS ProductId, p.Name AS ProductName,
                    p.Description, p.Price, p.ProductImage, p.CategoryId,
                    p.Stock, 
                    c.Id AS CategoryId, c.Name AS CategoryName
                    From Product p
                    LEFT JOIN Category c ON p.CategoryId = c.Id
                    ORDER BY ProductId;
                    ";
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Product> products = new List<Product>();

                        while (reader.Read())
                        {
                            Product newProduct = new()
                            {
                                Id = DbUtils.GetInt(reader, "ProductId"),
                                Name = DbUtils.GetString(reader, "ProductName"),
                                Description = DbUtils.GetString(reader, "Description"),
                                Price = DbUtils.GetDec(reader, "Price"),
                                ProductImage = DbUtils.GetString(reader, "ProductImage"),
                                Stock = DbUtils.GetInt(reader, "Stock"),
                                Category = new Category
                                {
                                    Id = DbUtils.GetInt(reader, "CategoryId"),
                                    Name = DbUtils.GetString(reader, "CategoryName")
                                }
                            };
                            products.Add(newProduct);
                        }
                        return products;
                    }
                }
            }
        }

        public Product GetProductDetails(int productId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT p.Id AS ProductId, p.Name AS ProductName,
                    p.Description, p.Price, p.ProductImage, p.CategoryId,
                    p.Stock, 
                    c.Id AS CategoryId, c.Name AS CategoryName
                    From Product p
                    LEFT JOIN Category c ON p.CategoryId = c.Id
                    WHERE p.Id = @Id
                    ORDER BY p.Id;";

                    DbUtils.AddParameter(cmd, "@Id", productId);

                        Product product = null;
                    var reader = cmd.ExecuteReader();
                        if (reader.Read())
                        {
                            product = new Product()
                            {
                                Id = productId,
                                Name = DbUtils.GetString(reader, "ProductName"),
                                Price = DbUtils.GetDec(reader, "Price"),
                                Description = DbUtils.GetString(reader, "Description"),
                                ProductImage = DbUtils.GetString(reader, "ProductImage"),
                                Stock = DbUtils.GetInt(reader, "Stock"),
                                Category = new Category
                                {
                                    Id = DbUtils.GetInt(reader, "CategoryId"),
                                    Name = DbUtils.GetString(reader, "CategoryName")
                                }
                            };
                        }
                        reader.Close();
                        return product;
                    }
                }
            }

        public void Add(Product product)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO [Product] (
                    ProductName,
                    Price,
                    Description,
                    ProductImage,
                    Stock,
                    CategoryId,
                    CategoryName
                    )
                    OUTPUT INSERTED.ID
                    VALUES (
                    @ProductName, 
                    @Price, 
                    @Description, 
                    @ProductImage, 
                    @Stock, 
                    @CategoryId,
                    @CategoryName
                    )";
                    DbUtils.AddParameter(cmd, "@ProductName", product.Name);
                    DbUtils.AddParameter(cmd, "@Price", product.Price);
                    DbUtils.AddParameter(cmd, "@Description", product.Description);
                    DbUtils.AddParameter(cmd, "@ProductImage", product.ProductImage);
                    DbUtils.AddParameter(cmd, "@Stock", product.Stock);
                    DbUtils.AddParameter(cmd,"@CategoryId", product.Category.Id);
                    DbUtils.AddParameter(cmd, "@CategoryName", product.Category.Name);

                    product.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        
        public void Update(Product product)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE Product
                    SET Name = @productName
                        Price = @price
                        Description = @description
                        ProductImage = @productImage
                        Stock = @stock
                        CategoryId = @categoryId
                        CategoryName = @categoryName
                    WHERE Id = @id
                    ";
                    DbUtils.AddParameter(cmd, "@id", product.Id);
                    DbUtils.AddParameter(cmd, "@productName", product.Name);
                    DbUtils.AddParameter(cmd, "@price", product.Price);
                    DbUtils.AddParameter(cmd, "@description", product.Description);
                    DbUtils.AddParameter(cmd, "@productImage", product.ProductImage);
                    DbUtils.AddParameter(cmd, "@stock", product.Stock);
                    DbUtils.AddParameter(cmd, "@categoryId", product.Category.Id);
                    DbUtils.AddParameter(cmd, "@categoryName", product.Category.Name);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int productId)
        {
            using ( SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE Product
                    WHERE Id = @Id
                    ";
                    DbUtils.AddParameter(cmd, "@Id", productId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}


