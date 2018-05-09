import React from 'react';
import * as enzyme from 'enzyme';
import * as chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { VendorListingBox } from '../../../../src/components/company/VendorListingBox/VendorListingBox';

enzyme.configure({ adapter: new Adapter() });

describe('VendorListingBox', () => {
  let render;
  const selectedView = 'best_ratings';
  const vendorMockData = [
    {
      id: 'AbC123',
      name: 'Pivotal Software',
      aggregate_score: 25,
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
      ],
      projects: [
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
      projects: [
        {
          id: 'AbC123',
          name: 'Agriculture'
        }
      ]
    }
  ];

  before(() => {
    render = enzyme.shallow(<VendorListingBox selectedView={selectedView} vendorData={vendorMockData} />);
  });

  describe('renders', () => {
    it('renders a row for each item', () => {
      const rows = render.find('.vendor-item');
      chai.expect(rows).to.have.length(2);
    });

    it('renders industry string', () => {
      const vendorIndustry = render.find('.vendor-item').first().find('.vendor-industry').text();
      chai.expect(vendorIndustry).to.eql('Agriculture, Dogiculture');
    });

    it('renders project string', () => {
      const vendorIndustry = render.find('.vendor-item').first().find('.vendor-has-done').text();
      chai.expect(vendorIndustry).to.eql('Agriculture, Dgriculture');
    });

    it('renders aggregate score', () => {
      const vendorIndustry = render.find('.vendor-item').first().find('.positivity').text();
      chai.expect(vendorIndustry).to.eql('50% Positive');
    });

    it('renders aggregate score as 100 when there are no reviews', () => {
      const vendorIndustry = render.find('.vendor-item').last().find('.positivity').text();
      chai.expect(vendorIndustry).to.eql('100% Positive');
    });
  });
});
