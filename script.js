class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      users: []
    };
  }

  onChangeHandle(event) {
    this.setState({searchText: event.target.value});
  }

  onSubmit(event) {  //W metodzie onSubmit wykorzystujemy wiedzę na temat promise'ów. 
    event.preventDefault();
    const {searchText} = this.state;
    const url = `https://api.github.com/search/users?q=${searchText}`; //Po skonsturowaniu adresu URL dzięki szablonom ES6 ...
    fetch(url) // ...wywołujemy funkcję fetch, która zwraca Promise. Funkcja fetch jest interfejsem dzięki któremu możemy pobierać różne zasoby z sieci (por. obiekt XHR albo inny sposób na korzystanie z AJAX). Fetch jest po prostu natywną implementacją zapytań ajaxowych korzystającą z promisów.
      .then(response => response.json()) //Kiedy fetch dostanie odpowiedź z serwera (obietnica zostanie spełniona), do pierwszego then trafia obiekt typu Response...
      .then(responseJson => this.setState({users: responseJson.items})); //który musimy odpowiednio przekształcić na obiekt JSON (stąd metoda response => response.json()). Po tym przekształceniu ustawiamy stan users na tablicę itemsznajdującą się w odpowiedzi od API Githuba.
  }

  render() {
    return (
      <div>
        <form onSubmit={event => this.onSubmit(event)}>
          <label htmlFor="searchText">Search by user name</label>
          <input
            type="text"
            id="searchText"
            onChange={event => this.onChangeHandle(event)}
            value={this.state.searchText}/>
        </form>
        <UsersList users={this.state.users}/>
      </div>
    );
  }
}

class UsersList extends React.Component {
  get users() {
    return this.props.users.map(user => <User key={user.id} user={user}/>);
  }

  render() {
    return (
      <div>
        {this.users}
      </div>
    );
  }
}

class User extends React.Component {
  render() {
    return (
      <div>
        <img src={this.props.user.avatar_url} style={{maxWidth: '100px'}}/>
        <a href={this.props.user.html_url} target="_blank">{this.props.user.login}</a>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
