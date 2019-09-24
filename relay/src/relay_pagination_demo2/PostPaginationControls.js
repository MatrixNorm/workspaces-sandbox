// @flow

import React, { useContext } from "react";
import { PostFeedContext } from "./PostFeedContext";
import { usePostPaginationControls } from "./postPaginationControlsHook";

const PostPaginationControls_v1 = () => {
  const { refetch } = useContext(PostFeedContext);
  const {
    config,
    activeField,
    handleActiveFieldChange,
    handleDirectionChange
  } = usePostPaginationControls(refetch);

  return (
    <div className="controls">
      <div>
        <label>
          <input
            type="radio"
            value="createdAt"
            checked={activeField === "createdAt"}
            onChange={() => handleActiveFieldChange("createdAt")}
          />
          {config["createdAt"].desc ? "Recent first" : "Oldest first"}
        </label>
        <label>
          <input
            type="checkbox"
            checked={config["createdAt"].desc}
            disabled={activeField !== "createdAt"}
            onChange={e =>
              handleDirectionChange({
                field: "createdAt",
                desc: e.target.checked
              })
            }
          />
          desc
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="viewsCount"
            checked={activeField === "viewsCount"}
            onChange={() => handleActiveFieldChange("viewsCount")}
          />
          {config["viewsCount"].desc
            ? "Most popular first"
            : "Least popular first"}
        </label>
        <label>
          <input
            type="checkbox"
            checked={config["viewsCount"].desc}
            disabled={activeField !== "viewsCount"}
            onChange={e =>
              handleDirectionChange({
                field: "viewsCount",
                desc: e.target.checked
              })
            }
          />
          desc
        </label>
      </div>
    </div>
  );
};

const PostPaginationControls_v2 = () => {
  const { refetch } = useContext(PostFeedContext);
  const {
    config,
    activeField,
    handleActiveFieldChange,
    handleDirectionChange
  } = usePostPaginationControls(refetch);

  return (
    <div className="controls">
      <div>
        <label>
          <input
            type="radio"
            value="createdAt"
            checked={activeField === "createdAt"}
            onChange={() => handleActiveFieldChange("createdAt")}
          />
          <button
            type="button"
            onClick={() =>
              (activeField === "createdAt") && handleDirectionChange({
                field: "createdAt",
                desc: !config["createdAt"].desc
              })
            }
          >
            {config["createdAt"].desc ? "Recent first" : "Oldest first"}
          </button>
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="viewsCount"
            checked={activeField === "viewsCount"}
            onChange={() => handleActiveFieldChange("viewsCount")}
          />
          <button
            type="button"
            onClick={() =>
              (activeField === "viewsCount") && handleDirectionChange({
                field: "viewsCount",
                desc: !config["viewsCount"].desc
              })
            }
          >
            {config["viewsCount"].desc
              ? "Most popular first"
              : "Least popular first"}
          </button>
        </label>
      </div>
    </div>
  );
};

export default {
  v1: PostPaginationControls_v1,
  v2: PostPaginationControls_v2
};
