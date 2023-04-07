import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profileUser: null,
      load: true,
    };
  }

  async componentDidMount() {
    try {
      const profileUser = await getUser();
      this.setState({ profileUser, load: false });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { profileUser, load } = this.state;

    return (
      <div data-testid="page-profile">
        <Header>Profile</Header>

        {load ? (
          <p>Carregando...</p>
        ) : (
          <div>
            <h2 data-testid="header-user-name">{profileUser.name}</h2>
            <p data-testid="user-email">{profileUser.email}</p>
            <p data-testid="user-description">{profileUser.description}</p>
            <img
              data-testid="profile-image"
              src={ profileUser.image }
              alt={ `${profileUser.name}` }
            />
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
