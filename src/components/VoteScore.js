import React from 'react'


export default class VoteScore extends React.Component {
  render() {
    return (
      <div style={{display: 'flex'}}>
        <div style={{ flexGrow: 1 }}>
          <article className="tile is-child notification is-info">
            <p className="subtitle">보기 A</p>
            <p className="title">{this.props.firstOptionVoteList.length}</p>
          </article>
          <ul>
            {this.props.firstOptionVoteList.map((vote) => {
              return (
                <li>
                  {vote.name}
                </li>
              )
            })}
          </ul>
        </div>
        <div style={{ flexGrow: 1 }}>
          <article className="tile is-child notification is-danger">
            <p className="subtitle">보기 B</p>
            <p className="title">{this.props.secondOptionVoteList.length}</p>
          </article>
          <ul>
            {this.props.secondOptionVoteList.map((vote) => {
              return (
                <li>
                  {vote.name}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    );
  }
}
