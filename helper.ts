import * as pulumi from '@pulumi/pulumi';

const environment = pulumi.getStack().toLowerCase();

export const tags = {
    product: 'cloudskew',
    environment: environment,
};
