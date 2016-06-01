import React, { Component } from 'react'
import Drawer from 'material-ui/Drawer'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import Popover from 'material-ui/Popover'
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar'
import * as Heritrix from '../actions/heritrix-actions'

import NewCrawlDialog from '../componets/advanced/heritrix/newCrawlDialog'



export default class Debug extends Component {

   constructor(props,context) {
      super(props,context)
      this.state = {
         open: false
      }
      this.handleTouchTap = this.handleTouchTap.bind(this)
      this.handleRequestClose= this.handleRequestClose.bind(this)
      this.launchHeritrix = this.launchHeritrix.bind(this)
      this.killHeritrix = this.killHeritrix.bind(this)

   }


   handleTouchTap(event){
      event.preventDefault()
      this.setState({
         open: true,
         anchorEl: event.currentTarget,
      })
   }

   handleRequestClose()  {
      this.setState({
         open: false,
      })
   }

   launchHeritrix(){
      console.log("Launch Heritrix")
      Heritrix.launchHeritrix()
   }
   killHeritrix(){
      console.log("Launch Heritrix")
      Heritrix.killHeritrix()
   }



   render() {
      return (
      <div>
      <Toolbar>
         <ToolbarGroup firstChild={true}>
            <RaisedButton
               onTouchTap={this.handleTouchTap}
               label="Heritrix"
            />
            <NewCrawlDialog />
         </ToolbarGroup>
      </Toolbar>
         <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleRequestClose}
         >
            <Menu>
               <MenuItem onTouchTap={this.launchHeritrix} primaryText="Start Heritrix"/>
               <MenuItem onTouchTap={this.killHeritrix} primaryText="Kill Heritrix"/>
               <MenuItem onTouchTap={(e) => Heritrix.makeHeritrixJobConf('ss',15000)} primaryText="make job"/>
            </Menu>
         </Popover>
         </div>

      )
   }
}