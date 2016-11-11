import React from 'react'
import {Router, hashHistory, Route, IndexRoute} from 'react-router'
import Layout from './components/layout/layout'
import BasicTab from './components/basic'
import General from './components/advanced/general'
import Wayback from './components/wayback/wayback'
import CollectionView from './components/wayback/collectionView/collectionView'
import Heritrix from './components/heritrix/heritrix-tab'
import Misc from './components/advanced/miscellaneous'
import hi from './components/combined/hi'
import combined from './components/combined'
// const Routes = (
//   <Route path='/' component={Layout}>
//     <IndexRoute component={Test}/>
//   </Route>
// )

export default (
  <Router history={hashHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={BasicTab} name='Wail'/>
      <Route path='services' name='Services' component={General}/>
      <Route path='wayback' name='Wayback' component={Wayback}/>
      <Route path='wayback/:col' name=':col' component={CollectionView}/>
      <Route path='heritrix' name='Heritrix' component={Heritrix}/>
      <Route component={combined}>
        <Route path='misc' name='Misc' component={hi}/>
      </Route>
    </Route>
  </Router>
)
