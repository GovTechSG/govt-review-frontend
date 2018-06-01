import React from 'react';
import * as enzyme from 'enzyme';
import * as chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import VendorSorter from '../../../../src/components/company/VendorSorter/VendorSorter';
import { mountWithIntl } from '../../../helpers/intl-enzyme-test-helper';

enzyme.configure({ adapter: new Adapter() });

describe('VendorSorter', () => {
  let render;

  before(() => {
    render = mountWithIntl(<VendorSorter />);
  });

  describe('renders', () => {
    it('renders search label', () => {
      const label = render.find('.control-label').text();

      chai.expect(label).to.eq("FIND CONSULTANTS AND VENDORS");
    });

    it('renders search bar', () => {
      const searchBar = render.find('#company-search-bar');

      chai.expect(searchBar).to.have.length(2);
    });

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
