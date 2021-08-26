import axios from 'axios'

const request = async (method, url, options) => {
  return axios({
    method,
    url,
    ...options
  })
    .then(response => ({
      status: response.status,
      data: response.data,
      headers: response.headers
    }))
    .catch(async error => {
      if (!error.response) {
        return {
          status: 500
        }
      }
      return {
        status: error.response.status
      }
    })
}

export default request

export const base_url =
  'https://srv0api-v2-dot-framy-stage.uc.r.appspot.com/test1.0/backstage/exm1'

export const getPosts = async (
  { params = {}, data = {} } = {
    params: {},
    data: {}
  }
) => {
  return request('POST', base_url, {
    params,
    data,
    headers: {
      Authorization: `0123456789#0#examId`,
      'content-type': 'application/json'
    }
  })
}
