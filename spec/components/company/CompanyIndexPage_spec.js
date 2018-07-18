import React from 'react';
import * as enzyme from 'enzyme';
import * as chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import CompanyIndexPage from '../../../src/components/company/CompanyIndexPage';

enzyme.configure({ adapter: new Adapter() });

describe('CompanyIndexPage', () => {
  let render;
  const title = 'GovReview';

  before(() => {
    render = enzyme.shallow(<CompanyIndexPage />); //eslint-disable-line
  });

  it('renders the default page title', () => {
    chai.expect(document.title).to.equal(title);
  });

  describe('renders', () => {
    it('renders VendorSorter', () => {
      const vendorSorter = render.find('VendorSorter');
      chai.expect(vendorSorter).to.have.length(1);
    });

    it('renders VendorSorter', () => {
      const sideBarFilter = render.find('SideBarFilter');
      chai.expect(sideBarFilter).to.have.length(1);
    });

    it('adds id to industry set', () => {
      chai.expect(render.state('industryFilter').has('asd')).to.eq(false);
      render.instance().handleIndustryFilterChange('asd');
      chai.expect(render.state('industryFilter').has('asd')).to.eq(true);
    });

    it('adds id to industry set', () => {
      chai.expect(render.state('industryFilter').has('asd')).to.eq(true);
      render.instance().handleIndustryFilterChange('asd');
      chai.expect(render.state('industryFilter').has('asd')).to.eq(false);
    });

    it('adds id to grant set', () => {
      chai.expect(render.state('grantFilter').has('asd')).to.eq(false);
      render.instance().handleGrantFilterChange('asd');
      chai.expect(render.state('grantFilter').has('asd')).to.eq(true);
    });

    it('adds id to grant set', () => {
      chai.expect(render.state('grantFilter').has('asd')).to.eq(true);
      render.instance().handleGrantFilterChange('asd');
      chai.expect(render.state('grantFilter').has('asd')).to.eq(false);
    });

    it('generates empty filter string when sets are empty', () => {
      render.setState({
        industryFilter: new Set(),
        grantFilter: new Set()
      });
      chai.expect(render.instance().generateFilterString()).to.eq('');
    });

    it('generates filter string', () => {
      render.setState({
        industryFilter: new Set(),
        grantFilter: new Set()
      });
      render.instance().handleIndustryFilterChange('abc');
      chai.expect(render.instance().generateFilterString()).to.eq('industries:abc');
      render.instance().handleGrantFilterChange('def');
      chai.expect(render.instance().generateFilterString()).to.eq('industries:abc,grants:def');
      render.instance().handleIndustryFilterChange('ghi');
      chai.expect(render.instance().generateFilterString()).to.eq('industries:abc,industries:ghi,grants:def');
      render.instance().handleGrantFilterChange('jkl');
      chai.expect(render.instance().generateFilterString()).to.eq('industries:abc,industries:ghi,grants:def,grants:jkl');
    });
  });
});
