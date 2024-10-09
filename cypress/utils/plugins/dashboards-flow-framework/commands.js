/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { APIS_MLC, ML_MODELS_BASE_URL } from '../../../utils/constants';

Cypress.Commands.add('getElementByDataTestId', (testId) => {
  return cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add('createConnector', (connectorBody) =>
  cy
    .request({
      method: 'POST',
      url: APIS_MLC.CREATE_CONNECTOR_URL,
      body: connectorBody,
    })
    .then(({ body }) => body)
);

Cypress.Commands.add('registerAndDeployModel', ({ body, qs }) =>
  cy
    .request({
      method: 'POST',
      url: APIS_MLC.REGISTER_MODEL_URL,
      qs,
      body,
    })
    .then(({ body }) => body)
);

Cypress.Commands.add('undeployMLCommonsModel', (modelId) =>
  cy
    .request({
      method: 'POST',
      url: ML_MODELS_BASE_URL + `/${modelId}` + `/_undeploy`,
    })
    .then(({ body }) => body)
);

Cypress.Commands.add('deleteMLCommonsModel', (modelId) =>
  cy
    .request({
      method: 'DELETE',
      url: ML_MODELS_BASE_URL + `/${modelId}`,
    })
    .then(({ body }) => body)
);
