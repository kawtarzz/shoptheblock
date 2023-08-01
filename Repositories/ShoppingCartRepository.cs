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
                    u.[Id], u.FullName, u.FirebaseUserId,
                        p.[Id] AS ProductId, p.Name AS ProductName, p.Price AS ProductPrice, p.ProductImage AS ProductImage
                        FROM ShoppingCart sc
                        LEFT JOIN [User] u ON sc.UserId = u.Id
                        LEFT JOIN [Product] p ON sc.ProductId = p.[Id]
                        ORDER BY sc.Id";
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<ShoppingCart> carts = new List<ShoppingCart>();

                        while (reader.Read())
                        {
                            ShoppingCart cart = new ShoppingCart()
                            {
                                Id = DbUtils.GetInt(reader, "cartId"),
                                Quantity = DbUtils.GetInt(reader, "Quantity"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                User = new User()
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
                            carts.Add(cart);
                        }
                        return carts;
                    }
                }
            }
        }
        public ShoppingCart GetById(int cartId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT sc.Id AS cartId, sc.Quantity, sc.UserId,
                    sc.ProductId, sc.ShoppingComplete, 
                    u.[Id], u.FullName, u.FirebaseUserId,
                    p.[Id] AS ProductId, p.Name AS ProductName, p.Price AS ProductPrice, p.ProductImage AS ProductImage
                    FROM ShoppingCart sc
                    JOIN [User] u ON sc.UserId = u.[Id]
                    JOIN [Product] p ON sc.ProductId = p.[Id]
                    WHERE sc.Id = @cartId";
                    DbUtils.AddParameter(cmd, "@sc.Id", cartId);

                    ShoppingCart shoppingCart = null;
                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        shoppingCart = new ShoppingCart()
                        {
                            Id = cartId,
                            Quantity = DbUtils.GetInt(reader, "Quantity"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            User = new User()
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
        }


        public void Add(ShoppingCart shoppingCart)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
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
                    DbUtils.AddParameter(cmd, "@ShoppingComplete",false);

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
                        SELECT sc.Id, sc.Quantity, sc.UserId, sc.ProductId, sc.ShoppingComplete, u.Id, u.FullName, u.FirebaseUserId
                        FROM ShoppingCart sc
                        JOIN [User] u ON sc.UserId = u.Id
                        WHERE u.FirebaseUserId = @firebaseUserId";

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
                            User = new User()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                FullName = DbUtils.GetString(reader, "FullName"),
                                FirebaseUserId = firebaseUserId
                            },
                            ProductId = DbUtils.GetInt(reader, "ProductId"),
                            ShoppingComplete = DbUtils.GetBool(reader, "ShoppingComplete")
                        });
                    }
                    return cartItems;
                }
            }

        }
    }
}
