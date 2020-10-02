// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as coreHttp from "@azure/core-http";

import {
  IngestionStatus,
  Metric,
  Dimension,
  SqlSourceParameter,
  SuppressCondition,
  SmartDetectionCondition,
  AzureApplicationInsightsParameter,
  AzureBlobParameter,
  AzureCosmosDBParameter,
  AzureDataLakeStorageGen2Parameter,
  AzureTableParameter,
  ElasticsearchParameter,
  HttpRequestParameter,
  InfluxDBParameter,
  MongoDBParameter,
  EmailHookParameter,
  WebhookHookParameter,
  TopNGroupScope,
  SeverityCondition,
  AlertSnoozeCondition,
  AnomalyAlertingConfigurationCrossMetricsOperator,
  WholeMetricConfigurationConditionOperator,
  EnrichmentStatus,
  DataFeedDetailPatchStatus
} from "./generated/models";

export {
  IngestionStatus,
  AzureApplicationInsightsParameter,
  AzureBlobParameter,
  AzureCosmosDBParameter,
  SqlSourceParameter,
  AzureDataLakeStorageGen2Parameter,
  AzureTableParameter,
  ElasticsearchParameter,
  HttpRequestParameter,
  InfluxDBParameter,
  MongoDBParameter,
  SuppressCondition,
  EmailHookParameter,
  WebhookHookParameter,
  DataFeedDetailPatchStatus
};

export {
  AnomalyValue,
  AnomalyAlertingConfigurationCrossMetricsOperator,
  WholeMetricConfigurationConditionOperator,
  DataFeedIngestionProgress,
  GeneratedClientGetIngestionProgressResponse,
  SmartDetectionCondition,
  Dimension,
  Metric,
  IngestionStatusType,
  SeverityCondition,
  AlertSnoozeCondition,
  TopNGroupScope,
  DataSourceType,
  EntityStatus,
  SeverityFilterCondition,
  SnoozeScope,
  Severity,
  AnomalyDetectorDirection,
  EnrichmentStatus,
  TimeMode,
  FeedbackType,
  FeedbackQueryTimeMode
} from "./generated/models";

/**
 * Specifies metrics, dimensions, and timestamp columns of a data feed.
 */
export interface DataFeedSchema {
  /**
   * measure list
   */
  metrics: Metric[];
  /**
   * dimension list
   */
  dimensions?: Dimension[];
  /**
   * user-defined timestamp column. if timestampColumn is null, start time of every time slice will be used as default value.
   */
  timestampColumn?: string;
}

/**
 * Specifies ingestion settings for a data feed.
 */
export interface DataFeedIngestionSettings {
  /**
   * ingestion start time
   */
  ingestionStartTime: Date;
  /**
   * the time that the beginning of data ingestion task will delay for every data slice according to this offset.
   */
  ingestionStartOffsetInSeconds?: number;
  /**
   * the max concurrency of data ingestion queries against user data source. 0 means no limitation.
   */
  dataSourceRequestConcurrency?: number;
  /**
   * the min retry interval for failed data ingestion tasks.
   */
  ingestionRetryDelayInSeconds?: number;
  /**
   * stop retry data ingestion after the data slice first schedule time in seconds.
   */
  stopRetryAfterInSeconds?: number;
}

/**
 * Defines values for DataFeedRollupMethod.
 */
export type DataFeedRollupMethod = "None" | "Sum" | "Max" | "Min" | "Avg" | "Count";

/**
 * Specifies the rollup settings for a data feed.
 */
export type DataFeedRollupSettings =
  | {
      rollupType: "NoRollup";
    }
  | {
      rollupType: "AlreadyRollup";
      /**
       * the identification value for the row of calculated all-up value.
       */
      rollupIdentificationValue?: string;
    }
  | {
      rollupType: "AutoRollup";
      /**
       * roll up columns
       */
      autoRollupGroupByColumnNames?: string[];
      /**
       * roll up method
       */
      rollupMethod?: DataFeedRollupMethod;
      /**
       * the identification value for the row of calculated all-up value.
       */
      rollupIdentificationValue?: string;
    };

/**
 * Specifies how missing data points are filled.
 */
export type DataFeedMissingDataPointFillSettings =
  | {
      fillType: "SmartFilling" | "PreviousValue" | "NoFilling";
    }
  | {
      fillType: "CustomValue";
      /**
       * the value of fill missing point for anomaly detection
       */
      customFillValue: number;
    };

/**
 * Access mode of the data feed
 */
export type DataFeedAccessMode = "Private" | "Public";

/**
 * Various optional configurations for a data feed.
 */
export interface DataFeedOptions {
  /**
   * data feed description
   */
  dataFeedDescription?: string;

  /**
   * settings on data rollup
   */
  rollupSettings?: DataFeedRollupSettings;

  /**
   * settings to control how missing data apoints are filled
   */
  missingDataPointFillSettings?: DataFeedMissingDataPointFillSettings;

  /**
   * access mode of the data feed
   */
  accessMode?: DataFeedAccessMode;

  /**
   * data feed administrators
   */
  admins?: string[];

  /**
   * data feed viewers
   */
  viewers?: string[];

  /**
   * action link template for alert
   */
  actionLinkTemplate?: string;
}

/**
 * Granularity type of a data feed.
 */
export type DataFeedGranularity =
  | {
      granularityType:
        | "Yearly"
        | "Monthly"
        | "Weekly"
        | "Daily"
        | "Hourly"
        | "Minutely"
        | "Secondly";
    }
  | {
      granularityType: "Custom";
      customGranularityValue: number;
    };

/**
 * Represents a Metrics Advisor data feed.
 */
export interface DataFeed {
  /**
   * Unique id of the data feed.
   */
  id: string;
  /**
   * Name of the data feed.
   */
  name: string;
  /**
   * Ids of the metrics in the data feed.
   */
  metricIds: string[];
  /**
   * Time when the data feed is created
   */
  createdTime: Date;
  /**
   * Status of the data feed.
   */
  status: "Paused" | "Active";
  /**
   * Indicates whether the current user is an aministrator of the data feed.
   */
  isAdmin: boolean;
  /**
   * Source of the data feed.
   */
  source: DataFeedSource;
  /**
   * Schema of the data in the data feed, including names of metrics, dimensions, and timestamp columns.
   */
  schema: DataFeedSchema;
  /**
   * Granularity of the data feed.
   */
  granularity: DataFeedGranularity;
  /**
   * Ingestion settings for the data feed.
   */
  ingestionSettings: DataFeedIngestionSettings;
  /**
   * Optional configurations for the data feed.
   */
  options?: DataFeedOptions;
}

/**
 * Represents an Azure Application Insights data source.
 */
export type AzureApplicationInsightsDataFeedSource = {
  dataSourceType: "AzureApplicationInsights";
  dataSourceParameter: AzureApplicationInsightsParameter;
};

/**
 * Represents an Azure Blob Storage data source.
 */
export type AzureBlobDataFeedSource = {
  dataSourceType: "AzureBlob";
  dataSourceParameter: AzureBlobParameter;
};

/**
 * Represents an Azure CosmosDB data source.
 */
export type AzureCosmosDBDataFeedSource = {
  dataSourceType: "AzureCosmosDB";
  dataSourceParameter: AzureCosmosDBParameter;
};

/**
 * Represents an Azure Data Explorer data source.
 */
export type AzureDataExplorerDataFeedSource = {
  dataSourceType: "AzureDataExplorer";
  dataSourceParameter: SqlSourceParameter;
};

/**
 * Represents an Azure DataLake Storage Gen2 data source.
 */
export type AzureDataLakeStorageGen2DataFeedSource = {
  dataSourceType: "AzureDataLakeStorageGen2";
  dataSourceParameter: AzureDataLakeStorageGen2Parameter;
};

/**
 * Represents an Elasticsearch data source.
 */
export type ElasticsearchDataFeedSource = {
  dataSourceType: "Elasticsearch";
  dataSourceParameter: ElasticsearchParameter;
};

/**
 * Represents an Azure Table data source.
 */
export type AzureTableDataFeedSource = {
  dataSourceType: "AzureTable";
  dataSourceParameter: AzureTableParameter;
};

/**
 * Represents an Http Request data source.
 */
export type HttpRequestDataFeedSource = {
  dataSourceType: "HttpRequest";
  dataSourceParameter: HttpRequestParameter;
};

/**
 * Represents an InfluxDB data source.
 */
export type InfluxDBDataFeedSource = {
  dataSourceType: "InfluxDB";
  dataSourceParameter: InfluxDBParameter;
};

/**
 * Represents a MySQL data source.
 */
export type MySqlDataFeedSource = {
  dataSourceType: "MySql";
  dataSourceParameter: SqlSourceParameter;
};

/**
 * Represents a PostgreSQL data source.
 */
export type PostgreSqlDataFeedSource = {
  dataSourceType: "PostgreSql";
  dataSourceParameter: SqlSourceParameter;
};

/**
 * Represents a MongoDB data source.
 */
export type MongoDBDataFeedSource = {
  dataSourceType: "MongoDB";
  dataSourceParameter: MongoDBParameter;
};

/**
 * Represents a SQL Server data source.
 */
export type SQLServerDataFeedSource = {
  dataSourceType: "SqlServer";
  dataSourceParameter: SqlSourceParameter;
};

/**
 * A union type of all supported data sources.
 */
export type DataFeedSource =
  | AzureApplicationInsightsDataFeedSource
  | AzureBlobDataFeedSource
  | AzureCosmosDBDataFeedSource
  | AzureDataExplorerDataFeedSource
  | AzureDataLakeStorageGen2DataFeedSource
  | AzureTableDataFeedSource
  | ElasticsearchDataFeedSource
  | HttpRequestDataFeedSource
  | InfluxDBDataFeedSource
  | MySqlDataFeedSource
  | PostgreSqlDataFeedSource
  | SQLServerDataFeedSource
  | MongoDBDataFeedSource;

/**
 * Represents the input type to the Update Data Feed operation.
 */
export interface DataFeedPatch {
  /**
   * Name of the data feed
   */
  name?: string;
  /**
   * Source of the data feed.
   */
  source: DataFeedSourcePatchUnion;
  /**
   * Schema of the data in the data feed, including names of metrics, dimensions, and timestamp columns.
   */
  schema?: {
    /**
     * user-defined timestamp column. if timestampColumn is null, start time of every time slice will be used as default value.
     */
    timestampColumn?: string;
  };
  /**
   * Ingestion settings for the data feed.
   */
  ingestionSettings?: DataFeedIngestionSettings;
  /**
   * Optional configurations for the data feed.
   */
  options?: DataFeedOptions & {
    /**
     * Status of the data feed.
     */
    status?: DataFeedDetailPatchStatus;
  };
}

/**
 * A union type of supported data sources to pass to Update Data Feed operation.
 *
 * When not changing the data source type, the dataSourceParameter is not required.
 * When changing to a different data source type, both dataSourceType and dataSourceParameter are required.
 */
export type DataFeedSourcePatchUnion =
  | AzureApplicationInsightsDataFeedSourcePatch
  | AzureBlobDataFeedSourcePatch
  | AzureCosmosDBDataFeedSourcePatch
  | AzureDataExplorerDataFeedSourcePatch
  | AzureDataLakeStorageGen2DataFeedSourcePatch
  | AzureTableDataFeedSourcePatch
  | ElasticsearchDataFeedSourcePatch
  | HttpRequestDataFeedSourcePatch
  | InfluxDBDataFeedSourcePatch
  | MySqlDataFeedSourcePatch
  | PostgreSqlDataFeedSourcePatch
  | SQLServerDataFeedSourcePatch
  | MongoDBDataFeedSourcePatch;

/**
 * Represents Azure Application Insights data source to pass to Update Data Feed operation.
 */
export type AzureApplicationInsightsDataFeedSourcePatch = {
  dataSourceType: "AzureApplicationInsights";
  dataSourceParameter?: AzureApplicationInsightsParameter;
};

/**
 * Represents Azure Blob Storage data source to pass to Update Data Feed operation.
 */
export type AzureBlobDataFeedSourcePatch = {
  dataSourceType: "AzureBlob";
  dataSourceParameter?: AzureBlobParameter;
};

/**
 * Represents Azure CosmosDB data source to pass to Update Data Feed operation.
 */
export type AzureCosmosDBDataFeedSourcePatch = {
  dataSourceType: "AzureCosmosDB";
  dataSourceParameter?: AzureCosmosDBParameter;
};

/**
 * Represents Azure Data Explorer data source to pass to Update Data Feed operation.
 */
export type AzureDataExplorerDataFeedSourcePatch = {
  dataSourceType: "AzureDataExplorer";
  dataSourceParameter?: SqlSourceParameter;
};

/**
 * Represents Azure DataLake Storage Gen2 data source to pass to Update Data Feed operation.
 */
export type AzureDataLakeStorageGen2DataFeedSourcePatch = {
  dataSourceType: "AzureDataLakeStorageGen2";
  dataSourceParameter?: AzureDataLakeStorageGen2Parameter;
};

/**
 * Represents Elasticsearch data source to pass to Update Data Feed operation.
 */
export type ElasticsearchDataFeedSourcePatch = {
  dataSourceType: "Elasticsearch";
  dataSourceParameter?: ElasticsearchParameter;
};

/**
 * Represents Azure Table data source to pass to Update Data Feed operation.
 */
export type AzureTableDataFeedSourcePatch = {
  dataSourceType: "AzureTable";
  dataSourceParameter?: AzureTableParameter;
};

/**
 * Represents Http Request data source to pass to Update Data Feed operation.
 */
export type HttpRequestDataFeedSourcePatch = {
  dataSourceType: "HttpRequest";
  dataSourceParameter?: HttpRequestParameter;
};

/**
 * Represents InfluxDB data source to pass to Update Data Feed operation.
 */
export type InfluxDBDataFeedSourcePatch = {
  dataSourceType: "InfluxDB";
  dataSourceParameter?: InfluxDBParameter;
};

/**
 * Represents MySQL data source to pass to Update Data Feed operation.
 */
export type MySqlDataFeedSourcePatch = {
  dataSourceType: "MySql";
  dataSourceParameter?: SqlSourceParameter;
};

/**
 * Represents PostgreSQL data source to pass to Update Data Feed operation.
 */
export type PostgreSqlDataFeedSourcePatch = {
  dataSourceType: "PostgreSql";
  dataSourceParameter?: SqlSourceParameter;
};

/**
 * Represents MongoDB data source to pass to Update Data Feed operation.
 */
export type MongoDBDataFeedSourcePatch = {
  dataSourceType: "MongoDB";
  dataSourceParameter?: MongoDBParameter;
};

/**
 * Represents SQL Server data source to pass to Update Data Feed operation.
 */
export type SQLServerDataFeedSourcePatch = {
  dataSourceType: "SqlServer";
  dataSourceParameter?: SqlSourceParameter;
};

/**
 * Represents the input type to the Update Alert Configuration operation.
 */
export interface AnomalyAlertConfigurationPatch {
  /**
   * Anomaly alerting configuration name
   */
  name?: string;
  /**
   * anomaly alerting configuration description
   */
  description?: string;
  /**
   * cross metrics operator
   */
  crossMetricsOperator?: AnomalyAlertingConfigurationCrossMetricsOperator;
  /**
   * unique hook ids
   */
  hookIds?: string[];
  /**
   * Anomaly alerting configurations
   */
  metricAlertConfigurations?: MetricAlertConfiguration[];
}

/**
 * Represents the input type to the Update Detection Configuration operation.
 */
export interface AnomalyDetectionConfigurationPatch {
  /**
   * anomaly detection configuration name
   */
  name?: string;
  /**
   * anomaly detection configuration description
   */
  description?: string;

  /**
   * Conditions that applies to all time series of a metric
   */
  wholeSeriesDetectionCondition?: MetricDetectionCondition;
  /**
   * detection conditions for series groups. This overrides the whole series detection conditions.
   */
  seriesGroupDetectionConditions?: MetricSeriesGroupDetectionCondition[];
  /**
   * detection conditions for specific series. This overrides the whole series detection conditions and the series group detection conditions.
   */
  seriesDetectionConditions?: MetricSingleSeriesDetectionCondition[];
}

/**
 * Represents properties common to anomaly detection conditions.
 */
export interface DetectionConditionsCommon {
  /**
   * Condition operator
   */
  conditionOperator?: WholeMetricConfigurationConditionOperator;
  /**
   * Specifies the condition for Smart Detection
   */
  smartDetectionCondition?: SmartDetectionCondition;
  /**
   * Specifies a hard threshold range used to detect anomalies when metric values fall outside of the range.
   */
  hardThresholdCondition?: HardThresholdConditionUnion;
  /**
   * Specifies the condition for Change Threshold
   */
  changeThresholdCondition?: ChangeThresholdConditionUnion;
}

/**
 * String key-value pairs that consist of dimension names and dimension values.
 *
 * For a metric with two dimensions: city and category, Examples include
 *
 *   { dimension: { city: "Tokyo", category: "Handmade" } } - identifies one time series
 *   { dimension: { city: "Karachi" } }                     - identifies all time series with city === "Karachi"
 */
export type DimensionKey = {
  dimension: Record<string, string>;
};

/*
export type SeriesIdentity = {
  dimension: Record<string, string>;
};

export type DimensionGroupIdentity = {
  dimension: Record<string, string>;
};

export type FeedbackDimensionFilter = {
  dimension: Record<string, string>;
};
*/

/**
 * Detection condition for all time series of a metric.
 */
export type MetricDetectionCondition = DetectionConditionsCommon;

/**
 * Detection condition for a series group.
 */
export type MetricSeriesGroupDetectionCondition = DetectionConditionsCommon & {
  /**
   * identifies the group of time series
   */
  group: DimensionKey;
};

/**
 * Detection condidtion for a specific time series.
 */
export type MetricSingleSeriesDetectionCondition = DetectionConditionsCommon & {
  /**
   * identifies the time series
   */
  series: DimensionKey;
};

/**
 * Represents the hard threshold detection condition.
 */
export type HardThresholdConditionUnion =
  | {
      /**
       * lower bound
       *
       * should be specified when anomalyDetectorDirection is Both or Down
       */
      lowerBound: number;
      anomalyDetectorDirection: "Down";
      suppressCondition: SuppressCondition;
    }
  | {
      /**
       * upper bound
       *
       * should be specified when anomalyDetectorDirection is Both or Up
       */
      upperBound: number;
      /**
       * detection direction
       */
      anomalyDetectorDirection: "Up";
      suppressCondition: SuppressCondition;
    }
  | {
      lowerBound: number;
      upperBound: number;
      /**
       * detection direction
       */
      anomalyDetectorDirection: "Both";
      /**
       * supress condition
       */
      suppressCondition: SuppressCondition;
    };

/**
 * Represents the Change threshold detection condition.
 */
export type ChangeThresholdConditionUnion =
  | {
      changePercentage: number;
      shiftPoint: number;
      withinRange: true;
      anomalyDetectorDirection: "Both";
      suppressCondition: SuppressCondition;
    }
  | {
      /**
       * change percentage, value range : [0, +∞)
       */
      changePercentage: number;
      /**
       * shift point, value range : [1, +∞)
       */
      shiftPoint: number;
      /**
       * if the withinRange = true, detected data is abnormal when the value falls in the range, in this case anomalyDetectorDirection must be Both
       * if the withinRange = false, detected data is abnormal when the value falls out of the range
       */
      withinRange: false;
      /**
       * detection direction
       */
      anomalyDetectorDirection: "Up" | "Down";

      /**
       * suppress condition
       */
      suppressCondition: SuppressCondition;
    };

/**
 * A union type of all metric feedback types.
 */
export type MetricFeedbackUnion =
  | MetricAnomalyFeedback
  | MetricChangePointFeedback
  | MetricCommentFeedback
  | MetricPeriodFeedback;

/**
 * Represents properties common to all metric feedback types.
 */
export interface MetricFeedbackCommon {
  /**
   * feedback unique id
   */
  readonly id?: string;
  /**
   * feedback created time
   */
  readonly createdTime?: Date;
  /**
   * user who gives this feedback
   */
  readonly userPrincipal?: string;
  /**
   * metric unique id
   */
  metricId: string;
  /**
   * The dimension key of the time series to which this feedback is made.
   */
  dimensionFilter: DimensionKey;
}

/**
 * Represents feedback of whether data points within the time range should be considered anomalies or not.
 */
export type MetricAnomalyFeedback = {
  /**
   * Feedback type.
   */
  feedbackType: "Anomaly";
  /**
   * the start timestamp of feedback timerange
   */
  startTime: Date;
  /**
   * the end timestamp of feedback timerange, when equals to startTime means only one timestamp
   */
  endTime: Date;
  /**
   * feedback value
   */
  value: "AutoDetect" | "Anomaly" | "NotAnomaly";

  /**
   * The anomaly detection configuration id.
   *
   * May be available when retrieving feedback from the Metrics Advisor service.
   */
  anomalyDetectionConfigurationId?: string;
  /**
   * The snapshot of the anomaly detection configuration when feedback was created.
   *
   * May be vailable when retrieving feedback from the Metrics Advisor service.
   */
  anomalyDetectionConfigurationSnapshot?: AnomalyDetectionConfiguration;
} & MetricFeedbackCommon;

/**
 * Represents feedback of whether data points within the time range should be considered change point or not.
 */
export type MetricChangePointFeedback = {
  /**
   * Feedback type.
   */
  feedbackType: "ChangePoint";
  /**
   * the start timestamp of feedback timerange
   */
  startTime: Date;
  /**
   * value for ChangePointValue
   */
  value: "AutoDetect" | "ChangePoint" | "NotChangePoint";
} & MetricFeedbackCommon;

/**
 * Represents comment feedback.
 */
export type MetricCommentFeedback = {
  /**
   * Feedback type.
   */
  feedbackType: "Comment";
  /**
   * the start timestamp of feedback timerange
   */
  startTime?: Date;
  /**
   * the end timestamp of feedback timerange, when equals to startTime means only one timestamp
   */
  endTime?: Date;
  /**
   * the comment string
   */
  comment: string;
} & MetricFeedbackCommon;

/**
 * Represents feedback regarding period.
 */
export type MetricPeriodFeedback = {
  /**
   * Feedback type.
   */
  feedbackType: "Period";
  /**
   * the type of setting period
   */
  periodType: "AutoDetect" | "AssignValue";
  /**
   * the number of intervals a period contains, when no period set to 0
   */
  periodValue: number;
} & MetricFeedbackCommon;

/**
 * Represents properties common to hooks.
 */
export interface HookCommon {
  /**
   * Hook unique id
   */
  readonly id?: string;
  /**
   * hook unique name
   */
  hookName: string;
  /**
   * hook description
   */
  description?: string;
  /**
   * hook external link
   */
  externalLink?: string;
  /**
   * hook administrators
   */
  readonly admins?: string[];
}

/**
 * Represents Email hook
 */
export type EmailHook = {
  hookType: "Email";
  hookParameter: EmailHookParameter;
} & HookCommon;

/**
 * Represents Webhook hook
 */
export type WebhookHook = {
  hookType: "Webhook";
  hookParameter: WebhookHookParameter;
} & HookCommon;

/**
 * A union type of all supported hooks
 */
export type HookUnion = EmailHook | WebhookHook;

/**
 * Represents properties common to the patch input to the Update Hook operation.
 */
export type HookPatchCommon = {
  /**
   * new hook name
   */
  hookName?: string | undefined;
  /**
   * new hook description
   */
  description?: string | undefined;
  /**
   * new hook external link
   */
  externalLink?: string | undefined;
};

/**
 * Represents Email hook specific patch input to the Update Hook operation.
 */
export type EmailHookPatch = {
  hookType: "Email";
  hookParameter?: EmailHookParameter;
} & HookPatchCommon;

/**
 * Represents Webhook specific patch input to the Update Hook operation.
 */
export type WebhookHookPatch = {
  hookType: "Webhook";
  hookParameter?: WebhookHookParameter;
} & HookPatchCommon;

/**
 * Represents an incident reported by Metrics Advisor service.
 */
export interface Incident {
  /**
   * incident id
   */
  id: string;
  /**
   * identifies the time series or time series group
   */
  dimensionKey: DimensionKey;
  /**
   * metric unique id
   *
   * only return for alerting incident result
   */
  metricId?: string;
  /**
   * anomaly detection configuration unique id
   */
  detectionConfigurationId: string;
  /**
   * incident start time
   */
  startTime?: Date;
  /**
   * incident last time
   */
  lastOccuredTime: Date;

  /**
   * incident status
   */
  status?: "Active" | "Resolved";

  /**
   * severity of the incident
   */
  severity: "Low" | "Medium" | "High";
}

/**
 * Represents an anomaly point detected by Metrics Advisor service.
 */
export interface Anomaly {
  /**
   * metric unique id
   *
   * only return for alerting anomaly result
   */
  metricId?: string;
  /**
   * anomaly detection configuration unique id
   */
  detectionConfigurationId: string;
  /**
   * anomaly time
   */
  timestamp: Date;
  /**
   * created time
   *
   * only return for alerting result
   */
  createdOn?: Date;
  /**
   * modified time
   *
   * only return for alerting result
   */
  modifiedOn?: Date;
  /**
   * dimension specified for series
   */
  dimension: Record<string, string>;
  /**
   * anomaly severity
   */
  severity: "Low" | "Medium" | "High";
  /**
   * anomaly status
   *
   * only return for alerting anomaly result
   */
  status?: "Active" | "Resolved";
}

/**
 * Represents an alert reported by Metrics Advisor service.
 */
export interface Alert {
  /**
   * alert id
   */
  id: string;
  /**
   * anomaly time
   */
  timestamp?: Date; // TODO: why optional?
  /**
   * created time
   */
  createdOn?: Date; // TODO: why optional?
  /**
   * modified time
   */
  modifiedOn?: Date; // TODO: why optional?
}

/**
 * Defines the anomaly alert scope.
 */
export type MetricAnomalyAlertScope =
  | {
      /**
       * Anomaly scope
       */
      scopeType: "All";
    }
  | {
      scopeType: "Dimension";
      /**
       * dimension scope
       */
      dimensionAnomalyScope: DimensionKey;
    }
  | {
      scopeType: "TopN";
      /**
       * Top N scope
       */
      topNAnomalyScope: TopNGroupScope;
    };

/**
 * Defines the
 */
export type MetricBoundaryCondition =
  | {
      /**
       * value filter direction
       */
      direction: "Down";
      /**
       * lower bound
       */
      lower: number;
      /**
       * the other metric unique id used for value filter
       */
      metricId?: string;
      /**
       * trigger alert when the corresponding point is missing in the other metric
       *
       * should be specified only when using other metric to filter
       */
      triggerForMissing?: boolean;
    }
  | {
      /**
       * value filter direction
       */
      direction: "Up";
      /**
       * upper bound
       */
      upper: number;
      /**
       * the other metric unique id used for value filter
       */
      metricId?: string;
      /**
       * trigger alert when the corresponding point is missing in the other metric
       *
       * should be specified only when using other metric to filter
       */
      triggerForMissing?: boolean;
    }
  | {
      /**
       * lower bound
       */
      lower: number;
      /**
       * upper bound
       */
      upper: number;
      /**
       * value filter direction
       */
      direction: "Both";
      /**
       * the other metric unique id used for value filter
       */
      metricId?: string;
      /**
       * trigger alert when the corresponding point is missing in the other metric
       *
       * should be specified only when using other metric to filter
       */
      triggerForMissing?: boolean;
    };

export interface MetricAlertConditions {
  /**
   * severity condition to trigger alert
   */
  severityCondition?: SeverityCondition;
  /**
   * boundary condition to trigger alert
   */
  metricBoundaryCondition?: MetricBoundaryCondition;
}

export interface MetricAlertConfiguration {
  /**
   * Anomaly detection configuration unique id
   */
  detectionConfigurationId: string;

  /**
   * when set to true, report alert if there are no anomalies detected by this detection configuration.
   * when set to false or not specified (default), report alert if anomalies are detected by this detection configuration.
   */
  negationOperation?: boolean;
  /**
   * the alert scope
   */
  alertScope: MetricAnomalyAlertScope;
  /**
   * condition to snooze alert
   */
  snoozeCondition?: AlertSnoozeCondition;
  /**
   * conditions to trigger alerts
   */
  alertConditions?: MetricAlertConditions;
}

/**
 * Represents an anomaly alert configuration.
 */
export interface AnomalyAlertConfiguration {
  /**
   * anomaly alerting configuration unique id
   */
  id: string;
  /**
   * anomaly alerting configuration name
   */
  name: string;
  /**
   * anomaly alerting configuration description
   */
  description?: string;
  /**
   * cross metrics operator
   *
   * It should be specified when setting up multiple metric alerting configurations
   */
  crossMetricsOperator?: AnomalyAlertingConfigurationCrossMetricsOperator;
  /**
   * unique hook ids
   */
  hookIds: string[];
  /**
   * Anomaly alerting configurations
   */
  metricAlertConfigurations: MetricAlertConfiguration[];
}

/**
 * Represents a metric anomaly detection configuration.
 */
export interface AnomalyDetectionConfiguration {
  /**
   * anomaly detection configuration unique id
   */
  id: string;
  /**
   * anomaly detection configuration name
   */
  name: string;
  /**
   * anomaly detection configuration description
   */
  description?: string;
  /**
   * metric unique id
   */
  metricId: string;
  /**
   * detection condition for all time series of a metric
   */
  wholeSeriesDetectionCondition: MetricDetectionCondition;
  /**
   * detection conditions for series group. This overrides the whole series detection condition.
   */
  seriesGroupDetectionConditions?: MetricSeriesGroupDetectionCondition[];
  /**
   * detection conditions for specific series.  This overrides both the whole series and the series group detection conditions.
   */
  seriesDetectionConditions?: MetricSingleSeriesDetectionCondition[];
}

/**
 * Represents the root cause of an incident.
 */
export interface IncidentRootCause {
  /**
   * identifies the contributing time series.
   */
  dimensionKey: DimensionKey;
  /**
   * drilling down path from query anomaly to root cause
   */
  path: string[];
  /**
   * score
   */
  score: number;
  /**
   * root cause description
   */
  description: string;
}

/**
 * Defines a metric time series
 */
export interface MetricSeriesDefinition {
  /**
   * unique metric id
   */
  metricId: string;
  /**
   * identifies a time series
   */
  dimension: Record<string, string>;
}

/**
 * Represents a segment of a metric time series.
 */
export interface MetricSeriesData {
  /**
   * metric series definition
   */
  definition: MetricSeriesDefinition;
  /**
   * timestamp list
   */
  timestampList?: Date[];
  /**
   * value list
   */
  valueList?: number[];
}

/**
 * Represents a segment of metric time series data enriched by the Metrics Advisor service.
 */
export interface MetricEnrichedSeriesData {
  /**
   * identifies the time series.
   */
  series: DimensionKey;
  /**
   * timestamp list
   */
  timestampList?: Date[];
  /**
   * value list
   */
  valueList?: number[];
  /**
   * list of booleans incidating whether a data point is anomaly or not
   */
  isAnomalyList?: boolean[];
  /**
   * list of expected values
   */
  expectedValueList?: number[];
  /**
   * list of lower bounds
   */
  lowerBoundaryList?: number[];
  /**
   * list of upper bounds
   */
  upperBoundaryList?: number[];
  /**
   * list of period values
   */
  periodList?: number[];
}

// Response types

/**
 * Contains response data for the getMetricFeedback operation.
 */
export type GetMetricFeedbackResponse = {
  /**
   * The parsed response body.
   */
  body: MetricFeedbackUnion;

  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: MetricFeedbackUnion;
  };
};

/**
 * Contains response data for the getDataFeed operation.
 */
export type GetDataFeedResponse = DataFeed & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
};

/**
 * Contains response data for the getAnomalyDetectionConfiguration operation.
 */
export type GetAnomalyDetectionConfigurationResponse = AnomalyDetectionConfiguration & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
};

/**
 * Contains response data for the getAnomalyAlertConfiguration operation.
 */
export type GetAnomalyAlertConfigurationResponse = AnomalyAlertConfiguration & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
};

/**
 * Contains response data for the getHook operation.
 */
export type GetHookResponse = HookUnion & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
};

/**
 * Contains response data for the getMetricEnrichedSeriesData operation.
 */
export type GetMetricEnrichedSeriesDataResponse = {
  results?: MetricEnrichedSeriesData[];
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
};

/**
 * Contains response data for the getIncidentRootCause operation.
 */
export type GetIncidentRootCauseResponse = {
  rootCauses: IncidentRootCause[];
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
};

/**
 * Contains response data for the getFeedback operation.
 */
export type GetFeedbackResponse = MetricFeedbackUnion & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
};

/**
 * Contains response data for the listAlertsForAlertConfiguration operation.
 */
export type ListAlertsForAlertConfigurationPageResponse = {
  alerts?: Alert[];
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
};

/**
 * Contains response data for the listAnomaliesForAlert operation.
 */
export type ListAnomaliesForAlertPageResponse = {
  anomalies?: Anomaly[];
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
};

/**
 * Contains response data for the listIncidentsForAlert operation.
 */
export type ListIncidentsForAlertPageResponse = {
  incidents?: Incident[];
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
};

/**
 * Contains response data for the listAnomaliesForDetectionConfiguration operation.
 */
export type ListAnomaliesForDetectionConfigurationPageResponse = {
  anomalies?: Anomaly[];
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
};

/**
 * Contains response data for the listDimensionValuesForDetectionConfiguration operation.
 */
export type ListDimensionValuesForDetectionConfigurationPageResponse = {
  dimensionValues?: string[];
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
};

/**
 * Contains response data for the listIncidentsByDetectionConfiguration operation.
 */
export type ListIncidentsByDetectionConfigurationPageResponse = {
  incidents?: Incident[];
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
};

/**
 * Contains response data for the listMetricSeries operation.
 */
export type ListMetricSeriesPageResponse = {
  definitions?: MetricSeriesDefinition[];
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
};

/**
 * Contains response data for the listMetricDimensionValues operation.
 */
export type ListMetricDimensionValuesPageResponse = {
  dimensionValues?: string[];
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
};

/**
 * Contains response data for the listMetricEnrichmentStatus operation.
 */
export type ListMetricEnrichmentStatusPageResponse = {
  statusList?: EnrichmentStatus[];
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
};

/**
 * Contains response data for the listDataFeeds operation.
 */
export type ListDataFeedsPageResponse = {
  dataFeeds?: DataFeed[];
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
};

/**
 * Contains response data for the getMetricSeriesData operation.
 */
export type GetMetricSeriesDataResponse = {
  metricSeriesDataList?: MetricSeriesData[];
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
};

/**
 * Contains response data for the ListDataFeedIngestionStatus operation.
 */
export type ListDataFeedIngestionStatusPageResponse = {
  statusList?: IngestionStatus[];
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
};

/**
 * Contains response data for the listMetricFeedbacks operation.
 */
export type ListMetricFeedbackPageResponse = {
  feedbacks?: MetricFeedbackUnion[];
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
};

/**
 * Contains response data for the listAnomalyAlertConfigurations operation.
 */
export type ListAnomalyAlertConfigurationsPageResponse = {
  alertConfigurations?: AnomalyAlertConfiguration[];
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
};
/**
 * Contains response data for the listAnomalyDetectionConfigurations operation.
 */
export type ListAnomalyDetectionConfigurationsPageResponse = {
  detectionConfigurations?: AnomalyDetectionConfiguration[];
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
};

/**
 * Contains response data for the listHooks operation.
 */
export type ListHooksPageResponse = {
  hooks?: HookUnion[];
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
};