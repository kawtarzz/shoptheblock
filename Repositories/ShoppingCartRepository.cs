using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Fullstack_ECommerce_.Models;
using Fullstack_ECommerce_.Utils;
using Microsoft.Data.SqlClient;

namespace Fullstack_ECommerce_.Repositories
{
    public class ShoppingCartRepository : BaseRepository, IShoppingCartRepository
    {
        public ShoppingCartRepository(IConfiguration config) : base(config) { }

        public List<ShoppingCart> GetShoppingCarts()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT sc.Id AS cartId, sc.Quantity, sc.UserId,
                    sc.ProductId, sc.ShoppingComplete, 
                    up.[Id], up.FullName, up.FirebaseUserId, up.Email,
                        p.[Id] AS ProductId, p.[Name] AS ProductName, p.Price AS ProductPrice, p.ProductImage AS ProductImage
                        FROM ShoppingCart sc
                        LEFT JOIN [UserProfile] up ON sc.UserId = up.Id
                        LEFT JOIN [Product] p ON sc.ProductId = p.[Id]
                        ORDER BY sc.Id";
                    using SqlDataReader reader = cmd.ExecuteReader();
                    List<ShoppingCart> carts = new List<ShoppingCart>();

                    while (reader.Read())
                    {
                        ShoppingCart cart = new ShoppingCart()
                        {
                            Id = DbUtils.GetInt(reader, "cartId"),
                            Quantity = DbUtils.GetInt(reader, "Quantity"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserId"),
                                FullName = DbUtils.GetString(reader, "FullName"),
                                FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                Email = DbUtils.GetString(reader, "Email")
                            },
                            ProductId = DbUtils.GetInt(reader, "ProductId"),
                            Product = new Product()
                            {
                                Id = DbUtils.GetInt(reader, "ProductId"),
                                Name = DbUtils.GetString(reader, "ProductName"),
                                Price = DbUtils.GetDec(reader, "ProductPrice"),
                                ProductImage = DbUtils.GetString(reader, "ProductImage")
                            },
                            ShoppingComplete = DbUtils.GetBool(reader, "ShoppingComplete")
                        };
                        carts.Add(cart);
                    }
                    return carts;
                }
            }
        }
        public ShoppingCart GetById(int cartId)
        {
            using SqlConnection conn = Connection;
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                    SELECT sc.[Id] AS cartId, sc.Quantity, sc.UserId,
                    sc.ProductId, sc.ShoppingComplete, 
                    up.[Id], up.FullName, up.FirebaseUserId, up.Email,
                    p.[Id] AS ProductId, p.[Name] AS ProductName, p.Price AS ProductPrice, p.ProductImage AS ProductImage
                    FROM ShoppingCart sc
                    JOIN [UserProfile] up ON sc.UserId = up.[Id]
                    JOIN [Product] p ON sc.ProductId = p.[Id]
                    WHERE sc.Id = @cartId";
                DbUtils.AddParameter(cmd, "@cartId", cartId);

                ShoppingCart shoppingCart = null;
                var reader = cmd.ExecuteReader();
                if (reader.Read())
                {
                    shoppingCart = new ShoppingCart()
                    {
                        Id = DbUtils.GetInt(reader,"cartId"),
                        Quantity = DbUtils.GetInt(reader, "Quantity"),
                        UserId = DbUtils.GetInt(reader, "UserId"),
                        UserProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "UserId"),
                            FullName = DbUtils.GetString(reader, "FullName"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId")
                        },
                        ProductId = DbUtils.GetInt(reader, "ProductId"),
                        Product = new Product()
                        {
                            Id = DbUtils.GetInt(reader, "ProductId"),
                            Name = DbUtils.GetString(reader, "ProductName"),
                            Price = DbUtils.GetDec(reader, "ProductPrice"),
                            ProductImage = DbUtils.GetString(reader, "ProductImage")
                        },
                        ShoppingComplete = DbUtils.GetBool(reader, "ShoppingComplete")
                    };
                }
                reader.Close();
                return shoppingCart;
            }
        }

        public void Add(ShoppingCart shoppingCart)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = @"
                        INSERT INTO ShoppingCart (
                                    Quantity,
                                    ProductId,
                                    UserId,
                                    ShoppingComplete
                                    )
                                    OUTPUT INSERTED.ID
                                    VALUES (
                                    @Quantity,
                                    @ProductId,
                                    @UserId,
                                    @ShoppingComplete
                                    )";
                DbUtils.AddParameter(cmd, "@Quantity", shoppingCart.Quantity);
                DbUtils.AddParameter(cmd, "@ProductId", shoppingCart.ProductId);
                DbUtils.AddParameter(cmd, "@UserId", shoppingCart.UserId);
                DbUtils.AddParameter(cmd, "@ShoppingComplete", false);

                cmd.ExecuteNonQuery();
            }
        }

        public void Delete(int cartId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    DELETE From ShoppingCart
                    WHERE Id = @Id
                    ";
                    DbUtils.AddParameter(cmd, "@Id", cartId);

                    cmd.ExecuteNonQuery();
                }
            }
        }


        public List<ShoppingCart> GetUserCartByFirebaseId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @" 
                        SELECT sc.[Id], sc.Quantity, sc.UserId, sc.ProductId, sc.ShoppingComplete, up.[Id], up.FullName, up.FirebaseUserId, up.[Email],
                        p.[Name], p.[Id], p.Price, p.Description, p.ProductImage, p.Stock, p.CategoryId
                        FROM ShoppingCart sc
                        JOIN [UserProfile] up ON sc.UserId = up.[Id]
                        JOIN [Product] p ON sc.ProductId = p.[Id]
                        WHERE up.FirebaseUserId = @firebaseUserId";

                    DbUtils.AddParameter(cmd, "@firebaseUserId", firebaseUserId);

                    var reader = cmd.ExecuteReader();
                    var cartItems = new List<ShoppingCart>();

                    while (reader.Read())
                    {
                        cartItems.Add(new ShoppingCart()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Quantity = DbUtils.GetInt(reader, "Quantity"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                FullName = DbUtils.GetString(reader, "FullName"),
                                FirebaseUserId = firebaseUserId
                            },
                            ProductId = DbUtils.GetInt(reader, "ProductId"),
                            Product = new Product()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Price = DbUtils.GetDec(reader, "Price"),
                                Description = DbUtils.GetString(reader, "Description"),
                                ProductImage = DbUtils.GetString(reader, "ProductImage"),
                                Stock = DbUtils.GetInt(reader, "Stock"),
                                CategoryId = DbUtils.GetInt(reader, "CategoryId")
                            },
                            ShoppingComplete = DbUtils.GetBool(reader, "ShoppingComplete")
                        });
                    }
                    return cartItems;
                }
            }

        }
    }
}
