import React, { Component } from 'react';
import { StyledLevel1Container, StyledLevel1Button } from './Level1.style';

interface Level1Props {
    goToLevelTwo: () => void;
}

interface Level1State {
    isButtonDisabled: boolean
  }

class Level1 extends Component<Level1Props, Level1State> {
    constructor(props: Level1Props) {
        super(props);
        this.state = { isButtonDisabled: true };
      }

    goToLevelTwo = () => {
        if (this.state.isButtonDisabled) {
            return
        } else {
            this.props.goToLevelTwo();
        }
    };

    componentDidMount() {
        const config = { attributes: true };
        const button = window.document.getElementById("first-level-button");
        if (button) {
          const observer = new MutationObserver(() => {
            const button = window.document.getElementById("first-level-button");
            if (button) {
              const disableAttribute = button.getAttribute("data-disable-the-button");
              this.setState({ isButtonDisabled: disableAttribute ? disableAttribute === "true" : false })
            }
          });
          // Start observing the target node for configured mutations
          observer.observe(button, config);
        }
    }

  render() {
    return (
        <StyledLevel1Container>
            <StyledLevel1Button
                data-disable-the-button
                type="button"
                onClick={this.goToLevelTwo}
                id="first-level-button"
            >
                Become a trooper !
            </StyledLevel1Button>
        </StyledLevel1Container>
    );
  }
}

export default Level1;
