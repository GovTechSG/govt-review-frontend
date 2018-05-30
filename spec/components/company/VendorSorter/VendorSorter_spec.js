import React from 'react';
import * as enzyme from 'enzyme';
import * as chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { mountWithIntl } from '../../../helpers/intl-enzyme-test-helper';
import VendorSorter from '../../../../src/components/company/VendorSorter/VendorSorter';

enzyme.configure({ adapter: new Adapter() });

describe('VendorSorter', () => {
  let render;

  before(() => {
    render = enzyme.shallow(<VendorSorter />);
  });

  describe('renders', () => {
    it('renders VendorListingBox', () => {
      const vendorListingBox = render.find('.vendor-listing-box');

      chai.expect(vendorListingBox).to.have.length(1);
    });

    it('has a default selected view of best ratings', () => {
      chai.expect(render.state(['selectedView'])).to.equal('best_ratings');
    });

    it('renders Pagination', () => {
      const pagination = render.find('.pagination');

      chai.expect(pagination).to.have.length(1);
    });
  });
});
