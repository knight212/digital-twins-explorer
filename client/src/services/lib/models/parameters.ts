/*
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as msRest from "@azure/ms-rest-js";

export const acceptLanguage: msRest.OperationParameter = {
  parameterPath: "acceptLanguage",
  mapper: {
    serializedName: "accept-language",
    defaultValue: 'en-US',
    type: {
      name: "String"
    }
  }
};
export const apiVersion: msRest.OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    required: true,
    isConstant: true,
    serializedName: "api-version",
    defaultValue: '2020-05-31-preview',
    type: {
      name: "String"
    }
  }
};
export const componentPath: msRest.OperationURLParameter = {
  parameterPath: "componentPath",
  mapper: {
    required: true,
    serializedName: "componentPath",
    type: {
      name: "String"
    }
  }
};
export const dependenciesFor: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "dependenciesFor"
  ],
  mapper: {
    serializedName: "dependenciesFor",
    type: {
      name: "Sequence",
      element: {
        type: {
          name: "String"
        }
      }
    }
  },
  collectionFormat: msRest.QueryCollectionFormat.Multi
};
export const dtId: msRest.OperationParameter = {
  parameterPath: "dtId",
  mapper: {
    required: true,
    serializedName: "dt-id",
    type: {
      name: "String"
    }
  }
};
export const dtTimestamp: msRest.OperationParameter = {
  parameterPath: [
    "options",
    "dtTimestamp"
  ],
  mapper: {
    serializedName: "dt-timestamp",
    type: {
      name: "String"
    }
  }
};
export const id: msRest.OperationURLParameter = {
  parameterPath: "id",
  mapper: {
    required: true,
    serializedName: "id",
    type: {
      name: "String"
    }
  }
};
export const ifMatch: msRest.OperationParameter = {
  parameterPath: [
    "options",
    "ifMatch"
  ],
  mapper: {
    serializedName: "If-Match",
    type: {
      name: "String"
    }
  }
};
export const ifNoneMatch: msRest.OperationParameter = {
  parameterPath: [
    "options",
    "ifNoneMatch"
  ],
  mapper: {
    serializedName: "If-None-Match",
    type: {
      name: "String"
    }
  }
};
export const includeModelDefinition: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "includeModelDefinition"
  ],
  mapper: {
    serializedName: "includeModelDefinition",
    defaultValue: false,
    type: {
      name: "Boolean"
    }
  }
};
export const maxItemCount0: msRest.OperationParameter = {
  parameterPath: [
    "options",
    "digitalTwinModelsListOptions",
    "maxItemCount"
  ],
  mapper: {
    serializedName: "x-ms-max-item-count",
    defaultValue: -1,
    type: {
      name: "Number"
    }
  }
};
export const maxItemCount1: msRest.OperationParameter = {
  parameterPath: [
    "options",
    "eventRoutesListOptions",
    "maxItemCount"
  ],
  mapper: {
    serializedName: "x-ms-max-item-count",
    defaultValue: -1,
    type: {
      name: "Number"
    }
  }
};
export const nextPageLink: msRest.OperationURLParameter = {
  parameterPath: "nextPageLink",
  mapper: {
    required: true,
    serializedName: "nextLink",
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};
export const relationshipId: msRest.OperationURLParameter = {
  parameterPath: "relationshipId",
  mapper: {
    required: true,
    serializedName: "relationshipId",
    type: {
      name: "String"
    }
  }
};
export const relationshipName: msRest.OperationQueryParameter = {
  parameterPath: [
    "options",
    "relationshipName"
  ],
  mapper: {
    serializedName: "relationshipName",
    type: {
      name: "String"
    }
  }
};