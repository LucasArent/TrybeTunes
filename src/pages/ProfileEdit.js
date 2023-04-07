import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';

const noMagicNumber = 3; // só pra resolver o erro do magic number, de novo, quarta vez já só nesse projeto

class UserProfileEdit extends React.Component {
  state = {
    nameProfileEdit: '',
    emailProfileEdit: '',
    descriptionProfileEdit: '',
    imageProfileEdit: '',
    loadingProfileEdit: false,
    btOffProfileEdit: true,
    // birthdate
  };

  async componentDidMount() {
    this.setState({ loadingProfileEdit: true });
    const response = await getUser();

    this.setState({
      nameProfileEdit: response.name,
      emailProfileEdit: response.email,
      descriptionProfileEdit: response.description,
      imageProfileEdit: response.image,
      loadingProfileEdit: false,
      btOffProfileEdit: false,
    });
  }

  inputChange = ({ target }) => {
    this.setState(
      {
        [target.name]: target.value,
      },
      () => {
        this.verify();
      },
    );
  };

  verify = () => {
    const { descriptionProfileEdit,
      emailProfileEdit,
      imageProfileEdit,
      nameProfileEdit } = this.state;
    const validate = [descriptionProfileEdit,
      emailProfileEdit,
      imageProfileEdit,
      nameProfileEdit];
    if (validate.some((field) => field.length < noMagicNumber)) {
      this.setState({ btOffProfileEdit: true });
    } else {
      this.setState({ btOffProfileEdit: false });
    }
  };

  inputSubmit = async (event) => {
    event.preventDefault();
    const { descriptionProfileEdit,
      emailProfileEdit,
      imageProfileEdit,
      nameProfileEdit } = this.state;
    const { history } = this.props;
    const response = { description: descriptionProfileEdit,
      email: emailProfileEdit,
      image: imageProfileEdit,
      name: nameProfileEdit,
    };
    await updateUser(response);
    history.push('/profile');
  };

  render() {
    const {
      descriptionProfileEdit,
      emailProfileEdit,
      imageProfileEdit,
      nameProfileEdit,
      loadingProfileEdit,
      btOffProfileEdit,
      // birthdate
    } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loadingProfileEdit ? (
          <h1>Carregando...</h1>
        ) : (
          <form>
            Nome:
            <input
              name="nameProfileEdit"
              className="edit-input-name"
              id="user-profile-edit-input-name"
              type="text"
              value={ nameProfileEdit }
              onChange={ this.inputChange }
              data-testid="edit-input-name"
            />
            Email:
            <input
              name="emailProfileEdit"
              className="edit-input-email"
              id="user-profile-edit-input-email"
              type="text"
              value={ emailProfileEdit }
              onChange={ this.inputChange }
              data-testid="edit-input-email"
            />
            Descrição:
            <textarea
              name="descriptionProfileEdit"
              className="edit-input-description"
              id="user-profile-edit-input-description"
              type="text"
              value={ descriptionProfileEdit }
              onChange={ this.inputChange }
              data-testid="edit-input-description"
            />
            Foto:
            <input
              name="imageProfileEdit"
              className="edit-input-image"
              id="user-profile-edit-input-image"
              type="text"
              value={ imageProfileEdit }
              onChange={ this.inputChange }
              data-testid="edit-input-image"
            />
            <button
              disabled={ btOffProfileEdit }
              className=""
              data-testid="edit-button-save"
              type="submit"
              onClick={ this.inputSubmit }
            >
              Editar perfil
            </button>
          </form>
        )}
      </div>
    );
  }
}

UserProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default UserProfileEdit;

/* Data de Nascimento:
<input
  name={ BIRTHDATE_FIELD }
  className='edit-input-birthdate'
  id="user-profile-edit-input-birthdate"
  type="date"
  value={ birthdate }
  onChange={ this.handleChange }
  data-testid="edit-input-birthdate"
/> */
