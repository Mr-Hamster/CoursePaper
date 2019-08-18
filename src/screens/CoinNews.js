import React from 'react';
import * as api from '../api/index';
import Button from '@material-ui/core/Button';
import '../styles/CoinNews.scss'

let data;
let count = 0;

export default class CoinNews extends React.Component{
    state = {
        arrNews: [],
    }

    componentDidMount(){
        const { arrPosts } = this.props;
        const { count, arrNews } = this.state;
        data = arrPosts;
        if(data){
            this.showMore();
        }
    }

    getDate = (timestamp) => {
        let a = new Date(timestamp * 1000);
        let result = a.toLocaleDateString();
        return result;
    }

    parser = (text) => {
        return {__html: `${text}`}
    }

    showMore = () => {
        count = count + 10;
        let result = [];
        console.log('count', count)
        for(let i = 0; i < count; i++){
            result.push(data[i]);
        }
        this.setState({
            arrNews: result
        })
    }

    render(){
        const { arrNews } = this.state;
        return(
            arrNews ? 
            <div className="wrapperNews">
                {
                    arrNews.map((item, index) => (
                        <div className="postWrapper" key={index}>
                            <img style={{ borderRadius: '10px' }} src={item.imageurl} />
                            <div className="postInfo">
                                <h3 dangerouslySetInnerHTML={this.parser(item.title)} />
                                <p dangerouslySetInnerHTML={this.parser(item.body)} />
                                <span>
                                    Original Source: <a href={item.url} target="_blank">{item.url}</a>
                                </span>
                                <p>
                                    Published on: { this.getDate(item.published_on) }
                                </p>
                            </div>
                        </div>
                    ))
                }
                {
                    count < 50 ? 
                    <Button variant="contained" color="primary" style={{width:'30%', height:'50px', margin: '20px'}} onClick={ this.showMore }>
                        Show More
                    </Button> : null
                }
            </div> : null
        );
    }
}