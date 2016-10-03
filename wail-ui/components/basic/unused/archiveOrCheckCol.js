import React, {Component, PropTypes} from 'react'
import {Row, Col} from 'react-flexbox-grid'
import ArchivalButtons from '../archiveCard/archivalButtons'
import ArchiveUrl from '../archiveCard/archive-url'

export default class ArchiveOrCheckCol extends Component {

  constructor (...args) {
    super(...args)
  }

  render () {
    return (
        <div>
          <Row>
            <Col xs>
              <ArchiveUrl />
            </Col>
          </Row>
          <Row>
            <Col xs>
              <ArchivalButtons />
            </Col>
          </Row>
        </div>
    )
  }

}