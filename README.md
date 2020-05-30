## Work in progress

CloudSkew's infrastructure provisioning scripts are being migrated from terraform to pulumi.

:hammer: The following resources still have to be migrated:

* Azure Function App
* Azure Service bus
* Azure Monitor (Action Group, Metric Alerts, App Insights)

:wrench: In addition to this, we need automated provisioning for:

* Azure Container Registry's webhook (to notify App Service)
* Auth0 tenant

## Prerequisites

### Environments

CloudSkew uses two separate Azure Subscriptions to isolate its testing and production environments.

Our [Pulumi Project](https://www.pulumi.com/docs/intro/concepts/project/) also uses two separate [Pulumi Stacks](https://www.pulumi.com/docs/intro/concepts/stack/) (`testing`, `production`) to isolate deployment configs for the above environments.

### Service Principals and Role Assignment

For automation, two service principals have been created in Azure Active Directory:

* `cloudskew-testing-service-principal` for the testing environment.
* `cloudskew-production-service-principal` for the production environment.

Both service principals have been assigned the `contributor` role in their respective Azure Subscriptions.

## Provisioning Process

### Automated Provisioning (via Azure Pipelines)

Environment|Action|Pipeline|Status
-----------|------|--------|------
`testing`|setup|`cloudskew-setup.testing`|![badge](https://dev.azure.com/cloudskew/cloudskew/_apis/build/status/provisioning/cloudskew-setup.testing?branchName=master)
`testing`|teardown|`cloudskew-teardown.testing`|![badge](https://dev.azure.com/cloudskew/cloudskew/_apis/build/status/provisioning/cloudskew-teardown.testing?branchName=master)
`production`|setup|`cloudskew-setup.production`|![badge](https://dev.azure.com/cloudskew/cloudskew/_apis/build/status/provisioning/cloudskew-setup.production?branchName=master)
`production`|teardown|`cloudskew-teardown.production`|![badge](https://dev.azure.com/cloudskew/cloudskew/_apis/build/status/provisioning/cloudskew-teardown.production?branchName=master)

### Manual Provisioning (For Emergencies Only)

Ensure that you have [Pulumi installed on your local machine](https://www.pulumi.com/docs/get-started/azure/) and are logged in using the access token.

1. Open a terminal window
2. Clone this git repository locally: `git clone https://github.com/cloudskew/cloudskew-provisioning.git <local folder>`
3. Navigate to the local repo
4. Install Pulumi: `curl -fsSL https://get.pulumi.com | sh`
5. Run `npm install`
6. Set the following environment variables (choose one of the service principals mentioned above according to the environment to be provisioned)

    * export ARM_CLIENT_ID=REPLACE-WITH-SERVICE-PRINCIPAL-CLIENT-ID
    * export ARM_CLIENT_SECRET=REPLACE-WITH-SERVICE-PRINCIPAL-CLIENT-SECRET
    * export ARM_SUBSCRIPTION_ID=REPLACE-WITH-AZURE-SUBSCRIPTION-ID
    * export ARM_TENANT_ID=REPLACE-WITH-AZURE-TENANT-ID

7. Choose an environment to target by running:

    * `pulumi stack select testing` for testing environment OR
    * `pulumi stack select production` for production environment

8. run `pulumi up`
