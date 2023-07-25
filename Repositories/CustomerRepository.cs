using System;
using System.Collections.Generic;
using System.Linq;
using Fullstack_ECommerce_.Utils;
using System.Threading.Tasks;
using Fullstack_ECommerce_.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.VisualBasic.CompilerServices;
using static Fullstack_ECommerce_.Repositories.CustomerRepository;

namespace Fullstack_ECommerce_.Repositories
{
    public class CustomerRepository : BaseRepository, ICustomerRepository
    {
        public CustomerRepository(IConfiguration configuration) : base(configuration) { }

        public Customer GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT c.Id, c.FullName, 
                        c.Email, c.FirebaseUserId, 
                        c.ProfilePic
                        FROM Customer c
                        WHERE FirebaseUserId = @FirebaseuserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    Customer customer = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        customer = new Customer()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FullName = DbUtils.GetString(reader, "FullName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            ProfilePic = DbUtils.GetString(reader, "ProfilePic")
                        };
                    }
                    reader.Close();

                    return customer;
                }
            }
        }

        public Customer GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT 
                        Id, FullName, Email, 
                        FirebaseUserId, ProfilePic
                        FROM Customer
                        WHERE Id = @id"
;

                    DbUtils.AddParameter(cmd, "@Id", id);

                    Customer customer = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        customer = new Customer()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FullName = DbUtils.GetString(reader, "FullName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            ProfilePic = DbUtils.GetString(reader, "ProfilePic")
                        };
                    }
                    reader.Close();

                    return customer;
                }
            }
        }

        public List<Customer> GetCustomers()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT c.Id, c.FullName,
                                        c.Email, c.FirebaseUserId,
                                        c.ProfilePic
                                        FROM Customer c
                                        ORDER BY c.FullName";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var customers = new List<Customer>();
                        while (reader.Read())
                        {
                            customers.Add(new Customer()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                FullName = DbUtils.GetString(reader, "FullName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                ProfilePic = DbUtils.GetString(reader, "ProfilePic")
                            });
                        }
                        return customers;
                    }
                }
            }
        }

        public void Add(Customer customer)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Customer(FirebaseUserId, FullName, Email, ProfilePic)
                                        VALUES (@FirebaseUserId, @FullName, @Email, @ProfilePic)";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", customer.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@FullName", customer.FullName);
                    DbUtils.AddParameter(cmd, "@Email", customer.Email);
                    DbUtils.AddParameter(cmd, "@ProfilePic", customer.ProfilePic);
                    DbUtils.AddParameter(cmd, "@Id", customer.Id);

                    customer.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Customer customer)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Customer
                                        SET FullName = @fullName,
                                            Email = @email,
                                            ProfilePic = @profilePic,
                                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@fullName", customer.FullName);
                    DbUtils.AddParameter(cmd, "@email", customer.Email);
                    DbUtils.AddParameter(cmd, "@profilePic", customer.ProfilePic);
                    DbUtils.AddParameter(cmd, "@id", customer.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
