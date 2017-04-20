import React, { Component } from 'react'
// import RC2 from 'react-chartjs2'
import { Line } from 'react-chartjs-2';
import styled, { injectGlobal } from 'styled-components'

import Icon from 'components/Icon'
import Tags from 'components/Tags'
import Modal from 'components/Modal'

import { padding, font, color } from 'constants/style'

const Root = styled.div`
    max-width: 749px;
    padding-right: ${padding};
    padding-bottom: 20px;
    padding-left: ${padding};
    margin: auto;

    background-color: #fff;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    padding-right: ${padding};
    padding-left: ${padding};
    margin-right: -${padding};
    margin-bottom: 25px;
    margin-left: -${padding};

    background-color: #f0f0f0;
`;

const Title = styled.a`
    font-weight: 800;
    letter-spacing: 0;
    font-family: ${font.opensans};
    font-size: 13px;
    color: #000000;
    text-decoration: none;
    text-transform: uppercase;
    cursor: pointer;

    span {
        margin-right: 3px;

        font-family: ${font.helvetica};
        font-size: 18px;
    }
`;

const Close = styled.a`
    margin-right: 2px;
    cursor: pointer
`

const Wrap = styled.div`
    
`

const Chart = styled.div`
    width: 709px;
    height: 270px;
    position: relative;

    canvas {
        height: 270px !important
    }
`

const Arrow = styled.a`
    cursor: pointer;
    font-weight: 100;
    position: absolute;
    bottom: 1px;
    transition: font-weight .3s ease;

    &.left {
        left: -9px;
    }

    &.right {
        right: -9px;
    }

    &:hover {
        font-weight: bold;
    }

`


class Dynamic extends Component {
    constructor(props) {
        super(props);
        let data1 = [
                {val: 12, cat: 'Политика'}, 
                {val: 19, cat: 'Экономика'}, 
                {val: 3, cat: 'Общество'}, 
                {val: 17, cat: 'Политика'}, 
                {val: 6, cat: 'Наука'},
                {val: 3, cat: 'Спорт'},
                {val: 7, cat: 'Политика'},
                {val: 7, cat: 'Политика'},
                {val: 8, cat: 'Экономика'},
                {val: 6, cat: 'Политика'},
            ];
        this.state = {
            modalOpen: false,
            data1: data1,
            data2: [
                {val: 1, cat: 'Политика'}, 
                {val: 9, cat: 'Экономика'}, 
                {val: 3, cat: 'Общество'}, 
                {val: 17, cat: 'Политика'}, 
                {val: 6, cat: 'Наука'},
                {val: 3, cat: 'Спорт'},
                {val: 5, cat: 'Политика'},
                {val: 7, cat: 'Наука'},
                {val: 8, cat: 'Экономика'},
                {val: 9, cat: 'Политика'},
            ],
            chartData: {
                labels: ['06.01.2017', '07.01.2017', '08.01.2017', '09.01.2017', '10.01.2017', '11.01.2017', '12.01.2017', '13.01.2017', '14.01.2017', '15.01.2017'],
                datasets: [{
                    currData: data1,
                    data: data1.map(r => r.val),
                    fill: false,
                    lineTension: 0,
                    pointBackgroundColor: '#359918',
                    pointRadius: 4,
                    pointHoverRadius: 4,
                    borderColor: '#359918',
                    borderWidth: 1
                }]
            },
            showOld: true,
            showNew: false,
            filter: []
        };

    //    let fuck = this.state.data1.map(r => r.val);


        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.renderNew = this.renderNew.bind(this);
        this.renderOld = this.renderOld.bind(this);
        this.filter = this.filter.bind(this);
        // this.chartData = {

        // };
    }

    openModal() {
        if (!this.state.modalOpen) {
            this.setState({
                modalOpen: true
            })
        }
    }

    closeModal() {
        if (this.state.modalOpen) {
            this.setState({
                modalOpen: false
            })
        }
    }

    renderNew() {
        this.setState({
            chartData: {
                labels: ['26.12.2017', '27.12.2017', '28.12.2017', '29.12.2017', '30.12.2016', '31.12.2016', '01.01.2017', '02.01.2017', '04.01.2017', '05.01.2017'],
                datasets: [{
                    currData: this.state.data2,
                    data: this.state.data2.map(r => {
                        if (this.state.filter.length > 0) {
                            if (this.state.filter.join(',').indexOf(r.cat) > -1) {
                                return r.val;
                            } else {
                                return 0;
                            }
                        } else {
                            return r.val;
                        }
                    }),
                    fill: false,
                    lineTension: 0,
                    pointBackgroundColor: '#359918',
                    pointRadius: 4,
                    pointHoverRadius: 4,
                    borderColor: '#359918',
                    borderWidth: 1
                }]
            },
            showOld: false,
            showNew: true
        })
        //  this.chartData.labels = this.newLabels;
        //  this.chartData.datasets[0].data = this.newData;
    }

    renderOld() {
        this.setState({
            chartData: {
                labels: ['06.01.2017', '07.01.2017', '08.01.2017', '09.01.2017', '10.01.2017', '11.01.2017', '12.01.2017', '13.01.2017', '14.01.2017', '15.01.2017'],
                datasets: [{
                    currData: this.state.data1,
                    data: this.state.data1.map(r => {
                        if (this.state.filter.length > 0) {
                            if (this.state.filter.join(',').indexOf(r.cat) > -1) {
                                return r.val;
                            } else {
                                return 0;
                            }
                        } else {
                            return r.val;
                        }
                    }),
                    fill: false,
                    lineTension: 0,
                    pointBackgroundColor: '#359918',
                    pointRadius: 4,
                    pointHoverRadius: 4,
                    borderColor: '#359918',
                    borderWidth: 1
                }]
            },
            showOld: true,
            showNew: false
        })
    }

    filter() {
        return (value) => {
            if (value.length > 0) {
                let filtered = this.state.chartData.datasets[0].currData.map(r => {
                    if (value.join(',').indexOf(r.cat) > -1) {
                        return r.val;
                    } else {
                        return 0;
                    }
                });
                this.state.chartData.datasets[0].data = filtered;
            } else {
                this.state.chartData.datasets[0].data = this.state.chartData.datasets[0].currData.map(r => r.val);
            }
            this.setState({
                filter: value,
                chartData: this.state.chartData
            });
        }
    }


    render() {
        let rubrics = ['Политика', 'Экономика', 'Общество', 'Наука', 'Спорт', 'Культура', 'Бизнес'];


        let options = {
            scaleShowLabels: false,
            tooltipTemplate: '<%= value %>',
            scales: {
                yAxes: [{
                    display: false,
                }]
            },
            legend: {
                display: false
            },
            // responsive: false,
            maintainAspectRatio: false
        };

        let vall;

        return (
            <Wrap>
                <Title onClick={this.openModal}>
                    <Icon type="dynamic" /> Динамика
            </Title>
                <Modal
                    isOpen={this.state.modalOpen}
                    contentLabel="Динамика"
                    onRequestClose={this.closeModal}>
                    <Root >
                        <Header>
                            <Title>
                                <Icon type="dynamic" /> Динамика
                            </Title>
                            <Close onClick={this.closeModal}>
                                <Icon type="delete-lg" />
                            </Close>
                        </Header>
                        <Wrap>
                            <Tags
                                data={rubrics}
                                value={vall}
                                onChange={this.filter()} />
                            <Chart>
                                <Line data={this.state.chartData} options={options} redraw={true} />
                                {this.state.showOld ? <Arrow className="left" onClick={this.renderNew}>{'<'}</Arrow> : null}
                                {this.state.showNew ? <Arrow className="right" onClick={this.renderOld}>{'>'}</Arrow> : null}
                            </Chart>
                        </Wrap>
                    </Root >
                </Modal>
            </Wrap>
        )
    }
}


export default Dynamic;
