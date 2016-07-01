import EventEmitter from "eventemitter3"
import UrlDispatcher from "../dispatchers/url-dispatcher"
import wailConstants from "../constants/wail-constants"
import * as urlActions from "../actions/archive-url-actions"
import settings from "../settings/settings"
import { shell } from 'electron'

const EventTypes = wailConstants.EventTypes

class urlStore extends EventEmitter {
  constructor () {
    super()
    this.urlMemento = { url: '', mementos: -1, inArchive: false }
    this.handleEvent = this.handleEvent.bind(this)
    this.getUrl = this.getUrl.bind(this)
    this.getMementoCount = this.getMementoCount.bind(this)
  }

  /*
   CHECK_URI_IN_ARCHIVE: null,
   VIEW_ARCHIVED_URI: null,
   */

  handleEvent (event) {
    console.log("Got an event url store", event)
    switch (event.type) {
      case EventTypes.HAS_VAILD_URI:
      {
        if (this.urlMemento.url != event.url) {
          this.urlMemento.url = event.url
          console.log("url updated ")
          this.emit('url-updated')
        }

        break
      }
      case EventTypes.GOT_MEMENTO_COUNT:
      {
        console.log('Got Memento count in store', event)
        this.urlMemento.mementos = event.mementos
        this.emit('memento-count-updated')
        break
      }
      case EventTypes.GET_MEMENTO_COUNT:
      {
        urlActions.askMemgator(this.urlMemento.url)
        this.emit('memento-count-fetch')
        break
      }

      case EventTypes.CHECK_URI_IN_ARCHIVE:
      {
        urlActions.checkUriIsInArchive(this.urlMemento.url)
          .then(wasIn => {
            if (wasIn.inArchive) {
              new Notification('The URL was in the archive', {
                body: `${wasIn.uri}`
              })
            } else {
              new Notification('The URL was not in the archive', {
                body: `${wasIn.uri}`
              })
            }

          })
          .catch(err => {
            console.log("There was an error when checking if the uri is in archive", err)
          })
        break
      }

      case EventTypes.VIEW_ARCHIVED_URI:
      {
        shell.openExternal(`${settings.get('wayback.uri_wayback')}/*/${this.urlMemento.url}`)
        break
      }

    }

  }

  getUrl () {
    return this.urlMemento.url
  }

  getMementoCount () {
    return this.urlMemento.mementos
  }

}

const UrlStore = new urlStore()

UrlDispatcher.register(UrlStore.handleEvent)
export default UrlStore