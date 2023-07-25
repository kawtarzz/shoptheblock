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
                    SELECT Id, Name, Price,
                    Description, ProductImage,
                    Stock, CategoryId
                    From Product
                    ORDER BY Name";
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Product> products = new List<Product>();

                        while (reader.Read())
                        {
                            Product newProduct = new()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Price = DbUtils.GetDec(reader, "Price"),
                                Description = DbUtils.GetString(reader, "Description"),
                                ProductImage = DbUtils.GetString(reader, "ProductImage"),
                                Stock = DbUtils.GetInt(reader, "Stock"),
                                CategoryId = DbUtils.GetInt(reader, "CategoryId")
                            };
                            products.Add(newProduct);
                        }
                        return products;
                    }
                }
            }
        }

        public Product GetProduct(int productId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT
                    Name, Price, Description, 
                    ProductImage, Stock, CategoryId
                    FROM Product
                    WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", productId);

                        Product product = null;
                    var reader = cmd.ExecuteReader();
                        if (reader.Read())
                        {
                            product = new Product()
                            {
                                Id = productId,
                                Name = DbUtils.GetString(reader, "Name"),
                                Price = DbUtils.GetDec(reader, "Price"),
                                Description = DbUtils.GetString(reader, "Description"),
                                ProductImage = DbUtils.GetString(reader, "ProductImage"),
                                Stock = DbUtils.GetInt(reader, "Stock"),
                                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            };
                        }
                        reader.Close();
                        return product;
                    }
                }
            }
        // POST NOT CURRENTLY WORKING
        public void Add(Product product)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Product (
                    Name
                    Price
                    Description
                    ProductImage
                    Stock
                    CategoryId
                    )
                    VALUES (@Name, @Price, @Description, @ProductImage, @Stock, @CategoryId)";
                    DbUtils.AddParameter(cmd, "@Name", product.Name);
                    DbUtils.AddParameter(cmd, "@Price", product.Price);
                    DbUtils.AddParameter(cmd, "@Description", product.Description);
                    DbUtils.AddParameter(cmd, "@ProductImage", product.ProductImage);
                    DbUtils.AddParameter(cmd, "@Stock", product.Stock);
                    DbUtils.AddParameter(cmd,"@CategoryId", product.CategoryId);

                    cmd.ExecuteNonQuery();
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
                    SET Name = @name
                        Price = @price
                        Description = @description
                        ProductImage = @productImage
                        Stock = @stock
                        CategoryId = @categoryId
                    WHERE Id = @id
                    ";
                    DbUtils.AddParameter(cmd, "@name", product.Name);
                    DbUtils.AddParameter(cmd, "@price", product.Price);
                    DbUtils.AddParameter(cmd, "@description", product.Description);
                    DbUtils.AddParameter(cmd, "@productImage", product.ProductImage);
                    DbUtils.AddParameter(cmd, "@stock", product.Stock);
                    DbUtils.AddParameter(cmd, "@categoryId", product.CategoryId);
                    DbUtils.AddParameter(cmd, "@id", product.Id);
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


