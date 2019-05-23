import React, { Component } from 'react';
import './starwarsintro.css';
import starWarsIntro from './star-wars-intro.svg'

interface FinalPageProps {}

class FinalPage extends Component<FinalPageProps> {

  render() {
    return (
        <div className="star-wars-intro">

            <p className="intro-text">
                A few days ago, during...
            </p>

            <h2 className="main-logo">
                <img src={starWarsIntro} />
            </h2>

            <div className="main-content">

                <div className="title-content">
                    <p className="content-header">EPISODES XLII<br/><br/>Death star plans</p>

                    <br />

                    <p className="content-body">
                        The FIRST ORDER reigns. Unfortunately for them, the death star has its own vulnerabilities.<br />
                        My supreme leader, you must protect these plans from the vicious rebellion soldiers !<br /><br />
                    </p>

                    <a href="https://tinyurl.com/y4zwbzyl" className="space-button">Download The Plans Now!</a>

                </div>
            </div>
        </div>
    );
  }
}

export default FinalPage;
