import * as React from 'react';
export default class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { counter: 0 };
    }
    componentDidMount() {
        this.interval = setInterval(this.tick.bind(this), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    tick() {
        this.setState({
            counter: this.state.counter,
        });
    }
    render() {
        return (React.createElement("h2", null,
            "Counter: ",
            this.state.counter));
    }
}
//# sourceMappingURL=Test.js.map