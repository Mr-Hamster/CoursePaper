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
        const { from, recentEvents  } = this.props;
        if (this.props.from !== prevProps.from) {
            if(from){
                let data = recentEvents;
                let DataForCurrentValue = [];
                data.filter(item => {
                    let newArr = item.coins.filter(item => item.symbol === from);
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
        const { recentEvents  } = this.props;
        let data = recentEvents;
        let currentDate = new Date();   
        let DataForCurrentDate = data.filter(item => new Date(item.date_event).getDate() === currentDate.getDate());
        this.setState({
            data: DataForCurrentDate,
        })
    }

    render(){
        const { data } = this.state;
        return(
            <div className="wrapperEvents">   
                <h2>Coin Recent Events</h2>
                {
                    data.length ? (
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
                        </div>
                    ) : (
                        <div>No results</div>
                    )
                }
            </div>
        );
    }
}