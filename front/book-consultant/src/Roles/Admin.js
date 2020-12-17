import React from "react";
import Books from "../Books";
import Genres from "../Genres";
import Ratings from "../Ratings";
import Tags from "../Tags";
import Tabs from "../Tabs";
import Consultant from "../Consultant";

export default class Admin extends React.Component {
    items = [
        {title: "Консультант", content: <Consultant/>},
        {title: "Книги", content: <Books/>},
        {title: "Жанры", content: <Genres/>},
        {title: "Рейтинги", content: <Ratings/>},
        {title: "Теги", content: <Tags/>},
    ]

    render() {
        return <Tabs items={this.items}/>;
    }
}