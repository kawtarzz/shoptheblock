using System;
using System.Collections.Generic;
using System.Linq;
using Fullstack_ECommerce_.Utils;
using System.Threading.Tasks;
using Fullstack_ECommerce_.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.VisualBasic.CompilerServices;

namespace Fullstack_ECommerce_.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        public User GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, FullName, 
                        Email, Password, FirebaseUserId, 
                        ProfilePic
                        FROM [User]
                        WHERE FirebaseUserId = @FirebaseuserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    User user = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FullName = DbUtils.GetString(reader, "FullName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            Password = DbUtils.GetString(reader, "Password"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            ProfilePic = DbUtils.GetString(reader, "ProfilePic")
                        };
                    }
                    reader.Close();

                    return user;
                }
            }
        }
          
        public User GetById(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT 
                        Id, FullName, Email, Password, 
                        FirebaseUserId, ProfilePic
                        FROM User
                        WHERE Id = @id"
;

                    DbUtils.AddParameter(cmd, "@Id", userId);

                    User user = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FullName = DbUtils.GetString(reader, "FullName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            Password = DbUtils.GetString(reader, "Password"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            ProfilePic = DbUtils.GetString(reader, "ProfilePic")
                        };
                    }
                    reader.Close();

                    return user;
                }
            }
        }

        public List<User> GetUsers()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT 
                                        Id, FullName,
                                        Email, Password, FirebaseUserId,
                                        ProfilePic
                                        FROM [User] 
                                        ORDER BY FullName";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var users = new List<User>();
                        while (reader.Read())
                        {
                            users.Add(new User()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                FullName = DbUtils.GetString(reader, "FullName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                Password = DbUtils.GetString(reader, "Password"),
                                FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                ProfilePic = DbUtils.GetString(reader, "ProfilePic")
                            });
                        }
                        return users;
                    }
                }
            }
        }

        public void Add(User user)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO [User] (
                                        FullName, 
                                        Email,
                                        Password, 
                                        FirebaseUserId,
                                        ProfilePic
                                        )
                                        OUTPUT INSERTED.ID
                                        VALUES (
                                        @FullName, 
                                        @Email, 
                                        @Password, 
                                        @FirebaseUserId,  
                                        @ProfilePic
                                        )";
                    DbUtils.AddParameter(cmd, "@FullName", user.FullName);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@Password", user.Password);
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", user.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@ProfilePic", user.ProfilePic);

                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE User
                                        SET FullName = @fullName,
                                            Email = @email,
                                            Password = @password,
                                            ProfilePic = @profilePic,
                                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@fullName", user.FullName);
                    DbUtils.AddParameter(cmd, "@email", user.Email);
                    DbUtils.AddParameter(cmd, "@password", user.Password);
                    DbUtils.AddParameter(cmd, "@profilePic", user.ProfilePic);
                    DbUtils.AddParameter(cmd, "@id", user.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
