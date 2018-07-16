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

    // it('renders aggregate score', () => {
    //   const vendorIndustry = render.find('.vendor-item').first().find('.positivity').text();
    //   chai.expect(vendorIndustry).to.eql('50% Positive');
    // });

    // it('renders "No Reviews" when there are no reviews', () => {
    //   const vendorIndustry = render.find('.vendor-item').last().find('.positivity').text();
    //   chai.expect(vendorIndustry).to.eql('No Reviews');
    // });
    // describe('review bar', () => {
    //   it('renders review bar', () => {
    //     const reviewBar = render.find('.vendor-item').first().find('.progress');
    //     chai.expect(reviewBar).to.have.length(1);
    //   });

    //   it('renders positive reviews bar', () => {
    //     const positive = render.find('.vendor-item').first().find('.progress-bar.progress-bar-success');
    //     chai.expect(positive.prop('aria-valuenow')).to.eql(25);
    //   });

    //   it('renders neutral reviews bar', () => {
    //     const neutral = render.find('.vendor-item').first().find('.progress-bar.progress-bar-warning');
    //     chai.expect(neutral.prop('aria-valuenow')).to.eql(20);
    //   });

    //   it('renders negative reviews bar', () => {
    //     const negative = render.find('.vendor-item').first().find('.progress-bar.progress-bar-danger');
    //     chai.expect(negative.prop('aria-valuenow')).to.eql(5);
    //   });
    // });
  });
});
