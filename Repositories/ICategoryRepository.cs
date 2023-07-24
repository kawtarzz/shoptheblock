using System.Collections.Generic;

using Fullstack_ECommerce_.Models;

namespace Fullstack_ECommerce_.Repositories
{
    public interface ICategoryRepository
    {
        void Add(Category category);
        void Delete(int categoryId);
        void Edit(string oldName, string newName);
        List<Category> GetAll();
        Category GetById(int categoryId);
    }
}