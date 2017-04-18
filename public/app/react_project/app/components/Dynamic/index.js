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

    canvas {
        height: 270px !important
    }
`


class Dynamic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
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

    render() {
        let rubrics = ['Политика', 'Экономика', 'Общество', 'Наука', 'Спорт', 'Культура', 'Бизнес'];

        let chartData = {
            labels: ['06.01.2017', '07.01.2017', '08.01.2017', '09.01.2017', '10.01.2017', '11.01.2017', '12.01.2017', '13.01.2017', '14.01.2017', '15.01.2017'],
            datasets: [{
                data: [12, 19, 3, 17, 6, 3, 7, 4, 5, 6],
                fill: false,
                lineTension: 0,
                pointBackgroundColor: '#359918',
                pointRadius: 4,
                pointHoverRadius: 4,
                borderColor: '#359918',
                borderWidth: 1
            }]
        };

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

        let changeEvent = function () {
            return;
        }

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
                                onChange={changeEvent} />
                            <Chart>
                                <Line data={chartData} options={options} redraw={true} />
                                {/*<RC2 data={chartData} options={options} type='line' />*/}
                            </Chart>
                        </Wrap>
                    </Root >
                </Modal>
            </Wrap>
        )
    }
}


export default Dynamic;
