/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { APIS_MLC } from '../../../utils/constants';

Cypress.Commands.add('getElementByDataTestId', (testId) => {
  return cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add('createConnector', (body) =>
  cy
    .request({
      method: 'POST',
      url: APIS_MLC.CREATE_CONNECTOR_URL,
      body,
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

// Cypress.Commands.add('deployMLCommonsModel', (modelId) =>
//   cy
//     .request({
//       method: 'POST',
//       url: `${APIS_MLC.MODEL_BASE}/${modelId}/_deploy`,
//     })
//     .then(({ body }) => body)
// );
