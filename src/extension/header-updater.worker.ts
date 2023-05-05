const HEADER_NAME = 'x-user-energy-objective'

const allResourceTypes = Object.values(chrome.declarativeNetRequest.ResourceType);

const createRule = (value: number) : chrome.declarativeNetRequest.Rule => {
    return {
        id: 1,
        priority: 1,
        action: {
            type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
            requestHeaders: [
                {
                    operation: chrome.declarativeNetRequest.HeaderOperation.SET,
                    header:  HEADER_NAME,
                    value: value.toString()
                }
            ]
        },
        condition: {
            urlFilter: '|*',
            resourceTypes: allResourceTypes
        }
    }
}


chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1],
    addRules: [createRule(100)]
});