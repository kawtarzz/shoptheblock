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
    public class CategoryRepository : BaseRepository, ICategoryRepository
    {
        public CategoryRepository(IConfiguration config) : base(config) { }

        public List<Category> GetAll()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = $@"
                        SELECT Id, [Name]
                        FROM dbo.Category
                        ORDER BY [Name]
                    ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Category> categories = new List<Category>();

                        while (reader.Read())
                        {
                            Category newCategory = new()
                            {
                                Id = DbUtils.GetInt(reader, "id"),
                                Name = DbUtils.GetString(reader, "name")
                            };

                            categories.Add(newCategory);
                        }

                        return categories;
                    }
                }
            }
        }

        public void Add(Category category)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    //! If category already exists, but is deleted, restore it.
                    cmd.CommandText = $@"
	                        INSERT INTO Category (Id, Name)
	                        VALUES (@Id, @Name)";

                    DbUtils.AddParameter(cmd, "@Name", category.Name);
                    DbUtils.AddParameter(cmd, "@Id", category.Id);
                    category.Id = (int)cmd.ExecuteScalar();

                    cmd.ExecuteNonQuery();
                }
            }
        }
        // returns as Category object - use param categoryId
        public Category GetById(int categoryId)
        {
            using (SqlConnection conn = Connection)
            {   // open sql connection
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT c.Name
                        FROM Category c 
                        WHERE c.Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", categoryId);

                    Category category = null;
                    var reader = cmd.ExecuteReader();
                    // if we only expect a single row back from DB, we dont need a while loop

                    if (reader.Read())
                    {
                        category = new Category
                        {
                            Id = categoryId,
                            Name = DbUtils.GetString(reader, "Name")
                        };
                    }
                    reader.Close();
                    return category;
                }
            }

        }
        public void Delete(int categoryId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Category
                        WHERE Id = @Id
                    ";

                    Utils.DbUtils.AddParameter(cmd, "@Id", categoryId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Edit(string oldName, string newName)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE dbo.Category
                        SET [Name] = @NewName
                        WHERE [Name] = @OldName
                    ";

                    Utils.DbUtils.AddParameter(cmd, "@NewName", newName);
                    Utils.DbUtils.AddParameter(cmd, "@OldName", oldName);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
