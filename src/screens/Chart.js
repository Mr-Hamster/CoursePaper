import React from 'react'
import {Bar} from 'react-chartjs-2';
import '../styles/Chart.scss'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

  const options = {
    responsive: true,
    tooltips: {
      mode: 'label'
    },
    elements: {
      line: {
        fill: true
      }
    },
    legend: {
      position: 'top',
    },
    scales: {
        xAxes: [
            {
              display: true,
              gridLines: {
                display: false
              },
          
              // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            }
          ],
          yAxes: [
            {
              type: 'linear',
              display: false,
              position: 'left',
              id: 'y-axis-1',
              gridLines: {
                display: true
              },
              labels: {
                show: true
              }
            },
            {
              type: 'linear',
              display: true,
              position: 'right',
              id: 'y-axis-2',
              gridLines: {
                display: true
              },
              labels: {
                show: true
              }
            }
          ]
    }
  };

export default class Charts extends React.Component{
  state = {
    number: 10,
    sellPrice: 0,
    buyPrice: 0,
  }

  componentDidMount(){
    this.getResult;
  }

  getResult = () => {
    const { number } = this.state;
    const {currentPrice } = this.props;

    let sellPrice = +currentPrice + +currentPrice*number/100;
    let buyPrice = +currentPrice - +currentPrice*number/100;
    this.setState({
      sellPrice: sellPrice, 
      buyPrice: buyPrice
    })
    console.log('sell price', sellPrice);
    console.log('buy price', buyPrice)
  }
  
  render(){     
    const { dataBuy, dataSell, labels, bigestAskAmount, bigestAskPrice, bigestBidAmount, bigestBidPrice, currentPrice } = this.props;
    const { sellPrice, buyPrice } = this.state;
    console.log('Data Buy', dataBuy, bigestAskAmount);
    const data = {
      labels: labels,
      datasets: [{
          label: 'Buy',
          type:'line',
          data: dataBuy,
          fill: true,
          borderColor: '#004D40',
          borderWidth: 1,
          backgroundColor: '#4DB6AC',
          pointBorderColor: '#000',
          pointBackgroundColor: '#4DB6AC',
          pointHoverBackgroundColor: '#4DB6AC',
          pointHoverBorderColor: '#EC932F',
          yAxisID: 'y-axis-2'
        },{
          label: 'Sell',
          type:'line',
          data: dataSell,
          fill: true,
          borderColor: '#B71C1C',
          borderWidth: 1,
          backgroundColor: '#E57373',
          pointBorderColor: '#000',
          pointBackgroundColor: '#E57373',
          pointHoverBackgroundColor: '#E57373',
          pointHoverBorderColor: '#EC932F',
          yAxisID: 'y-axis-2'
        }]
    };
    console.log(this.state);
        return(
          <div className="wrapperChart">
            <div className="infoChart">
              <div className="numberInput">
                <span>
                  Current price: {currentPrice}
                </span>
                <div style={{ display:'flex', alignItems: 'center' }}>
                  Min price: current minus
                  <TextField
                    id="outlined-number"
                    label="%"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    margin="normal"
                    variant="outlined"
                    value={this.state.number}
                    onChange = {(event)=>{
                      this.setState({
                        number: event.target.value,
                      })
                    }}
                    style={{width: '80px', marginLeft: '10px'}}
                  />
                </div>
              </div>
              <div className="dataChart">
              Buy biggest amount: {`${bigestBidAmount }`} <br/> On price: {`${buyPrice}`} <br/>
              Sell biggest amount: {`${bigestAskAmount}`} <br/> On price: {`${sellPrice}`}
              </div>
              <Button variant="contained" color="primary" style={{width:'40%', height:'40px', marginTop: '10px'}} onClick={ this.getResult }>
                Get it
              </Button>
            </div>  
            <div style={{width:'60%'}}>
              <Bar
                data={data}
                options={options}
              />
            </div>
          </div>
       );
    }
}