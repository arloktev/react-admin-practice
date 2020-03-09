import React, { Component } from "react";
import axios from 'axios';

class Editor extends Component {
    constructor() {
        super();

        this.state = {
            pagesList: [],
            newPageName: '',
            currentPage: '../index.html'
        }
    }

    loadListPage() {
        axios.get('./api/pagesList.php')
            .then(res => this.setState({
                pagesList: res.data
            }))
            .catch(() => alert('Невозможно загрузить данные'));
    }

    createNewPage() {
        axios.post('./api/createNewPage.php', {"name": this.state.newPageName})
            .then(this.loadListPage())
            .catch(() => alert('Страница уже существует'));
    }

    removePage(page) {
        axios.post('./api/removePage.php', {"name": page})
            .then(this.loadListPage())
            .catch(() => alert('Страницы не существует'));
    }

    componentDidMount() {
        this.loadListPage();
    }

    render() {
        const {pagesList} = this.state;
        const pages = pagesList.map((page, index) => {
            return <p key={index}>{page}<button onClick={() => this.removePage(page)}>x</button></p>
        });

        return (
            // <iframe src={this.state.currentPage}></iframe>
            <React.Fragment>
                <input
                    type="text"
                    onChange={(e) => this.setState({newPageName: e.target.value})}
                />
                <button onClick={() => this.createNewPage()}>Добавить страницу</button>
                {pages}
                
            </React.Fragment>
        )
    }
}

export default Editor;