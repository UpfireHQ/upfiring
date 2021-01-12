import React, { PureComponent } from 'react';

export default class LoadingCube extends PureComponent {
  constructor(props) {
    super(props);

    this.skCube = [];
    for (let i = 1; i < 10; i++) {
      this.skCube.push(<div key={i} className={`sk-cube sk-cube${i}`}/>);
    }
  }

  render() {
    return (
      <div className="sk-cube-grid">
        {this.skCube}
      </div>
    );
  }
}
