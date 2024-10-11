/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

//import { APIS_MLC, ML_MODELS_BASE_URL } from '../../../utils/constants';
import {
  //FF_FIXTURE_BASE_PATH,
  provisionWorkflowNodeApiPath,
  updateWorkflowNodeApiPath,
} from '../../../utils/constants';

Cypress.Commands.add('getElementByDataTestId', (testId) => {
  return cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add(
  'createConnector',
  (connectorBody) =>
    cy
      .request({
        method: 'POST',
        form: false,
        url: 'api/console/proxy',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
          'osd-xsrf': true,
        },
        qs: {
          path: '_plugins/_ml/connectors/_create',
          method: 'POST',
        },
        body: connectorBody,
      })
      .then(({ body }) => body)
  // cy
  //   .request({
  //     method: 'POST',
  //     url: APIS_MLC.CREATE_CONNECTOR_URL,
  //     body: connectorBody,
  //   })
  //   .then(({ body }) => body)
);

Cypress.Commands.add(
  'registerAndDeployModel',
  ({ body }) =>
    cy
      .request({
        method: 'POST',
        form: false,
        url: 'api/console/proxy',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
          'osd-xsrf': true,
        },
        qs: {
          path: '_plugins/_ml/models/_register',
          method: 'POST',
        },
        body: body,
      })
      .then(({ body }) => body)
  // cy
  //   .request({
  //     method: 'POST',
  //     url: APIS_MLC.REGISTER_MODEL_URL,
  //     qs,
  //     body,
  //   })
  //   .then(({ body }) => body)
);

Cypress.Commands.add(
  'undeployMLCommonsModel',
  (modelId) =>
    cy
      .request({
        method: 'POST',
        form: false,
        url: 'api/console/proxy',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
          'osd-xsrf': true,
        },
        qs: {
          path: `_plugins/_ml/models` + `/${modelId}` + `/_undeploy`,
          method: 'POST',
        },
      })
      .then(({ body }) => body)
  // cy
  //   .request({
  //     method: 'POST',
  //     url: ML_MODELS_BASE_URL + `/${modelId}` + `/_undeploy`,
  //   })
  //   .then(({ body }) => body)
);

Cypress.Commands.add(
  'deleteMLCommonsModel',
  (modelId) =>
    cy
      .request({
        method: 'POST',
        form: false,
        url: 'api/console/proxy',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
          'osd-xsrf': true,
        },
        qs: {
          path: `_plugins/_ml/models` + `/${modelId}`,
          method: 'POST',
        },
      })
      .then(({ body }) => body)
  // cy
  //   .request({
  //     method: 'DELETE',
  //     url: ML_MODELS_BASE_URL + `/${modelId}`,
  //   })
  //   .then(({ body }) => body)
);

// cypress/support/commands.js

// Cypress.Commands.add('replacePlaceholdersInJson', (workflowId) => {
//   // Load the JSON template from the fixtures path
//   cy.fixture(`${FF_FIXTURE_BASE_PATH}update_workflow_response.json`).then(
//     (jsonTemplate) => {
//       // const updatedJson = JSON.stringify(jsonTemplate)
//       //   .replace(/\$workflowId/g, workflowId)
//       //   // .replace(/\$workflowName/g, workflowName)
//       //   // .replace(/\$ingest_pipeline_id/g, ingestPipelineId)
//       //   // .replace(/\$search_pipeline_id/g, searchPipelineId)
//       //   // .replace(/\$knn_index_id/g, knnIndexId)
//       //   // .replace(/\$ml_processor_ingest_id/g, mlProcessorIngestId);

//       // // Return the updated JSON object
//       // return JSON.parse(updatedJson);
//       return jsonTemplate;
//     }
//   );
// });
Cypress.Commands.add('getWorkflowId', () => {
  return cy.url().then((url) => {
    return url.substring(url.lastIndexOf('/') + 1); // Return the extracted workflow ID
  });
});

//ingestPipelineId,searchPipelineId, knnIndexId, mlProcessorIngestId
Cypress.Commands.add('mockUpdateWorkflow', (funcMockedOn, workflowId) => {
  // Intercept the PUT request to capture the request body
  cy.intercept('PUT', updateWorkflowNodeApiPath(workflowId), (req) => {
    const originalRequestBody = req.body; // Capture the original request body

    // Respond with the captured request body and workflowId
    req.reply({
      statusCode: 200,
      body: {
        workflowId: workflowId, // Use the provided workflowId
        workflowTemplate: originalRequestBody, // Use the captured request body
      },
    });
    console.log('updateWorkflow_response', {
      workflowId: workflowId, // Use the provided workflowId
      workflowTemplate: originalRequestBody, // Use the captured request body
    });
  }).as('updateWorkflow');

  cy.intercept('POST', provisionWorkflowNodeApiPath(workflowId), {
    statusCode: 200, // Return 200 status code
    body: {}, // Respond with an empty body
  }).as('provisionWorkflow');

  // Execute the function that triggers the mock API call
  funcMockedOn();

  // Wait for the intercept to finish
  cy.wait('@updateWorkflow');
  cy.wait('@provisionWorkflow');
});

// Cypress.Commands.add(
//   'mockUpdateWorkflow',
//   function ( funcMockedOn, workflowId) {
//     cy.intercept('GET',updateWorkflowNodeApiPath(workflowId), {
//       cy.fixture(`${FF_FIXTURE_BASE_PATH}update_workflow_response.json`).then((response) => {
//        response;
//       })
//     }).as('updateWorkflow');
//     funcMockedOn();
//     cy.wait('@updateWorkflow');
//   }
// );
