import * as React from "react";
// @ts-ignore
import StoryRouter from "storybook-react-router";
import RequestViewer from "./RequestViewer";
import { createFakeServerEnvironment, createTestingEnv } from "../env";
import { serverResolvers } from "../resolvers/index";
import App from "../App";

export default {
  title: "cities_app-demo1/App",
  decorators: [
    (storyFn: unknown) => {
      let router = StoryRouter();
      console.log(router);
      return router(storyFn);
    },
  ],
};

export const demo = (props: unknown) => {
  console.log(props);
  const { environment, server } = createFakeServerEnvironment(serverResolvers);
  //@ts-ignore
  window.relayStore = environment.getStore().getSource()._records;
  return (
    <>
      <App environment={environment} />
      <RequestViewer server={server} />
    </>
  );
};

export const errorInSearchParams = (props: unknown) => {
  const environment = createTestingEnv({
    Query: {
      citiesMetadata: () => {
        console.log("sheisse");
        throw new Error("sheisse");
      },
    },
    Node: {
      __resolveType() {},
    },
  });
  return <App environment={environment} />;
};
