import React from "react";
import Consultant from "../Consultant";
import Tabs from "../Tabs";

export default class User extends React.Component {
    items = [
        {title: "Консультант", content: <Consultant/>}
    ]

    render() {
        return <Tabs items={this.items}/>;
    }
}