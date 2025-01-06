const API_KEY = process.env.REACT_APP_API_X_FUNCTIONS_KEY;
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchAutoSuggest = async (query,accessToken) => {
    const response = await fetch(`${API_BASE_URL}/bing-autosuggest?q=${query}`, {
        headers: {
            'Content-Type': 'application/json',
            'x-functions-key': API_KEY,
            'Authorization': `Bearer ${accessToken}`
        }
    });
    const data = await response.json();
    return data;
};

export const fetchNews = async (query, accessToken,count=20, offset=0) => {
    const response = await fetch(`${API_BASE_URL}/bing-news-search?q=${query}&count=${count}&offset=${offset}`, {
        headers: {
            'Content-Type': 'application/json',
            'x-functions-key': API_KEY,
            'Authorization': `Bearer ${accessToken}`
        }
    });
    const data = await response.json();
    return data;
};

export const fetchWebpages = async (query, accessToken,count=20, offset=0) => {
    const response = await fetch(`${API_BASE_URL}/bing-search?q=${query}&count=${count}&offset=${offset}`, {
        headers: {
            'Content-Type': 'application/json',
            'x-functions-key': API_KEY,
            'Authorization': `Bearer ${accessToken}`
        }
    });
    const data = await response.json();
    return data;
};

export const fetchAISummaryAndTweetInfo = async (news, summaryLanguage, tweetLanguage, accessToken) => {
    const response = await fetch(`${API_BASE_URL}/openai-tweet?summaryLanguage=${summaryLanguage}&tweetLanguage=${tweetLanguage}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-functions-key': API_KEY,
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            name: news.name,
            description: news.description,
            url: news.url
        })
    });
    const data = await response.json();
    return data
};