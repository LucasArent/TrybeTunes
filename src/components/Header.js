import { Component } from 'react';
import { getUser } from '../services/userAPI';

class Header extends Component {
  state = {
    logUser: '',
  };

  async componentDidMount() {
    const { name } = await getUser();
    this.setState({
      logUser: name,
    });
  }

  render() {
    const { logUser } = this.state;
    return (
      <header data-testid="header-component">
        { !logUser
        && <span>Carregando...</span>}
        <p data-testid="header-user-name">{ logUser }</p>
        {}
      </header>
    );
  }
}

export default Header;

/* ideia de como puxar o nome para quando a pessoa voltasse ao site
function getMsg() {
  const name = document.getElementById("name").value;

  const mnsg = "Oi ${name}! Obrigado por visitar o site.";

  document.getElementById("mnsg").innerHTML = mnsg;
}
</script>
*/
