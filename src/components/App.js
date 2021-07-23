import React, { Component } from 'react';
import Header from './Header/Header';
import { API_URL, API_KEY_3, fetchAPI } from '../api/api';
import MoviesPage from './pages/MoviesPage/MoviesPage';
import MoviePage from './pages/MoviePage/MoviePage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { updateAuth, onLogOut, fetchAuth } from '../redux/auth/auth.actions';
import { connect } from 'react-redux';

export const AppContext = React.createContext();
class App extends Component {
  componentDidMount() {
    const { session_id, fetchAuth } = this.props;
    if (session_id) {
      fetchAuth(session_id)
    }
  }

  render() {
    const { user, session_id, updateAuth, onLogOut } = this.props;
    return (
      <Router>
        <AppContext.Provider
          value={{
            user,
            session_id,
            updateAuth,
            onLogOut,
          }}>
          <>
            <Header user={user} />
            <Route exact path="/" component={MoviesPage} />

            <Route path="/movie/:id" component={MoviePage} />
          </>
        </AppContext.Provider>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    session_id: state.session_id,
  };
};
const mapDispatchToProps = {
  updateAuth, 
  onLogOut,
  fetchAuth
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
