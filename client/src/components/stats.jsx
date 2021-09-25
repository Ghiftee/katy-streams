/* eslint-disable max-classes-per-file */
/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import {
  Badge, Col, Row,
} from 'react-bootstrap';
import {
  faChartPie,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  selectStreams,
} from '../redux/dataSlice';

function Stats() {
  const streams = useSelector(selectStreams);

  const OOTBTotal = Number(streams[0].streams.reduce(
    (a, b) => a + b.playcount, 0,
  )).toLocaleString();
  const TDTotal = Number(streams[3].streams.reduce(
    (a, b) => a + b.playcount, 0,
  )).toLocaleString();
  const PRISMTotal = Number(streams[5].streams.reduce(
    (a, b) => a + b.playcount, 0,
  )).toLocaleString();
  const WitnessTotal = Number(streams[6].streams.reduce(
    (a, b) => a + b.playcount, 0,
  )).toLocaleString();
  const SmileTotal = Number(streams[7].streams.reduce(
    (a, b) => a + b.playcount, 0,
  )).toLocaleString();

  const OOTBInc = Number(streams[0].streams.reduce(
    (a, b) => a + b.difference, 0,
  )).toLocaleString();
  const TDInc = Number(streams[3].streams.reduce(
    (a, b) => a + b.difference, 0,
  )).toLocaleString();
  const PRISMInc = Number(streams[5].streams.reduce(
    (a, b) => a + b.difference, 0,
  )).toLocaleString();
  const WitnessInc = Number(streams[6].streams.reduce(
    (a, b) => a + b.difference, 0,
  )).toLocaleString();
  const SmileInc = Number(streams[7].streams.reduce(
    (a, b) => a + b.difference, 0,
  )).toLocaleString();

  return (
    <div
      className="mt-3 mb-3 rounded-2 ml-0"
    >
      <span>
        <h3 className="text-color1">
          Summary
          {' '}
          <FontAwesomeIcon icon={faChartPie} />
        </h3>
        <h5 className="text-color3">Album Streams</h5>
      </span>
      <Row className="stat-row justify-content-center">
        <Col xs={6} sm={6} md={6} lg={6}>
          <Badge className="d-flex flex-column bg-color1 mb-2 break-word">
            <Badge className="font-15 d-block d-sm-inline-block text-left text-color3 bg-dark break-word">{streams[0].name}</Badge>
            <Badge className="bg-light text-dark font-15 text-right break-word">{ OOTBTotal }</Badge>
            <Badge className="bg-dark text-light font-15 text-right break-word">
              +
              { OOTBInc }
            </Badge>
          </Badge>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6}>
          <Badge className="d-flex flex-column bg-color1 mb-2 break-word">
            <Badge className="font-15 d-block d-sm-inline-block text-left text-color3 bg-dark break-word">{streams[3].name.split(':')[0]}</Badge>
            <Badge className="bg-light text-dark font-15 text-right break-wordt">{ TDTotal }</Badge>
            <Badge className="bg-dark text-light font-15 text-right break-word">
              +
              { TDInc }
            </Badge>
          </Badge>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6}>
          <Badge className="d-flex flex-column bg-color1 mb-2 break-word">
            <Badge className="font-15 d-block d-sm-inline-block text-left text-color3 bg-dark break-word">{streams[5].name}</Badge>
            <Badge className="bg-light text-dark font-15 text-right break-word">{ PRISMTotal }</Badge>
            <Badge className="bg-dark text-light font-15 text-right break-word">
              +
              { PRISMInc }
            </Badge>
          </Badge>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6}>
          <Badge className="d-flex flex-column bg-color1 mb-2 break-word">
            <Badge className="font-15 d-block d-sm-inline-block text-left text-color3 bg-dark break-word">{streams[6].name}</Badge>
            <Badge className="bg-light text-dark font-15 text-right break-word">{ WitnessTotal }</Badge>
            <Badge className="bg-dark text-light font-15 text-right break-word">
              +
              { WitnessInc }
            </Badge>
          </Badge>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6}>
          <Badge className="d-flex flex-column bg-color1 mb-2 break-word">
            <Badge className="font-15 d-block d-sm-inline-block text-left text-color3 bg-dark break-word">{streams[7].name}</Badge>
            <Badge className="bg-light text-dark font-15 text-right break-word">{ SmileTotal }</Badge>
            <Badge className="bg-dark text-light font-15 text-right break-word">
              +
              { SmileInc }
            </Badge>
          </Badge>
        </Col>
      </Row>
    </div>
  );
}

export default Stats;
