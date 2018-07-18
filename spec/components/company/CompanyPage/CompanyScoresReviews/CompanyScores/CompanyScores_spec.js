import React from 'react';
import * as enzyme from 'enzyme';
import * as chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { shallowWithIntl } from '../../../../../helpers/intl-enzyme-test-helper';
import CompanyScores from '../../../../../../src/components/company/CompanyPage/CompanyScoresReviews/CompanyScores/CompanyScores';

enzyme.configure({ adapter: new Adapter() });

describe('CompanyScores', () => {
  let render;
  const reviewMockData = {
    positive_count: 7,
    neutral_count: 2,
    negative_count: 1
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
    render = shallowWithIntl(<CompanyScores
      reviewData={reviewMockData}
      aspectsData={aspectsMockData}
    />);
  });

  describe('renders company scores', () => {
    it('renders aggregate score when 0', () => {
      render.setProps({
        aggregateScore: 0
      });
      chai.expect(render.find('.company-rating-box').find('.score').text()).to.eq('-');
    });

    it('renders aggregate score when not 0', () => {
      render.setProps({
        aggregateScore: 9.5
      });
      chai.expect(render.find('.company-rating-box').find('.score').text()).to.eq('9.5');
    });

    it('renders out of 10', () => {
      const text = render.find('.company-rating-box').find('.score-total').find('FormattedMessage').dive()
        .text();
      chai.expect(text).to.eq('out of 10');
    });

    it('renders review count when 1', () => {
      render.setProps({
        reviewCount: 1
      });
      const text = render.find('.review-count').first().find('FormattedMessage').dive()
        .text();
      chai.expect(text).to.equal('1 Review');
    });

    it('renders review count when not 1', () => {
      render.setProps({
        reviewCount: 10
      });
      const text = render.find('.review-count').first().find('FormattedMessage').dive()
        .text();
      chai.expect(text).to.equal('10 Reviews');
    });

    describe('renders review percentage bars', () => {
      let positive;
      let neutral;
      let negative;

      before(() => {
        positive = render.find('#positive-row');
        neutral = render.find('#neutral-row');
        negative = render.find('#negative-row');
      });

      it('renders positive heading', () => {
        const text = positive.find('FormattedMessage').dive().text();
        chai.expect(text).to.eq('Positive');
      });

      it('renders neutral heading', () => {
        const text = neutral.find('FormattedMessage').dive().text();
        chai.expect(text).to.eq('Neutral');
      });

      it('renders negative heading', () => {
        const text = negative.find('FormattedMessage').dive().text();
        chai.expect(text).to.eq('Negative');
      });

      it('renders positive bar', () => {
        const bar = positive.find('ProgressBar');
        chai.expect(bar.prop('now')).to.eq(7);
      });

      it('renders neutral bar', () => {
        const bar = neutral.find('ProgressBar');
        chai.expect(bar.prop('now')).to.eq(2);
      });

      it('renders negative bar', () => {
        const bar = negative.find('ProgressBar');
        chai.expect(bar.prop('now')).to.eq(1);
      });

      it('renders positive percentage', () => {
        const percentage = positive.find('Col').filterWhere((a) => {
          return a.prop('id') === 'percentage';
        });
        chai.expect(percentage.find('span').text()).to.eq('70%');
      });

      it('renders neutral percentage', () => {
        const percentage = neutral.find('Col').filterWhere((a) => {
          return a.prop('id') === 'percentage';
        });
        chai.expect(percentage.find('span').text()).to.eq('20%');
      });

      it('renders negative percentage', () => {
        const percentage = negative.find('Col').filterWhere((a) => {
          return a.prop('id') === 'percentage';
        });
        chai.expect(percentage.find('span').text()).to.eq('10%');
      });

      it('renders aspect heading', () => {
        const heading = render.find('.aspects-col').find('.review-count')
          .find('FormattedMessage').dive()
          .text();
        chai.expect(heading).to.eq('Rated Positively for:');
      });

      it('renders aspects', () => {
        const aspects = render.find('.total-aspects');
        chai.expect(aspects).to.have.length(1);
      });

      it('renders correct aspects', () => {
        const aspects = render.find('.total-aspects').find('.aspect-box');
        chai.expect(aspects).to.have.length(5);

        const list = aspects.map(aspect => {
          return aspect.text();
        });
        chai.expect(list).to.deep.equal([
          '30aspect 1',
          '20aspect 2',
          '10aspect 3',
          '10aspect 4',
          '10aspect 5',
        ]);
      });

      it('does not render if failed to get aspect data', () => {
        render.setProps({
          aspectsData: 'Fail'
        });
        chai.expect(render.find('.total-aspects')).to.have.length(0);
        chai.expect(render.find('.aspects-col').find('.review-count')).to.have.length(0);
      });

      it('does not render if there are no positive reviews', () => {
        render.setProps({
          reviewData: Object.assign({}, reviewMockData, { positive_count: 0 })
        });
        chai.expect(render.find('.total-aspects')).to.have.length(0);
        chai.expect(render.find('.aspects-col').find('.review-count')).to.have.length(0);
      });
    });
  });
});
