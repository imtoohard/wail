import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import RaisedButton from 'material-ui/RaisedButton'
import FixIcon from 'material-ui/svg-icons/action/build'
import KillIcon from 'material-ui/svg-icons/content/clear'
import * as serviceAction from '../../actions/redux/services'

const style = {
  servicesSS: {
    width: '80px',
    cursor: 'default'
  },
  servicesActionsH: {
    width: '200px',
    cursor: 'default',
    textAlign: 'center'
  },
  servicesActions: {
    width: '200px',
    cursor: 'default'
  },
  serviceActionButton: {
    margin: '10px'
  },
}

const stateToProps = state => {
  let serviceStatues = state.get('serviceStatuses')
  let wbGood = serviceStatues.get('wayback')
  let hGood = serviceStatues.get('heritrix')
  let waybackStatus = wbGood ? 'Running' : 'X'
  let heritrixStatus = hGood ? 'Running' : 'X'
  return {
    wbGood,
    hGood,
    waybackStatus,
    heritrixStatus
  }
}

const dispatchToProps = dispatch => bindActionCreators(serviceAction, dispatch)

const ServiceStatus = ({
  wbGood, hGood, waybackStatus, heritrixStatus,
  startHeritrix, stopHeritrix,
  startWayback, stopWayback
}) => (
  <Table>
    <TableHeader
      displaySelectAll={false}
      adjustForCheckbox={false}
    >
      <TableRow>
        <TableHeaderColumn style={style.servicesSS}>Service</TableHeaderColumn>
        <TableHeaderColumn style={style.servicesSS}>State</TableHeaderColumn>
        <TableHeaderColumn style={style.servicesSS}>Version</TableHeaderColumn>
        <TableHeaderColumn style={style.servicesActionsH}>Actions</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody
      displayRowCheckbox={false}
      showRowHover={false}
    >
      <TableRow
        selectable={false}
      >
        <TableRowColumn style={style.servicesSS}>Wayback</TableRowColumn>
        <TableRowColumn style={style.servicesSS}>{waybackStatus}</TableRowColumn>
        <TableRowColumn style={style.servicesSS}>0.32.1</TableRowColumn>
        <TableRowColumn style={style.servicesActions}>
            <span style={{ marginLeft: '50px' }}>
              <RaisedButton
                disabled={wbGood}
                style={style.serviceActionButton}
                labelPosition='before'
                label='Start'
                onMouseDown={startWayback}
                icon={<FixIcon />}
              />
              <RaisedButton
                disabled={!wbGood}
                style={style.serviceActionButton}
                labelPosition='before'
                label='Stop'
                onMouseDown={stopWayback}
                icon={<KillIcon />}
              />
            </span>
        </TableRowColumn>
      </TableRow>
      <TableRow
        selectable={false}
      >
        <TableRowColumn style={style.servicesSS}>Heritrix</TableRowColumn>
        <TableRowColumn style={style.servicesSS}>{heritrixStatus}</TableRowColumn>
        <TableRowColumn style={style.servicesSS}>3.2.0</TableRowColumn>
        <TableRowColumn style={style.servicesActions}>
            <span style={{ marginLeft: '50px' }}>
              <RaisedButton
                disabled={hGood}
                style={style.serviceActionButton}
                labelPosition='before'
                label='Start'
                onMouseDown={startHeritrix}
                icon={<FixIcon />}
              />
              <RaisedButton
                disabled={!hGood}
                style={style.serviceActionButton}
                labelPosition='before'
                label='Stop'
                onMouseDown={stopHeritrix}
                icon={<KillIcon />}
              />
            </span>
        </TableRowColumn>
      </TableRow>
    </TableBody>
  </Table>
)

ServiceStatus.propTypes = {
  wbGood: PropTypes.bool.isRequired,
  hGood: PropTypes.bool.isRequired,
  waybackStatus: PropTypes.string.isRequired,
  heritrixStatus: PropTypes.string.isRequired,
  startHeritrix: PropTypes.func.isRequired,
  stopHeritrix: PropTypes.func.isRequired,
  startWayback: PropTypes.func.isRequired,
  stopWayback: PropTypes.func.isRequired
}

export default connect(stateToProps, dispatchToProps)(ServiceStatus)