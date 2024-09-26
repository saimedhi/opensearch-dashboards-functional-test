/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { BASE_PATH } from '../../base_constants';

/**
 *****************************
 URL CONSTANTS
 *****************************
 */

const BASE_FF_PATH = BASE_PATH + '/app/search-studio#';

export const FF_URL = {
  WORKFLOWS: BASE_FF_PATH + '/workflows',
  WORKFLOWS_LIST: BASE_FF_PATH + '/workflows?tab=manage',
  WORKFLOWS_NEW: BASE_FF_PATH + '/workflows?tab=create',
};

export function getWorkflowDetailPath(workflowId) {
  return FF_URL.WORKFLOWS + '/' + workflowId ;
}

/**
 *****************************
 PUBLIC API CONSTANTS
 *****************************
 */

const FF_BASE_API_PATH = '/_plugins/_flow_framework';
const FF_WORKFLOW_ROUTE_PREFIX_API_PATH = FF_BASE_API_PATH + '/workflow';
const FF_SEARCH_WORKFLOWS_ROUTE_API_PATH = FF_WORKFLOW_ROUTE_PREFIX_API_PATH + '/_search';
const FF_SEARCH_WORKFLOW_STATE_ROUTE_API_PATH = FF_WORKFLOW_ROUTE_PREFIX_API_PATH + '/state/_search';


// export function getADGetDetectorApiPath(detectorId) {
//   return AD_BASE_API_PATH + '/' + detectorId;
// }

// export function getADStopDetectorApiPath(detectorId) {
//   return AD_BASE_API_PATH + '/' + detectorId + '/_stop';
// }

// /**
//  *****************************
//  NODE API / SERVER CONSTANTS
//  *****************************
//  */

// const BASE_AD_NODE_API_PATH = BASE_PATH + '/api/anomaly_detectors';

// export const AD_NODE_API_PATH = {
//   GET_DETECTORS: BASE_AD_NODE_API_PATH + '/detectors/_list*',
//   GET_INDICES: BASE_AD_NODE_API_PATH + '/_indices*',
//   GET_MAPPINGS: BASE_AD_NODE_API_PATH + '/_mappings*',
//   VALIDATE: BASE_AD_NODE_API_PATH + '/detectors/_validate',
// };

// function getBaseNodeApiPath(detectorId) {
//   return BASE_AD_NODE_API_PATH + '/detectors/' + detectorId;
// }

// export function getADStartDetectorNodeApiPath(detectorId) {
//   return getBaseNodeApiPath(detectorId) + '/start';
// }

// export function getADStopDetectorNodeApiPath(detectorId) {
//   return getBaseNodeApiPath(detectorId) + '/stop/false';
// }

// export function getADDeleteDetectorNodeApiPath(detectorId) {
//   return getBaseNodeApiPath(detectorId);
// }

/**
 *****************************
 MISC CONSTANTS
 *****************************
 */

export const FF_FIXTURE_BASE_PATH =
  'plugins/dashboards-flow-framework/';

export const TEST_WORKFLOW_ID = '123456789';

// export const DETECTOR_STATE = {
//   DISABLED: 'Stopped',
//   INIT: 'Initializing',
//   RUNNING: 'Running',
//   FEATURE_REQUIRED: 'Feature required',
// };
