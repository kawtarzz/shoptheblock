using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Fullstack_ECommerce_.Models;
using Fullstack_ECommerce_.Utils;


namespace Fullstack_ECommerce_.Repositories
{
    public class PaymentTypeRepository : BaseRepository, IPaymentTypeRepository
    {
        public PaymentTypeRepository(IConfiguration config) : base(config) { }

        public PaymentType GetPaymentTypeById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                      SELECT Id, Name
                      FROM PaymentType
                      WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@Id", id);
                    PaymentType paymentType = null;
                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        paymentType = new PaymentType()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name")
                        };
                    }
                    reader.Close();

                    return paymentType;
                }
            }
        }

        public List<PaymentType> GetPaymentTypes()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name 
                                      FROM PaymentType";
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var paymentTypes = new List<PaymentType>();
                        while (reader.Read())
                        {
                            paymentTypes.Add(new PaymentType()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name")
                            });
                        }
                        return paymentTypes;
                    }
                }
            }
        }
    }
}
