import * as pulumi from '@pulumi/pulumi';

const environment = pulumi.getStack().substr(0, 4);

//#region app service plan
export const appServicePlan = `cloudskew${environment}`;
//#endregion

//#region app service
export const appServiceAPI = `cloudskewx${environment}`; // @todo: remove the 'x' later.
export const appServiceDiagramHelper = `cloudskewxdgmhelper${environment}`; // @todo: remove the 'x' later.
//#endregion

//#region CDN profiles
export const cdnProfile = `cloudskew${environment}`;
//#endregion

//#region CDN endpoints
export const cdnEndpointAsset = `cloudskew${environment}`;
export const cdnEndpointCustomImages = `cloudskewcustomimages${environment}`;
export const cdnEndpointLanding = `cloudskewlanding${environment}`;
export const cdnEndpointUI = `cloudskewui${environment}`;
//#endregion

//#region resource groups
export const rgAPI = `rg${environment}-cloudskew-api`;
export const rgCDN = `rg${environment}-cloudskew-cdn`;
export const rgContainerRegistry = `rg${environment}-cloudskew-container-registry`;
export const rgCustomImages = `rg${environment}-cloudskew-custom-images`;
export const rgDiagramHelper = `rg${environment}-cloudskew-diagram-helper`;
export const rgKeyVault = `rg${environment}-cloudskew-keyvault`;
export const rgLanding = `rg${environment}-cloudskew-landing`;
export const rgSQL = `rg${environment}-cloudskew-sql`;
export const rgUI = `rg${environment}-cloudskew-ui`;
//#endregion

//#region storage accounts
export const saCDN = `cloudskewxcdn${environment}`; // @todo: remove the 'x' later.
export const saCustomImages = `cloudskewxcustimages${environment}`; // @todo: remove the 'x' later.
export const saLanding = `cloudskewxlanding${environment}`; // @todo: remove the 'x' later.
export const saUI = `cloudskewxui${environment}`; // @todo: remove the 'x' later.
//#endregion
