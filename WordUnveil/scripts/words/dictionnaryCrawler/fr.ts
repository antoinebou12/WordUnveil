import axios, { AxiosResponse } from 'axios'
import * as cheerio from 'cheerio';
import https from 'https';

const urlLeDictionnaire = "https://www.le-dictionnaire.com/definition/";
const urlWiktionary = "https://fr.wiktionary.org/wiki/";

interface DefinitionResult {
    definition: string | null,
    source: string | null
}

async function fetchData(url: string): Promise<AxiosResponse<any>> {
    try {
        const response = await axios.get(url, {
            timeout: 50000,
            httpsAgent: new https.Agent({ keepAlive: true })
        });

        if (response.status !== 200) {
            throw new Error(`Non-OK status: ${response.status}`);
        }
        return response;
    } catch (error) {
        console.error(`Error occurred while fetching data ${url}: ${error}`);
        return null;
    }
}

async function getDefitionFromWiktionary(word: string): Promise<string> {
    const response = await fetchData(urlWiktionary + word);

    if (!response) {
      return;
    }

    const $ = cheerio.load(response.data);
    const list_def = $('#mw-content-text > div.mw-parser-output > ol');
    let definition = "";

    list_def.each((_, element) => {
        definition += $(element).text().replace(/\s+/g, ' ');
    });

    return definition;
}

export async function getDefinitionFromLeDictionnaire(word: string): Promise<DefinitionResult> {
    const response = await fetchData(urlLeDictionnaire + word);

    if (!response) {
        return;
    }

    const $ = cheerio.load(response.data);
    const definition = $('#definition').text().replace(/\s+/g, ' ');

    return {
        definition: definition,
        source: urlLeDictionnaire + word
    };
}

export async function getDefinition(word: string): Promise<DefinitionResult> {
    const leDictionnaireResult = await getDefinitionFromLeDictionnaire(word);

    if (leDictionnaireResult) {
        return leDictionnaireResult;
    }

    const wiktionaryResult = await getDefitionFromWiktionary(word);

    return {
        definition: wiktionaryResult,
        source: urlWiktionary + word
    };
}
