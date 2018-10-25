import React from 'react';
import * as enzyme from 'enzyme';
import * as chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { NavItem, ControlLabel, InputGroup, FormControl } from 'react-bootstrap';
import VendorSorter from '../../../../src/components/company/VendorSorter/VendorSorter';
import VendorListingBox from '../../../../src/components/company/VendorListingBox/VendorListingBox';
import { shallowWithIntl } from '../../../helpers/intl-enzyme-test-helper';

enzyme.configure({ adapter: new Adapter() });

describe('VendorSorter', () => {
  let render;
  const filterUrl = '';

  before(() => {
    render = shallowWithIntl(<VendorSorter filterUrl={filterUrl} />, { disableLifecycleMethods: true });
  });

  describe('renders', () => {
    it('renders search label', () => {
      const label = render.find(ControlLabel).find('FormattedMessage').dive().text();

      chai.expect(label).to.eq('FIND CONSULTANTS AND VENDORS');
    });

    it('renders search bar', () => {
      const searchBar = render.find(InputGroup);
      chai.expect(searchBar).to.have.length(1);
    });

    it('renders text in search bar', () => {
      const searchBar = render.find(InputGroup).dive()
        .find('FormattedMessage').dive()
        .find(FormControl);

      chai.expect(searchBar.prop('placeholder')).to.equal('Search for a company\'s name');
    });

    it('has a default selected view of best ratings', () => {
      chai.expect(render.state(['selectedView'])).to.equal('aggregate_score');
    });

    it('renders sorter text', () => {
      const labels = render.find(NavItem).map(data => {
        return data.find('FormattedMessage').dive().text();
      });
      chai.expect(labels).to.deep.eq(['Best Ratings', 'Newly Added']);
    });

    it('updates state on sort change', () => {
      render.instance().handleSelect('newly_added', { preventDefault: () => {} });
      chai.expect(render.state('selectedView')).to.eq('newly_added');
      chai.expect(render.state('activePage')).to.eq(1);
    });

    it('renders vendor listing box', () => {
      chai.expect(render.find(VendorListingBox)).to.have.length(1);
    });

    it('does not render Pagination when count is 0', () => {
      chai.expect(render.find('#pagination')).to.have.length(0);
      chai.expect(render.find('#total-items')).to.have.length(0);
    });

    it('does render pagination when count is more than 0', () => {
      render.setState({
        currentItemsCount: 10,
        itemsCountPerPage: 5,
        activePage: 1
      });
      chai.expect(render.find('#pagination')).to.have.length(1);
      chai.expect(render.find('#total-items')).to.have.length(1);
      chai.expect(render.find('#total-items').find('FormattedMessage').dive().text()).to.eq('1 - 5 of 10 results');
    });

    it('does does change page info on page change', () => {
      render.setState({
        currentItemsCount: 10,
        itemsCountPerPage: 5,
        activePage: 2
      });
      chai.expect(render.find('#total-items').find('FormattedMessage').dive().text()).to.eq('6 - 10 of 10 results');
    });

    it('updates state on page change', () => {
      render.setState({
        activePage: 1
      });
      render.instance().handlePageChange({ selected: 1 });
      chai.expect(render.state('activePage')).to.eq(2);
    });
  });
});
