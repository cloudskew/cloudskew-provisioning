import * as azure from '@pulumi/azure';
import * as pulumi from '@pulumi/pulumi';
import * as random from '@pulumi/random';
import * as helper from './helper';
import * as resourceNames from './resource-names';

const environment = pulumi.getStack().toLowerCase();

// ensure that specified stack is one of the following: 'production', 'testing'
let allowedStacks = ['production', 'testing'];
if (!allowedStacks.includes(environment)) {
    throw new pulumi.RunError(`
        Invalid stack specified: '${environment}' Stack must be one of the following: ${allowedStacks.map(e => "'" + e + "'").join(', ')}
    `);
}

const location = 'westeurope';

const clientConfig = azure.core.getClientConfig({});

//#region resource groups

let rgAPI = new azure.core.ResourceGroup(resourceNames.rgAPI, {
    name: resourceNames.rgAPI,
    location: location,
    tags: helper.tags,
});

let rgBlog = new azure.core.ResourceGroup(resourceNames.rgBlog, {
    name: resourceNames.rgBlog,
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

let rgManagedIdentity = new azure.core.ResourceGroup(resourceNames.rgManagedIdentity, {
    name: resourceNames.rgManagedIdentity,
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

//#endregion

//#region storage accounts

let saBlog = new azure.storage.Account(resourceNames.saBlog, {
    name: resourceNames.saBlog,
    resourceGroupName: rgBlog.name,
    tags: helper.tags,
    accountReplicationType: 'LRS',
    accountTier: 'Standard',
});

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
    staticWebsite: {
        indexDocument: 'index.html',
        error404Document: 'index.html',
    },
});

let saUI = new azure.storage.Account(resourceNames.saUI, {
    name: resourceNames.saUI,
    resourceGroupName: rgUI.name,
    tags: helper.tags,
    accountReplicationType: 'LRS',
    accountTier: 'Standard',
    staticWebsite: {
        indexDocument: 'index.html',
        error404Document: 'index.html',
    },
});

//#endregion

//#region CDN profiles and endpoints

let cdnProfile = new azure.cdn.Profile(resourceNames.cdnProfile, {
    name: resourceNames.cdnProfile,
    resourceGroupName: rgCDN.name,
    tags: helper.tags,
    location: 'global',
    sku: 'Standard_Microsoft',
});

// note #1: the 'originHostHeader' is not optional even though the documentation says otherwise.
// - https://github.com/terraform-providers/terraform-provider-azurerm/issues/3084
// note #2: the CDN endpoint 'origin type' only exists in the azure portal.
// No representation for this exists in ARM or terraform.
// - https://github.com/terraform-providers/terraform-provider-azurerm/issues/56

let cndEndpointAssets = new azure.cdn.Endpoint(resourceNames.cdnEndpointAsset, {
    name: resourceNames.cdnEndpointAsset,
    resourceGroupName: rgCDN.name,
    tags: helper.tags,
    location: 'global',
    profileName: cdnProfile.name,
    originHostHeader: saCDN.primaryBlobHost,
    origins: [{
        name: resourceNames.cdnEndpointAsset,
        hostName: saCDN.primaryBlobHost,
    }],
});

let cndEndpointBlog = new azure.cdn.Endpoint(resourceNames.cdnEndpointBlog, {
    name: resourceNames.cdnEndpointBlog,
    resourceGroupName: rgBlog.name,
    tags: helper.tags,
    location: 'global',
    profileName: cdnProfile.name,
    originHostHeader: saBlog.primaryWebHost,
    origins: [{
        name: resourceNames.cdnEndpointBlog,
        hostName: saBlog.primaryWebHost,
    }],
});

let cndEndpointCustomImages = new azure.cdn.Endpoint(resourceNames.cdnEndpointCustomImages, {
    name: resourceNames.cdnEndpointCustomImages,
    resourceGroupName: rgCDN.name,
    tags: helper.tags,
    location: 'global',
    profileName: cdnProfile.name,
    originHostHeader: saCustomImages.primaryBlobHost,
    origins: [{
        name: resourceNames.cdnEndpointCustomImages,
        hostName: saCustomImages.primaryBlobHost,
    }],
});

let cndEndpointLanding = new azure.cdn.Endpoint(resourceNames.cdnEndpointLanding, {
    name: resourceNames.cdnEndpointLanding,
    resourceGroupName: rgCDN.name,
    tags: helper.tags,
    location: 'global',
    profileName: cdnProfile.name,
    originHostHeader: saLanding.primaryWebHost,
    origins: [{
        name: resourceNames.cdnEndpointLanding,
        hostName: saLanding.primaryWebHost,
    }],
});

let cndEndpointUI = new azure.cdn.Endpoint(resourceNames.cdnEndpointUI, {
    name: resourceNames.cdnEndpointUI,
    resourceGroupName: rgCDN.name,
    tags: helper.tags,
    location: 'global',
    profileName: cdnProfile.name,
    originHostHeader: saUI.primaryWebHost,
    origins: [{
        name: resourceNames.cdnEndpointUI,
        hostName: saUI.primaryWebHost,
    }],
});

//#region container registry and webhook

let containerRegistry = new azure.containerservice.Registry(resourceNames.containerRegistry, {
    name: resourceNames.containerRegistry,
    resourceGroupName: rgContainerRegistry.name,
    tags: helper.tags,
    adminEnabled: true,
    sku: 'Basic',
});

// @todo: Extracting the serviceUri doesn't seem possible via the terraform provider. So far, I've only been
// able to extract it using AZ CLI as follows: 
// `az webapp deployment container config --ids <webapp resource id> --output json --enable-cd
// Need to investigate further, hence commenting out below code for now.

// let containerRegistryWebhook = new azure.containerservice.RegistryWebhook(resourceNames.crWebhook, {
//     name: resourceNames.crWebhook,
//     resourceGroupName: rgContainerRegistry.name,
//     tags: helper.tags,
//     registryName: containerRegistry.name,
//     actions: ['push'],
//     serviceUri: '',
//     scope: 'cloudskew:latest',
// });

//#endregion

//#region managed identity (user-assigned)

let managedIdentity = new azure.authorization.UserAssignedIdentity(resourceNames.managedIdentity, {
    name: resourceNames.managedIdentity,
    resourceGroupName: rgManagedIdentity.name,
    tags: helper.tags,
});

//#endregion

//#region app service

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
    appSettings: {
        ASPNETCORE_ENVIRONMENT: environment
    },
    clientAffinityEnabled: false,
    siteConfig: {
        alwaysOn: true,
        linuxFxVersion: 'DOTNETCORE|2.2', // see: https://github.com/terraform-providers/terraform-provider-azurerm/issues/5350
    },
    identity: {
        type: 'UserAssigned',
        identityIds: [
            managedIdentity.id
        ],
    },
});

let appServiceDiagramHelper = new azure.appservice.AppService(resourceNames.appServiceDiagramHelper, {
    name: resourceNames.appServiceDiagramHelper,
    resourceGroupName: rgDiagramHelper.name,
    tags: helper.tags,
    appServicePlanId: appServicePlan.id,
    appSettings: {
        ASPNETCORE_ENVIRONMENT: environment,
        DOCKER_REGISTRY_SERVER_URL: pulumi.interpolate`https://${containerRegistry.loginServer}`,
        DOCKER_REGISTRY_SERVER_USERNAME: containerRegistry.adminUsername,
        DOCKER_REGISTRY_SERVER_PASSWORD: containerRegistry.adminPassword,
    },
    clientAffinityEnabled: false,
    siteConfig: {
        alwaysOn: true,
        linuxFxVersion: pulumi.interpolate`DOCKER|${containerRegistry.loginServer}/cloudskew:latest`,
    }
});

//#endregion

//#region sql server and database

let suffix = new random.RandomString('sql-server-login-suffix', {
    length: 6,
    special: false,
});

let sqlServerRandomPwd = new random.RandomPassword('sql-server-password', {
    length: 16,
});

let sqlServer = new azure.sql.SqlServer(resourceNames.sqlServer, {
    name: resourceNames.sqlServer,
    resourceGroupName: rgSQL.name,
    tags: helper.tags,
    version: '12.0',
    administratorLogin: pulumi.interpolate`admin${suffix.result}`,
    administratorLoginPassword: pulumi.interpolate`${sqlServerRandomPwd.result}`,
});

// To ensure that azure services can access the sql server, we need to create a firewall rule with the startIPAddress and 
// the endIPAddress both as '0.0.0.0'. More details:
// - https://www.terraform.io/docs/providers/azurerm/r/sql_firewall_rule.html#argument-reference
// - https://docs.microsoft.com/en-us/rest/api/sql/firewallrules/createorupdate
let sqlServerFirewallRule = new azure.sql.FirewallRule(resourceNames.sqlServerFirewallRule, {
    name: resourceNames.sqlServerFirewallRule,
    resourceGroupName: rgSQL.name,
    serverName: sqlServer.name,
    startIpAddress: '0.0.0.0',
    endIpAddress: '0.0.0.0',
});

let sqlDB = new azure.sql.Database(resourceNames.sqlDB, {
    name: resourceNames.sqlDB,
    resourceGroupName: rgSQL.name,
    tags: helper.tags,
    serverName: sqlServer.name,
    edition: environment === 'production' ? 'Standard' : 'Basic',
    maxSizeBytes: environment === 'production' ? '32212254720' /* 30 GB */ : '2147483648' /* 2 GB */,
    requestedServiceObjectiveName: environment === 'production' ? 'S1' : 'Basic',
});

//#endregion

//#region key vault (with access policies & secrets)

let keyVault = new azure.keyvault.KeyVault(resourceNames.keyVault, {
    name: resourceNames.keyVault,
    resourceGroupName: rgKeyVault.name,
    tags: helper.tags,
    skuName: 'standard',
    tenantId: clientConfig.then(c => c.tenantId),
    accessPolicies: [{
        objectId: clientConfig.then(c => c.objectId),
        tenantId: clientConfig.then(c => c.tenantId),
        secretPermissions: [
            'get',
            'list',
            'set',
            'delete',
            'backup',
            'recover',
            'restore',
        ],
    },
    {
        objectId: managedIdentity.principalId,
        tenantId: clientConfig.then(c => c.tenantId),
        secretPermissions: [
            'get',
            'list',
            'set',
            'delete',
            'backup',
            'recover',
            'restore',
        ],
    }],
});

let kvSecretCustomImagesStorageAccountConnectionString = new azure.keyvault.Secret(resourceNames.kvSecretCustomImagesStorageAccountConnectionString, {
    name: resourceNames.kvSecretCustomImagesStorageAccountConnectionString,
    keyVaultId: keyVault.id,
    value: saCustomImages.primaryConnectionString,
    contentType: 'connection string to storage account for custom images',
});

let kvSecretSqlConnectionString = new azure.keyvault.Secret(resourceNames.kvSecretSqlConnectionString, {
    name: resourceNames.kvSecretSqlConnectionString,
    keyVaultId: keyVault.id,
    value: pulumi.interpolate
        `Server=tcp:${sqlServer.fullyQualifiedDomainName},1433;Initial Catalog=${sqlDB.name};Persist Security Info=False;User ID=${sqlServer.administratorLogin};Password=${sqlServer.administratorLoginPassword};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;`,
    contentType: 'connection string to cloudskew sql db',
});

//#endregion

//#region outputs
//#endregion
