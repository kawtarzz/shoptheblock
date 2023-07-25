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
        public ShoppingCart GetShoppingCartById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT Id, CustomerId, ProductId, ShoppingComplete
                    FROM ShoppingCart
                    WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    ShoppingCart shoppingCart = null;
                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        shoppingCart = new ShoppingCart()
                        {
                            Id = id,
                            CustomerId = DbUtils.GetInt(reader, "CustomerId"),
                            ProductId = DbUtils.GetInt(reader, "ProductId"),
                            ShoppingComplete = DbUtils.GetBool(reader, "ShoppingComplete")
                        };
                    }
                    reader.Close();
                    return shoppingCart;
                }
            }
        }
    }
}
