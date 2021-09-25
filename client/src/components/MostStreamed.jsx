/* eslint-disable max-classes-per-file */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  faCaretDown, faCaretUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge } from 'react-bootstrap';

const loader = (
  <div className="loader" />
);

class MostStreamedToday extends React.Component {
  constructor(props) {
    super(props);
    this.state = { songs: [], ready: false };
  }

  async componentDidMount() {
    const { date } = this.props;
    let songs = await fetch(`/msst?date=${date}`);
    songs = await songs.json();

    this.setState({ songs: songs.rank, ready: true });
  }

  render() {
    const { songs, ready } = this.state;

    const rankings = songs.map((entry) => (
      <div key={entry.name + (entry.playcount * Math.floor(Math.random() * 300))} className="text-color3 center-div mb-3">
        <div style={{ width: '30px' }} className="mr-2 d-inline-flex flex-column align-items-center">
          <Badge className="font-15 text-color3 bg-dark">
            {entry.position + 1}
            <br />
            {
            entry.increment !== 0 ? (
              <Badge
                className="text-dark bg-color1 mt-1"
              >
                {entry.increment > 0 ? (
                  <span>
                    +
                    {entry.increment}
                  </span>
                ) : entry.increment}
              </Badge>
            ) : (<></>)
          }
          </Badge>
        </div>
        <Badge className="mx-2 d-inline-block">
          {
            entry.increment !== 0 ? (
              <>
                <FontAwesomeIcon
                  icon={entry.increment > 0 ? faCaretUp : faCaretDown}
                  style={{
                    color: entry.increment > 0 ? 'var(--success)' : 'var(--danger)',
                  }}
                />
              </>
            ) : (
              <>
                <span className="h4 text-secondary">-</span>
              </>
            )
          }
        </Badge>
        <img
          alt=""
          src={entry.cover ? entry.cover.uri : ''}
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
          <Badge className="font-15 pl-0 break-word text-left">{entry.name}</Badge>
          <br />
          <Badge className="bg-color1 text-color2 font-15 mt-1">{Number(entry.playcount).toLocaleString()}</Badge>
          <Badge className="bg-color2 text-color4 font-15 mt-1 ml-1">{(entry.difference !== undefined) ? `+ ${Number(entry.difference).toLocaleString()}` : 'Not tracked'}</Badge>
        </div>
      </div>
    ));
    return (
      ready
        ? (
          <>
            <h5 className="py-2 text-color1">Most streamed songs today</h5>
            {rankings}
          </>
        ) : loader
    );
  }
}

class MostStreamedAllTime extends React.Component {
  constructor() {
    super();
    this.state = { songs: [], ready: false };
  }

  async componentDidMount() {
    let data = await fetch('/mssa');
    data = await data.json();
    this.setState({ songs: data.rank, ready: true });
  }

  render() {
    const { songs, ready } = this.state;

    const rankings = songs.map((entry, index) => (
      <div key={entry.name + (entry.playcount * Math.floor(Math.random() * 300))} className="text-color3 center-div mb-3">
        <div style={{ width: '40px !important' }} className="mr-2 d-inline-flex flex-column align-items-center">
          <Badge className="font-15 text-color3 bg-dark">
            {index + 1}
          </Badge>
        </div>
        <img
          alt=""
          src={entry.cover ? entry.cover.uri : ''}
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
          <Badge className="font-15 pl-0 break-word text-left">{entry.name}</Badge>
          <br />
          <Badge className="bg-color1 text-color2 font-15 mt-1">{Number(entry.playcount).toLocaleString()}</Badge>
        </div>
      </div>
    ));
    return (
      ready ? (
        <>
          <h5 className="py-2 text-color1">Most streamed songs overall</h5>
          {rankings}
        </>
      ) : loader
    );
  }
}

export { MostStreamedToday, MostStreamedAllTime };
