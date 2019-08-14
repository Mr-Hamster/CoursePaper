import React from 'react';
import * as api from '../api/index';
import '../styles/CoinNews.scss'

export default class CoinNews extends React.Component{
    state = {
        arrNews: [],
        count: 10,
        
    }

    componentDidMount(){
        this.pagination;
    }

    getDate = (timestamp) => {
        let a = new Date(timestamp * 1000);
        let result = a.toLocaleDateString();
        return result;
    }

    parser = (text) => {
        return {__html: `${text}`}
    }

    pagination = () => {
        const { arrPosts } = this.props;
        const { arrNews, count } = this.state;
        for(let i = 0; i < count; i++){
            alert(i);
        }
        
    }

    render(){
        console.log('Proooopss', this.props)
        const { arrPosts } = this.props;
        return(
            arrPosts ? 
            <div className="wrapperNews">
                {
                    arrPosts.map((item, index) => (
                        <div className="postWrapper" key={index}>
                            <img style={{ borderRadius: '10px' }} src={item.imageurl} />
                            <div className="postInfo">
                                <h3 dangerouslySetInnerHTML={this.parser(item.title)} />
                                <p dangerouslySetInnerHTML={this.parser(item.body)} />
                                <span>
                                    Original Source: <a href={item.url}>{item.url}</a>
                                </span>
                                <p>
                                    Published on: { this.getDate(item.published_on) }
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div> : null
        );
    }
}