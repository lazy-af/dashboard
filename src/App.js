import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.scss';


const App = () => {
    return (
        <div className='c-Dashboard'>
        <Row className='c-TopRow'>
            <Col xs={9} className='c-TopCol-1'>
            <Row className='c-Filters'>Filters</Row>
            <Row className='c-Cards'> Cards </Row>
            <Row className='c-Charts'> Charts </Row>
            </Col>
            <Col xs={3} className='c-TopCol-2'>
                SunBurstchart
            </Col>
        </Row>
        <Row className='c-BottomRow'>
            <Col xs={9} className='c-BottomCol-1'>
                Grid
            </Col>
            <Col xs={3} className='c-BottomCol-2'>
                <div className="c-linksInfo">
                    <p>IAHUB is a centralized firm-wide repository to manage registry, tracking, reporting, certification, and governance of all intelligent automation processes.</p>

                    <div className='col'>
                        <div className="row">
                            <p><a className='link' href="www.google.com">Learn More</a></p>
                        </div>
                        <div className="row">
                            <p>Go To Wizard</p>
                        </div>
                        <div className="row">
                            <p>Go To Forms</p>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
            
        </div>
    )
}

export default App;
