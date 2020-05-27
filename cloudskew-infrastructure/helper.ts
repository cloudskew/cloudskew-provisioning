import * as pulumi from '@pulumi/pulumi';
import * as azure from '@pulumi/azure';

const environment = pulumi.getStack().toLowerCase();

export const tags = {
    product: 'cloudskew',
    environment: environment,
};

export const appServiceSettings = {
    ASPNETCORE_ENVIRONMENT: environment
};

export const sqlDBEdition = environment === 'production' ? 'Standard' : 'Basic';

export const sqlDBMaxSizeBytes = environment === 'production' ? '32212254720' /* 30 GB */ : '2147483648' /* 2 GB */ ;

export const sqlDBRequestedServiceObjectiveName = environment === 'production' ? 'S1' : 'Basic';
