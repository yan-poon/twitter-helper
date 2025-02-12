const API_KEY = process.env.REACT_APP_API_X_FUNCTIONS_KEY;
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchNews = async (query, mkt, accessToken,count=20, offset=0) => {
    const response = await fetch(`${API_BASE_URL}/bing-news-search?q=${query}&count=${count}&offset=${offset}&mkt=${mkt}`, {
        headers: {
            'Content-Type': 'application/json',
            'x-functions-key': API_KEY,
            'Authorization': `Bearer ${accessToken}`
        }
    });
    const data = await response.json();
    return data;
};

export const fetchWebpages = async (query,mkt,accessToken,count=20, offset=0) => {
    const response = await fetch(`${API_BASE_URL}/bing-search?q=${query}&count=${count}&offset=${offset}&mkt=${mkt}`, {
        headers: {
            'Content-Type': 'application/json',
            'x-functions-key': API_KEY,
            'Authorization': `Bearer ${accessToken}`
        }
    });
    const data = await response.json();
    return data;
};

export const fetchTweetInfo = async (news, tweetLanguage, assistantType ,accessToken) => {
    const response = await fetch(`${API_BASE_URL}/openai-tweet?tweetLanguage=${tweetLanguage}&assistantType=${assistantType}`, {
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

export const fetchSummary = async (news, summaryLanguage, assistantType ,accessToken) => {
    const response = await fetch(`${API_BASE_URL}/openai-summary?summaryLanguage=${summaryLanguage}&assistantType=${assistantType}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-functions-key': API_KEY,
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            extraInstruction: news.extraInstruction,
            url: news.url
        })
    });
    const data = await response.json();
    return data
};