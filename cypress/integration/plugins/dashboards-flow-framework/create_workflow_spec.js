/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  FF_URL,
  FF_FIXTURE_BASE_PATH,
  modelParameters,
} from '../../../utils/constants';
import createConnectorBody from '../../../fixtures/plugins/dashboards-flow-framework/create_connector.json';
//import connector1 from '../../../fixtures/plugins/dashboards-flow-framework/connector1.json';
import registerModelBody from '../../../fixtures/plugins/dashboards-flow-framework/register_model.json';
// import {
//   getElementByDataTestId,
//   createConnector,
//   registerAndDeployModel,
// } from '../../../utils/plugins/dashboards-flow-framework/commands';

describe('Create Workflow', () => {
  before(() => {
    cy.createConnector(createConnectorBody)
      .then((connectorResponse) => {
        modelParameters.connectorId = connectorResponse.connector_id;
        // Register the model and pass the connector ID with deploy=true
        cy.registerAndDeployModel({
          body: {
            ...registerModelBody,
            connector_id: modelParameters.connectorId,
            function_name: 'remote',
          },
          qs: { deploy: true },
        });
      })
      .then((modelResponse) => {
        modelParameters.modelId = modelResponse.model_id;
      });
  });

  beforeEach(() => {
    cy.visit(FF_URL.WORKFLOWS_NEW);
  });

  it('create workflow using Sentiment Analysis template', () => {
    cy.visit(FF_URL.WORKFLOWS_NEW);
    // cy.wait(120000);
    cy.contains('h2', 'Sentiment Analysis', { timeout: 10000 }).should(
      'be.visible'
    );
    cy.contains('h2', 'Sentiment Analysis')
      .parents('.euiCard')
      .within(() => {
        cy.contains('button', 'Go').click();
      });
    cy.getElementByDataTestId('optionalConfigurationButton')
      .should('be.visible')
      .click();
    cy.getElementByDataTestId('selectDeployedModelButton')
      .should('be.visible')
      .click();
    cy.get('.euiSuperSelect__item').should('be.visible');
    cy.get('.euiSuperSelect__item').should('have.length', 2);
    cy.get('.euiSuperSelect__item').contains('OpenAI').click();
    cy.get('textFieldQuickConfigure').clear().type('textfield');

    // TODO: Add ml model
    cy.getElementByDataTestId('quickConfigureCreateButton')
      .should('be.visible')
      .click();
    cy.url().should('include', FF_URL.WORKFLOWS + '/');
    cy.getElementByDataTestId('editSourceDataButton')
      .should('be.visible')
      .click();
    cy.getElementByDataTestId('uploadSourceDataButton')
      .should('be.visible')
      .click();
    const filePath =
      FF_FIXTURE_BASE_PATH + 'sentiment_analysis_source_data.json';
    cy.get('input[type=file]').selectFile(filePath);
    cy.getElementByDataTestId('closeSourceDataButton')
      .should('be.visible')
      .click();
    cy.getElementByDataTestId('runIngestionButton')
      .should('be.visible')
      .click();
    cy.get('input#skip').click({ force: true });
    cy.getElementByDataTestId('searchPipelineButton')
      .should('be.visible')
      .click();
  });

  // it('should display the search bar', () => {
  //   cy.get('input[placeholder="Search"]').should('be.visible');
  // });

  // it('create workflow using import', () => {
  //   cy.getElementByDataTestId('importWorkflowButton')
  //     .should('be.visible')
  //     .click();
  //   cy.contains('Import a workflow (JSON/YAML)').should('be.visible');
  //   const filePath = FF_FIXTURE_BASE_PATH + 'sample_workflow.json';
  //   cy.get('input[type=file]').selectFile(filePath);
  //   cy.getElementByDataTestId('importJSONButton').should('be.visible').click();
  //   //cy.url().should('include', FF_URL.WORKFLOWS_LIST); TODO:FF there is a bug
  // });

  // it('create workflow using Custom template', () => {
  //   cy.contains('h2', 'Custom')
  //     .parents('.euiCard')
  //     .within(() => {
  //       cy.contains('button', 'Go').click();
  //     });
  //   cy.contains('Quick configure').should('be.visible');
  //   cy.get('input[type="text"]').clear().type('new_custom_workflow');
  //   cy.getElementByDataTestId('quickConfigureCreateButton')
  //     .should('be.visible')
  //     .click();
  //   cy.url().should('include', FF_URL.WORKFLOWS + '/');
  // });

  // it('create workflow using Semantic Search template', () => {
  // cy.contains('h2', 'Semantic Search')
  //   .parents('.euiCard')
  //   .within(() => {
  //     cy.contains('button', 'Go').click();
  //     //cy.contains('button', 'Optional configuration').click();
  //   });
  // });

  // it('create workflow using Hybrid Search template', () => {
  //   cy.contains('h2', 'Hybrid Search')
  //     .parents('.euiCard')
  //     .within(() => {
  //       cy.contains('button', 'Go').click();
  //       cy.getElementByDataTestId('optionalConfigurationButton')
  //         .should('be.visible')
  //         .click();
  //     });
  // });

  // it('create workflow using Multimodal Search template', () => {
  //   cy.contains('h2', 'Multimodal Search')
  //     .parents('.euiCard')
  //     .within(() => {
  //       cy.contains('button', 'Go').click();
  //     });
  // });

  // it('create workflow using Retrieval-Augmented Generation (RAG) template', () => {
  //   cy.contains('h2', 'Retrieval-Augmented Generation (RAG)')
  //     .parents('.euiCard')
  //     .within(() => {
  //       cy.contains('button', 'Go').click();
  //     });
  // });
  after(() => {
    if (modelParameters.modelId != '') {
      cy.undeployMLCommonsModel(modelParameters.modelId).then((Response) => {
        console.log('Response:', Response);
      });
      cy.deleteMLCommonsModel(modelParameters.modelId).then((Response) => {
        console.log('Response:', Response);
      });
    }
  });
});
