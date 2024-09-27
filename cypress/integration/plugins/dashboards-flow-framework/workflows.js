/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
    FF_FIXTURE_BASE_PATH,
    FF_URL,
    TEST_WORKFLOW_ID,
    //DETECTOR_STATE,
  } from '../../../utils/constants';
  //import { selectTopItemFromFilter } from '../../../utils/helpers';
  
  describe('Workflow list page', () => {
    before(() => {});

    it('Redirect to create workflow', () => {

        cy.visit(FF_URL.WORKFLOWS_NEW);
        cy.getElementByTestId('goButton').should('Go');
        cy.getElementByTestId('goButton').click();
   });
  
