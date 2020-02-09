/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CitiesBrowserPanel_cities = {
    readonly citiesPagination: {
        readonly " $fragmentRefs": FragmentRefs<"CitiesPagination_page">;
    } | null;
    readonly " $refType": "CitiesBrowserPanel_cities";
};
export type CitiesBrowserPanel_cities$data = CitiesBrowserPanel_cities;
export type CitiesBrowserPanel_cities$key = {
    readonly " $data"?: CitiesBrowserPanel_cities$data;
    readonly " $fragmentRefs": FragmentRefs<"CitiesBrowserPanel_cities">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "CitiesBrowserPanel_cities",
  "type": "Query",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "pageSize",
      "type": "Int",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "after",
      "type": "String",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "before",
      "type": "String",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "searchParams",
      "type": "CitySearchParamsInput",
      "defaultValue": null
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "citiesPagination",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "after",
          "variableName": "after"
        },
        {
          "kind": "Variable",
          "name": "before",
          "variableName": "before"
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
      ],
      "concreteType": "CitiesPagination",
      "plural": false,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "CitiesPagination_page",
          "args": null
        }
      ]
    }
  ]
};
(node as any).hash = 'b48eba6ba896791514a1b88f39a272ee';
export default node;
