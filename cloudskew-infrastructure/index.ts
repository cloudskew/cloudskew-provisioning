import * as azure from '@pulumi/azure';
import * as helper from './helper';
import * as resourceNames from './resource-names';

// @todo: need to ensure that this is either 'dev' or 'test', else must throw error
const location = 'westeurope';

// spawn the resource groups
let rgAPI = new azure.core.ResourceGroup(resourceNames.rgAPI, {
    name: resourceNames.rgAPI,
    location: location,
    tags: helper.tags,
});

let rgCDN = new azure.core.ResourceGroup(resourceNames.rgCDN, {
    name: resourceNames.rgCDN,
    location: location,
    tags: helper.tags,
});

let rgContainerRegistry = new azure.core.ResourceGroup(resourceNames.rgContainerRegistry, {
    name: resourceNames.rgContainerRegistry,
    location: location,
    tags: helper.tags,
});

let rgCustomImages = new azure.core.ResourceGroup(resourceNames.rgCustomImages, {
    name: resourceNames.rgCustomImages,
    location: location,
    tags: helper.tags,
});

let rgDiagramHelper = new azure.core.ResourceGroup(resourceNames.rgDiagramHelper, {
    name: resourceNames.rgDiagramHelper,
    location: location,
    tags: helper.tags,
});

let rgKeyVault = new azure.core.ResourceGroup(resourceNames.rgKeyVault, {
    name: resourceNames.rgKeyVault,
    location: location,
    tags: helper.tags,
});

let rgLanding = new azure.core.ResourceGroup(resourceNames.rgLanding, {
    name: resourceNames.rgLanding,
    location: location,
    tags: helper.tags,
});

let rgSQL = new azure.core.ResourceGroup(resourceNames.rgSQL, {
    name: resourceNames.rgSQL,
    location: location,
    tags: helper.tags,
});

let rgUI = new azure.core.ResourceGroup(resourceNames.rgUI, {
    name: resourceNames.rgUI,
    location: location,
    tags: helper.tags,
});

// now let us create the storage accounts
let saCDN = new azure.storage.Account(resourceNames.saCDN, {
    name: resourceNames.saCDN,
    resourceGroupName: rgCDN.name,
    tags: helper.tags,
    accountReplicationType: 'LRS',
    accountTier: 'Standard',
});

let saCustomImages = new azure.storage.Account(resourceNames.saCustomImages, {
    name: resourceNames.saCustomImages,
    resourceGroupName: rgCustomImages.name,
    tags: helper.tags,
    accountReplicationType: 'LRS',
    accountTier: 'Standard',
});

let saLanding = new azure.storage.Account(resourceNames.saLanding, {
    name: resourceNames.saLanding,
    resourceGroupName: rgLanding.name,
    tags: helper.tags,
    accountReplicationType: 'LRS',
    accountTier: 'Standard',
});

let saUI = new azure.storage.Account(resourceNames.saUI, {
    name: resourceNames.saUI,
    resourceGroupName: rgUI.name,
    tags: helper.tags,
    accountReplicationType: 'LRS',
    accountTier: 'Standard',
});

// // now let us create the CDN profiles & endpoints
// let cdnProfile = new azure.cdn.Profile(resourceNames.cdnProfile, {
//     name: resourceNames.cdnProfile,
//     resourceGroupName: rgCDN.name,
//     sku: 'Standard_Microsoft',
// });

// let cndEndpointAssets = new azure.cdn.Endpoint(resourceNames.cdnEndpointAsset, {
//     name: resourceNames.cdnEndpointAsset,
//     resourceGroupName: rgCDN.name,
//     profileName: cdnProfile.name,
//     origins: [{
//         name: 'testsamplebrew',
//         hostName: saCDN.primaryBlobEndpoint,
//     }],
// })

// let us create the container registry
let containerRegistry = new azure.containerservice.Registry(resourceNames.containerRegistry, {
    name: resourceNames.containerRegistry,
    resourceGroupName: rgContainerRegistry.name,
    tags: helper.tags,
    adminEnabled: true,
    sku: 'Basic',
});

// let us create the app service plan and app services
let appServicePlan = new azure.appservice.Plan(resourceNames.appServicePlan, {
    name: resourceNames.appServicePlan,
    resourceGroupName: rgAPI.name,
    tags: helper.tags,
    kind: 'Linux',
    reserved: true, // required for linux (see https://stackoverflow.com/a/59964422)
    sku: {
        tier: 'Basic',
        size: 'B1'
    },
});

let appServiceAPI = new azure.appservice.AppService(resourceNames.appServiceAPI, {
    name: resourceNames.appServiceAPI,
    resourceGroupName: rgAPI.name,
    tags: helper.tags,
    appServicePlanId: appServicePlan.id,
    appSettings: helper.appServiceSettings,
    clientAffinityEnabled: false,
    siteConfig: {
        alwaysOn: true,
        linuxFxVersion: 'DOTNETCORE|2.2', // see: https://github.com/terraform-providers/terraform-provider-azurerm/issues/5350
    }
});

// let appServiceDiagramHelper = new azure.appservice.AppService(resourceNames.appServiceDiagramHelper, {
//     name: resourceNames.appServiceDiagramHelper,
//     resourceGroupName: rgDiagramHelper.name,
//     tags: helper.tags,
//     appServicePlanId: appServicePlan.id,
//     appSettings: helper.appServiceSettings,
//     clientAffinityEnabled: false,
//     siteConfig: {
//         alwaysOn: true,
//         linuxFxVersion: containerRegistry.name.apply(name => `DOCKER|${name}.azurecr.io/cloudskew:latest`),
//     }
// });

//#region outputs
//#endregion
