import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GlobalContext from '../../Context/GlobalContext';

export default class Currencies extends Component {
    static contextType = GlobalContext;
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);

    }
    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            if (this.context.openDropDown) {
                this.context.toggleDropDown();
            }
        }
    }

    render() {
        const { openDropDown, handleCurrencyChange, currency, toggleDropDown } = this.context;
        return (
            <div ref={this.wrapperRef}>
                <div><span>{currency}</span>
                    {
                        openDropDown ? <button onClick={toggleDropDown} className='currencySwitcherBtn'><svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 3.5L4 0.5L7 3.5" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                        </svg></button>
                            :
                            <button className='currencySwitcherBtn' onClick={toggleDropDown}><svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 0.5L4 3.5L7 0.5" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            </button>
                    }
                </div>
                <ul style={{ display: `${openDropDown ? "block" : "none"}` }} className='currencyOptions'>
                    {
                        this.props.currencies.map((c, index) => <li className='title' onClick={() => handleCurrencyChange(c.currency.symbol)} key={index}>{c.currency.symbol} {c.currency.label}</li>)
                    }
                </ul>
            </div>

        )
    }
}
