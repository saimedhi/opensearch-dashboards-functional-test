/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
    FF_URL,
  } from '../../../utils/constants';

  
  describe('Workflow list page', () => {
    before(() => {});

    it('Redirect to create workflow', () => {

        cy.visit(FF_URL.WORKFLOWS_NEW);
        cy.getElementByTestId('goButton').should('Go');
        cy.getElementByTestId('goButton').click();
   });
  })
