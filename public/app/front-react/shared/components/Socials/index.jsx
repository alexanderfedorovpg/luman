import React, {Component} from 'react';

import share from './img/share.png'
import facebook from './img/facebook.png'
import twitter from './img/twitter.png'
import odnoklassniki from './img/odnoklassniki.png'
import vkontakte from './img/vkontakte.png'
import viber from './img/viber.png'

import './style.scss'

const MakeButton = ({className, name, newsTitle, classNameImage, shareLink}) => {
  let onClick;
  let image;
  let href;
  switch (name) {

    case 'facebook' :
      href = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(shareLink);
      onClick = () => {
        window.open(href, `${'Опубликовать ссылку в Facebook'}`, 'width=640,height=436,toolbar=0,status=0');
        return false;
      };
      image = <img className={classNameImage} src={facebook}/>;
      break;

    case 'twitter' :
      href = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(newsTitle + " " + shareLink);
      onClick = () => {
        window.open(href, 'Опубликовать ссылку в Twitter', 'width=800,height=300,resizable=yes,toolbar=0,status=0');
        return false;
      };
      image = <img className={classNameImage} src={twitter}/>;
      break;

    case 'vkontakte' :
      let index = Math.floor(Math.random() * 10000);
      href = "https://vk.com/share.php?url=" + encodeURIComponent(shareLink);
      onClick = () => {
        window.open(href, 'Опубликовать ссылку во Вконтакте', 'width=800,height=300,toolbar=0,status=0');
        return false;
      };
      image = <img className={classNameImage} src={vkontakte}/>;
      break;

    case 'viber' :
      onClick = () => {
        return false;
      };
      image = <img className={classNameImage} src={viber}/>;
      href = "viber://forward?text=" + encodeURIComponent(newsTitle + " " + shareLink);
      break;

    case 'odnoklassniki' :
      href = "http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1&st._surl=" + shareLink;
      onClick = () => {
        window.open(href, 'Опубликовать ссылку во Вконтакте', 'width=800,height=300,toolbar=0,status=0');
        return false;
      };
      image = <img className={classNameImage} src={odnoklassniki}/>;
      break;
  }
  return (
      <a target="_blank"
         onClick={onClick}
         href={href}
         className={className}>
        {image}
      </a>)
};

class Socials extends Component {
  constructor(props) {
    super(props);
    this.state = {isOpen: false};
  }

  openClose(e) {
    if (this.state.isOpen) this.setState({isOpen: false});
    else this.setState({isOpen: true})
  }

  render() {
    let newsTitle = this.props.title;
    return (
        <div className="social-links social-links--vertical social-links--pad">
          <a onClick={(e) => this.openClose(e)} className="social-links__ico-link social-links__share">
            <img src={share} className="social-links__ico-image"/>
          </a>
          <div className={"social-links__list" + (this.state.isOpen ? ' is-open' : '')}>
            <MakeButton className="social-links__ico-link"
                        classNameImage="social-links__ico-image"
                        name="facebook"
                        newsTitle={newsTitle}
                        shareLink={this.props.shareLink}
            />
            <MakeButton className="social-links__ico-link"
                        classNameImage="social-links__ico-image"
                        name="twitter"
                        newsTitle={newsTitle}
                        shareLink={this.props.shareLink}
            />
            <MakeButton className="social-links__ico-link"
                        classNameImage="social-links__ico-image"
                        name="odnoklassniki"
                        newsTitle={newsTitle}
                        shareLink={this.props.shareLink}
            />
            <MakeButton className="social-links__ico-link"
                        classNameImage="social-links__ico-image"
                        name="vkontakte"
                        newsTitle={newsTitle}
                        shareLink={this.props.shareLink}
            />
            <MakeButton className="social-links__ico-link"
                        classNameImage="social-links__ico-image"
                        name="viber"
                        newsTitle={newsTitle}
                        shareLink={this.props.shareLink}
            />
          </div>
        </div>
    )
  }
}
export default Socials
