/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
    FF_URL,
    FF_FIXTURE_BASE_PATH,
    BACKEND_BASE_PATH,
    ML_COMMONS_API
  } from '../../../utils/constants';
import createConnectorBody from '../../../fixtures/plugins/dashboards-flow-framework/create_connector.json';
import registerModelBody from '../../../fixtures/plugins/dashboards-flow-framework/register_model.json';

  
  describe('Create Workflow', () => {
    const agentParameters = {
      connectorId: '',
      modelId: '',
      conversationalAgentId: '',
      rootAgentId: '',
    };
    before(() => {

    cy.request(
      'POST',
      `${BACKEND_BASE_PATH}${ML_COMMONS_API.CREATE_CONNECTOR}`,
      createConnectorBody
    )
      .then((resp) => {
        agentParameters.connectorId = resp.body.connector_id;
        return cy.request(
          'POST',
          `${BACKEND_BASE_PATH}${ML_COMMONS_API.CREATE_MODEL}?deploy=true`,
          {
            ...registerModelBody,
            connector_id: agentParameters.connectorId,
            function_name: 'remote',
          }
        );
      })
      .then((resp) => {
        agentParameters.modelId = resp.body.model_id;
        return cy.request(
          'POST',
          `${BACKEND_BASE_PATH}${ML_COMMONS_API.CREATE_AGENT}`,
          {
            ...nodesMap.register_agent[0].user_inputs,
            llm: {
              parameters:
                nodesMap.register_agent[0].user_inputs['llm.parameters'],
              model_id: agentParameters.modelId,
            },
            tools: [nodesMap.create_tool[0]].map((item) => item.user_inputs),
          }
        );
      })
      .then((resp) => {
        agentParameters.conversationalAgentId = resp.body.agent_id;
        return cy.request(
          'POST',
          `${BACKEND_BASE_PATH}${ML_COMMONS_API.CREATE_AGENT}`,
          {
            ...nodesMap.register_agent[1].user_inputs,
            tools: [
              {
                ...nodesMap.create_tool[1].user_inputs,
                parameters: {
                  ...nodesMap.create_tool[1].user_inputs.parameters,
                  agent_id: agentParameters.conversationalAgentId,
                },
              },
              {
                ...nodesMap.create_tool[2].user_inputs,
                parameters: {
                  ...nodesMap.create_tool[2].user_inputs.parameters,
                  model_id: agentParameters.modelId,
                },
              },
            ],
          }
        );
      })
      .then((resp) => {
        agentParameters.rootAgentId = resp.body.agent_id;
        return cy.putRootAgentId(agentParameters.rootAgentId);
      });
  });
    

    beforeEach(() => {
      cy.visit(FF_URL.WORKFLOWS_NEW);
    });
  
    it('should display the search bar', () => {
      cy.get('input[placeholder="Search"]').should('be.visible');
    });

    it('create workflow using import', () => {
        cy.getElementByTestId('importWorkflowButton').should('be.visible').click();
        cy.contains('Import a workflow (JSON/YAML)').should('be.visible');
        const filePath = FF_FIXTURE_BASE_PATH + 'sample-workflow.json';
        cy.get('input[type=file]').selectFile(filePath)
        cy.getElementByTestId('importJSONButton').should('be.visible').click();
      });

      it('create workflow using Custom template', () => {
        cy.contains('h2', 'Custom').parents('.euiCard').within(() => {
            cy.contains('button', 'Go').click();
          });
      });

      it('create workflow using Semantic Search template', () => {
        cy.contains('h2', 'Semantic Search').parents('.euiCard').within(() => {
            cy.contains('button', 'Go').click();
            cy.contains('button', 'Optional configuration').click();
          });
      });

    });
