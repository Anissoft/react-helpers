import * as React from 'react';

import { cleanup, render } from '@testing-library/react';

import { Wrapper } from '.';

describe('Wrapper component', () => {
  afterEach(cleanup);

  test('Empty render', () => {
    const { container } = render(<div><Wrapper in={false} ></Wrapper></div>);
    expect(container.innerHTML).toBe('<div></div>');
  });

  test('Render only children if wrapper are not specified', () => {
    const { container } = render(<div><Wrapper in={true} >Test string</Wrapper></div>);
    expect(container.innerHTML).toBe('<div>Test string</div>');
  });

  test('Render wrapper if true', () => {
    const wrapper: React.FC = ({ children }) => <span>{children}</span>;
    const { container } = render(<div><Wrapper in={true} wrapper={wrapper} >Test string</Wrapper></div>);
    expect(container.innerHTML).toBe('<div><span>Test string</span></div>');
  });

  test('Use wrap function if true', () => {
    const wrap = (children: React.ReactNode) => <span>{children}</span>;
    const { container } = render(<div><Wrapper in={true} wrap={wrap} >Test string</Wrapper></div>);
    expect(container.innerHTML).toBe('<div><span>Test string</span></div>');
  });

  test('Don\'t render wrapper if false', () => {
    const wrapper: React.FC = ({ children }) => <span>{children}</span>;
    const { container } = render(<div><Wrapper in={true} wrapper={wrapper} >Test string</Wrapper></div>);
    expect(container.innerHTML).toBe('<div><span>Test string</span></div>');
  });

  test('Don\'t use wrap function if false', () => {
    const wrap = (children: React.ReactNode) => <span>{children}</span>;
    const { container } = render(<div><Wrapper in={true} wrap={wrap} >Test string</Wrapper></div>);
    expect(container.innerHTML).toBe('<div><span>Test string</span></div>');
  });

  test('Accept function as child', () => {
    const wrap = (children: React.ReactNode) => <span>{children}</span>;
    const child = () => <>Test string</>;
    const { container } = render(<div><Wrapper in={true} wrap={wrap} >{child}</Wrapper></div>);
    expect(container.innerHTML).toBe('<div><span>Test string</span></div>');
  });

  test('Wrap can return undefined', () => {
    const wrap = () => undefined as any;
    const child = 'Test string';
    const { container } = render(<div><Wrapper in={true} wrap={wrap} >{child}</Wrapper></div>);
    expect(container.innerHTML).toBe('<div></div>');
  });
});
