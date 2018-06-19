import React from 'react';
import * as enzyme from 'enzyme';
import * as chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { mountWithIntl } from '../../../helpers/intl-enzyme-test-helper';
import VendorListingBox from '../../../../src/components/company/VendorListingBox/VendorListingBox';

enzyme.configure({ adapter: new Adapter() });

describe('VendorListingBox', () => {
  let render;
  const vendorMockData = {
    companies: [
      {
        id: 'AbC123',
        name: 'Pivotal Software',
        aggregate_score: 0.5,
        ratings: 50,
        reviews_count: 50,
        positive: 25,
        neutral: 20,
        negative: 5,
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
        ],
        project_industries: [
          {
            id: 'AbC123',
            name: 'Agriculture'
          },
          {
            id: 'AbC123',
            name: 'Dgriculture'
          }
        ]
      },
      {
        id: 'AbC123',
        name: 'Software Divotal',
        aggregate_score: 0,
        reviews_count: 0,
        positive: 0,
        neutral: 0,
        negative: 0,
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
        ],
        project_industries: [
          {
            id: 'AbC123',
            name: 'Agriculture'
          }
        ]
      }
    ],
    count: 2
  };

  before(() => {
    render = mountWithIntl(<VendorListingBox
      updatePagination={() => {}}
    />);
    render.setState({ vendorData: vendorMockData });
  });

  describe('renders', () => {
    it('renders a row for each item', () => {
      const rows = render.find('.vendor-item').hostNodes();
      chai.expect(rows).to.have.length(2);
    });

    it('renders industry string', () => {
      const vendorIndustry = render.find('.vendor-item').first().find('.vendor-industry').text();
      chai.expect(vendorIndustry).to.eql('Agriculture, Dogiculture');
    });

    it('renders project string', () => {
      const vendorIndustry = render.find('.vendor-has-done').first().find('.vendor-has-done-text').text();
      chai.expect(vendorIndustry).to.eql('Agriculture, Dgriculture');
    });

    it('renders aggregate score', () => {
      const vendorIndustry = render.find('.vendor-item').first().find('.positivity').text();
      chai.expect(vendorIndustry).to.eql('50% Positive');
    });

    it('renders "No Reviews" when there are no reviews', () => {
      const vendorIndustry = render.find('.vendor-item').last().find('.positivity').text();
      chai.expect(vendorIndustry).to.eql('No Reviews');
    });
    describe('review bar', () => {
      it('renders review bar', () => {
        const reviewBar = render.find('.vendor-item').first().find('.progress');
        chai.expect(reviewBar).to.have.length(1);
      });

      it('renders positive reviews bar', () => {
        const positive = render.find('.vendor-item').first().find('.progress-bar.progress-bar-success');
        chai.expect(positive.prop('aria-valuenow')).to.eql(25);
      });

      it('renders neutral reviews bar', () => {
        const neutral = render.find('.vendor-item').first().find('.progress-bar.progress-bar-warning');
        chai.expect(neutral.prop('aria-valuenow')).to.eql(20);
      });

      it('renders negative reviews bar', () => {
        const negative = render.find('.vendor-item').first().find('.progress-bar.progress-bar-danger');
        chai.expect(negative.prop('aria-valuenow')).to.eql(5);
      });
    });
  });
});
