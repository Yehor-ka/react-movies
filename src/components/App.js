import React, { Component } from 'react';
import Header from './Header/Header';
import { API_URL, API_KEY_3, fetchAPI } from '../api/api';
import MoviesPage from './pages/MoviesPage/MoviesPage';
import MoviePage from './pages/MoviePage/MoviePage';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import { actionCreatorUpdateAuth, actionCreatorLogOut } from '../actions/actions';
import { connect } from 'react-redux';
 

export const AppContext = React.createContext()
class App extends Component {
  
  componentDidMount() {

    const {session_id} = this.props
    if(session_id) {
      fetchAPI(`${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`)
      .then(user => {
        this.updateAuth(user, session_id);
      })
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
            onLogOut
          }}>
          
            <>
              <Header user={user} />
              <Route exact path="/" component={MoviesPage} />
              
              <Route path="/movie/:id" component={MoviePage}/>
              
            </>
          
        </AppContext.Provider>
      </Router>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    session_id: state.session_id
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateAuth: (user, session_id) => 
      dispatch(
        actionCreatorUpdateAuth({
          user,
          session_id
        })),
    onLogOut: () => dispatch(actionCreatorLogOut())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

