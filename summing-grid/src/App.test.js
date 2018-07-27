import React from 'react';
import ReactDOM from 'react-dom';
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

// tslint:disable-next-line:no-any
configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('testing validateNumericalInput function against different input values', () => {
  const instance = shallow(<App />).instance();

  const values = [
    {input: "1", output: true},
    {input: "12345", output: true},
    {input: "0928340923840", output: true},
    {input: "", output: true},
    {input: "1a", output: false},
    {input: "1!", output: false},
    {input: "Hello World!", output: false},
    {input: "  ", output: false}
  ];

  values.forEach((value) => {
    expect(instance.validateNumericalInput(value.input)).toBe(value.output);
  });
});


it('testing numberFormatter function against different input values', () => {
  const instance = shallow(<App />).instance();

  const values = [
    {input: "1", output: "1"},
    {input: "999", output: "999"},
    {input: "1000", output: "1K"},
    {input: "100000", output: "100K"},
    {input: "1000000", output: "1M"},
    {input: "100000000", output: "100M"},
    {input: "1234", output: "1.23K"},
    {input: "123400", output: "123K"},
    {input: "1234000", output: "1.23M"},
    {input: "1234000000", output: "1.23B"},
    {input: "1234000000000", output: "1T+"}
  ];

  values.forEach((value) => {
    expect(instance.numberFormatter(value.input)).toBe(value.output);
  });
});

it('testing sum of inputs values by leveraging updateNumber function called by onChange listeners', () => {
  const instance = shallow(<App />).instance();

  let sum = instance.state.values[0] + instance.state.values[1] + instance.state.values[2];
  let formattedSum = instance.numberFormatter(sum);

  expect(sum).toBe(0);
  expect(formattedSum).toBe(0)

  instance.updateNumber({target: { value: "5"}, preventDefault: () => {}}, 0);
  instance.updateNumber({target: { value: "10"}, preventDefault: () => {}}, 1);
  instance.updateNumber({target: { value: "25"}, preventDefault: () => {}}, 2);

  expect(instance.state.values).toEqual([5, 10, 25]);

  sum = instance.state.values[0] + instance.state.values[1] + instance.state.values[2];
  formattedSum = instance.numberFormatter(sum);

  expect(formattedSum).toBe(40);

  instance.updateNumber({target: { value: "5000"}, preventDefault: () => {}}, 0);
  instance.updateNumber({target: { value: "1000000"}, preventDefault: () => {}}, 1);
  instance.updateNumber({target: { value: "25000"}, preventDefault: () => {}}, 2);

  expect(instance.state.values).toEqual([5000, 1000000, 25000]);

  sum = instance.state.values[0] + instance.state.values[1] + instance.state.values[2];
  formattedSum = instance.numberFormatter(sum);

  expect(formattedSum).toBe("1.03M");
});
