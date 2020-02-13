import React, { useRef, useState, useEffect } from "react";
import GraphiQL from "graphiql";
import GraphiQLExplorer from "graphiql-explorer";
import { buildClientSchema, getIntrospectionQuery } from "graphql";

const URL = "https://swapi-graphql.netlify.com/.netlify/functions/index";

function fetcher(graphQLParams) {
  return fetch(URL, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(graphQLParams)
  }).then(response => response.json());
}

export default () => {
  const GraphiQLRef = useRef();
  const [query, setQuery] = useState("");
  const [schema, setSchema] = useState(undefined);

  useEffect(() => {
    if (schema === undefined) {
      fetcher({
        query: getIntrospectionQuery()
      }).then(result => {
        setSchema(buildClientSchema(result.data));
      });
    }
  }, []);

  return (
    <div className="graphiql-container">
      <GraphiQLExplorer
        schema={schema}
        query={query}
        onEdit={setQuery}
        onRunOperation={operationName =>
          GraphiQLRef.current.handleRunQuery(operationName)
        }
        explorerIsOpen={true}
      />

      <GraphiQL
        ref={GraphiQLRef}
        fetcher={fetcher}
        defaultQuery={""}
        query={query}
      />
    </div>
  );
};
