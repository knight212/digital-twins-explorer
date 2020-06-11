import React, { Component } from "react";
import Terminal from "react-console-emulator";
import { v4 as uuidv4 } from "uuid";

import { apiService } from "../../services/ApiService";
import { eventService } from "../../services/EventService";
import { ModelService } from "../../services/ModelService";

import "./ConsoleComponent.scss";

export class ConsoleComponent extends Component {

  constructor(props) {
    super(props);
    this.terminal = React.createRef();
  }

  patchTwin = async (arg1, arg2, arg3, arg4) => {
    if (arg1 && arg2 && arg3 && arg4) {
      try {
        const twin = await apiService.getTwinById(arg1);
        const properties = await new ModelService().getProperties(twin.body.$metadata.$model);
        const prop = properties.filter(p => p.name === arg3);

        if (prop <= 0) {
          this.terminal.current.pushToStdout("*** Property doesn\"t exist!");
          return;
        }

        let newArg4 = arg4;
        switch (prop[0].schema) {
          case "dtmi:dtdl:instance:Schema:integer;2":
            newArg4 = parseInt(arg4, 10);
            break;
          case "dtmi:dtdl:instance:Schema:double;2":
          case "dtmi:dtdl:instance:Schema:long;2":
          case "dtmi:dtdl:instance:Schema:float;2":
            newArg4 = parseFloat(arg4);
            break;
          case "dtmi:dtdl:instance:Schema:boolean;2":
            newArg4 = (arg4.toLowerCase() === "true");
            break;
          default:
            break;
        }

        const patch = { op: arg2, path: `/${arg3}`, value: newArg4 };
        const result = await apiService.updateTwin(arg1, [ patch ]);
        this.terminal.current.pushToStdout(JSON.stringify(result, null, 2));
      } catch (exc) {
        this.terminal.current.pushToStdout(`*** Error patching twin: ${exc}`);
      }
    } else {
      this.terminal.current.pushToStdout("***  Not enough params");
    }
  }

  getTwin = async arg1 => {
    if (arg1) {
      try {
        const result = await apiService.getTwinById(arg1);
        this.terminal.current.pushToStdout(JSON.stringify(result, null, 2));
      } catch (exc) {
        this.terminal.current.pushToStdout(`*** Error retrieving twin from ADT: ${exc}`);
      }
    } else {
      this.terminal.current.pushToStdout("***  Not enough params");
    }
  }

  addTwin = async (arg1, arg2) => {
    if (arg1 && arg2) {
      try {
        const payload = new ModelService().createPayload(arg1);
        const result = await apiService.addTwin(arg2, payload);
        eventService.publishCreateTwin({ $dtId: arg2, $metadata: { $model: arg1 } });
        this.terminal.current.pushToStdout(JSON.stringify(result, null, 2));
      } catch (exc) {
        this.terminal.current.pushToStdout(`*** Error creating twin from ADT: ${exc}`);
      }
    } else {
      this.terminal.current.pushToStdout("***  Not enough params");
    }
  }

  deleteTwin = async arg1 => {
    if (arg1) {
      try {
        await apiService.deleteTwin(arg1);
        eventService.publishDeleteTwin(arg1);
        this.terminal.current.pushToStdout(`*** Deleted Twin with ID:  ${arg1}`);
      } catch (exc) {
        this.terminal.current.pushToStdout(`*** Error deleting twin from ADT: ${exc}`);
      }
    } else {
      this.terminal.current.pushToStdout("***  Not enough params");
    }
  }

  getRelationships = async arg1 => {
    if (arg1) {
      try {
        const edgeList = await apiService.queryRelationships(arg1);
        if (edgeList !== null) {
          if (edgeList.length <= 0) {
            this.terminal.current.pushToStdout(`*** No relationships found.`);
          }

          for (const edge of edgeList) {
            this.terminal.current.pushToStdout(JSON.stringify(edge, null, 2));
          }
        }
      } catch (exc) {
        this.terminal.current.pushToStdout(`*** Error getting relationships: ${exc}`);
      }
    } else {
      this.terminal.current.pushToStdout("***  Not enough params");
    }
  }

  addRelationship = async (arg1, arg2, arg3) => {
    if (arg1 && arg2 && arg3) {
      try {
        const relId = uuidv4();
        const result = await apiService.addRelationship(arg1, arg2, arg3, relId);
        eventService.publishAddRelationship({ $targetId: arg1, $sourceId: arg2, $relationship: arg3, $relationshipId: relId });
        this.terminal.current.pushToStdout(JSON.stringify(result, null, 2));
      } catch (exc) {
        this.terminal.current.pushToStdout(`*** Error creating relationship: ${exc}`);
      }
    } else {
      this.terminal.current.pushToStdout("***  Not enough params");
    }
  }

  deleteRelationship = async (arg1, arg2) => {
    if (arg1 && arg2) {
      try {
        await apiService.deleteRelationship(arg1, arg2);
        eventService.publishDeleteRelationship(arg2);
        this.terminal.current.pushToStdout(`*** Deleted relationship with ID:  ${arg2}`);
      } catch (exc) {
        this.terminal.current.pushToStdout(`*** Error deleting relationship: ${exc}`);
      }
    } else {
      this.terminal.current.pushToStdout("***  Not enough params");
    }
  }

  getModel = async arg1 => {
    if (arg1) {
      try {
        const result = await apiService.getModelById(arg1);
        this.terminal.current.pushToStdout(JSON.stringify(result, null, 2));
      } catch (exc) {
        this.terminal.current.pushToStdout(`*** Error retrieving model from ADT: ${exc}`);
      }
    } else {
      this.terminal.current.pushToStdout("***  Not enough params");
    }
  }

  addModel = async arg1 => {
    if (arg1) {
      try {
        const model = JSON.parse(arg1);
        eventService.publishCreateModel();
        const result = await apiService.addModels([ model ]);
        this.terminal.current.pushToStdout(JSON.stringify(result, null, 2));
      } catch (exc) {
        this.terminal.current.pushToStdout(
          `*** Error creating model - Ensure there are no spaces in your input. You should NOT escape your JSON string: ${exc}`);
      }
    } else {
      this.terminal.current.pushToStdout("***  Not enough params");
    }
  }

  delModel = async arg1 => {
    if (arg1) {
      try {
        await apiService.deleteModel(arg1);
        eventService.publishDeleteModel(arg1);
        this.terminal.current.pushToStdout(`*** Deleted model with ID:  ${arg1}`);
      } catch (exc) {
        this.terminal.current.pushToStdout(`*** Error deleting model:  ${exc}`);
      }
    } else {
      this.terminal.current.pushToStdout("***  Not enough params");
    }
  }

  commands = {
    patchtwin: {
      description: "patch a digital twin",
      usage: "patchtwin <twinId:string> <operation:string> <propertyName:string> <value:string>",
      fn: (arg1, arg2, arg3, arg4) => this.patchTwin(arg1, arg2, arg3, arg4)
    },
    gettwin: {
      description: "get a digital twin",
      usage: "gettwin <twinId:string>",
      fn: arg1 => this.getTwin(arg1)
    },
    addtwin: {
      description: "add a digital twin",
      usage: "addtwin <modelId:string> <newTwinId:string>",
      fn: (arg1, arg2) => this.addTwin(arg1, arg2)
    },
    deltwin: {
      description: "delete a digital twin",
      usage: "deltwin <twinId:string>",
      fn: arg1 => this.deleteTwin(arg1)
    },
    getrel: {
      description: "get relationships",
      usage: "getrel <twinId:string>",
      fn: arg1 => this.getRelationships(arg1)
    },
    addrel: {
      description: "add relationship",
      usage: "addrel <sourceId:string> <targetId:string> <relationshipName:string>",
      fn: (arg1, arg2, arg3) => this.addRelationship(arg1, arg2, arg3)
    },
    delrel: {
      description: "delete relationship",
      usage: "delrel <twinId:string> <relationshipId:string>",
      fn: (arg1, arg2) => this.deleteRelationship(arg1, arg2)
    },
    getmodel: {
      description: "get model info",
      usage: "getmodel <modelId:string>",
      fn: arg1 => this.getModel(arg1)
    },
    addmodel: {
      description: "add model (ensure JSON has no spaces and is not escaped)",
      usage: "addmodel <modelJSON:string>",
      fn: arg1 => this.addModel(arg1)
    },
    delmodel: {
      description: "delete model",
      usage: "delmodel <modelId:string>",
      fn: arg1 => this.delModel(arg1)
    }
  }

  render() {
    return (
      <Terminal
        welcomeMessage="ADT Explorer command prompt"
        commands={this.commands}
        contentClassName="cc-content"
        inputClassName="cc-input"
        promptLabel="$>"
        className="cc-console"
        ref={this.terminal} />
    );
  }

}