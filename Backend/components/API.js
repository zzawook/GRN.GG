export class API {
    constructor(address, response)
    {
        this.address = address;
        this.response = response;
    }
    getAddress()
    {
        return this.address
    }
    getResponse()
    {
        return this.response;
    }
}