/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { BASE_PATH, BACKEND_BASE_PATH } from '../../base_constants';
/**
 *****************************
 URL CONSTANTS
 *****************************
 */

const BASE_FF_PATH = BASE_PATH + '/app/search-studio#';

export const modelParameters = {
  connectorId: '',
  modelId: '',
};

export const FF_URL = {
  WORKFLOWS: BASE_FF_PATH + '/workflows',
  WORKFLOWS_LIST: BASE_FF_PATH + '/workflows?tab=manage',
  WORKFLOWS_NEW: BASE_FF_PATH + '/workflows?tab=create',
};

/**
 *****************************
 PUBLIC API CONSTANTS
 *****************************
 */

// const FF_BASE_API_PATH = '/_plugins/_flow_framework';
// const FF_WORKFLOW_ROUTE_PREFIX_API_PATH = FF_BASE_API_PATH + '/workflow';
// const FF_SEARCH_WORKFLOWS_ROUTE_API_PATH =
//   FF_WORKFLOW_ROUTE_PREFIX_API_PATH + '/_search';
// const FF_SEARCH_WORKFLOW_STATE_ROUTE_API_PATH =
//   FF_WORKFLOW_ROUTE_PREFIX_API_PATH + '/state/_search';

export const ML_COMMONS_APIS_PREFIX = BACKEND_BASE_PATH + '/_plugins/_ml';
export const ML_MODELS_BASE_URL = `${ML_COMMONS_APIS_PREFIX}/models`;
export const APIS_MLC = {
  CREATE_CONNECTOR_URL: `${ML_COMMONS_APIS_PREFIX}/connectors/_create`,
  REGISTER_MODEL_URL: `${ML_MODELS_BASE_URL}/_register`,
};
// export function deployModelUrl(modelId) {
//   return `${ML_COMMONS_APIS_PREFIX}/models/${modelId}/_deploy`;
// }

/**
 *****************************
 NODE API / SERVER CONSTANTS
 *****************************
 */
//http://localhost:5601/api/flow_framework/workflow/update/kPhgeZIBeRw16G30MmN7/false/false

export const BASE_FF_NODE_API_PATH = BASE_PATH + '/api/flow_framework';

//  export const FF_NODE_API_PATH = {
//    UPDATE_WORKFLOW: BASE_FF_NODE_API_PATH + '/detectors/_list*',
//  };

export function updateWorkflowNodeApiPath(workflowId) {
  return (
    BASE_FF_NODE_API_PATH + '/workflow/update/' + workflowId + '/false/false'
  );
}

export function provisionWorkflowNodeApiPath(workflowId) {
  return BASE_FF_NODE_API_PATH + '/workflow/provision/' + workflowId;
}

/**
 *****************************
 MISC CONSTANTS
 *****************************
 */

export const FF_FIXTURE_BASE_PATH = 'plugins/dashboards-flow-framework/';

export const TEST_WORKFLOW_ID = '123456789';
