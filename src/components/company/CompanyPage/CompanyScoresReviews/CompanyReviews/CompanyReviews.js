import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Row, Col, Nav, NavItem, Button } from 'react-bootstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSmile, faMeh, faFrown } from '@fortawesome/fontawesome-free-regular';
import { faQuoteLeft } from '@fortawesome/fontawesome-free-solid';
import './CompanyReviews.scss';


export default class CompanyReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedView: 'ALL'
    };
  }

  handleSelect(eventKey, event) {
    event.preventDefault();
    this.setState({
      selectedView: eventKey,
    });
    this.props.handleChangeFilter(eventKey);
  }

  generateRating(score) {
    if (score === 3) {
      return (
        <div>
          <span className="color-green"><FontAwesomeIcon icon={faSmile} className="companyreviews-face" /></span>
          <span><FormattedMessage id="companyreviews.experience" values={{ rating: 'Positive' }} /></span>
        </div>
      );
    } else if (score === 2) {
      return (
        <div>
          <span><FontAwesomeIcon icon={faMeh} className="companyreviews-face" /></span>
          <span><FormattedMessage id="companyreviews.experience" values={{ rating: 'Neutral' }} /></span>
        </div>
      );
    }
    return (
      <div>
        <span className="color-red"><FontAwesomeIcon icon={faFrown} className="companyreviews-face" /></span>
        <span><FormattedMessage id="companyreviews.experience" values={{ rating: 'Negative' }} /></span>
      </div>
    );
  }

  generateAspects(aspects) {
    if (aspects.length === 0) {
      return '';
    }

    return (
      <div className="review-aspects">
        {aspects.map((data) => {
          return <div className="review-aspect-box" key={data.id}>{data.name}</div>;
        })}
      </div>
    );
  }

  generateAspectHeading(score) {
    if (score === 3) {
      return (
        <FormattedMessage id="companyreviews.positive.aspect.heading" />
      );
    }
    return (
      <FormattedMessage id="companyreviews.negative.aspect.heading" />
    );
  }

  renderChild(data, index) {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const date = (new Date(data.created_at)).toLocaleDateString('en-GB', options);
    return (
      <div className="review" key={data.id}>
        {index !== 0 && <div className="review-border" />}
        <Row>
          <Col xs={1}>
            <div className="company-images">
              <img src={data.from.image.thumb.url} alt={data.from.name} title={data.from.name} />
            </div>
          </Col>
          <Col xs={11}>
            <Row className="reviewer-name-row">
              <span className="reviewer-name">
                {data.from.name}
              </span>
              <span className="review-date">{date}</span>
            </Row>
            <Row id="review-rating">
              {this.generateRating(data.score)}
            </Row>
            <Row id="review-aspects">
              <div className="aspect-heading">
                {data.aspects.length !== 0 && this.generateAspectHeading(data.score)}
              </div>
              {this.generateAspects(data.aspects)}
            </Row>
            <Row>
              <div className="offerings-engaged">
                <FormattedMessage id="companyreviews.offerings.engaged" />
              </div>
              <div id="offerings">
                {data.object.name}
              </div>
            </Row>
            {
              data.content &&
              <Row className="review-description">
                <Col xs={1} className="quote">
                  <FontAwesomeIcon icon={faQuoteLeft} />
                </Col>
                <Col xs={11} className="review-content">
                  <span>
                    {data.content}
                  </span>
                </Col>
              </Row>
            }
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    const { reviewCount } = this.props;
    const { reviewData } = this.props;
    const { reviews } = reviewData;
    return (
      <div>
        <Row className="padding-top-15">
          <Nav className="reviews-nav-sorter" pullLeft bsStyle="tabs" activeKey={this.state.selectedView} onSelect={(k, event) => this.handleSelect(k, event)}>
            <NavItem eventKey="ALL" id="all-filter">
              <FormattedMessage id="companyreviews.all" values={{ count: reviewCount }} />
            </NavItem>
            <NavItem eventKey="POSITIVE" id="positive-filter">
              <FontAwesomeIcon icon={faSmile} className="companyreviews-sorter-face" />
              <FormattedMessage id="companyreviews.positive" values={{ count: reviewData.positive_count }} />
            </NavItem>
            <NavItem eventKey="NEUTRAL" id="neutral-filter">
              <FontAwesomeIcon icon={faMeh} className="companyreviews-sorter-face" />
              <FormattedMessage id="companyreviews.neutral" values={{ count: reviewData.neutral_count }} />
            </NavItem>
            <NavItem eventKey="NEGATIVE" id="negative-filter">
              <FontAwesomeIcon icon={faFrown} className="companyreviews-sorter-face" />
              <FormattedMessage id="companyreviews.negative" values={{ count: reviewData.negative_count }} />
            </NavItem>
          </Nav>
        </Row>
        <div className="companyreview-border" />
        <Row className="margin-0">
          { reviews.length === 0 ?
            <div>
              <FormattedMessage id="companyreviews.no.reviews" />
            </div> :
            reviews.map((data, index) => {
            return this.renderChild(data, index);
          })}
        </Row>
        {this.props.toLoadMore &&
          <Button bsSize="large" block className="load-more-button" onClick={() => (this.props.handleLoadMore())}>
            <FormattedMessage id="companyreviews.load.more" />
          </Button>
        }
      </div>
    );
  }
}
