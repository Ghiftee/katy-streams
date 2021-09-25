/* eslint-disable max-classes-per-file */
/* eslint-disable react/prop-types */
import { faArrowLeft, faArrowRight, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import {
  Badge,
  Button,
  ButtonGroup,
  Container,
  Table,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class TotalHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = { values: [], start: 0 };
  }

  componentDidMount() {
    const { start } = this.state;
    fetch(`/thistory?start=${start}&stop=30`).then((data) => data.json())
      .then((result) => {
        this.setState({
          values: result.data,
        });
      });
  }

  render() {
    const { values } = this.state;
    const display = values.map((entry) => (
      <tr key={entry.date}>
        <td className="text-warning">{entry.date}</td>
        <td className="text-white">{Number(entry.diffLead).toLocaleString()}</td>
        <td className="text-white">{Number(entry.diffFeat).toLocaleString()}</td>
        <td className="text-color2">{Number(entry.diffLead + entry.diffFeat).toLocaleString()}</td>
      </tr>
    ));
    return (
      <>
        <h3 className="p-3">Total Streams History</h3>
        <Table className="table-responsive-xs table-bordered">
          <thead className="bg-dark text-white">
            <tr>
              <td>Date</td>
              <td>Lead</td>
              <td>Featured</td>
              <td>Total</td>
            </tr>
          </thead>
          <tbody className="bg-dark">
            {display}
          </tbody>
        </Table>
        <div className="text-center">
          <ButtonGroup>
            <LinkContainer to="/">
              <Button variant="secondary">Back</Button>
            </LinkContainer>
            <Button variant="warning">Previous</Button>
            <Button variant="danger">Next</Button>
          </ButtonGroup>
        </div>
      </>
    );
  }
}

class SongHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      songDifferences: [],
      ready: false,
      date: new Date(),
      totalStreamsForTheMonth: 0,
      months: ['January ', 'February ', 'March ', 'April ', 'May ', 'June ', 'July ',
        'August ', 'September ', 'October ', 'November ', 'December '],
    };
    this.updateValues = this.updateValues.bind(this);
  }

  componentDidMount() {
    this.updateValues();
  }

  async updateValues(e) {
    await this.setState({ ready: false });
    const { date } = this.state;

    if (e) {
      if (e.target.id === 'next-btn') {
        date.setMonth(date.getMonth() + 1);
      }
      if (e.target.id === 'previous-btn') {
        date.setMonth(date.getMonth() - 1);
      }
    }

    const { location } = this.props;
    let result = await fetch(`/songh${location.search}&date=${`${date.getMonth() + 1}-${date.getFullYear()}`}`);
    result = await result.json();

    const songDifferences = [];

    if (result.data.length > 1) {
      result.data.forEach((entry, index) => {
        const newSong = entry.streams;
        newSong.date = entry.date;
        if (result.data[index + 1]) {
          newSong.difference = entry.streams.playcount
          - result.data[index + 1].streams.playcount;
        } else {
          newSong.difference = 0;
        }
        songDifferences.push(newSong);
      });
      songDifferences.pop();
      this.setState({
        totalStreamsForTheMonth: songDifferences.reduce(
          (a, b) => a + b.difference, 0,
        ),
      });
      await this.setState({
        name: songDifferences[0].name,
        songDifferences,
        ready: true,
        date,
      });
    } else {
      console.log(result);
      this.setState({
        songDifferences: [],
        name: result.data[0].streams.name,
        ready: true,
      });
    }
  }

  render() {
    const {
      name, ready, songDifferences,
    } = this.state;

    const history = songDifferences.map((entry, index) => (
      <div key={`${entry.name}-${index + 88}`}>
        <Badge className="bg-color4 text-left mb-1 d-inline-flex align-items-center">
          <Badge className="bg-color1 text-color2 border border-dark font-15">
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
            {
              entry.date.split('-')[0].length === 1
                ? `0${entry.date.split('-').join('/')}`
                : entry.date.split('-').join('/')
            }
          </Badge>
          <Badge className="bg-color1 text-color2 ml-1 font-15 border border-dark">
            {'+ '}
            {Number(entry.difference).toLocaleString()}
          </Badge>
        </Badge>
      </div>
    ));
    const loader = (
      <div className="loader-small" />
    );
    const { date, months, totalStreamsForTheMonth } = this.state;
    return (
      <Container className="pr-0 pr-md-3 pl-0 pl-md-3" fluid>
        <h3 className="text-white pt-3 mb-1">
          {name ? `${name} history` : ''}
        </h3>
        <h5 className="text-color1 mb-3">
          {
            months[date.getMonth()]
          }
          {
            `${date.getFullYear()}`
          }
          <Badge className="bg-color3 text-color2 ml-2">
            {Number(totalStreamsForTheMonth).toLocaleString()}
            {' '}
            Streams
          </Badge>
        </h5>
        <ButtonGroup className="mb-2 d-block">
          <Button
            id="previous-btn"
            className="bg-color2 border-0 text-color3"
            onClick={this.updateValues}
            disabled={((date.getFullYear() === 2021)
              && (date.getMonth() + 1 === 6)) || !ready}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Previous Month
          </Button>
          <Button
            id="next-btn"
            className="bg-color1 border-0 text-color3"
            onClick={this.updateValues}
            disabled={((date.getFullYear() === (new Date()).getFullYear())
              && (date.getMonth() === (new Date()).getMonth())) || !ready}
          >
            Next Month
            <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </Button>
        </ButtonGroup>
        { ready ? history : loader }
        <Badge className="mb-2">Data is available from the 10th of June 2021 till date</Badge>
      </Container>
    );
  }
}

class AlbumHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      values: [],
      ready: false,
      date: new Date(),
      totalStreamsForTheMonth: 0,
      months: ['January ', 'February ', 'March ', 'April ', 'May ', 'June ', 'July ',
        'August ', 'September ', 'October ', 'November ', 'December '],
    };
    this.updateValues = this.updateValues.bind(this);
  }

  componentDidMount() {
    this.updateValues();
  }

  async updateValues(e) {
    await this.setState({ ready: false });
    const { date } = this.state;

    if (e) {
      if (e.target.id === 'next-btn') {
        date.setMonth(date.getMonth() + 1);
      }
      if (e.target.id === 'previous-btn') {
        date.setMonth(date.getMonth() - 1);
      }
    }

    const { location } = this.props;
    let result = await fetch(`/albumhistory${location.search}&date=${`${date.getMonth() + 1}-${date.getFullYear()}`}`);
    result = await result.json();

    const songDifferences = [];

    if (result.data.length > 0) {
      result.data.forEach((entry, index) => {
        const tmpArray = [];
        entry.streams.forEach((song, id) => {
          const newSong = song;
          if (result.data[index + 1]) {
            newSong.difference = song.playcount - result.data[index + 1].streams[id].playcount;
          } else {
            newSong.difference = 0;
          }
          tmpArray.push(newSong);
        });
        tmpArray[0].date = entry.date;
        songDifferences.push(tmpArray);
      });
      songDifferences.pop();
      this.setState({
        totalStreamsForTheMonth: songDifferences.reduce(
          (a, b) => a + b.reduce((c, d) => c + d.difference, 0), 0,
        ),
      });
      await this.setState({
        name: result.name,
        values: songDifferences,
        ready: true,
        date,
      });
    } else {
      this.setState({
        values: [],
        ready: true,
        totalStreamsForTheMonth: 0,
      });
    }
  }

  render() {
    const {
      name, values, ready,
    } = this.state;

    const history = values.length > 0 ? values.map((entry, index) => {
      const sum = entry.reduce((a, b) => a + b.difference, 0);
      return (
        <div key={`${entry[0].date}-${index + 88}`}>
          <Badge className="bg-color4 text-left mb-1 d-inline-flex align-items-center">
            <Badge className="bg-color1 text-color2 border border-dark font-15">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
              {
                entry[0].date.split('-')[0].length === 1
                  ? `0${entry[0].date.split('-').join('/')}`
                  : entry[0].date.split('-').join('/')
              }
            </Badge>
            <Badge className="bg-color1 text-color2 ml-1 font-15 border border-dark">
              {'+ '}
              {Number(sum).toLocaleString()}
            </Badge>
          </Badge>
        </div>
      );
    }) : (
      <h6 className="text-color2 mt-2">No data for this period</h6>
    );
    const loader = (
      <div className="loader-small" />
    );
    const { date, months, totalStreamsForTheMonth } = this.state;
    return (
      <Container className="pr-0 pr-md-3 pl-0 pl-md-3" fluid>
        <h3 className="text-white pt-3 mb-1">
          {name ? `${name} History` : ''}
        </h3>
        <h5 className="text-color1 mb-3">
          {
            months[date.getMonth()]
          }
          {
            `${date.getFullYear()}`
          }
          <Badge className="bg-white text-dark ml-2">
            {Number(totalStreamsForTheMonth).toLocaleString()}
            {' '}
            Streams
          </Badge>
        </h5>
        <ButtonGroup className="mb-2 d-block">
          <Button
            id="previous-btn"
            className="bg-dark border-0 text-white"
            onClick={this.updateValues}
            disabled={((date.getFullYear() === 2021)
              && (date.getMonth() + 1 === 6)) || !ready}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Previous Month
          </Button>
          <Button
            id="next-btn"
            className="bg-color1 border-0 text-white"
            onClick={this.updateValues}
            disabled={((date.getFullYear() === (new Date()).getFullYear())
              && (date.getMonth() === (new Date()).getMonth())) || !ready}
          >
            Next Month
            <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </Button>
        </ButtonGroup>
        { ready ? history : loader }
        <Badge>Data is available from the 10th of June 2021 till date</Badge>
      </Container>
    );
  }
}

export { AlbumHistory, TotalHistory, SongHistory };
