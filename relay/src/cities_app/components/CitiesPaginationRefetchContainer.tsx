import * as React from "react";
import { graphql, createRefetchContainer, RelayRefetchProp } from "react-relay";
import { IEnvironment } from "relay-runtime";
import CitiesPagination, {
  defaultData as citiesPaginationDefaultData,
} from "./CitiesPagination";
import { SearchParametersNullableType } from "./SearchParameters";
import LoadingContext, { LoadingPlaceholderQueryRenderer } from "../LoadingContext";
import { CitiesPagination_page } from "__relay__/CitiesPagination_page.graphql";
import { CitiesPaginationRefetchContainer_root } from "__relay__/CitiesPaginationRefetchContainer_root.graphql";
import { CitiesPaginationRefetchContainerQuery } from "__relay__/CitiesPaginationRefetchContainerQuery.graphql";

type Args = {
  root: CitiesPaginationRefetchContainer_root;
  relay: RelayRefetchProp;
};

type Props = Args & {
  render?: RenderCallbackType;
};

type RenderCallbackType = (args: Args, isLoading: boolean) => JSX.Element;

const loadNextPage = (relay: RelayRefetchProp) => (
  currentPage: CitiesPagination_page
) => {
  let { nodes } = currentPage;
  if (nodes && nodes.length > 0) {
    let after = nodes[nodes.length - 1].id;
    currentPage.hasNext &&
      relay.refetch((nextVars) => {
        return { ...nextVars, after };
      });
  }
};

const loadPrevPage = (relay: RelayRefetchProp) => (
  currentPage: CitiesPagination_page
) => {
  let { nodes } = currentPage;
  if (nodes && nodes.length > 0) {
    let before = nodes[0].id;
    currentPage.hasPrev &&
      relay.refetch((prevVars) => {
        return { ...prevVars, before };
      });
  }
};

const CitiesPaginationRefetchContainer = createRefetchContainer(
  ({ root, relay, render }: Props) => {
    const isLoading = React.useContext(LoadingContext);
    return (
      root.citiesPagination &&
      (render ? (
        render(
          {
            page: root.citiesPagination,
            loadNextPage: loadNextPage(relay),
            loadPrevPage: loadPrevPage(relay),
          },
          isLoading
        )
      ) : (
        <CitiesPagination
          page={root.citiesPagination}
          loadNextPage={loadNextPage(relay)}
          loadPrevPage={loadPrevPage(relay)}
        />
      ))
    );
  },
  {
    root: graphql`
      fragment CitiesPaginationRefetchContainer_root on Query
        @argumentDefinitions(
          pageSize: { type: "Int" }
          after: { type: "String" }
          before: { type: "String" }
          searchParams: { type: "CitySearchParamsInput" }
        ) {
        citiesPagination(
          pageSize: $pageSize
          after: $after
          before: $before
          searchParams: $searchParams
        ) {
          ...CitiesPagination_page
        }
      }
    `,
  },
  graphql`
    query CitiesPaginationRefetchContainerRefetchQuery(
      $pageSize: Int
      $after: String
      $before: String
      $searchParams: CitySearchParamsInput
    ) {
      ...CitiesPaginationRefetchContainer_root
        @arguments(
          pageSize: $pageSize
          after: $after
          before: $before
          searchParams: $searchParams
        )
    }
  `
);

export default function({
  environment,
  searchParams,
}: {
  environment: IEnvironment;
  searchParams: SearchParametersNullableType;
}) {
  return (
    <LoadingPlaceholderQueryRenderer<CitiesPaginationRefetchContainerQuery>
      query={graphql`
        query CitiesPaginationRefetchContainerQuery(
          $pageSize: Int
          $after: String
          $before: String
          $searchParams: CitySearchParamsInput
        ) {
          ...CitiesPaginationRefetchContainer_root
            @arguments(
              pageSize: $pageSize
              after: $after
              before: $before
              searchParams: $searchParams
            )
        }
      `}
      environment={environment}
      variables={{ searchParams }}
      placeholderData={{
        citiesPagination: { ...citiesPaginationDefaultData },
      }}
      render={({ props }) => {
        return <CitiesPaginationRefetchContainer root={props} />;
      }}
    />
  );
}
