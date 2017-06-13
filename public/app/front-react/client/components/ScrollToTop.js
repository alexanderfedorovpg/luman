import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class ScrollToTop extends Component {

  // при смене урл прокручиваем экран либо к якорю,
  // либо вверх до упора
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      const anchor = this.getAnchor()

      if (anchor) {
        this.scrollToElement(anchor)
      }
      else {
        window.scrollTo(0, 0)
      }
    }
  }

  // при первоначальной загрузке проверяем, не выбран
  // какой либо якорь. если выбран - прокручиваем страницу к нему
  componentDidMount() {
    const anchor = this.getAnchor()

    if (anchor) {
      setTimeout(() => {
        this.scrollToElement(anchor)
      }, 100)
    }
  }

  // получаем якорь
  // @return {?element}
  getAnchor() {
    const hash = this.props.location.hash
    return hash && document.getElementById(hash.slice(1))
  }


  // прокручиваем страницу к элементу
  scrollToElement(el) {
    el.scrollIntoView()
  }

  render() {
    return this.props.children
  }
}

export default withRouter(ScrollToTop)
