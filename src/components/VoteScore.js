import React from 'react'
import { database } from '../firebase';
import map from 'lodash/map';
import filter from 'lodash/filter';

const hasUserAlreadyVoted = (name, firstOptionVoteList, secondOptionVoteList) => {
  const hasUserVotedFirstOption = !!firstOptionVoteList.filter((vote) => vote.name === name).length;
  const hasUserVotedSecondOption = !!secondOptionVoteList.filter((vote) => vote.name === name).length;
  return hasUserVotedFirstOption || hasUserVotedSecondOption;
}

export default class VoteScore extends React.Component {
  postVoteForOptionOne = () => {
    if (hasUserAlreadyVoted(
      this.props.currentUser.name,
      map(this.props.firstOptionVoteList, (vote) => (vote)),
      map(this.props.secondOptionVoteList, (vote) => (vote))
    )) {
      const updatedVoteList = filter(this.props.firstOptionVoteList, (vote) => vote.name !== this.props.currentUser.name);
      database.ref('/questions/' + this.props.questionId + '/firstOptionVoteList')
        .set(updatedVoteList)
    } else {
      database.ref('/questions/' + this.props.questionId + '/firstOptionVoteList')
        .push({
          name: this.props.currentUser.name,
        })
    }
  }

  postVoteForOptionTwo = () => {
    if (hasUserAlreadyVoted(
      this.props.currentUser.name,
      map(this.props.firstOptionVoteList, (vote) => (vote)),
      map(this.props.secondOptionVoteList, (vote) => (vote))
    )) {
      const updatedVoteList = filter(this.props.secondOptionVoteList, (vote) => vote.name !== this.props.currentUser.name);
      database.ref('/questions/' + this.props.questionId + '/secondOptionVoteList')
        .set(updatedVoteList)
    } else {
      database.ref('/questions/' + this.props.questionId + '/secondOptionVoteList')
        .push({
          name: this.props.currentUser.name,
        })
    }
  }

  render() {
    return (
      <div style={{display: 'flex'}}>
        <div style={{ flexGrow: 1 }}>
          <article
            className="tile is-child notification is-info"
            onClick={this.postVoteForOptionOne}
          >
            <p className="subtitle">보기 A</p>
          <p className="title">{map(this.props.firstOptionVoteList, e => e).length}</p>
          </article>
          <ul>
            {map(this.props.firstOptionVoteList, (vote) => {
              return (
                <li key={vote.name}>
                  {vote.name}
                </li>
              )
            })}
          </ul>
        </div>
        <div style={{ flexGrow: 1 }}>
          <article
            className="tile is-child notification is-danger"
            onClick={this.postVoteForOptionTwo}
          >
            <p className="subtitle">보기 B</p>
            <p className="title">{Object.keys(this.props.secondOptionVoteList).length}</p>
          </article>
          <ul>
            {map(this.props.secondOptionVoteList, (vote) => {
              return (
                <li key={vote.name}>
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
