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
    public class OrderRepository : BaseRepository, IOrderRepository
    {
        public OrderRepository(IConfiguration config) : base(config) { }

        public Order GetOrderById(int orderId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT Id, CustomerId, TotalPrice, ShippingAddress,
                    PaymentTypeId, OrderDate, OrderStatus, ShoppingCartId
                    FROM [Order]
                    WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", orderId);

                    Order order = null;
                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        order = new Order
                        {
                            Id = orderId,
                            CustomerId = DbUtils.GetInt(reader, "CustomerId"),
                            TotalPrice = DbUtils.GetDec(reader, "TotalPrice"),
                            ShippingAddress = DbUtils.GetString(reader, "ShippingAddress"),
                            PaymentTypeId = DbUtils.GetInt(reader, "PaymentTypeId"),
                            OrderDate = DbUtils.GetDateTime(reader, "OrderDate"),
                            OrderStatus = DbUtils.GetInt(reader, "OrderStatus"),
                            ShoppingCartId = DbUtils.GetInt(reader, "ShoppingCartId")
                        };
                    }
                    reader.Close();
                    return order;
                }
            }
        }

        public List<Order> GetAll()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT Id, CustomerId, TotalPrice, ShippingAddress,
                    PaymentTypeId, OrderDate, OrderStatus, ShoppingCartId
                    FROM [Order]
                    ";
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Order> orders = new List<Order>();
                        while (reader.Read())
                        {
                            Order newOrder = new()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                CustomerId = DbUtils.GetInt(reader, "CustomerId"),
                                TotalPrice = DbUtils.GetDec(reader, "TotalPrice"),
                                ShippingAddress = DbUtils.GetString(reader, "ShippingAddress"),
                                PaymentTypeId = DbUtils.GetInt(reader, "PaymentTypeId"),
                                OrderDate = DbUtils.GetDateTime(reader, "OrderDate"),
                                OrderStatus = DbUtils.GetInt(reader, "OrderStatus"),
                                ShoppingCartId = DbUtils.GetInt(reader, "ShoppingCartId")
                            };
                            orders.Add(newOrder);
                        }
                        return orders;
                    }

                }
            }
        }
    }
}
