import React from 'react';
import * as enzyme from 'enzyme';
import * as chai from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Footer from '../../../../../src/components/_base/layout/footer/Footer';

enzyme.configure({ adapter: new Adapter() });

describe('Header', () => {
  let render;

  before(() => {
    render = enzyme.shallow(<Footer />);
  });

  describe('Footer content', () => {
    let listItems;

    before(() => {
      listItems = render
        .find('#footer-content')
        .find('a');
    });

    it('renders footer content', () => {
      const map = listItems.map(a => {
        return a.text();
      });
      chai.expect(map).to.deep.equal([' About Us ', ' News ', ' How it works ',
        ' FAQ ', ' Contact Us/Feedback ', ' Privacy Statement ', ' Terms of Use ']);
    });

    it('links footer content', () => {
      const map = listItems.map(a => {
        return a.prop('href');
      });
      chai.expect(map).to.deep.equal(['#', '#', '#', '#', '#', '#', '#']);
      // chai.expect(map).to.deep.equal(['/about_us', '/news', '/how_it_works', '/faq', '/contact_us', '/privacy_statement', '/terms_of_use']);
    });
  });

  describe('Copyright', () => {
    let copyright;

    before(() => {
      copyright = render.find('#copyright-label');
    });

    it('renders copyright', () => {
      chai.expect(copyright.text()).to.equal(`\u00A9 ${new Date().getFullYear()} Copyright Government of Singapore`);
    });
  });

  it('renders browser support', () => {
    chai.expect(render.find('#browser-support').text()).to.equal('Government Review Platform is best viewed with Chrome, Firefox, Safari and Internet Explorer 10 and above');
  });
});
