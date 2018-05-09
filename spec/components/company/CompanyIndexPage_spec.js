import React from 'react';
import * as enzyme from 'enzyme';
import * as chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import CompanyIndexPage from '../../../src/components/company/CompanyIndexPage';

enzyme.configure({ adapter: new Adapter() });

describe('CompanyIndexPage', () => {
  let render;
  const title = 'Government Review Platform';

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
  });
});
