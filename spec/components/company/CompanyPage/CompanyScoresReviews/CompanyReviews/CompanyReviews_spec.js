import React from 'react';
import * as enzyme from 'enzyme';
import * as chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { shallowWithIntl } from '../../../../../helpers/intl-enzyme-test-helper';
import CompanyReviews from '../../../../../../src/components/company/CompanyPage/CompanyScoresReviews/CompanyReviews/CompanyReviews';

enzyme.configure({ adapter: new Adapter() });

describe('CompanyReviews', () => {
  let render;
  const reviewMockCount = 2;
  const reviewMockData = {
    reviews: [
      {
        id: 'AbC1234',
        score: 3,
        content: 'Vestibulum nec turpis vestibulum, feugiat mi at, egestas ex. Proin non enim mollis lacus pulvinar laoreet et quis augue. Nam nec magna at leo ',
        created_at: '2018-06-29T03:08:57.158Z',
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
          name: 'Reviewer 1',
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
      },
      {
        id: 'AbC123',
        score: 2,
        content: 'Spring frameworks was not developed in spring',
        created_at: '2018-06-28T03:08:57.158Z',
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
          name: 'Reviewer 2',
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
        id: 'AbC12345',
        score: 1,
        content: 'Vestibulum nec turpis vestibulum, feugiat mi at, egestas ex. Proin non enim mollis lacus pulvinar laoreet et quis augue. Nam nec magna at leo ',
        created_at: '2018-06-27T03:08:57.158Z',
        object: {
          type: 'Product',
          id: 'AbC123',
          name: 'A bad Product',
          description: 'A postman API',
          reviews_count: 0
        },
        from: {
          type: 'Company',
          id: 'AbC123',
          name: 'Reviewer 3',
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
            name: 'Real bad',
            description: 'The ability to deliver the promised product or service in a consistent and accurate manner.'
          },
          {
            id: 'AbC123',
            name: 'Horrible',
            description: 'The ability to deliver the promised product or service in a consistent and accurate manner.'
          }
        ]
      },
      {
        id: 'AbC12345',
        score: 1,
        content: 'Vestibulum nec turpis vestibulum, feugiat mi at, egestas ex. Proin non enim mollis lacus pulvinar laoreet et quis augue. Nam nec magna at leo ',
        created_at: '2018-06-26T03:08:57.158Z',
        object: {
          type: 'Product',
          id: 'AbC123',
          name: 'A bad Product',
          description: 'A postman API',
          reviews_count: 0
        },
        from: {
          type: 'Company',
          id: 'AbC123',
          name: 'Reviewer 3',
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
        aspects: []
      }
    ],
    positive_count: 1,
    neutral_count: 1,
    negative_count: 1
  };

  before(() => {
    render = shallowWithIntl(<CompanyReviews 
      reviewCount={0}
    />);
  });

  it('returns empty div when review count is 0', () => {
    chai.expect(render.children()).to.have.length(0);
  });

  describe('renders company reviews', () => {
    before(() => {
      render.setProps({
        reviewCount: reviewMockCount,
        reviewData: reviewMockData,
        handleChangeFilter: () => {},
        handleLoadMore: () => {},
        toLoadMore: true
      });
    });

    it('renders sorter', () => {
      const tabs = render.find('Nav').find('FormattedMessage');
      const map = tabs.map(tabItem => {
        return tabItem.dive().text();
      });
      chai.expect(map).to.have.length(4);
      chai.expect(map).to.deep.equal([
        'All (2)',
        'Positive (1)',
        'Neutral (1)',
        'Negative (1)'
      ]);
    });

    it('selects all by default', () => {
      chai.expect(render.state(['selectedView'])).to.equal('ALL');
    });

    it('updates state on sorter change', () => {
      render.instance().handleSelect('POSITIVE', { preventDefault: () => {} });
      chai.expect(render.state(['selectedView'])).to.equal('POSITIVE');
      render.instance().handleSelect('NEUTRAL', { preventDefault: () => {} });
      chai.expect(render.state(['selectedView'])).to.equal('NEUTRAL');
      render.instance().handleSelect('NEGATIVE', { preventDefault: () => {} });
      chai.expect(render.state(['selectedView'])).to.equal('NEGATIVE');
      render.instance().handleSelect('ALL', { preventDefault: () => {} });
      chai.expect(render.state(['selectedView'])).to.equal('ALL');
    });

    describe('renders reviews', () => {
      let reviews;
      let positiveReview;
      let neutralReview;
      let negativeReview;

      before(() => {
        reviews = render.find('.review');
        positiveReview = reviews.at(0);
        neutralReview = reviews.at(1);
        negativeReview = reviews.at(2);
      });

      it('generates reviews', () => {
        chai.expect(reviews).to.have.length(Math.min(5, reviewMockData.reviews.length));
      });

      it('generates border correctly', () => {
        chai.expect(positiveReview.find('.review-border')).to.have.length(0);
        chai.expect(neutralReview.find('.review-border')).to.have.length(1);
        chai.expect(negativeReview.find('.review-border')).to.have.length(1);
      });

      it('generates reviewer image', () => {
        chai.expect(positiveReview.find('.company-images').find('img')).to.have.length(1);
        chai.expect(neutralReview.find('.company-images').find('img')).to.have.length(1);
        chai.expect(negativeReview.find('.company-images').find('img')).to.have.length(1);
      });

      it('generates reviewer name', () => {
        chai.expect(positiveReview.find('.reviewer-name').text()).to.eq('Reviewer 1');
        chai.expect(neutralReview.find('.reviewer-name').text()).to.eq('Reviewer 2');
        chai.expect(negativeReview.find('.reviewer-name').text()).to.eq('Reviewer 3');
      });

      it('generates review date', () => {
        chai.expect(positiveReview.find('.review-date').text()).to.eq('29 Jun 2018');
        chai.expect(neutralReview.find('.review-date').text()).to.eq('28 Jun 2018');
        chai.expect(negativeReview.find('.review-date').text()).to.eq('27 Jun 2018');
      });

      it('generates positive review rating', () => {
        const rating = positiveReview.find('#review-rating').find('span').last().find('FormattedMessage')
          .dive()
          .text();
        chai.expect(rating).to.eq('Positive Experience');

        const image = positiveReview.find('#review-rating').find('span').children().at(0);
        chai.expect(image.prop('icon').iconName).to.eq('smile');
      });

      it('generates positive review rating', () => {
        const rating = neutralReview.find('#review-rating').find('span').last().find('FormattedMessage')
          .dive()
          .text();
        chai.expect(rating).to.eq('Neutral Experience');

        const image = neutralReview.find('#review-rating').find('span').children().at(0);
        chai.expect(image.prop('icon').iconName).to.eq('meh');
      });

      it('generates positive review rating', () => {
        const rating = negativeReview.find('#review-rating').find('span').last().find('FormattedMessage')
          .dive()
          .text();
        chai.expect(rating).to.eq('Negative Experience');

        const image = negativeReview.find('#review-rating').find('span').children().at(0);
        chai.expect(image.prop('icon').iconName).to.eq('frown');
      });

      it('generates positive aspect heading', () => {
        const aspects = positiveReview.find('.aspect-heading').find('FormattedMessage').dive()
          .text();
        chai.expect(aspects).to.eq('Areas done well:');
      });

      it('generates neutral aspect heading', () => {
        const aspects = neutralReview.find('.aspect-heading').find('FormattedMessage').dive()
          .text();
        chai.expect(aspects).to.eq('Areas to be improved:');
      });

      it('generates negative aspect heading', () => {
        const aspects = negativeReview.find('.aspect-heading').find('FormattedMessage').dive()
          .text();
        chai.expect(aspects).to.eq('Areas to be improved:');
      });

      it('does not render aspect heading when there are no aspects', () => {
        const heading = reviews.at(3).find('.aspect-heading').children();
        chai.expect(heading).to.have.length(0);
      });

      it('generates positive review aspects', () => {
        const aspects = positiveReview.find('#review-aspects').find('.review-aspect-box');
        const map = aspects.map((data) => {
          return data.text();
        });
        chai.expect(map).to.deep.eq(['Good Quality', 'Fast']);
      });

      it('generates neutral review aspects', () => {
        const aspects = neutralReview.find('#review-aspects').find('.review-aspect-box').text();
        chai.expect(aspects).to.eq('Reliability');
      });

      it('generates negative review aspects', () => {
        const aspects = negativeReview.find('#review-aspects').find('.review-aspect-box');
        const map = aspects.map((data) => {
          return data.text();
        });
        chai.expect(map).to.deep.eq(['Real bad', 'Horrible']);
      });

      it('does not generate aspects when empty', () => {
        const nilAspects = reviews.at(3).find('#review-aspects').find('.review-aspect-box');
        chai.expect(nilAspects).to.have.length(0);
      });

      it('generates offering heading', () => {
        const heading = positiveReview.find('.offerings-engaged').last().find('FormattedMessage').dive()
          .text();
        chai.expect(heading).to.eq('Product/Services Engaged:');
      });

      it('generates offerings', () => {
        chai.expect(positiveReview.find('#offerings').text()).to.eq('A Good Product');
        chai.expect(neutralReview.find('#offerings').text()).to.eq('Postman Product');
        chai.expect(negativeReview.find('#offerings').text()).to.eq('A bad Product');
      });

      it('generates review content', () => {
        chai.expect(positiveReview.find('.review-content').find('span').text()).to
          .eq('Vestibulum nec turpis vestibulum, feugiat mi at, egestas ex. Proin non enim mollis lacus pulvinar laoreet et quis augue. Nam nec magna at leo ');
        chai.expect(neutralReview.find('.review-content').find('span').text()).to.eq('Spring frameworks was not developed in spring');
        chai.expect(negativeReview.find('.review-content').find('span').text()).to
          .eq('Vestibulum nec turpis vestibulum, feugiat mi at, egestas ex. Proin non enim mollis lacus pulvinar laoreet et quis augue. Nam nec magna at leo ');
      });
    });

    describe('load more', () => {
      let button;
      before(() => {
        button = render.find('.load-more-button');
      });

      it('renders text in load more button', () => {
        chai.expect(button.find('FormattedMessage').dive().text()).to.eq('Load more reviews');
      });

      it('renders load more when loadmore is true', () => {
        chai.expect(button).to.have.length(1);
      });

      it('does not render load more when loadmore is false', () => {
        render.setProps({
          toLoadMore: false
        });
        chai.expect(render.find('.load-more-button')).to.have.length(0);
      });
    });
  });
});
