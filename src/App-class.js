import { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CardList from './components/card-list/card-list.class-component';
import SearchBox from './components/search-box/search-box.class-component';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      currentMonsters: []
    };
  } 

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => this.setState(() => {
        return {
          monsters: users,
          searchField: ''
        }
      }
      ));
  }

  onSearchChange = (event) => {
    const searchField = event.target.value.toLowerCase();
    this.setState(() => {
        return { searchField };
    })
  };

  render() {

    // This creates shorthand accessors for local lariables/functions. You assign the context in which they live and can then call them without the context
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((x) => { return x.name.toLowerCase().includes(searchField)});

    return (
      <div className="App">
      <h1 className='app-title'>Monsters Rolodex</h1>
        <SearchBox onChangeHandler={onSearchChange} placeholder='search monsters' className ='monsters-search-box' />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
