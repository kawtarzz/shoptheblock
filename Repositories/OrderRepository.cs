using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.PortableExecutable;
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
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT o.Id, o.UserId, o.TotalPrice, o.ShippingAddress,
                    o.PaymentTypeId, o.OrderDate, o.ConfirmNum, o.OrderStatus, o.ShoppingCartId
                    FROM [Order] o
                    WHERE o.Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", orderId);

                    Order order = null;
                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        order = new Order
                        {
                            Id = orderId,
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            TotalPrice = DbUtils.GetDec(reader, "TotalPrice"),
                            ShippingAddress = DbUtils.GetString(reader, "ShippingAddress"),
                            PaymentTypeId = DbUtils.GetInt(reader, "PaymentTypeId"),
                            OrderDate = DbUtils.GetDateTime(reader, "OrderDate"),
                            ConfirmNum = DbUtils.GetString(reader, "ConfirmNum"),
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
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT o.Id, o.UserId, o.TotalPrice, o.ShippingAddress,
                    o.PaymentTypeId, o.OrderDate, o.ConfirmNum, o.OrderStatus, o.ShoppingCartId
                    FROM [Order] o
                    ORDER BY OrderDate
                    ";
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var orders = new List<Order>();
                        while (reader.Read())
                        {
                            Order newOrder = new()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                TotalPrice = DbUtils.GetDec(reader, "TotalPrice"),
                                ShippingAddress = DbUtils.GetString(reader, "ShippingAddress"),
                                PaymentTypeId = DbUtils.GetInt(reader, "PaymentTypeId"),
                                OrderDate = DbUtils.GetDateTime(reader, "OrderDate"),
                                ConfirmNum = DbUtils.GetString(reader, "ConfirmNum"),
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

        public void Add(Order order)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            INSERT INTO [Order] (
                            UserId,
                            TotalPrice, 
                            ShippingAddress,
                            PaymentTypeId, 
                            OrderDate, 
                            ConfirmNum, 
                            OrderStatus, 
                            ShoppingCartId
                            )
                            OUTPUT INSERTED.ID
                            
                            VALUES (
                            @UserId,
                            @TotalPrice, 
                            @ShippingAddress,
                            @PaymentTypeId, 
                            @OrderDate, 
                            @ConfirmNum, 
                            @OrderStatus, 
                            @ShoppingCartId
                            )"
;
                    DbUtils.AddParameter(cmd, "@UserId", order.UserId);
                    DbUtils.AddParameter(cmd, "@TotalPrice", order.TotalPrice);
                    DbUtils.AddParameter(cmd, "@ShippingAddress", order.ShippingAddress);
                    DbUtils.AddParameter(cmd,"@PaymentTypeId", order.PaymentTypeId);
                    DbUtils.AddParameter(cmd, "@OrderDate", order.OrderDate);
                    DbUtils.AddParameter(cmd, "@ConfirmNum", order.ConfirmNum);
                    DbUtils.AddParameter(cmd, "@OrderStatus", order.OrderStatus);
                    DbUtils.AddParameter(cmd, "@ShoppingCartId", order.ShoppingCartId);
                    order.Id = (int)cmd.ExecuteScalar();

                }
            }
        }
    }
}
