import React from 'react';
import css from './Searchbar.module.css';
import { BsFillSearchHeartFill } from 'react-icons/bs';

export class Searchbar extends React.Component {
  state = {
    imgName: '',
  }

  handleChange = (e) => {
    const {value} = e.currentTarget;
        this.setState({
          imgName: value,
        })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.imgName);
    this.reset();
  }

  reset = () => {
    this.setState({
    imgName: '',
    })
  }

  render() {

    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.button}>
            <BsFillSearchHeartFill width="40" fill='black'>Search</BsFillSearchHeartFill>
          </button>
      
          <input
            className={css.input}
            onChange={this.handleChange}
            name='imgName'
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
      )
  }
  
} 

export default Searchbar;