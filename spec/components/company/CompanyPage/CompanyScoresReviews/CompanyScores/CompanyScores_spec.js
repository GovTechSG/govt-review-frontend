import React from 'react';
import * as enzyme from 'enzyme';
import * as chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { mountWithIntl } from '../../../../../helpers/intl-enzyme-test-helper';
import CompanyScores from '../../../../../../src/components/company/CompanyPage/CompanyScoresReviews/CompanyScores/CompanyScores';

enzyme.configure({ adapter: new Adapter() });

describe('CompanyScores', () => {
  let render;
  const reviewMockCount = 10;
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
    render = mountWithIntl(<CompanyScores
      reviewCount={reviewMockCount}
      reviewData={reviewMockData}
      aspectsData={aspectsMockData}
    />);
  });

  describe('renders company scores', () => {
    it('renders review count', () => {
      const text = render.find('.review-count').first().text();
      chai.expect(text).to.equal('10 Reviews');
    });

    describe('renders review percentage bars', () => {
      it('renders positive heading', () => {
        const text = render.find('#positive-row').find('#heading').hostNodes().text();
        chai.expect(text).to.eq('Positive');
      });

      it('renders neutral heading', () => {
        const text = render.find('#neutral-row').find('#heading').hostNodes().text();
        chai.expect(text).to.eq('Neutral');
      });

      it('renders negative heading', () => {
        const text = render.find('#negative-row').find('#heading').hostNodes().text();
        chai.expect(text).to.eq('Negative');
      });

      it('renders positive bar', () => {
        const bar = render.find('#positive-row').find('.progress-bar');
        chai.expect(bar.prop('aria-valuenow')).to.eq(7);
      });

      it('renders neutral bar', () => {
        const bar = render.find('#neutral-row').find('.progress-bar');
        chai.expect(bar.prop('aria-valuenow')).to.eq(2);
      });

      it('renders negative bar', () => {
        const bar = render.find('#negative-row').find('.progress-bar');
        chai.expect(bar.prop('aria-valuenow')).to.eq(1);
      });

      it('renders positive percentage', () => {
        const text = render.find('#positive-row').find('#percentage').hostNodes().text();
        chai.expect(text).to.eq('70%');
      });

      it('renders neutral percentage', () => {
        const text = render.find('#neutral-row').find('#percentage').hostNodes().text();
        chai.expect(text).to.eq('20%');
      });

      it('renders negative percentage', () => {
        const text = render.find('#negative-row').find('#percentage').hostNodes().text();
        chai.expect(text).to.eq('10%');
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
    });
  });
});
