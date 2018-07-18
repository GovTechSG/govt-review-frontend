import React from 'react';
import * as enzyme from 'enzyme';
import * as chai from 'chai';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import { shallowWithIntl } from '../../../helpers/intl-enzyme-test-helper';
import VendorListingBox from '../../../../src/components/company/VendorListingBox/VendorListingBox';

enzyme.configure({ adapter: new Adapter() });

describe('VendorListingBox', () => {
  let render;
  const vendorMockData = [
    {
      id: 'AbC123',
      name: 'Pivotal Software',
      aggregate_score: '9.5',
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
      aggregate_score: '8.5',
      reviews_count: 1,
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
  ];

  const vendorMockDataZeroScore = [
    {
      id: 'AbC123',
      name: 'Pivotal Software',
      aggregate_score: '0.0',
      reviews_count: 0,
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
      aggregate_score: '0.0',
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
      project_industries: [
        {
          id: 'AbC123',
          name: 'Agriculture'
        }
      ]
    }
  ];

  const vendorMockDataNoProjectIndustries = [
    {
      id: 'AbC123',
      name: 'Pivotal Software',
      aggregate_score: 0.5,
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
      project_industries: []
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
      project_industries: []
    }
  ];

  before(() => {
    render = shallowWithIntl(<VendorListingBox updatePagination={() => {}} />);
  });

  it('renders error message when fail to get vendor data', () => {
    render.setProps({ vendorData: 'Fail' });
    const text = render.find(FormattedMessage).dive().text();
    chai.expect(text).to.eq('An error has occured');
  });

  it('renders error message when fail to get vendor data', () => {
    render.setProps({ vendorData: [] });
    const text = render.find(FormattedMessage).dive().text();
    chai.expect(text).to.eq('No results found');
  });

  it('renders loading spinner when vendor data is null', () => {
    render.setProps({ vendorData: null });
    chai.expect(render.find('.page-load-spinner')).to.have.length(1);
  });

  describe('renders vendor listing box', () => {
    before(() => {
      render.setProps({ vendorData: vendorMockData });
    });

    it('renders a row for each item', () => {
      const rows = render.find('.vendor-item');
      chai.expect(rows).to.have.length(2);
    });

    it('renders company image', () => {
      const images = render.find('img');
      chai.expect(images).to.have.length(2);
      const imageUrls = images.map(data => {
        return data.prop('src');
      });
      chai.expect(imageUrls).to.deep.eq([
        'http://dogtowndogtraining.com/wp-content/uploads/2012/06/300x300-02.jpg',
        'http://dogtowndogtraining.com/wp-content/uploads/2012/06/300x300-07.jpg'
      ]);
    });

    it('renders company name', () => {
      const names = render.find('.vendor-name').map(data => {
        return data.find(Link).prop('children');
      });
      chai.expect(names).to.deep.eq(['Pivotal Software', 'Software Divotal']);
    });

    it('renders aggregate score when 0', () => {
      render.setProps({
        vendorData: vendorMockDataZeroScore
      });
      const ratings = render.find('.rating-box').find('.score').map(data => {
        return data.text();
      });
      chai.expect(ratings).to.deep.eq(['-', '-']);
    });

    it('renders aggregate score when not 0', () => {
      render.setProps({
        vendorData: vendorMockData
      });
      const ratings = render.find('.rating-box').find('.score').map(data => {
        return data.text();
      });
      chai.expect(ratings).to.deep.eq(['9.5', '8.5']);
    });

    it('renders out of 10', () => {
      const text = render.find('.rating-box').find('.score-total').map(data => {
        return data.find('FormattedMessage').dive().text();
      });
      chai.expect(text).to.deep.eq(['out of 10', 'out of 10']);
    });

    it('renders review count when 1', () => {
      const text = render.find('.aggregate-count').last().find('FormattedMessage').dive()
        .text();
      chai.expect(text).to.equal('1 review');
    });

    it('renders review count when not 1', () => {
      const text = render.find('.aggregate-count').first().find('FormattedMessage').dive()
        .text();
      chai.expect(text).to.equal('50 reviews');
    });

    it('renders industry string', () => {
      const vendorIndustries = render.find('.vendor-item').map(data => {
        return data.find('.vendor-industry').text();
      });
      chai.expect(vendorIndustries).to.deep.eql(['Agriculture, Dogiculture', 'Agriculture']);
    });

    it('renders project string & header', () => {
      const vendorIndustry = render.find('.vendor-has-done-text').map(data => {
        return data.text();
      });
      chai.expect(vendorIndustry).to.deep.eql(['Agriculture, Dgriculture', 'Agriculture']);

      const headings = render.find('.vendor-has-done-title').map(data => {
        return data.find(FormattedMessage).dive().text();
      });
      chai.expect(headings).to.deep.equal(['Has done project for:', 'Has done project for:']);
    });

    it('does not render project string & header when there is none', () => {
      render.setProps({
        vendorData: vendorMockDataNoProjectIndustries
      });

      const vendorIndustry = render.find('.vendor-has-done-text').map(data => {
        return data.text();
      });
      chai.expect(vendorIndustry).to.deep.eql(['', '']);

      const headings = render.find('.vendor-has-done-title');
      chai.expect(headings).to.have.length(0);
    });
  });
});
