import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    query: '',
  };

  onChange = (event) => {
  const value = event.target.value;
this.setState({query: value})

  };
  handleSubmit = (event) => {
event.preventDefault ();
console.log('hello world');
this.props.onSubmit(this.state.query);
this.setState({query: ''});
  };

  render() {
    return (
      <>
        <SearchFormStyled onSubmit={this.handleSubmit}>
        <InputSearch onChange={this.onChange}  value={this.state.query}/>
       <FormBtn><FiSearch/></FormBtn>
        </SearchFormStyled>
      </>
    );
  }
};
