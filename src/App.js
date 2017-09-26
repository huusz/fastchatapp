import React, { Component } from 'react';
import Card from './components/Card';
import SiteHeader from './components/SiteHeader';
import UserProfile from './components/UserProfile';
import PostQuestion from './components/PostQuestion';
import VoteScore from './components/VoteScore';
import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.css';

const mockData = {
  questions: [
    {
      firstOption: '자장면',
      secondOption: '짬뽕',
      firstOptionImage: 'http://bulma.io/images/placeholders/96x96.png',
      secondOptionImage: 'http://bulma.io/images/placeholders/96x96.png',
      posted_by: {
        name: '소용석',
        email: 'ysoh611@gmail.com',
        photoUrl: 'http://bulma.io/images/placeholders/96x96.png',
      },
      firstOptionVoteList: [
        {
          name: '홍지수',
        },
        {
          name: '홍지수',
        },
        {
          name: '홍',
        },                
      ],
      secondOptionVoteList: [
        {
          name: '리액트',
        },                
        {
          name: '마크',
        },                
      ]
    },
  ]
}

class App extends Component {
  state = {
    isPostMode: false,
    questions: [],
  }

  componentDidMount = () => {
    this.setState({
      questions: mockData.questions,
    })
  }

  togglePostingMode = () => this.setState({ isPostMode: !this.state.isPostMode })

  render() {
    return (
      <div>
        <SiteHeader
          togglePostingMode={this.togglePostingMode}
        />
        {this.state.isPostMode ? (
          <PostQuestion />
        ) : null}
        <div className="container">
          {this.state.questions.map((question) => {
            return (
              <div className="columns">
                <div className="column">
                  <Card
                    firstOption={question.firstOption}
                    secondOption={question.secondOption}
                    firstOptionImage={question.firstOptionImage}
                    secondOptionImage={question.secondOptionImage}
                  />
                </div>
                <div className="column is-one-third">
                  <UserProfile
                    userImage={question.posted_by.photoUrl}
                    name={question.posted_by.name}
                    email={question.posted_by.email}
                  />
                  <VoteScore
                    firstOptionVoteList={question.firstOptionVoteList}
                    secondOptionVoteList={question.secondOptionVoteList}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default App;
