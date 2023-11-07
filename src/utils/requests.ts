import fetch from 'node-fetch';
import { CountryData } from "./countyInterface.js";
import countries from "../res/countries.json" assert { type: "json" };

class CountriesApiService {
    async getCountryByName(name: string): Promise<string> {
        const response = await fetch(`https://api.nationalize.io/?name=${name}`);

        if (response.ok) {
            const body: any = await response.json();
            if (body.country && Array.isArray(body.country) && body.country.length > 0) {
                const countryId: string = body.country[0].country_id;

                const countryInfo = (countries as CountryData)[countryId];

                if (countryInfo) {
                    return `Country Name: ${countryInfo}`;
                } else {
                    console.log(`Country not found in your 'countries' JSON.`);
                }
            } else {
                console.log(`No country information found in the response.`);
            }
        } else {
            console.log(`Failed to retrieve data from the API. HTTP status: ${response.status}`);
        }
        return "";
    }
}

export { CountriesApiService };
