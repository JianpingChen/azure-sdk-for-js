---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-table-storage
urlFragment: data-tables-typescript
---

# Azure Data Tables client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for Azure Data Tables in some common scenarios.

| **File Name**                                         | **Description**                                            |
| ----------------------------------------------------- | ---------------------------------------------------------- |
| [workingWithInt64.ts][workingwithint64]               | creates and works with an entity containing an Int64 value |
| [workingWithBigInt.ts][workingwithbigint]             | creates and works with an entity containing a bigint       |
| [transactionWithHelper.ts][transactionwithhelper]     | sends transactional request using TableTransaction helper  |
| [transactionOperations.ts][transactionoperations]     | sends transactional batch requests                         |
| [queryEntities.ts][queryentities]                     | queries entities in a table                                |
| [createAndDeleteEntities.ts][createanddeleteentities] | creates and deletes a entities in a table                  |
| [authenticationMethods.ts][authenticationmethods]     | authenticates using different authentication methods       |
| [createAndDeleteTable.ts][createanddeletetable]       | creates and deletes a table                                |
| [updateAndUpsertEntities.ts][updateandupsertentities] | updates and upserts entities in a table                    |
| [generateTableSAS.ts][generatetablesas]               | generate a Table Account SAS token                         |
| [queryTables.ts][querytables]                         | queries tables                                             |

## Prerequisites

The sample programs are compatible with Node.js >=12.0.0.

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Storage instance][createinstance_azurestorageinstance]

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Compile the samples:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/workingWithInt64.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env TABLES_URL="<tables url>" ACCOUNT_NAME="<account name>" ACCOUNT_KEY="<account key>" node dist/workingWithInt64.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[workingwithint64]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/tables/data-tables/samples/v12/typescript/src/workingWithInt64.ts
[workingwithbigint]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/tables/data-tables/samples/v12/typescript/src/workingWithBigInt.ts
[transactionwithhelper]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/tables/data-tables/samples/v12/typescript/src/transactionWithHelper.ts
[transactionoperations]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/tables/data-tables/samples/v12/typescript/src/transactionOperations.ts
[queryentities]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/tables/data-tables/samples/v12/typescript/src/queryEntities.ts
[createanddeleteentities]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/tables/data-tables/samples/v12/typescript/src/createAndDeleteEntities.ts
[authenticationmethods]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/tables/data-tables/samples/v12/typescript/src/authenticationMethods.ts
[createanddeletetable]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/tables/data-tables/samples/v12/typescript/src/createAndDeleteTable.ts
[updateandupsertentities]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/tables/data-tables/samples/v12/typescript/src/updateAndUpsertEntities.ts
[generatetablesas]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/tables/data-tables/samples/v12/typescript/src/generateTableSAS.ts
[querytables]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/tables/data-tables/samples/v12/typescript/src/queryTables.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/data-tables
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurestorageinstance]: https://docs.microsoft.com/azure/storage/tables/table-storage-quickstart-portal
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/tables/data-tables/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
