import React from 'react'

const tileClasses = [
  'danger',
  'primary',
  'info',
  'success',
  'warning',
];

const messages = [
  {
    content: '나는 누구',
    time: '09: 30',
  },
  {
    content: '나는 누구',
    time: '09: 30',
  },
  {
    content: '파이어베이스',
    time: '09: 30',
  },
  {
    content: '나는 누구',
    time: '09: 30',
  },
  {
    content: '파이어베이스',
    time: '09: 30',
  },
  {
    content: '나는 누구',
    time: '09: 30',
  },
  {
    content: '파이어베이스',
    time: '09: 30',
  },
  {
    content: '나는 누구',
    time: '09: 30',
  },
  {
    content: '나는 왜일까',
    time: '09: 30',
  },
  {
    content: '나는 누구일까',
    time: '09: 30',
  },
]

export default class ChatApp extends React.Component {
  render() {
    return (
      <div>
        <div
          style={{ backgroundColor: 'white', position: 'fixed', zIndex: 100, display: 'flex', justifyContent: 'center', padding: '15px', width: '100%', }}
        >
          <h1 className="title is-1">챗:앱</h1>
        </div>
        <div className="container" style={{ paddingTop: '100px', }}>
          {messages.map((message, i) => {
            return (
              <div className="tile is-parent">
                <article className={`tile is-child notification is-${tileClasses[i%5]}`}>
                  <p className="title">{message.content}</p>
                  <p className="subtitle">{message.time}</p>
                </article>
              </div>
            )
          })}
        </div>
        <div style={{ position: 'fixed', bottom: '0', width: '100%' }}>
          <footer className="footer" style={{ padding: '24px', backgroundColor: 'white' }}>
            <div className="container">
              <div className="content has-text-centered">
                <div class="field">
                  <div className="control">
                    <input className="input is-large" type="text" placeholder="챗" />
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}
