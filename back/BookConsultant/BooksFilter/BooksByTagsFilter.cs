using System.Linq;
using BookConsultant.Model;
using BookConsultant.Repository;

#nullable enable

namespace BookConsultant.BooksFilter
{
    public class BooksByTagsFilter
    {
        public BooksByTagsFilter(TagsRepository tagsRepository)
        {
            this.tagsRepository = tagsRepository;
        }
        
        public FilteredBook[] Filter(FilteredBook[] books, string?[]? tags)
        {
            if (tags == null || tags.All(string.IsNullOrEmpty))
                return books;
            
            var booksDictionary = books.ToDictionary(x => x.Book.IsbnNumber);
            var tagsDictionary = tagsRepository.GetAll().ToDictionary(x => x.Name.ToLower());
            
            return tags.Where(x => !string.IsNullOrEmpty(x))
                       .Select(x => x.ToLower())
                       .Where(tagsDictionary.ContainsKey!)
                       .Select(x => tagsDictionary[x])
                       .Where(x => x.BooksIsbnNumbers != null)
                       .SelectMany(x => x.BooksIsbnNumbers)
                       .Where(booksDictionary.ContainsKey)
                       .Select(x => booksDictionary[x].AddFilter("tags"))
                       .ToArray();
        }

        private readonly TagsRepository tagsRepository;
    }
}