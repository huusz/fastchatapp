import React from 'react';
import {
  database,
  googleProvider,
  auth,
} from './firebase';
import map from 'lodash/map';


const tileClasses = [
  'danger',
  'primary',
  'info',
  'success',
  'warning',
];

export default class ChatApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: [], 
      currentUser: {
        name: '', // user.displayName
        photoUrl: '', // user.photoURL
        email: '', // user.email
      },
    }
  }

  getMessagesFromDB = () => {
    database.ref("/messages").on('value', (snapshot) => {
      this.setState({
        messages: map(snapshot.val(), (message => message))
      })
    })    
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.messages.length !== this.state.messages.length) {
      document.body.scrollTop = document.body.scrollHeight;          
    }
  }

  componentDidMount = () => {
    database.ref("/messages").once('value', (snapshot) => {
      this.setState({
        messages: map(snapshot.val(), (message => message))
      })
    })

    auth.onAuthStateChanged((user) => {
      if (user) {
        const currentUser = {};
        currentUser.name = user.displayName;
        currentUser.photoUrl = user.photoURL;
        currentUser.email = user.email;
        console.log('User has logged in!');
        console.log(user);
        this.setState({
          currentUser: currentUser,
        })
        this.getMessagesFromDB();
      } else {
        const currentUser = {};
        currentUser.name = '';
        currentUser.photoUrl = '';
        currentUser.email = '';
        this.setState({
          currentUser: currentUser,
          messages: [],
        })

        console.log("User has logged Out");
      }
    })
  }
  
  onTextChange = (e) => {
    this.setState({
      message: e.target.value,
    })
  }

  loginWithGoogle = () => {
    auth.signInWithPopup(googleProvider)
      .then((user) => {
        console.log(user)
      })
      .catch(error => console.log(error))
  }

  logout = () => {
    auth.signOut().then(() => {}).catch(() => {})
  }

  addMessageToDB = (e) => {
    e.preventDefault(); // 기본 행동 (새로고침)을 막기 위해서 넣어줌
    const currentTime = new Date();
    const message = {
      text: this.state.message,
      time: currentTime.toLocaleTimeString(),
      userName: this.state.currentUser.name,
    }
    database.ref("/messages").push(message)
    .then((e) => console.log(e))
    .catch(e => console.log(e))
    this.setState({
      message: '',
    })
  }

  render() {
    return (
      <div>
        <div
          style={{ backgroundColor: 'white', position: 'fixed', zIndex: 100, display: 'flex', justifyContent: 'center', padding: '15px', width: '100%', }}
        >
          <h1 className="title is-1">챗:앱</h1>
          {this.state.currentUser.name ? (
            <div>
            <figure className="image is-64x64">
              <img src={this.state.currentUser.photoUrl} />
            </figure>
              <span>{this.state.currentUser.email}</span>
              <a onClick={this.logout} className="button is-primary">
                로그아웃
              </a>
            </div>
          ) : (
            <a onClick={this.loginWithGoogle} className="button is-danger">
              구글로 로그인
            </a>
          )}
        </div>
        <div className="container" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
          {this.state.messages.map((message, i) => {
            return (
              <div className="tile is-parent">
                <article className={`tile is-child notification is-${tileClasses[i%5]}`}>
                  <p className="title">{message.text}</p>
                  <p className="subtitle">{message.time}</p>
                  <p className="subtitle">{message.userName}</p>
                  </article>
              </div>
            )
          })}
        </div>
        <div style={{ position: 'fixed', bottom: '0', width: '100%' }}>
          <footer className="footer" style={{ padding: '24px', backgroundColor: 'white' }}>
            <div className="container">
              <div className="content has-text-centered">
                <form onSubmit={this.addMessageToDB}>
                  <div class="field">
                    <div className="control">
                      <input
                        className="input is-large"
                        type="text"
                        placeholder="챗"
                        onChange={this.onTextChange}
                        value={this.state.message}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}
