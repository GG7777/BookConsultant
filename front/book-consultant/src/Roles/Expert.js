import React from "react";
import Tags from "../Tags";
import Tabs from "../Tabs";
import Consultant from "../Consultant";

export default class Expert extends React.Component {
    items = [
        {title: "Консультант", content: <Consultant/>},
        {title: "Теги", content: <Tags/>},
    ]

    render() {
        return <Tabs items={this.items}/>;
    }
}