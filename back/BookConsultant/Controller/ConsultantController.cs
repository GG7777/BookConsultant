using System.Collections.Generic;
using System.Linq;
using BookConsultant.BooksFilter;
using BookConsultant.Model;
using BookConsultant.Repository;
using Microsoft.AspNetCore.Mvc;

#nullable enable

namespace BookConsultant.Controller
{
    [Controller]
    [Route("consultant")]
    public class ConsultantController : ControllerBase
    {
        public ConsultantController(BooksRepository booksRepository,
            BooksByTagsFilter tagsFilter,
            BooksByGenresFilter genresFilter,
            BooksByAuthorsFilter authorsFilter,
            BooksByRatingFilter ratingFilter,
            BooksByMaxCountFilter maxCountFilter)
        {
            this.booksRepository = booksRepository;
            this.tagsFilter = tagsFilter;
            this.genresFilter = genresFilter;
            this.authorsFilter = authorsFilter;
            this.ratingFilter = ratingFilter;
            this.maxCountFilter = maxCountFilter;
        }

        [HttpGet]
        public IActionResult Search([FromQuery(Name = "tags")] string?[]? tags,
            [FromQuery(Name = "genres")] string?[]? genres,
            [FromQuery(Name = "authors")] string?[]? authors,
            [FromQuery(Name = "min-rating")] int? minRating,
            [FromQuery(Name = "max-count")] int? maxCount)
        {
            var books = booksRepository.GetAll()
                .Select(x => new FilteredBook {Book = x, Filters = new List<string>()}).ToArray();

            var filteredBooksByFilters = new List<FilteredBook[]>
            {
                authorsFilter.Filter(books, authors),
                genresFilter.Filter(books, genres),
                tagsFilter.Filter(books, tags),
                ratingFilter.Filter(books, minRating)
            };


            FilteredBook[] filteredBooks = new FilteredBook[0];
            filteredBooks = filteredBooksByFilters.Aggregate(filteredBooks, Merge);

            filteredBooks = maxCountFilter.Filter(filteredBooks, maxCount);

            return Ok(filteredBooks);
        }

        private FilteredBook[] Merge(FilteredBook[] filteredBooks, FilteredBook[] anotherFilteredBooks)
        {
            return filteredBooks.Union(anotherFilteredBooks).GroupBy(x => x.Book.IsbnNumber)
                .Select(x => x.Count() > 1 ? x.First().AddFilters(x.Last().Filters) : x.First())
                .ToArray();
        }

        private readonly BooksRepository booksRepository;
        private readonly BooksByTagsFilter tagsFilter;
        private readonly BooksByGenresFilter genresFilter;
        private readonly BooksByAuthorsFilter authorsFilter;
        private readonly BooksByRatingFilter ratingFilter;
        private readonly BooksByMaxCountFilter maxCountFilter;
    }
}