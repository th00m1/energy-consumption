const REQUEST_HEADER_NAME = 'x-user-energy-objective';
const RESPONSE_HEADER_NAME = 'x-energy-economy';

const allResourceTypes = Object.values(
  chrome.declarativeNetRequest.ResourceType
);

const createRule = (value: string): chrome.declarativeNetRequest.Rule => {
  return {
    id: 1,
    priority: 1,
    action: {
      type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
      requestHeaders: [
        {
          operation: chrome.declarativeNetRequest.HeaderOperation.SET,
          header: REQUEST_HEADER_NAME,
          value: value,
        },
      ],
    },
    condition: {
      urlFilter: '|*',
      resourceTypes: allResourceTypes,
    },
  };
};

chrome.declarativeNetRequest.updateDynamicRules({
  removeRuleIds: [1],
  addRules: [createRule('PERFORMANCE')],
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1],
    addRules: [createRule(request.value)],
  });
  sendResponse({
    message: '✅ energy header updated, new value : ' + request.value,
  });
});

const setUserEnergyEconomy = (
  event: chrome.webRequest.WebResponseHeadersDetails
) => {
  if (!event.responseHeaders) return;

  const energyEconomyHeader = event.responseHeaders.find(
    (header) => header.name === RESPONSE_HEADER_NAME
  );

  if (!energyEconomyHeader) return;

  const currentEconomy = Number.parseInt(energyEconomyHeader.value ?? '0');
  chrome.storage.sync.get('energyEconomy').then((result) => {
    const { energyEconomy } = result;

    chrome.storage.sync.set({
      energyEconomy: (energyEconomy ?? 0) + currentEconomy,
    });
  });
};

chrome.webRequest.onHeadersReceived.addListener(
  (details) => setUserEnergyEconomy(details),
  { urls: ['<all_urls>'] },
  ['responseHeaders']
);
