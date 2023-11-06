var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fetch from 'node-fetch';
import countries from "../res/countries.json" assert { type: "json" };
class CountriesApiService {
    getCountryByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`https://api.nationalize.io/?name=${name}`);
            if (response.ok) {
                const body = yield response.json();
                if (body.country && Array.isArray(body.country) && body.country.length > 0) {
                    const countryId = body.country[0].country_id;
                    const countryInfo = countries[countryId];
                    if (countryInfo) {
                        return `Country Name: ${countryInfo}`;
                    }
                    else {
                        console.log(`Country not found in your 'countries' JSON.`);
                    }
                }
                else {
                    console.log(`No country information found in the response.`);
                }
            }
            else {
                console.log(`Failed to retrieve data from the API. HTTP status: ${response.status}`);
            }
            return "";
        });
    }
}
export { CountriesApiService };
