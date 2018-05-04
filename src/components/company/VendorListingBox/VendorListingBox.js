import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { resolve } from 'react-resolver';
// import API from '../../_utility/Api';
import './VendorListingBox.scss';

export class VendorBox extends Component {
  getIndustryString(industriesArray) {
    let industryString = industriesArray[0].name;
    const len = industriesArray.length;

    if (len > 1) {
      let i = 1;
      for (i, len; i < len; i++) {
        industryString += `, ${industriesArray[i].name}`;
      }
    }
    return industryString;
  }

  renderChild(data, index) {
    const industryString = this.getIndustryString(data.industries);

    return (
      <Col sm={12} key={`$vendor-box-${index}`}>
        <Row className="vendor-item" key={`vendor-box-item-${index}`}>
          <Col xs={2}>
            <div className="logo-box">
              <img src={data.image.thumb.url} alt={data.name} />
            </div>
          </Col>
          <Col xs={7}>
            <div className="vendor-name">{data.name}</div>
            <div className="vendor-industry">{industryString}</div>
            <br />
            <div className="vendor-has-done-title">Has done project for:</div>
            <div className="vendor-has-done">{industryString}</div>
          </Col>
          <Col xs={3}>
            <div className="rating-box">
              <div className="positivity">{data.aggregate_score}% Positive</div>
              <hr />
              <div className="aggregate-count">{data.reviews_count} reviews</div>
            </div>
          </Col>
        </Row>
      </Col>
    );
  }

  render() {
    const { vendorData } = this.props;

    return (
      <Row>
        <Col sm={12} className="vendor-container">
          {vendorData.map((data, index) => this.renderChild(data, index))}
        </Col>
      </Row>
    );
  }
}

export default resolve('vendorData', (props) => {
  // const url = '/api/v1/vendor';
  if (props.selectedView === 'bestRatings') {
    return [
      {
        id: 'AbC123',
        name: 'Pivotal Software',
        aggregate_score: 75,
        reviews_count: 50,
        image: {
          url: 'https://review-api.gds-gov.tech/uploads/company/image/24/pivotal20180402-93182-7x7gd.gif',
          thumb: {
            url: 'http://dogtowndogtraining.com/wp-content/uploads/2012/06/300x300-02.jpg'
          }
        },
        industries: [
          {
            id: 'AbC123',
            name: 'Agriculture'
          },
          {
            id: 'DeF123',
            name: 'Dogiculture'
          }
        ]
      },
      {
        id: 'AbC123',
        name: 'Software Divotal',
        aggregate_score: 30,
        reviews_count: 100,
        image: {
          url: 'https://review-api.gds-gov.tech/uploads/company/image/24/pivotal20180402-93182-7x7gd.gif',
          thumb: {
            url: 'http://dogtowndogtraining.com/wp-content/uploads/2012/06/300x300-07.jpg'
          }
        },
        industries: [
          {
            id: 'AbC123',
            name: 'Agriculture'
          }
        ]
      }
    ];
  }
  return [];
})(VendorBox);
