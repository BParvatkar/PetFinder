
// Class to make api calls
export class ApiService {

    // Api endpoint
    static getApiEndpoint = () => {
        return 'https://60d075407de0b20017108b89.mockapi.io/api/v1/animals'
    }

    // Build the search URL
    static buildSearchURL = (searchQuery) => {
        var url = this.getApiEndpoint();
        return url + searchQuery;
    }

    // Method to get pets data
    static getPetsData = async (searchQuery = '') => {
        try {
            const response = await fetch(this.buildSearchURL(searchQuery));
            const jsonObject = await response.json();
            return jsonObject;  
        } catch(error) {
            console.log("Error occurred while fetching data", error);
        }
    }
    
}