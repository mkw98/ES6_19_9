"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

    _this.state = {
      searchText: '',
      users: []
    };
    return _this;
  }

  _createClass(App, [{
    key: "onChangeHandle",
    value: function onChangeHandle(event) {
      this.setState({ searchText: event.target.value });
    }
  }, {
    key: "onSubmit",
    value: function onSubmit(event) {
      var _this2 = this;

      //W metodzie onSubmit wykorzystujemy wiedzę na temat promise'ów. 
      event.preventDefault();
      var searchText = this.state.searchText;

      var url = "https://api.github.com/search/users?q=" + searchText; //Po skonsturowaniu adresu URL dzięki szablonom ES6 ...
      fetch(url) // ...wywołujemy funkcję fetch, która zwraca Promise. Funkcja fetch jest interfejsem dzięki któremu możemy pobierać różne zasoby z sieci (por. obiekt XHR albo inny sposób na korzystanie z AJAX). Fetch jest po prostu natywną implementacją zapytań ajaxowych korzystającą z promisów.
      .then(function (response) {
        return response.json();
      }) //Kiedy fetch dostanie odpowiedź z serwera (obietnica zostanie spełniona), do pierwszego then trafia obiekt typu Response...
      .then(function (responseJson) {
        return _this2.setState({ users: responseJson.items });
      }); //który musimy odpowiednio przekształcić na obiekt JSON (stąd metoda response => response.json()). Po tym przekształceniu ustawiamy stan users na tablicę itemsznajdującą się w odpowiedzi od API Githuba.
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return React.createElement(
        "div",
        null,
        React.createElement(
          "form",
          { onSubmit: function onSubmit(event) {
              return _this3.onSubmit(event);
            } },
          React.createElement(
            "label",
            { htmlFor: "searchText" },
            "Search by user name"
          ),
          React.createElement("input", {
            type: "text",
            id: "searchText",
            onChange: function onChange(event) {
              return _this3.onChangeHandle(event);
            },
            value: this.state.searchText })
        ),
        React.createElement(UsersList, { users: this.state.users })
      );
    }
  }]);

  return App;
}(React.Component);

var UsersList = function (_React$Component2) {
  _inherits(UsersList, _React$Component2);

  function UsersList() {
    _classCallCheck(this, UsersList);

    return _possibleConstructorReturn(this, (UsersList.__proto__ || Object.getPrototypeOf(UsersList)).apply(this, arguments));
  }

  _createClass(UsersList, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        this.users
      );
    }
  }, {
    key: "users",
    get: function get() {
      return this.props.users.map(function (user) {
        return React.createElement(User, { key: user.id, user: user });
      });
    }
  }]);

  return UsersList;
}(React.Component);

var User = function (_React$Component3) {
  _inherits(User, _React$Component3);

  function User() {
    _classCallCheck(this, User);

    return _possibleConstructorReturn(this, (User.__proto__ || Object.getPrototypeOf(User)).apply(this, arguments));
  }

  _createClass(User, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement("img", { src: this.props.user.avatar_url, style: { maxWidth: '100px' } }),
        React.createElement(
          "a",
          { href: this.props.user.html_url, target: "_blank" },
          this.props.user.login
        )
      );
    }
  }]);

  return User;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
