import React from 'react'
import '../styles/RecentEvents.scss'

export default class RecentEvents extends React.Component{
    state = {
        data: [],
    }

    componentDidMount(){
        this.LoadCurrentEvents();
    }

    componentDidUpdate(prevProps){
        const { variantFrom  } = this.props;
        if (this.props.variantFrom !== prevProps.variantFrom) {
            if(variantFrom){
                let data = JSON.parse(localStorage.getItem('recentEvents'));
            let DataForCurrentValue = [];
                data.filter(item => {
                    let newArr = item.coins.filter(item => item.symbol === variantFrom);
                    if(newArr.length) {
                        DataForCurrentValue.push(item);
                    }
                });
                this.setState({
                    data: DataForCurrentValue,
                })
            } else {
                this.LoadCurrentEvents();
            }
        }
    }

    LoadCurrentEvents = () => {
        let data = JSON.parse(localStorage.getItem('recentEvents'));
        let currentDate = new Date();   
        let DataForCurrentDate = data.filter(item => new Date(item.date_event).getDate() === currentDate.getDate()-1);
        this.setState({
            data: DataForCurrentDate,
        })
    }

    render(){
        console.log(this.state);
        console.log(this.props);
        const { data } = this.state;
        return(
            <div className="wrapperEvents">   
                <h2>Coin Recent Events</h2>
                {
                    data.length ? 
                    <div className="eventBlocks">
                    {
                        data.map((item, index) => (
                            <div key={index} className='eventItem'>
                                <h3>
                                    {item.title.en}
                                </h3>
                                <p>
                                    {item.coins.map(item => `${item.fullname} `)}
                                </p>
                                <a href={item.source} target="_blank">
                                    {item.source}
                                </a>
                            </div>
                        ))
                    }
                </div> : <div>No results</div>
                }
            </div>
        );
    }
}