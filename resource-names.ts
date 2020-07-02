import * as pulumi from '@pulumi/pulumi';

const environment = pulumi.getStack().substr(0, 4);

//#region app service plan
export const appServicePlan = `cloudskew${environment}`;
//#endregion

//#region app service
export const appServiceAPI = `cloudskew${environment}`;
export const appServiceDiagramHelper = `cloudskewdgmhelper${environment}`;
//#endregion

//#region CDN profiles
export const cdnProfile = `cloudskew${environment}`;
//#endregion

//#region CDN endpoints
export const cdnEndpointAsset = `cloudskew${environment}`;
export const cdnEndpointBlog = `cloudskewblog${environment}`;
export const cdnEndpointCustomImages = `cloudskewcustomimages${environment}`;
export const cdnEndpointLanding = `cloudskewlanding${environment}`;
export const cdnEndpointUI = `cloudskewui${environment}`;
//#endregion

//#region container registry
export const containerRegistry = `cloudskewcr${environment}`;
//#endregion

//#region container registry webhook
export const crWebhook = `cloudskewcrwebhook${environment}`;
//#endregion

//#region key vault
export const keyVault = `cloudskewkeyvault${environment}`;
//#endregion

//#region key vault secrets
export const kvSecretSqlConnectionString = 'sqlConnectionString';
export const kvSecretCustomImagesStorageAccountConnectionString = 'customImagesStorageAccountConnectionString';
//#endregion

//#region managed identity (user-assigned)
export const managedIdentity = `cloudskewmanagedidentity${environment}`;
//#endregion

//#region resource groups
export const rgAPI = `rg${environment}-cloudskew-api`;
export const rgBlog = `rg${environment}-cloudskew-blog`;
export const rgCDN = `rg${environment}-cloudskew-cdn`;
export const rgContainerRegistry = `rg${environment}-cloudskew-container-registry`;
export const rgCustomImages = `rg${environment}-cloudskew-custom-images`;
export const rgDiagramHelper = `rg${environment}-cloudskew-diagram-helper`;
export const rgKeyVault = `rg${environment}-cloudskew-keyvault`;
export const rgLanding = `rg${environment}-cloudskew-landing`;
export const rgManagedIdentity = `rg${environment}-cloudskew-managed-identity`;
export const rgSQL = `rg${environment}-cloudskew-sql`;
export const rgUI = `rg${environment}-cloudskew-ui`;
//#endregion

//#region storage accounts
export const saBlog = `cloudskewblog${environment}`;
export const saCDN = `cloudskewcdn${environment}`;
export const saCustomImages = `cloudskewcustimages${environment}`;
export const saLanding = `cloudskewlanding${environment}`;
export const saUI = `cloudskewui${environment}`;
//#endregion

//#region sql databases
export const sqlDB = `cloudskew${environment}`;
//#endregion

//#region sql server firewall rule
export const sqlServerFirewallRule = `cloudskew${environment}`;
//#endregion

//#region sql servers
export const sqlServer = `cloudskew${environment}`;
//#endregion