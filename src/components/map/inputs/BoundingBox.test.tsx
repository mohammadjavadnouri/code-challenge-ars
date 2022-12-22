import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useEffect } from "react";
import BoundingBox from "./BoundingBox";

test("put certain data to inputs and call OSM API and expect it to have certain result", async () => {
  const geoJSONDataSetter = jest.fn();
  const boundingBoxSetter = jest.fn();
  const { getByLabelText, getByText } = render(
    <BoundingBox
      geoJSONDataSetter={geoJSONDataSetter}
      boundingBoxSetter={boundingBoxSetter}
    />
  );
  const inputs = {
    leftMinLongitude: "13.40",
    bottomMinLatitude: "52.53",
    rightMaxLongitude: "13.4001",
    topMaxLatitude: "52.5301",
  };

  userEvent.type(
    getByLabelText(`Left min Longitude:`),
    inputs.leftMinLongitude
  );
  userEvent.type(
    getByLabelText(`Bottom min Latitude:`),
    inputs.bottomMinLatitude
  );
  userEvent.type(
    getByLabelText(`Right max Longitude:`),
    inputs.rightMaxLongitude
  );
  userEvent.type(getByLabelText(`Top max Latitude:`), inputs.topMaxLatitude);

  userEvent.click(getByText("Search"));

  await waitFor(() => {
    expect(boundingBoxSetter).toHaveBeenCalledWith(
      inputs.leftMinLongitude,
      inputs.bottomMinLatitude,
      inputs.rightMaxLongitude,
      inputs.topMaxLatitude
    );
    expect(boundingBoxSetter).toHaveBeenCalledTimes(1);
  });

  await waitFor(() =>
    expect(geoJSONDataSetter).toHaveBeenCalledWith({
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          id: "way/107822636",
          properties: {
            timestamp: "2016-01-10T13:51:52Z",
            version: 3,
            changeset: 36483177,
            user: "atpl_pilot",
            uid: 881429,
            building: "commercial",
            "building:levels": "4",
            id: "way/107822636",
          },
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [13.3998347, 52.5300898],
                [13.3998442, 52.5300201],
                [13.399847, 52.5299978],
                [13.3998747, 52.5299984],
                [13.4000412, 52.5300029],
                [13.4000317, 52.5300951],
                [13.3998347, 52.5300898],
              ],
            ],
          },
        },
        {
          type: "Feature",
          id: "way/107822658",
          properties: {
            timestamp: "2018-09-15T19:39:49Z",
            version: 8,
            changeset: 62620354,
            user: "Nakaner",
            uid: 496201,
            building: "residential",
            "building:levels": "5",
            id: "way/107822658",
          },
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [13.4001669, 52.5298213],
                [13.4001613, 52.529829],
                [13.4001775, 52.5298353],
                [13.4001738, 52.5298387],
                [13.4001813, 52.5298456],
                [13.400173, 52.5299147],
                [13.4001673, 52.5299601],
                [13.4001615, 52.530006],
                [13.4001028, 52.5300047],
                [13.4000702, 52.5300035],
                [13.4000903, 52.5298169],
                [13.4001034, 52.5296971],
                [13.4003838, 52.5297135],
                [13.4004031, 52.5297146],
                [13.4003892, 52.529821],
                [13.4003754, 52.529925],
                [13.4002972, 52.529921],
                [13.4003073, 52.5298462],
                [13.4003241, 52.5298387],
                [13.4003133, 52.5298295],
                [13.4001669, 52.5298213],
              ],
            ],
          },
        },
        {
          type: "Feature",
          id: "way/390601781",
          properties: {
            timestamp: "2016-01-10T13:51:36Z",
            version: 1,
            changeset: 36483177,
            user: "atpl_pilot",
            uid: 881429,
            building: "residential",
            "building:levels": "2",
            id: "way/390601781",
          },
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [13.3998747, 52.5299984],
                [13.3998817, 52.5299423],
                [13.3998788, 52.5299415],
                [13.399868, 52.5299419],
                [13.3998684, 52.5299397],
                [13.3999624, 52.5299462],
                [13.399971, 52.5298659],
                [13.399918, 52.5298625],
                [13.3999262, 52.5298078],
                [13.4000903, 52.5298169],
                [13.4000702, 52.5300035],
                [13.4000412, 52.5300029],
                [13.3998747, 52.5299984],
              ],
            ],
          },
        },
        {
          type: "Feature",
          id: "way/390601848",
          properties: {
            timestamp: "2016-01-10T13:51:41Z",
            version: 1,
            changeset: 36483177,
            user: "atpl_pilot",
            uid: 881429,
            building: "yes",
            "building:levels": "1",
            id: "way/390601848",
          },
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [13.4000993, 52.5300477],
                [13.4001028, 52.5300047],
                [13.4001615, 52.530006],
                [13.4001971, 52.5300071],
                [13.4001939, 52.5300437],
                [13.400173, 52.5300429],
                [13.4001734, 52.5300502],
                [13.4000993, 52.5300477],
              ],
            ],
          },
        },
        {
          type: "Feature",
          id: "way/390601865",
          properties: {
            timestamp: "2016-03-28T11:02:17Z",
            version: 2,
            changeset: 38117674,
            user: "MKnight",
            uid: 39774,
            building: "commercial",
            "building:levels": "6",
            id: "way/390601865",
          },
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [13.3998278, 52.5301788],
                [13.3998347, 52.5300898],
                [13.4000317, 52.5300951],
                [13.4000273, 52.5301554],
                [13.4001197, 52.5301579],
                [13.4001176, 52.5301878],
                [13.400106, 52.5301875],
                [13.4000577, 52.5301862],
                [13.4000223, 52.5301863],
                [13.3998278, 52.5301788],
              ],
            ],
          },
        },
        {
          type: "Feature",
          id: "node/5908587152",
          properties: {
            timestamp: "2021-10-02T11:42:43Z",
            version: 3,
            changeset: 111997190,
            user: "kjon",
            uid: 44217,
            amenity: "atm",
            brand: "Euronet",
            "brand:wikidata": "Q5412010",
            "brand:wikipedia": "en:Euronet Worldwide",
            name: "Euronet",
            opening_hours: "24/7",
            operator: "Euronet",
            "operator:wikidata": "Q5412010",
            "operator:wikipedia": "en:Euronet Worldwide",
            wheelchair: "no",
            id: "node/5908587152",
          },
          geometry: {
            type: "Point",
            coordinates: [13.4003838, 52.5297135],
          },
        },
      ],
    })
  );
});

test("click search button when one and/or more inputs are empty", () => {
  const geoJSONDataSetter = jest.fn();
  const boundingBoxSetter = jest.fn();
  const { getByLabelText, getByText, getByRole } = render(
    <BoundingBox
      geoJSONDataSetter={geoJSONDataSetter}
      boundingBoxSetter={boundingBoxSetter}
    />
  );

  const inputs = {
    leftMinLongitude: "",
    bottomMinLatitude: "52.53",
    rightMaxLongitude: "13.4001",
    topMaxLatitude: "52.5301",
  };

  // userEvent.type(
  //   getByLabelText(`Left min Longitude:`),
  //   inputs.leftMinLongitude
  // );
  userEvent.type(
    getByLabelText(`Bottom min Latitude:`),
    inputs.bottomMinLatitude
  );
  // userEvent.type(
  //   getByLabelText(`Right max Longitude:`),
  //   inputs.rightMaxLongitude
  // );
  // userEvent.type(getByLabelText(`Top max Latitude:`), inputs.topMaxLatitude);

  // userEvent.click(getByText("Search"));

  // const errorMessage = getByRole("alert");
  // expect(errorMessage).toHaveTextContent(
  //   "one or two of inputs is/are not typed"
  // );
});
