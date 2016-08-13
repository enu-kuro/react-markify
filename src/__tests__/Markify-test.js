jest.autoMockOff();

let React = require('react');
let TestUtils = require('react-addons-test-utils');

describe('Markify', () => {
  let Markify = require('../Markify.jsx').default;


   describe('#parseString', () => {
     const targetWord = 'JavaScript'
     let markify = TestUtils.renderIntoDocument(<Markify targetWord={targetWord}></Markify>);
  //
  //   it('should not modify the string', () => {
  //     let input = 'React is a JavaScript library for building user interfaces.';
  //     let output = markify.parseString(input);
  //
  //     expect(output).toEqual(input);
  //   });

    it('should parse target word', () => {
      let input = 'React is a JavaScript library for building user interfaces.';
      let output = markify.parseString(input);
      expect(output[0]).toEqual('React is a ');
      expect(output[1].type).toEqual('mark');
      expect(output[1].props.children).toEqual(targetWord);
      expect(output[2]).toEqual(' library for building user interfaces.');
    });
/*
    it('should parse https url', () => {
      let input = 'https://facebook.github.io/react/';
      let output = markify.parseString(input);

      expect(output.type).toEqual('a');
      expect(output.props.href).toEqual(input);
      expect(output.props.children).toEqual(input);
    });

    it('should parse no protocol url', () => {
      let input = 'facebook.github.io/react/';
      let output = markify.parseString(input);

      expect(output.type).toEqual('a');
      expect(output.props.href).toEqual(`http://${input}`);
      expect(output.props.children).toEqual(input);
    });

    it('should parse url in beginning of text', () => {
      let input = ['https://github.com/facebook/react', ' is the location to the React source code.'];
      let output = markify.parseString(input.join(''));

      expect(Array.isArray(output)).toEqual(true);
      expect(output[0].type).toEqual('a');
      expect(output[0].props.href).toEqual(input[0]);
      expect(output[0].props.children).toEqual(input[0]);
      expect(output[1]).toEqual(input[1]);
    });

    it('should parse url in middle of text', () => {
      let input = ['Go to ', 'https://github.com/facebook/react', ' for the React source code.'];
      let output = markify.parseString(input.join(''));

      expect(Array.isArray(output)).toEqual(true);
      expect(output[0]).toEqual(input[0]);
      expect(output[1].type).toEqual('a');
      expect(output[1].props.href).toEqual(input[1]);
      expect(output[1].props.children).toEqual(input[1]);
      expect(output[2]).toEqual(input[2]);
    });

    it('should parse url in end of text', () => {
      let input = ['The React source code is located at ', 'https://github.com/facebook/react'];
      let output = markify.parseString(input.join(''));

      expect(Array.isArray(output)).toEqual(true);
      expect(output[0]).toEqual(input[0]);
      expect(output[1].type).toEqual('a');
      expect(output[1].props.href).toEqual(input[1]);
      expect(output[1].props.children).toEqual(input[1]);
    });
    */
  });

return
  describe('#parse', () => {
    let markify = TestUtils.renderIntoDocument(<Markify></Markify>);

    it('should not parse <a> elements', () => {
      let input = (
        <a href="http://facebook.github.io/react/">
          http://facebook.github.io/react/
        </a>
      );
      let output = markify.parse(input);

      expect(output).toEqual(input);
    });
  });

  describe('#render', () => {
    let markify = TestUtils.renderIntoDocument(<Markify></Markify>);

    it('should render with default className of Markify if one is not provided', () => {
      expect(markify.props.className).toEqual('Markify');
    });

    it('should render with a custom className if one is provided', () => {
      let markify = TestUtils.renderIntoDocument(<Markify className="custom-class"></Markify>);

      expect(markify.props.className).toEqual('custom-class');
    });

    it('should render with children if target word is not provided', () => {
      const children = <div className="children"></div>
      let markify = TestUtils.renderIntoDocument(<Markify>{children}</Markify>);

      expect(markify.props.children).toEqual(children);
    });
  });
});
