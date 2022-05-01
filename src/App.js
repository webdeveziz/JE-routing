import React from 'react'
import { Route } from 'react-router-dom'
import Login from './components/layouts/login'
import Main from './components/layouts/main'
import Users from './components/layouts/users'
import NavBar from './components/navBar'
import NotFound from './components/not-found'

const App = () => {
  return (<>
    <NavBar />
    <Route path={`/`} exact component={Main}/>
    <Route path={`/login`} component={Login}/>
    <Route path={`/users/:postId?`} component={Users}/>
    <Route path={`/404`} exact component={NotFound}/>
    {/* <Redirect to={`/404`}/> */}
  </>)
}

export default App
