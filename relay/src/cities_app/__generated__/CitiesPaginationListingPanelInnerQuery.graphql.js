/**
 * @flow
 * @relayHash 27fc74f5171fa06f388f4e2306b9c2be
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
import type { CitiesPagination_cities$ref } from "./CitiesPagination_cities.graphql";
export type CitiesOrderAttr = "countryASC" | "countryDESC" | "latASC" | "latDESC" | "lngASC" | "lngDESC" | "nameASC" | "nameDESC" | "populationASC" | "populationDESC";
export type CitySearchParamsInput = {|
  cityNameStartsWith?: ?string,
  country?: ?string,
  populationGte?: ?number,
  populationLte?: ?number,
  ordering?: ?CitiesOrderAttr,
|};
export type CitiesPaginationListingPanelInnerQueryVariables = {|
  pageNo: number,
  pageSize: number,
  searchParams?: ?CitySearchParamsInput,
|};
export type CitiesPaginationListingPanelInnerQueryResponse = {|
  +citiesPagination: ?{|
    +$fragmentRefs: CitiesPagination_cities$ref
  |}
|};
export type CitiesPaginationListingPanelInnerQuery = {|
  variables: CitiesPaginationListingPanelInnerQueryVariables,
  response: CitiesPaginationListingPanelInnerQueryResponse,
|};
*/


/*
query CitiesPaginationListingPanelInnerQuery(
  $pageNo: Int!
  $pageSize: Int!
  $searchParams: CitySearchParamsInput
) {
  citiesPagination(pageNo: $pageNo, pageSize: $pageSize, searchParams: $searchParams) {
    ...CitiesPagination_cities
  }
}

fragment CitiesPagination_cities on CitiesPagination {
  nodes {
    id
    name
    country
    population
    lat
    lng
  }
  pageNo
  hasNextPage
  hasPrevPage
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "pageNo",
    "type": "Int!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "pageSize",
    "type": "Int!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "searchParams",
    "type": "CitySearchParamsInput",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "pageNo",
    "variableName": "pageNo"
  },
  {
    "kind": "Variable",
    "name": "pageSize",
    "variableName": "pageSize"
  },
  {
    "kind": "Variable",
    "name": "searchParams",
    "variableName": "searchParams"
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CitiesPaginationListingPanelInnerQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "citiesPagination",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CitiesPagination",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "CitiesPagination_cities",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CitiesPaginationListingPanelInnerQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "citiesPagination",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CitiesPagination",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "nodes",
            "storageKey": null,
            "args": null,
            "concreteType": "City",
            "plural": true,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "id",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "name",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "country",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "population",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "lat",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "lng",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "pageNo",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "hasNextPage",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "hasPrevPage",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "CitiesPaginationListingPanelInnerQuery",
    "id": null,
    "text": "query CitiesPaginationListingPanelInnerQuery(\n  $pageNo: Int!\n  $pageSize: Int!\n  $searchParams: CitySearchParamsInput\n) {\n  citiesPagination(pageNo: $pageNo, pageSize: $pageSize, searchParams: $searchParams) {\n    ...CitiesPagination_cities\n  }\n}\n\nfragment CitiesPagination_cities on CitiesPagination {\n  nodes {\n    id\n    name\n    country\n    population\n    lat\n    lng\n  }\n  pageNo\n  hasNextPage\n  hasPrevPage\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'f84c3fe7d0bdebe8bca1c91a8d9a3c50';
module.exports = node;
