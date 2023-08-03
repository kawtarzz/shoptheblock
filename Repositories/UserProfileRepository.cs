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
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
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
                        FROM [UserProfile]
                        WHERE FirebaseUserId = @FirebaseUserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    UserProfile user = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        user = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FullName = DbUtils.GetString(reader, "FullName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            Password = DbUtils.GetString(reader, "Password"),
                            FirebaseUserId = firebaseUserId,
                            ProfilePic = DbUtils.GetString(reader, "ProfilePic")
                        };
                    }
                    reader.Close();

                    return user;
                }
            }
        }
          
        public UserProfile GetById(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT 
                        Id AS userId, FullName, Email, Password, 
                        FirebaseUserId, ProfilePic
                        FROM [UserProfile]
                        WHERE Id = @userId"
;

                    DbUtils.AddParameter(cmd, "@UserId", userId);

                    UserProfile user = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        user = new UserProfile()
                        {
                            Id = userId,
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

        public List<UserProfile> GetUsers()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT
                                Id, FirebaseUserId, FullName, 
                                Email, ProfilePic
                           FROM UserProfile
                           ORDER BY Id";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var users = new List<UserProfile>();
                        while (reader.Read())
                        {
                            users.Add(new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                FullName = DbUtils.GetString(reader, "FullName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                ProfilePic = DbUtils.GetString(reader, "ProfilePic"),
                            });
                        }
                        return users;
                    }
                }
            }
        }

        public void Add(UserProfile userProfile)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO [UserProfile] (
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
                    DbUtils.AddParameter(cmd, "@FullName", userProfile.FullName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@Password", userProfile.Password);
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@ProfilePic", userProfile.ProfilePic);

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE [UserProfile]
                                        SET FullName = @FullName,
                                            Email = @Email,
                                            Password = @Password,
                                            ProfilePic = @ProfilePic,
                                        WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@FullName", userProfile.FullName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@Password", userProfile.Password);
                    DbUtils.AddParameter(cmd, "@ProfilePic", userProfile.ProfilePic);
                    DbUtils.AddParameter(cmd, "@Id", userProfile.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}

       