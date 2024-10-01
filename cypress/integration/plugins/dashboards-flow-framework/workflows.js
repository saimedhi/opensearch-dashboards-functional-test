/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
    FF_URL,
    FF_FIXTURE_BASE_PATH,
  } from '../../../utils/constants';

  
  describe('NeW Workflow page', () => {
    beforeEach(() => {
      cy.visit(FF_URL.WORKFLOWS_NEW);
    });
  
    it('should display the search bar', () => {
      cy.get('input[placeholder="Search"]').should('be.visible');
    });

    it('create workflow using import', () => {
        cy.getElementByTestId('importWorkflowButton').should('be.visible').click();
        cy.contains('Import a workflow (JSON/YAML)').should('be.visible');
        const fileName =  FF_FIXTURE_BASE_PATH + 'sample-workflow.json';
        cy.get('input[type="file"]').attachFile(fileName);
        cy.get('button:contains("Import")').should('not.be.disabled').click();
      });

      it('create workflow using template', () => {
        cy.contains('h2', 'Custom').parents('.euiCard').within(() => {
            cy.contains('button', 'Go').click();
          });
      });
  
  })
