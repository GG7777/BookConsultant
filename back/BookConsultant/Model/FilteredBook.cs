using System.Collections.Generic;
using System.Linq;

namespace BookConsultant.Model
{
    public class FilteredBook
    {
        public Book Book { get; set; }
        public List<string> Filters { get; set; }

        public FilteredBook AddFilter(string filter)
        {
            Filters.Add(filter);
            return this;
        }
        
        public FilteredBook AddFilters(List<string> filters)
        {
            Filters = Filters.Union(filters).ToList();
            return this;
        }
    }

    public class FilteredBookComparer : IEqualityComparer<FilteredBook>
    {
        public bool Equals(FilteredBook x, FilteredBook y)
        {
            if (ReferenceEquals(x, y)) return true;
            if (ReferenceEquals(x, null)) return false;
            if (ReferenceEquals(y, null)) return false;
            return x.GetType() == y.GetType() && Equals(x.Book.IsbnNumber, y.Book.IsbnNumber);
        }

        public int GetHashCode(FilteredBook obj)
        {
            return (obj.Book != null ? obj.Book.IsbnNumber.GetHashCode() : 0);
        }
    }
}