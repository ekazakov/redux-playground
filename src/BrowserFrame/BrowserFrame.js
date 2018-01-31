import React, { Component } from 'react';
import styled, { css } from 'react-emotion';

const FrameContainer = styled('div')`
    flex-direction: column;
    background: white;
    box-shadow: 0px 5px 20px hsla(0, 0%, 0%, 0.75);
    border-radius: 6px;
    position: static;
    width: auto;
    height: 95vh;
    left: 290px;
    top: 40px;
    bottom: 40px;
    display: flex;
`;

const FrameHeader = styled('div')`
    flex-direction: row;
    background: #eee;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    border: none;
    align-items: center;
    border-bottom: solid 1px #ccc;
    padding: 0 10px;
    display: flex;
    height: 40px;
`;

const AddressBarWrapper = styled('div')`
    flex-direction: row;
    flex: 1;
    align-items: center;
    padding: 5px;
    margin-left: -20px;
    display: flex;
`;

const AddressBar = styled('input')`
    width: 100%;
    padding-left: 25px;
    color: hsl(0, 0%, 32%);
    display: block;
    font-size: 16px;
`;

const Arrow = styled('button')`
    display: inline-block;
    border: none;
    margin: 0px;
    padding: 0px;
    background: none;
    font-size: 200%;
    margin-top: -3px;
    outline: none;
    position: relative;
`;

const Icon = styled('div')`
    position: relative;
    z-index: 1;
    left: 8px;
    top: -1px;
    display: block;
`;

const Content = styled('div')`
  padding: 15px;
`;


export default class BrowserFrame extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {
            location: '/'
        };
    }

    componentWillMount() {
        const { history } = this.props;

        history.listen(({ pathname, search }, action) => {
            this.setState({
                location: `${pathname}${search}`
            })
        });
    }

    render() {
        const { children } = this.props;
        const arrowStyle = {
            verticalAlign: 'middle',
            marginTop: -3,
        };

        return (
            <FrameContainer>
                <FrameHeader>
                    <Arrow>
                        <svg height="1em" width="1em" fill="currentColor" viewBox="0 0 40 40"
                             preserveAspectRatio="xMidYMid meet" style={arrowStyle}>
                            <path
                                d="m28.3 18.3h-12.6l3.8-3.8c0.7-0.6 0.7-1.7 0-2.3s-1.7-0.7-2.3 0l-7.9 7.8 7.9 7.8c0.3 0.4 0.7 0.5 1.1 0.5s0.9-0.1 1.2-0.5c0.7-0.6 0.7-1.7 0-2.3l-3.8-3.8h12.6c1 0 1.7-0.8 1.7-1.7s-0.8-1.7-1.7-1.7z"
                            />
                        </svg>
                    </Arrow>
                    <Arrow disabled="">
                        <svg height="1em" width="1em" fill="currentColor" viewBox="0 0 40 40"
                             preserveAspectRatio="xMidYMid meet" style={arrowStyle}>
                            <path
                                d="m22.2 12.2c-0.7 0.6-0.7 1.7 0 2.3l3.8 3.8h-12.7c-0.9 0-1.6 0.8-1.6 1.7s0.7 1.7 1.6 1.7h12.7l-3.8 3.8c-0.7 0.6-0.7 1.7 0 2.3 0.3 0.4 0.7 0.5 1.1 0.5s0.9-0.1 1.2-0.5l7.9-7.8-7.9-7.8c-0.6-0.7-1.7-0.7-2.3 0z"
                            />
                        </svg>
                    </Arrow>
                    <Icon>
                        <svg fill="currentColor" height="1em" width="1em" viewBox="0 0 40 40"
                             preserveAspectRatio="xMidYMid meet" style={{ verticalAlign: 'middle' }}>
                            <path
                                d="m16.3 15l-6.3 6.3 6.3 6.2 2.5-2.5-3.8-3.7 3.8-3.8-2.5-2.5z m5 2.5l3.7 3.8-3.7 3.7 2.5 2.5 6.2-6.2-6.2-6.3-2.5 2.5z m6.2-15h-22.5v35h30v-27.5l-7.5-7.5z m5 32.5h-25v-30h17.5l7.5 7.5v22.5z"
                            />
                        </svg>
                    </Icon>
                    <AddressBarWrapper>
                        <AddressBar
                            type="text"
                            value={this.state.location}
                            onChange={() => {}}
                        />
                    </AddressBarWrapper>
                </FrameHeader>
                <Content>
                    {children}
                </Content>
            </FrameContainer>
        );
    }
}
