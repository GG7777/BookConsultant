using System.Collections.Generic;
using System.Linq;
using BookConsultant.Model;
using BookConsultant.Repository;

#nullable enable

namespace BookConsultant.BooksFilter
{
    public class BooksByGenresFilter
    {
        public BooksByGenresFilter(GenresRepository genresRepository)
        {
            this.genresRepository = genresRepository;
        }
        
        public FilteredBook[] Filter(FilteredBook[] books, string?[]? genres)
        {
            if (genres == null || genres.All(string.IsNullOrEmpty))
                return books;

            var booksDictionary = books.ToDictionary(x => x.Book.IsbnNumber);
            var genresDictionary = genresRepository.GetAll().ToDictionary(x => x.Name.ToLower());
            
            return genres.Where(x => !string.IsNullOrEmpty(x))
                         .Select(x => x.ToLower())
                         .Where(genresDictionary.ContainsKey!)
                         .Select(x => genresDictionary[x])
                         .Where(x => x.BooksIsbnNumbers != null)
                         .SelectMany(x => x.BooksIsbnNumbers)
                         .Where(booksDictionary.ContainsKey)
                         .Select(x => booksDictionary[x].AddFilter("genres"))
                         .ToArray();
        }

        private readonly GenresRepository genresRepository;
    }
}