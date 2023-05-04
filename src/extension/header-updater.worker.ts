const HEADER_NAME = 'x-user-energy-objective'

const allResourceTypes = Object.values(chrome.declarativeNetRequest.ResourceType);

const createRule = (value: number) : chrome.declarativeNetRequest.Rule => {
    return {
        id: 1,
        priority: 100,
        action: {
            type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
            responseHeaders: [
                {
                    operation: chrome.declarativeNetRequest.HeaderOperation.SET,
                    header:  HEADER_NAME,
                    value: value.toString()
                }
            ]
        },
        condition: {
            urlFilter: '<all_urls>',
            resourceTypes: [chrome.declarativeNetRequest.ResourceType.MAIN_FRAME]
        }
    }
}

const updateHeader = async  (value: number) => { 
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1],
        addRules: [createRule(value)]
     });
}

chrome.tabs.onActivated.addListener((e) => { 
    updateHeader(100);
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => { 
    updateHeader(100);
})
