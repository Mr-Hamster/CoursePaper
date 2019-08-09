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
              position: 'left',
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
    buyAmount: 0,
    sellAmount: 0,
    onPriceBuy: 0,
    onPriceSell: 0,
  }

  componentDidMount(){
    this.getResult();
  }

  getResult = () => {
    const { number } = this.state;
    const {currentPrice } = this.props;

    let sellPrice = +currentPrice + +currentPrice*number/100;
    let buyPrice = +currentPrice - +currentPrice*number/100;
    this.getAmountOnPrice(currentPrice, buyPrice, sellPrice);
  }

  getAmountOnPrice = (currentPrice, buyPrice, sellPrice) => {
    const { arrBuy, arrSell } = this.props;
    let newArrBuy = arrBuy.filter(item => item.price <= currentPrice && item.price >= buyPrice);
    let newArrSell = arrSell.filter(item => item.price >= currentPrice && item.price <= sellPrice);
    let resultBuy = this.maxAmount(newArrBuy);
    let resultSell = this.maxAmount(newArrSell);
    this.setState({
      buyAmount: resultBuy[0],
      sellAmount: resultBuy[1],
      onPriceBuy: resultSell[0],
      onPriceSell: resultSell[1],
    })
  }

  maxAmount = data => {
    let max = 0;
    let price = 0;
    let result = [];
    data.forEach(item => {
      if(item.amount > max){
        max = item.amount
        price = item.price;
      }
    });
    result.push(max, price);
    return result;
  }
  
  render(){     
    const { dataBuy, dataSell, labels, currentPrice, arrBuy, arrSell } = this.props;
    const { buyAmount, sellAmount, onPriceBuy, onPriceSell } = this.state;

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
              Buy biggest amount: {`${buyAmount}`} <br/> On price: {`${onPriceBuy}`} <br/>
              Sell biggest amount: {`${sellAmount}`} <br/> On price: {`${onPriceSell}`}
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