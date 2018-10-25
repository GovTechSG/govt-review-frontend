import React from 'react';
import * as enzyme from 'enzyme';
import * as chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { shallowWithIntl } from '../../../../helpers/intl-enzyme-test-helper';
import CompanyScoresReviews from '../../../../../src/components/company/CompanyPage/CompanyScoresReviews/CompanyScoresReviews';
import CompanyReviews from '../../../../../src/components/company/CompanyPage/CompanyScoresReviews/CompanyReviews/CompanyReviews';
import CompanyScores from '../../../../../src/components/company/CompanyPage/CompanyScoresReviews/CompanyScores/CompanyScores';

enzyme.configure({ adapter: new Adapter() });

describe('CompanyScoresReviews', () => {
  let render;
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
  const aspectsMockData = [
    {
      aspect: {
        id: 'asd1',
        name: 'aspect 1',
      },
      count: '30'
    },
    {
      aspect: {
        id: 'asd2',
        name: 'aspect 2',
      },
      count: '20'
    },
    {
      aspect: {
        id: 'asd3',
        name: 'aspect 3',
      },
      count: '10'
    },
    {
      aspect: {
        id: 'asd4',
        name: 'aspect 4',
      },
      count: '10'
    },
    {
      aspect: {
        id: 'asd5',
        name: 'aspect 5',
      },
      count: '10'
    }
  ];

  before(() => {
    render = shallowWithIntl(<CompanyScoresReviews
      companyId=""
    />);
  });

  describe('loads page spinner', () => {
    it('loads page spinner when both null', () => {
      render.setState({
        reviewData: null,
        aspectsData: null
      });
      const spinner = render.find('.page-load-spinner');
      chai.expect(spinner).to.have.length(1);
    });

    it('loads page spinner when clientData is null', () => {
      render.setState({
        reviewData: reviewMockData,
        aspectsData: null
      });
      const spinner = render.find('.page-load-spinner');
      chai.expect(spinner).to.have.length(1);
    });

    it('loads page spinner when grantData is null', () => {
      render.setState({
        reviewData: null,
        aspectsMockData
      });
      const spinner = render.find('.page-load-spinner');
      chai.expect(spinner).to.have.length(1);
    });
  });

  describe('renders company reviews', () => {
    before(() => {
      render.setState({
        reviewData: reviewMockData,
        aspectsData: aspectsMockData
      });
    });

    it('renders card', () => {
      const item = render.find('.vendor-card');
      chai.expect(item).to.have.length(1);
    });

    it('renders title', () => {
      const title = render.find('.reviews-header').find('FormattedMessage').dive().text();
      chai.expect(title).to.eq('Reviews');
    });

    it('renders CompanyScores', () => {
      const component = render.find(CompanyScores);
      chai.expect(component).to.have.length(1);
    });

    it('renders CompanyReviews', () => {
      const component = render.find(CompanyReviews);
      chai.expect(component).to.have.length(1);
    });
  });

  it('does not render of failed to get review data', () => {
    render.setState({
      reviewData: 'Fail',
      aspectsData: aspectsMockData
    });
    chai.expect(render.children()).to.have.length(0);
  });
});
