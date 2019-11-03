import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ExampleWork, {LambdaAPIGatewayPrototype, CognitoIdentityProviderPrototype, DynamoDBPrototype} from '../js/example-work.js';


Enzyme.configure({ adapter: new Adapter() });

describe("ExampleWork component", () => {
  let component = shallow(<ExampleWork />);

  it("Should be a div element", () => {
    expect(component.type()).toEqual('div');
  });

  it("Should contain 1 WebSitePrototype", () => {
    expect(component.find("WebSitePrototype").length).toEqual(1);
  });

  it("Should contain 1 LambdaAPIGatewayPrototype", () => {
    expect(component.find("LambdaAPIGatewayPrototype").length).toEqual(1);
  });

  it("Should contain 1 CognitoIdentityProviderPrototype", () => {
      expect(component.find("CognitoIdentityProviderPrototype").length).toEqual(1);
  });

  it("Should contain 1 DynamoDBPrototype", () => {
      expect(component.find("DynamoDBPrototype").length).toEqual(1);
  });

});


describe("LambdaAPIGatewayPrototype component", () => {
  let component = shallow(<LambdaAPIGatewayPrototype />);

  it("Should be a div element", () => {
    expect(component.type()).toEqual('div');
  });

  it("Should contain 1 button", () => {
    expect(component.find("button").length).toEqual(1);
  });
});


describe("CognitoIdentityProviderPrototype component", () => {
  let component = shallow(<CognitoIdentityProviderPrototype />);

  it("Should be a div element", () => {
    expect(component.type()).toEqual('div');
  });

  it("Should contain 1 button", () => {
    expect(component.find("button").length).toEqual(1);
  });
});


describe("DynamoDBPrototype component", () => {
  let component = shallow(<DynamoDBPrototype />);

  it("Should be a div element", () => {
    expect(component.type()).toEqual('div');
  });

  it("Should contain 1 button", () => {
    expect(component.find("button").length).toEqual(1);
  });
});
