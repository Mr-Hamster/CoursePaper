import React from 'react'
import '../styles/RecentEvents.scss'

export default class RecentEvents extends React.Component{
    state = {
        data: [],
    }

    componentDidMount(){
        const { variantFrom, showChart } = this.props;
        console.log('from', variantFrom);

        let data = JSON.parse(localStorage.getItem('recentEvents'));
        console.log('events', data);
        let currentDate = new Date();
        if(variantFrom){
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
            console.log('value', DataForCurrentValue);
        } else {
            let DataForCurrentDate = data.filter(item => new Date(item.date_event).getDate() === currentDate.getDate()-1);
            console.log('events1', DataForCurrentDate);
            this.setState({
                data: DataForCurrentDate,
            })
            
        }
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
                                <img src={item.proof} className="imgEvent" />
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