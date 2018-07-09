import React from 'react';
import * as enzyme from 'enzyme';
import * as chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { FormattedMessage } from 'react-intl';
import { Nav } from 'react-bootstrap';
import { shallowWithIntl } from '../../../../../helpers/intl-enzyme-test-helper';
import CompanyReviews from '../../../../../../src/components/company/CompanyPage/CompanyScoresReviews/CompanyReviews/CompanyReviews';

enzyme.configure({ adapter: new Adapter() });

describe('CompanyReviews', () => {
  let render;
  const reviewMockCount = 2;
  const reviewMockData = {
    reviews: [
      {
        id: 'AbC123',
        score: 2,
        content: 'Spring frameworks was not developed in spring',
        created_at: '2018-06-29T03:08:57.158Z',
        object: {
          type: 'Product',
          id: 'AbC123',
          name: 'Postman Product',
          description: 'A postman API',
          reviews_count: 0
        },
        from: {
          type: 'Company',
          id: 'AbC123',
          name: 'Reviewer 1',
          uen: '984208875',
          aggregate_score: 0,
          description: 'Vestibulum nec turpis vestibulum, feugiat mi at, egestas ex. Proin non enim mollis lacus pulvinar laoreet et quis augue. Nam nec magna at leo ',
          reviews_count: 0,
          image: {
            url: 'https://review-api.gds-gov.tech/uploads/company/image/24/pivotal20180402-93182-7x7gd.gif',
            thumb: {
              url: 'http://dogtowndogtraining.com/wp-content/uploads/2012/06/300x300-02.jpg'
            }
          }
        },
        grant: {
          id: 'AbC123',
          name: 'Operation & Technology Roadmapping',
          acronym: 'OTR',
          description: 'Want to maximise returns from your investments in technology? Get a grant for expert help from A*STAR to create a technology roadmap.'
        },
        aspects: [
          {
            id: 'AbC123',
            name: 'Reliability',
            description: 'The ability to deliver the promised product or service in a consistent and accurate manner.'
          }
        ]
      },
      {
        id: 'AbC1234',
        score: 3,
        content: 'Vestibulum nec turpis vestibulum, feugiat mi at, egestas ex. Proin non enim mollis lacus pulvinar laoreet et quis augue. Nam nec magna at leo ',
        created_at: '2018-06-28T03:08:57.158Z',
        object: {
          type: 'Product',
          id: 'AbC123',
          name: 'A Good Product',
          description: 'A postman API',
          reviews_count: 0
        },
        from: {
          type: 'Company',
          id: 'AbC123',
          name: 'Reviewer 2',
          uen: '984208875',
          aggregate_score: 0,
          description: 'Vestibulum nec turpis vestibulum, feugiat mi at, egestas ex. Proin non enim mollis.',
          reviews_count: 0,
          image: {
            url: 'https://review-api.gds-gov.tech/uploads/company/image/24/pivotal20180402-93182-7x7gd.gif',
            thumb: {
              url: 'http://dogtowndogtraining.com/wp-content/uploads/2012/06/300x300-03.jpg'
            }
          }
        },
        grant: {
          id: 'AbC123',
          name: 'Operation & Technology Roadmapping',
          acronym: 'OTR',
          description: 'Want to maximise returns from your investments in technology? Get a grant for expert help from A*STAR to create a technology roadmap.'
        },
        aspects: [
          {
            id: 'AbC1234',
            name: 'Good Quality',
            description: 'The ability to deliver the promised product or service in a consistent and accurate manner.'
          },
          {
            id: 'AbC123',
            name: 'Fast',
            description: 'The ability to deliver the promised product or service in a consistent and accurate manner.'
          }
        ]
      }
    ],
    positive_count: 1,
    neutral_count: 1,
    negative_count: 0
  };

  before(() => {
    render = shallowWithIntl(<CompanyReviews
      reviewCount={reviewMockCount}
      reviewData={reviewMockData}
      handleChangeFilter={() => {}}
      handleLoadMore={() => {}}
      toLoadMore
    />);
  });

  describe('renders company reviews', () => {
    it('renders sorter', () => {
      const tabs = render.find(Nav).find(FormattedMessage);
      const map = tabs.map(tabItem => {
        return tabItem.dive().text();
      });
      chai.expect(map).to.have.length(4);
      chai.expect(map).to.deep.equal([
        'All (2)',
        'Positive (1)',
        'Neutral (1)',
        'Negative (0)'
      ]);
    });

    it('selects all by default', () => {
      chai.expect(render.state(['selectedView'])).to.equal('ALL');
    });

    describe('renders reviews', () => {
      let reviews;
      let review;

      before(() => {
        reviews = render.find('.review');
        review = reviews.first();
      });

      it('generates reviews', () => {
        chai.expect(reviews).to.have.length(2);
      });

      it('generates reviewer name', () => {
        const image = review.find('.company-images').find('img');
        chai.expect(image).to.have.length(1);
      });

      it('generates reviewer name', () => {
        const name = review.find('.reviewer-name').text();
        chai.expect(name).to.eq('Reviewer 1');
      });

      it('generates review date', () => {
        const date = review.find('.review-date').text();
        chai.expect(date).to.eq('29 Jun 2018');
      });

      it('generates review rating', () => {
        const rating = review.find('#review-rating').find('span').last().find(FormattedMessage)
          .dive()
          .text();
        chai.expect(rating).to.eq('Neutral Experience');
      });

      it('generates positive aspect heading', () => {
        const aspects = reviews.last().find('.aspect-heading').find(FormattedMessage).dive()
          .text();
        chai.expect(aspects).to.eq('Areas done well:');
      });

      it('generates negative aspect heading', () => {
        const aspects = review.find('.aspect-heading').find(FormattedMessage).dive()
          .text();
        chai.expect(aspects).to.eq('Areas to be improved:');
      });

      it('generates review aspects', () => {
        const aspects = review.find('#review-aspects').find('div').last().text();
        chai.expect(aspects).to.eq('Reliability');
      });

      it('generates offering heading', () => {
        const heading = review.find('.offerings-engaged').last().find(FormattedMessage).dive()
          .text();
        chai.expect(heading).to.eq('Product/Services Engaged:');
      });

      it('generates offerings', () => {
        const heading = review.find('#offerings').text();
        chai.expect(heading).to.eq('Postman Product');
      });

      it('generates review content', () => {
        const heading = review.find('.review-content').find('span').text();
        chai.expect(heading).to.eq('Spring frameworks was not developed in spring');
      });
    });
  });
});
