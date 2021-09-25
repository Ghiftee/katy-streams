/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Badge,
  Button, Nav,
  Container,
} from 'react-bootstrap';
import {
  faArrowUp, faCalendarAlt, faCircle,
} from '@fortawesome/free-solid-svg-icons';
import {
  faTwitterSquare,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Route, Switch, Redirect, useLocation, Link,
} from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
  selectStreams,
  selectDate,
  selectCovers,
  selectReadyState,
  selectArtistPic,
  selectLeadStreams,
  selectFeaturedStreams,
  selectLeadDiff,
  selectFeaturedDiff,
} from './redux/dataSlice';
import { AlbumHistory, SongHistory, TotalHistory } from './components/history.jsx';
import { MostStreamedToday, MostStreamedAllTime } from './components/MostStreamed.jsx';
import './App.css';
import spotify from './spotify.svg';
import Stats from './components/stats';
import Theme from './components/theme';

function StreamTable(props) {
  const { album, cover } = props;
  let songs;
  if (album.streams) {
    songs = (
      album.streams.map((song, index) => (
        <div key={song.name + song.playcount + Math.floor(Math.random() * 300)} className="text-color3 center-div mb-3 ">
          <img
            alt=""
            src={cover ? cover.uri : ''}
            className="mr-2 d-inline-block"
            style={{
              height: '50px',
              width: '50px',
              borderRadius: '15%',
              border: '2px solid var(--color1)',
            }}
          />
          <div
            className="d-inline-block h6 mb-0"
          >
            <Badge className="font-15 pl-0 break-word text-left">
              <Link
                to={`/songhistory?name=${album.name.replace('&', '>>>')}&length=${album.streams.length}&track=${index}`}
                style={{
                  color: 'var(--color3)',
                }}
              >
                {song.name}
              </Link>
            </Badge>
            <br />
            <Badge className="bg-color2 text-color3 font-15 mt-1">{Number(song.playcount).toLocaleString()}</Badge>
            <Badge className="bg-color1 text-color2 font-15 mt-1 ml-1">{(song.difference !== undefined) ? `+ ${Number(song.difference).toLocaleString()}` : 'Not tracked'}</Badge>
          </div>
        </div>
      ))
    );
    let total = 0;
    let increment = 0;
    let noDiff = false;

    album.streams.forEach((song) => {
      total += song.playcount;
      increment += song.difference ? song.difference : 0;
      if (song.difference === undefined) noDiff = true;
    });
    if (album.streams.length > 1) {
      songs.push(
        <div key={Math.floor(Math.random() * total)} className="center-div mb-3 ">
          <img
            alt=""
            src={cover ? cover.uri : ''}
            className="mr-2 d-inline-block"
            style={{
              height: '50px',
              width: '50px',
              borderRadius: '10%',
              border: '2px solid var(--color1)',
            }}
          />
          <div className="d-inline-block h6 mb-0 text-color2">
            <Badge className="text-color3 pl-0 font-15">
              <Link
                to={`/history?name=${album.name.replace('&', '>>>')}&length=${album.streams.length}`}
                style={{
                  color: 'white',
                }}
              >
                Total
              </Link>
            </Badge>
            <br />
            <Badge className="bg-color2 text-color3 font-15 mt-1">{Number(total).toLocaleString()}</Badge>
            <Badge className="bg-color1 text-color2 font-15 mt-1 ml-1">{noDiff ? 'New' : `+ ${Number(increment).toLocaleString()}`}</Badge>
          </div>
        </div>,
      );
    }
  }
  return (
    <>
      <h4 className="text-color1 mt-2 ">{album.name}</h4>
      {songs}
    </>
  );
}

const Streams = () => {
  const streams = useSelector(selectStreams);
  const date = useSelector(selectDate);
  const covers = useSelector(selectCovers);
  const albums = (
    streams.map((album, index) => (
      <StreamTable
        key={album.name + album.streams[0].playcount}
        album={album}
        date={date}
        cover={covers[index]}
      />
    )));
  return (
    <>
      <Badge className="bg-color1 text-color2 break-word">
        Click on a song&apos;s title or an album&apos;s total to
        see it&apos;s streaming history
      </Badge>
      {albums}
    </>
  );
};

function Dashboard() {
  const date = useSelector(selectDate);
  const pic = useSelector(selectArtistPic);
  const leadStreams = useSelector(selectLeadStreams);
  const featuredStreams = useSelector(selectFeaturedStreams);
  const diffLead = useSelector(selectLeadDiff);
  const diffFeat = useSelector(selectFeaturedDiff);
  const ready = useSelector(selectReadyState);
  const loader = (
    <div className="loader" />
  );

  const gotoTop = () => {
    const infoDiv = document.querySelector('.info-div');
    const navbar = document.getElementById('navbar');
    const mainDiv = document.getElementById('mainDiv');
    if (infoDiv && navbar) {
      window.scrollTo({
        left: 0,
        top: infoDiv.offsetHeight - navbar.offsetHeight,
        behavior: 'smooth',
      });
    }
    if (mainDiv) mainDiv.scrollTo(0, 0);
  };

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== '/allstreams') {
      gotoTop();
    }
  }, [pathname]);

  useEffect(() => {
    const theme1 = localStorage.getItem('theme1');
    const theme2 = localStorage.getItem('theme2');
    const theme3 = localStorage.getItem('theme3');
    const theme4 = localStorage.getItem('theme4');
    if (theme1) document.body.style.setProperty('--color1', `var(--${theme1})`);
    if (theme2) document.body.style.setProperty('--color2', `var(--${theme2})`);
    if (theme3) document.body.style.setProperty('--color3', `var(--${theme3})`);
    if (theme4) document.body.style.setProperty('--color4', `var(--${theme4})`);
    if (theme1) {
      const color1 = getComputedStyle(document.body).getPropertyValue('--color1');
      Array.from(document.head.getElementsByTagName('meta')).find((tag) => tag.name === 'theme-color').content = color1;
    }
  }, [localStorage.getItem('theme1')]);

  const page = (
    <div className="d-md-flex">
      <div className="info-div border-light d-flex flex-column">
        <Nav className="myNav nav-justified" id="navbar">
          <LinkContainer to="/allstreams">
            <Nav.Link>All Streams</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/rank">
            <Nav.Link>Most Streamed Today</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/alltime">
            <Nav.Link>Most Streamed Overall</Nav.Link>
          </LinkContainer>
        </Nav>
        <Container className="align-self-center">
          <div>
            <Theme />
            <img
              alt=""
              src={pic}
              className="d-inline-block"
              style={{
                height: '60px',
                width: '60px',
                borderRadius: '15%',
                border: '2px solid var(--color1)',
              }}
            />
          </div>
          <div className="d-flex align-items-center">
            <h3 className="text-color3 m-0" id="headerText">Katy Perry on Spotify</h3>
            <img
              alt=""
              src={spotify}
              className="d-inline-block"
              style={{
                height: '50px',
                width: '50px',
              }}
            />
          </div>
          <div className="py-2">
            <Badge className="bg-color3 text-color2 mb-1 font-15 ">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-color1 mr-1" />
              Data for
              {' '}
              {date.split('-').join('/')}
            </Badge>
            {/* <LinkContainer to="/">
              <Button
                className="bg-dark border border-color1 py-0 ml-1 mb-1"
              >
                See History
              </Button>
            </LinkContainer> */}
            <br />
            <Badge className="bg-color1 mb-1">
              <Badge className="font-15 d-block d-sm-inline-block text-left">Total Streams</Badge>
              <Badge className="bg-dark text-color3 font-15">
                {Number(leadStreams + featuredStreams).toLocaleString()}
              </Badge>
              <Badge className="bg-white text-dark font-15">
                +
                {Number(diffFeat + diffLead).toLocaleString()}
              </Badge>
            </Badge>
            <br />
            <Badge className="bg-color1 mb-1">
              <Badge className="font-15 d-block d-sm-inline-block text-left">As Lead Artist</Badge>
              <Badge className="bg-dark text-color3 font-15">
                {Number(leadStreams).toLocaleString()}
              </Badge>
              <Badge className="bg-white text-dark font-15">
                +
                {Number(diffLead).toLocaleString()}
              </Badge>
            </Badge>
            <br />
            <Badge className="bg-color1 mb-1">
              <Badge className="font-15 d-block d-sm-inline-block text-left">Features</Badge>
              <Badge className="bg-dark text-color3 font-15">
                {Number(featuredStreams).toLocaleString()}
              </Badge>
              <Badge className="bg-white text-dark font-15">
                +
                {Number(diffFeat).toLocaleString()}
              </Badge>
            </Badge>
            <br />
            <Badge className="bg-dark">
              <Badge className="bg-color1 mr-1 text-color3 font-15"><FontAwesomeIcon icon={faTwitterSquare} /></Badge>
              <Badge className="text-color3 font-15 pl-0">@acekatycat</Badge>
            </Badge>
          </div>
          <Stats />
        </Container>
        <Button onClick={gotoTop} id="back-to-top" className="border-0 position-fixed bg-color1 p-2 rounded-pill">
          <FontAwesomeIcon icon={faArrowUp} className="text-light" />
        </Button>
        <div id="setting-color-display">
          <Badge
            className="bg-dark font-25"
            style={{
              border: '2px solid var(--color1)',
            }}
          >
            Setting Theme Color
          </Badge>
          <div className="mt-3">
            <FontAwesomeIcon
              className="mr-2 font-25 glow"
              icon={faCircle}
            />
            <FontAwesomeIcon
              className="mr-2 font-25 glow-1"
              icon={faCircle}
            />
            <FontAwesomeIcon
              className="mr-2 font-25 glow-2"
              icon={faCircle}
            />
            <FontAwesomeIcon
              className="mr-2 font-25 glow-3"
              icon={faCircle}
            />
          </div>
        </div>
      </div>
      <div className="main-div pb-3 px-3" id="mainDiv">
        <Switch>
          <Route exact path="/history/" component={AlbumHistory} />
          <Route exact path="/rank/">
            <MostStreamedToday date={date} />
          </Route>
          <Route exact path="/alltime/" component={MostStreamedAllTime} />
          <Route exact path="/totalhistory/" component={TotalHistory} />
          <Route exact path="/songhistory/" component={SongHistory} />
          <Route exact path="/allstreams">
            <Streams />
          </Route>
          <Redirect from="/" to="/allstreams" />
        </Switch>
      </div>
    </div>
  );
  return (
    <>
      {ready ? page : loader}
    </>
  );
}

export default function App() {
  return (
    <Dashboard />
  );
}

// mongo "mongodb+srv://cluster0.ujqne.mongodb.net/katystreams" --username preciousbetine
