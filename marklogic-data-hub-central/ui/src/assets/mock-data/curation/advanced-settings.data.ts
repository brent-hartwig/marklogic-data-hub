// Passed as prop
const advancedLoad = {
    tabKey: '2',
    tooltipsData: {},
    openStepSettings: true,
    setOpenStepSettings: jest.fn(),
    stepData: {name: 'AdvancedLoad'},
    updateLoadArtifact: jest.fn(),
    activityType: 'ingestion',
    canWrite: true,
    currentTab: '2',
    setIsValid: true,
    resetTabs: jest.fn(),
    setHasChanged: jest.fn(),
}

// Passed as prop
const advancedMapping = {
    tabKey: '2',
    tooltipsData: {},
    openStepSettings: true,
    setOpenStepSettings: jest.fn(),
    stepData: {name: 'AdvancedMapping'},
    updateLoadArtifact: jest.fn(),
    activityType: 'mapping',
    canWrite: true,
    currentTab: '2',
    setIsValid: true,
    resetTabs: jest.fn(),
    setHasChanged: jest.fn(),
}

// Returned from endpoint: /api/steps/ingestion/AdvancedLoad
const stepLoad = { "data" :
    {
        "collections": [ "testCollection" ],
        "additionalCollections": [ "addedCollection" ],
        "batchSize": 35,
        "permissions": "data-hub-common,read,data-hub-common,update",
        "name": "AdvancedLoad",
        "description": "",
        "sourceFormat": "json",
        "targetFormat": "json",
        "outputURIPrefix": "",
        "stepDefinitionName": "default-ingestion",
        "stepDefinitionType": "ingestion",
        "stepId": "AdvancedLoad-ingestion",
        "sourceDatabase": null,
        "targetDatabase": "data-hub-STAGING",
        "outputFormat": "json",
        "provenanceGranularityLevel": "coarse",
        "lastUpdated": "2020-01-01T00:00:00.000001-07:00",
        "headers": {
            "header": true
        },
        "processors": {
            "processor": true
        },
        "customHook": {
            "hook": true
        }
    },
    "status": 200
};

// Returned from endpoint: /api/steps/ingestion/AdvancedMapping
const stepMapping = { "data" :
    {
        "collections": [ "testCollection" ],
        "additionalCollections": [ "addedCollection" ],
        "batchSize": 35,
        "permissions": "data-hub-common,read,data-hub-common,update",
        "name": "AdvancedMapping",
        "targetEntityType": "http://example.org/Address-0.0.1/Test",
        "description": "",
        "selectedSource": "collection",
        "sourceQuery": "cts.collectionQuery(['test'])",
        "stepDefinitionName": "entity-services-mapping",
        "stepDefinitionType": "mapping",
        "stepId": "AdvancedMapping-mapping",
        "sourceDatabase": "data-hub-STAGING",
        "targetDatabase": "data-hub-FINAL",
        "validateEntity": "doNotValidate",
        "provenanceGranularityLevel": "coarse",
        "lastUpdated": "2020-01-01T00:00:00.000001-07:00",
        "headers": {
        "header": true
        },
        "processors": {
        "processor": true
        },
        "customHook": {
        "hook": true
        }
    },
    "status": 200
};

const data = {
    advancedLoad: advancedLoad,
    customLoad: {...advancedLoad, stepData: {name: 'CustomLoad'}},
    advancedMapping: advancedMapping,
    stepLoad: stepLoad,
    stepMapping: stepMapping,
};

export default data;
