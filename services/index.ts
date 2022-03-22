import axios from 'axios';

const SERVER_URL = 'http://localhost:3000'

export const _getZipcode = (zipcode: string) => axios({
    method: 'get',
    url: `${SERVER_URL}/zipcode/${zipcode}`,
})

export const _getCarparkByXY = (x: string, y: string, radius: string) => axios({
    method: 'get',
    url: `${SERVER_URL}/carpark`,
    params: {
        x_coord: x,
        y_coord: y,
        radius
    }
})

export const _getSearchSuggestions = (searchVal: string) => axios({
    method: 'get',
    url: `https://developers.onemap.sg/commonapi/search?searchVal=${searchVal}&returnGeom=Y&getAddrDetails=Y&pageNum=1`
})