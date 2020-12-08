import { render, screen } from '@testing-library/react';
import App from './App';
import { shallow, mount } from "enzyme";
import CharacterDropdown from "./components/CharacterDropdown";

const charactersMockData = [
  {
    "name": "Luke Skywalker",
    "films": [
      "http://swapi.dev/api/films/1/",
      "http://swapi.dev/api/films/2/",
      "http://swapi.dev/api/films/3/",
      "http://swapi.dev/api/films/6/"
    ],
  },
  {
    "name": "C-3PO",
    "films": [
      "http://swapi.dev/api/films/1/",
      "http://swapi.dev/api/films/2/",
      "http://swapi.dev/api/films/3/",
      "http://swapi.dev/api/films/4/",
      "http://swapi.dev/api/films/5/",
      "http://swapi.dev/api/films/6/"
    ],
  },
  {
    "name": "R2-D2",
    "films": [
      "http://swapi.dev/api/films/1/",
      "http://swapi.dev/api/films/2/",
      "http://swapi.dev/api/films/3/",
      "http://swapi.dev/api/films/4/",
      "http://swapi.dev/api/films/5/",
      "http://swapi.dev/api/films/6/"
    ],
  }
];

describe("<CharacterDropdown />", () => {

  it("accepts characterProps", () => {
    const wrapper = mount(<CharacterDropdown characterProps={charactersMockData} />);
    expect(wrapper.props().characterProps).toEqual(charactersMockData);
  });

});
