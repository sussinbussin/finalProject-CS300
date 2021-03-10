import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Chat = props => (
  <tr>
    <td>{props.chat.username}</td>
    <td>{props.chat.description}</td>
    <td>
      <Link to={"/edit/"+props.chat._id}>edit</Link> | <a href="#" onClick={() => { props.deleteChat(props.chat._id) }}>delete</a>
    </td>
  </tr>
)

export default class ChatsList extends Component {
  constructor(props) {
    super(props);

    this.deleteChat = this.deleteChat.bind(this)

    this.state = {chats: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5001/chats/')
      .then(response => {
        this.setState({ chats: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteChat(id) {
    axios.delete('http://localhost:5001/chats/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      chats: this.state.chats.filter(el => el._id !== id)
    })
  }

  chatList() {
    return this.state.chats.map(currentchat => {
      return <Chat chat={currentchat} deleteChat={this.deleteChat} key={currentchat._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>All Chats</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            { this.chatList() }
          </tbody>
        </table>
      </div>
    )
  }
}
