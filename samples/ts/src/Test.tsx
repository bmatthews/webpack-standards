import * as React from 'react'

export default class Counter extends React.Component<undefined, undefined> {
  constructor(props: any) {
    super(props)
    this.state = { counter: 0 }
  }

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  tick() {
    this.setState({
      counter: this.state.counter,
    })
  }

  render() {
    return (
      <h2>Counter: {this.state.counter}</h2>
   )
  }
}
