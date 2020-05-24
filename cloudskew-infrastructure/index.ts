import * as azure from '@pulumi/azure';
import * as resourceNames from './resource-names';


// @todo: need to ensure that this is either 'dev' or 'test', else must throw error
const location = 'westeurope';

// spawn the resource groups
let rgAPI = new azure.core.ResourceGroup(resourceNames.rgAPI, {
    name: resourceNames.rgAPI,
    location: location
});

let rgCDN = new azure.core.ResourceGroup(resourceNames.rgCDN, {
    name: resourceNames.rgCDN,
    location: location
});

let rgContainerRegistry = new azure.core.ResourceGroup(resourceNames.rgContainerRegistry, {
    name: resourceNames.rgContainerRegistry,
    location: location
});

let rgCustomImages = new azure.core.ResourceGroup(resourceNames.rgCustomImages, {
    name: resourceNames.rgCustomImages,
    location: location
});

let rgDiagramHelper = new azure.core.ResourceGroup(resourceNames.rgDiagramHelper, {
    name: resourceNames.rgDiagramHelper,
    location: location
});

let rgKeyVault = new azure.core.ResourceGroup(resourceNames.rgKeyVault, {
    name: resourceNames.rgKeyVault,
    location: location
});

let rgLanding = new azure.core.ResourceGroup(resourceNames.rgLanding, {
    name: resourceNames.rgLanding,
    location: location
});

let rgSQL = new azure.core.ResourceGroup(resourceNames.rgSQL, {
    name: resourceNames.rgSQL,
    location: location
});

let rgUI = new azure.core.ResourceGroup(resourceNames.rgUI, {
    name: resourceNames.rgUI,
    location: location
});

// now let us create the storage accounts
let saCDN = new azure.storage.Account(resourceNames.saCDN, {
    name: resourceNames.saCDN,
    resourceGroupName: rgCDN.name,
    accountReplicationType: 'LRS',
    accountTier: 'Standard',
});

let saCustomImages = new azure.storage.Account(resourceNames.saCustomImages, {
    name: resourceNames.saCustomImages,
    resourceGroupName: rgCustomImages.name,
    accountReplicationType: 'LRS',
    accountTier: 'Standard',
});

let saLanding = new azure.storage.Account(resourceNames.saLanding, {
    name: resourceNames.saLanding,
    resourceGroupName: rgLanding.name,
    accountReplicationType: 'LRS',
    accountTier: 'Standard',
});

let saUI = new azure.storage.Account(resourceNames.saUI, {
    name: resourceNames.saUI,
    resourceGroupName: rgUI.name,
    accountReplicationType: 'LRS',
    accountTier: 'Standard',
});

//#region outputs
export const saCDNConnectionString = saCDN.primaryConnectionString;
//#endregion
