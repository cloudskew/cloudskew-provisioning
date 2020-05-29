# cloudskew-provisioning

**Work in progress**: Over several sprints, CloudSkew's infrastructure provisioning scripts will be migrated from terraform to pulumi.

## Current Status

TBD

## Prerequisites

#### Environments

CloudSkew uses two separate Azure Subscriptions to isolate its testing and production environments.

Our [Pulumi Project](https://www.pulumi.com/docs/intro/concepts/project/) also uses two separate [Pulumi Stacks](https://www.pulumi.com/docs/intro/concepts/stack/) (`testing`, `production`) to isolate deployment configs for the above environments.

#### Service Principals and Role Assignment

For automation, two service principals have been created in Azure Active Directory:

* `cloudskew-testing-service-principal` for the testing environment.
* `cloudskew-production-service-principal` for the production environment.

Both service principals have been assigned the `contributor` role in their respective Azure Subscriptions.

## Deployment Process

#### Testing Environment (Manual)

Ensure that you have [Pulumi installed on your local machine](https://www.pulumi.com/docs/get-started/azure/) and are logged in using the access token.

1. Open a terminal window
2. Clone this git repository locally: `git clone <remote url> <local folder>`
3. Navigate to the local repo
4. Install Pulumi: `curl -fsSL https://get.pulumi.com | sh`
5. Run `npm install`
6. Set the following environment variables (use details of `cloudskew-testing-service-principal`)

    * export ARM_CLIENT_ID=REPLACE-WITH-SERVICE-PRINCIPAL-CLIENT-ID
    * export ARM_CLIENT_SECRET=REPLACE-WITH-SERVICE-PRINCIPAL-CLIENT-SECRET
    * export ARM_SUBSCRIPTION_ID=REPLACE-WITH-AZURE-SUBSCRIPTION-ID
    * export ARM_TENANT_ID=REPLACE-WITH-AZURE-TENANT-ID

7. run `pulumi stack select testing`
8. run `pulumi up`

#### Production Environment (Automated)

TBD

## Pending Work

* ACR webhook
* Azure Functions
* Azure Service bus
* Azure Monitor
