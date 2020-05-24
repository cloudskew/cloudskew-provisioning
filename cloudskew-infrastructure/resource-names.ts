import * as pulumi from '@pulumi/pulumi';

const environment = pulumi.getStack();

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
export const saCDN = `cloudskewcdn${environment}`;
export const saCustomImages = `cloudskewcustimages${environment}`;
export const saLanding = `cloudskewlanding${environment}`;
export const saUI = `cloudskewui${environment}`;
//#endregion
