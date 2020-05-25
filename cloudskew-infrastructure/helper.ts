import * as pulumi from '@pulumi/pulumi';
import * as azure from '@pulumi/azure';

const environment = pulumi.getStack();

export const tags = {
    product: 'cloudskew',
    environment: environment,
};

export const appServiceSettings = {
    ASPNETCORE_ENVIRONMENT: environment
};
