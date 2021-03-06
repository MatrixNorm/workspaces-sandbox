import * as React from "react";
import { graphql, createFragmentContainer } from "react-relay";
import styled from "styled-components";
import { LoadingContext, placeholderCssMixin } from "../verysmart/LoadingContext";
import RenderCallbackContext from "../verysmart/RenderCallbackContext";
import { CitySummary_city } from "__relay__/CitySummary_city.graphql";
import { NukeFragRef } from "../helpers/typeUtils";

const CitySummarySuccess = styled.section`
  padding: 0 1em 0 1em;
  .row {
    text-align: right;
  }
  .row-name {
    text-align: left;
    margin: 0 0 0.2em 0;
  }
  .name {
    margin-right: 2px;
    font-weight: bold;
  }
  .country {
    font-size: 0.85em;
    color: #00bcd4;
  }
  .population-label {
    font-size: 0.9em;
    margin-right: 15px;
  }
`;

const CitySummaryLoading = styled(CitySummarySuccess)`
  ${placeholderCssMixin}
`;

type Props = {
  city: CitySummary_city;
};

export default createFragmentContainer(
  ({ city }: Props) => {
    const renderCallback = React.useContext(RenderCallbackContext)["CitySummary"];
    if (renderCallback) {
      return renderCallback({ city });
    }
    const isLoading = React.useContext(LoadingContext);
    const CitySummary = isLoading ? CitySummaryLoading : CitySummarySuccess;
    return (
      <CitySummary>
        <div className="row">
          <span className="country placeholder">{city.country}</span>
        </div>
        <div className="row row-name">
          <span className="name placeholder">{city.name}</span>
        </div>
        <div className="row placeholder">
          <label className="population-label">pop.</label>
          <span className="population">{city.population}</span>
        </div>
      </CitySummary>
    );
  },
  {
    city: graphql`
      fragment CitySummary_city on City {
        id
        name
        country
        population
      }
    `,
  }
);

export const defaultData = {
  __typename: "City",
  id: "1",
  name: "Lower Oak City",
  country: "Upper Forestland",
  population: 1000000,
} as NukeFragRef<CitySummary_city>;
