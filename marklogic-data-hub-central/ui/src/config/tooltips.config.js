const AdvancedSettings = {
    'name': 'The name of this step definition.',
    'description': 'The description of this step definition.',
    'sourceQuery' : 'The collection tag or CTS query that selects the source data to process in this step.',
    'targetFormat': 'The format of the documents in the target database.',
    'additionalCollections': 'The collection tags to add to the default tags assigned to the processed document.',
    'targetPermissions': 'The comma-separated permissions required to access the processed document.',
    'module': 'The path to your custom hook module.',
    'cHParameters': 'Parameters, as key-value pairs, to pass to your custom hook module.',
    'user': 'The user account to use to run the module. The default is the user running the flow; e.g., data-hub-operator.',
    'runBefore': 'Choose whether to run the module before or after the core processes of the step.',
    /* The following are for *Custom*Tooltips. */
    'sourceDatabase': 'The database where the input data is read from.',
    'targetDatabase': 'The database where to store the processed data.',
    'options': 'Key-value pairs to pass as parameters to the custom module.',
    'customModuleURI': "The path to your custom step module."
}

const NewFlowTooltips = {
    'name': 'The name of this flow definition.',
    'description': 'The description of this flow definition.'
}

const NewLoadTooltips = {
    'name': 'The name of this data load configuration.',
    'description': 'The description of this data load configuration.',
    'files' : 'Click *Upload* to select the source files. The total size of the files must be 100MB or less.',
    'sourceFormat': 'The format of the source files to load.',
    'fieldSeparator': 'The delimiter in source files. Required if *Source Format* is *Delimited Text*.',
    'outputURIPrefix': 'The prefix you want for the URIs of the loaded documents. Example: If your prefix is /rawData/ and you load a file called customer1.json, the URI of the loaded document becomes /rawData/customer1.json.'
}

const AdvLoadTooltips = {
    'targetDatabase': 'The database where to store the processed data. For loading, the default is data-hub-STAGING.',
    'mlcpCommand': 'To load files using MLCP, copy and paste this entire code to a command line. This code passes your step settings as parameter values to MLCP. Note: MLCP and Data Hub generate different URIs for the same delimited file.'
}

const NewMapTooltips = {
    'name':'The name of this mapping configuration.',
    'description':'The description of this mapping configuration.',
    'sourceQuery':'The collection or CTS query that selects the source data to process in this configuration.',
}

const AdvMapTooltips = {
    'sourceDatabase': 'The database where the input data is read from. For mapping, the default is data-hub-STAGING.',
    'targetDatabase': 'The database where to store the processed data. For mapping, the default is data-hub-FINAL.',
    'provGranularity': 'The level of detail logged for provenance. Choose *coarse* for the default level or *off* for no provenance logging.',
}

const NewMatchTooltips = {
    'name': 'The name of this matching configuration.',	    'sourceDatabase': 'The database where the input data is read from. Must be the same as the Matching Step *Source Database*.',
    'description': 'The description of this matching configuration.',	    'targetDatabase': 'The database where to store the processed data. Must be the same as the Matching Step *Source Database*.',
    'sourceQuery' : 'The collection or CTS query that selects the source data to process in this configuration.',
}

const AdvMatchTooltips = {
    'sourceDatabase': 'The database where the input data is read from. For matching, the default is data-hub-FINAL.',
    'targetDatabase': 'The database where to store the processed data. Must be the same as the *Source Database*.',
    'provGranularity': 'The level of detail logged for provenance. Choose *fine* for more detailed logging, *coarse* for the default level, or *off* for no provenance logging.',
}

const NewMergeTooltips = {
    'timestampPath': 'The field to use to determine which values to include in the merged property, based on their recency.'
}

const AdvMergeTooltips = {
    'sourceDatabase': 'The database where the input data is read from. Must be the same as the Matching Step *Source Database*.',
    'targetDatabase': 'The database where to store the processed data. Must be the same as the Matching Step *Source Database*.',
    'provGranularity': 'The level of detail logged for provenance. Choose *fine* for more detailed logging, *coarse* for the default level, or *off* for no provenance logging.',
}

const NewCustomLoadTooltips = {}

const AdvCustomLoadTooltips = {}

const NewCustomMapTooltips = {}

const AdvCustomMapTooltips = {}

const NewCustomMatchTooltips = {}

const AdvCustomMatchTooltips = {}

const NewCustomMergeTooltips = {}

const AdvCustomMergeTooltips = {}

const NewCustomOtherTooltips = {}

const AdvCustomOtherTooltips = {}

const ModelingTooltips = {
  entityTypeName: 'Click to view or edit settings for this entity type.',
  addNewEntity: 'Click here to add a new entity type.',
  instanceNumber: 'Click to navigate to the Explorer tile showing all instances of this entity type.',
  lastProcessed: 'Click to navigate to the Explorer tile showing all instances of that entity processed at the time.',
  addEntityName: 'Names must start with a letter, and can contain letters, numbers, hyphens, and underscores.',
  entityDescription: 'Description for the entity.',
  saveIcon: 'Save changes to this entity type.',
  revertIcon: 'Discard changes made to this entity type since the last Save operation.',
  identifier: 'Uniquely identifies each instance of this type. Restricted to only one property per entity type.',
  multiple: 'Allows an array of values.',
  pii: 'Personally identifiable information, or data this is sensitive in that it can identify a particular person and can be used fraudulent purposes.',
  sort: 'Enables display in ascending or descending order.',
  facet: 'Use when searching, for dividing values of properties into counts, aggregating, grouping, and more.',
  advancedSearch: 'Used when searching, for dividing values of properties into counts, aggregating, grouping, and more.',
  addStructuredProperty: 'Click to add properties within this structured property.'
}

export {
    AdvancedSettings,
    NewFlowTooltips,
    NewLoadTooltips,
    AdvLoadTooltips,
    NewMapTooltips,
    AdvMapTooltips,
    NewMatchTooltips,
    AdvMatchTooltips,
    NewMergeTooltips,
    AdvMergeTooltips,
    ModelingTooltips
}