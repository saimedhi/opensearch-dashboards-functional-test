/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
    FF_URL,
  } from '../../../utils/constants';

  
  describe('NeW Workflow page', () => {
    beforeEach(() => {
      cy.visit(FF_URL.WORKFLOWS_NEW);
    });
  
    it('should display the search bar', () => {
      cy.get('input[placeholder="Search"]').should('be.visible');
    });
  
    it('Redirect to create workflow', () => {
        cy.getElementByTestId('goButton').should('Go');
        cy.getElementByTestId('goButton').click();
   });
  })
