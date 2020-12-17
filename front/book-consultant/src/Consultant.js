import React from "react";

export default class Consultant extends React.Component {
  state = {
    books: [],
  };
  searchCriteria = {
    tags: [],
    genres: [],
    authors: [],
    minRating: null,
    maxCount: null,
  };

  render() {
    return (
      <div>
        <div>
          <p>
            <label htmlFor="tags">Какие эмоции вы хотели бы испытать при прочтении книги?</label><br/>
            <input id="tags" type="text" defaultValue={this.searchCriteria.tags.join(', ')} placeholder="Весело, Страшно" onChange={this.handleTextChange} />
          </p>
          <p>
            <label htmlFor="genres">Книги с какими жанрами вы уже читали?</label><br/>
            <input id="genres" type="text" defaultValue={this.searchCriteria.genres.join(', ')} placeholder="Сказки, Поэмы" onChange={this.handleTextChange} />
          </p>
          <p>
            <label htmlFor="authors">Какие авторы вам нравятся?</label><br/>
            <input id="authors" type="text" defaultValue={this.searchCriteria.authors.join(', ')} placeholder="Пушкин, Гоголь" onChange={this.handleTextChange} />
          </p>
          <p>
            <label htmlFor="minRating">Книгу с каким рейтингом вы бы хотели прочитать? (от 0 до 100)</label><br/>
            <input id="minRating" type="text" defaultValue={this.searchCriteria.minRating} placeholder="80" onChange={this.handleNumberChange} />
          </p>
          <p>
            <label htmlFor="maxCount">Топ книг</label><br/>
            <input id="maxCount" type="text" defaultValue={this.searchCriteria.maxCount} placeholder="30" onChange={this.handleNumberChange} />
          </p>
          <p>
             <button id="search" onClick={this.handleSearch}>Найти</button>
          </p>
        </div>
        <div>
          {this.state.books.map((filteredBook, index) => <p>{index + 1}: ({filteredBook.book.isbnNumber}) {filteredBook.book.name} : мы выбрали книги потому что, потому что {this.filtersToHtml(filteredBook.filters)}</p>)}
        </div>
      </div>
    );
  }

  // сделать фичу: почему мы выбрали именно эту книгу (попытаться учесть каждый этап выбора на бэкенде - результат каждого фильтра)
  // явно разделить интерфейс администратора, интерфейс эксперта, интерфейс пользователя (тупо вкладки сделать и норм, разделить права: админ умеет все, эксперть - чуть меньше, пользователь - еще меньше)

  filterToText = function (filter) { 
    switch(filter) {
      case 'authors':
        return 'Авторы';
      case 'genres':
        return 'Жанры';
      case 'tags':
        return 'Эмоции';
      case 'rating':
        return 'Рейтинг';
    }
  }
  filtersToHtml = filters => filters.map((filter, _) => <span className="filter">{this.filterToText(filter)}</span>);

  handleNumberChange = e => {
    this.searchCriteria[e.target.id] = parseInt(e.target.value);
  }

  handleTextChange = e => {
    this.searchCriteria[e.target.id] = e.target.value.split(', ');
  }

  handleSearch = async e => {
    let tags = this.searchCriteria.tags === null || this.searchCriteria.tags.length === 0 
      ? '' 
      : `${this.searchCriteria.tags.map((tag, index) => `tags[${index}]=${tag}`).join("&")}&`;
    let genres = this.searchCriteria.genres === null || this.searchCriteria.genres.length === 0
      ? ''
      : `${this.searchCriteria.genres.map((genre, index) => `genres[${index}]=${genre}`).join("&")}&`;
    let authors = this.searchCriteria.authors === null || this.searchCriteria.authors.length === 0
      ? ''
      : `${this.searchCriteria.authors.map((author, index) => `authors[${index}]=${author}`).join("&")}&`;
    let minRating = this.searchCriteria.minRating === null ? '' : `min-rating=${this.searchCriteria.minRating}&`;
    let maxCount = this.searchCriteria.maxCount === null ? '' : `max-count=${this.searchCriteria.maxCount}&`;

    let result = await fetch(`http://localhost:5000/consultant?${tags}${genres}${authors}${minRating}${maxCount}`);

    if (result.ok) {
      let books = await result.json();
      this.setState({
        books: books
      });
    } else {
      let errorMessage = await result.text();
      alert(`${result.status}: ${errorMessage}`);
    }
  }
}