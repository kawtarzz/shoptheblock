using System.Collections.Generic;

using Fullstack_ECommerce_.Models;

namespace Fullstack_ECommerce_.Repositories
{
    public interface ICategoryRepository
    {
        public void Add(Category category);
        public void Delete(int id);
        public void Edit(string oldName, string newName);
        public List<Category> GetAll();
        public Category GetById(int categoryId);
    }
}