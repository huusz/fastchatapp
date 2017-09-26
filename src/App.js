import React, { Component } from 'react';
import Card from './components/Card';
import SiteHeader from './components/SiteHeader';
import UserProfile from './components/UserProfile';
import PostQuestion from './components/PostQuestion';
import VoteScore from './components/VoteScore';
import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.css';
import map from 'lodash/map';
import {
  database,
  auth,
  googleProvider,
} from './firebase';

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
  constructor(props) {
    super(props);
    this.state = {
      isPostMode: false,
      questions: [],
      currentUser: {},
    }

    this.onAuthChange = auth.onAuthStateChanged((user) => {
      if (user) {
        const currentUser = {};
        currentUser.name = user.displayName;
        currentUser.photoUrl = user.photoURL;
        currentUser.email = user.email;
        this.setState({
          currentUser: currentUser,
        })

        this.onQuestionChange = database.ref('/questions').on('value', (snapshot) => {
          this.setState({
            questions: map(snapshot.val(), (question, id) => ({ id: id, ...question }))
          })
        })

      } else {
        this.setState({
          currentUser: {
            name: '',
            photoUrl: '',
            email: '',
          }
        })
      }
    })
  }

  loginWithGoogle = () => {
    auth.signInWithPopup(googleProvider)
      .then((user) => {
        console.log(user)
      })
      .catch(error => console.log(error))
  }

  logout = () => auth.signOut()

  togglePostingMode = () => this.setState({ isPostMode: !this.state.isPostMode })

  render() {
    return (
      <div>
        <SiteHeader
          togglePostingMode={this.togglePostingMode}
          currentUser={this.state.currentUser}
          loginHandler={this.loginWithGoogle}
          logoutHandler={this.logout}
        />
        {this.state.isPostMode ? (
          <PostQuestion
            onClose={this.togglePostingMode}
            currentUser={this.state.currentUser}
          />
        ) : null}
        <div className="container">
          {this.state.questions.map((question) => {
            return (
              <div
                className="columns"
                key={question.id}
              >
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
                    currentUser={this.state.currentUser}
                    questionId={question.id}
                    firstOptionVoteList={question.firstOptionVoteList || {}}
                    secondOptionVoteList={question.secondOptionVoteList || {}}
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
