export default function useMap (option) {
  const { key, sk } = option || {};
  const MAP_SERVICE_API_IP = {
    suggestion: '/ws/place/v1/suggestion',
    geocoder: '/ws/geocoder/v1/'
  };

  const signParams = (api, params, sk) => {
    const arr = [];

    Object.keys(params).sort().forEach((key) => {
      arr.push(`${key}=${params[key]}`);
    });

    // eslint-disable-next-line no-undef
    return md5(`${api}?${arr.join('&')}${sk}`);
  };

  return {
    fetchSDK (libraries = []) {
      const version = '1.exp';
      const libs = ['visualization', 'tools', 'geometry', 'service', ...libraries].join(',');

      return new Promise((resolve) => {
        if (window.TMap) {
          resolve(window.TMap);
          return;
        }

        window.tMapCallback = function tMapCallback () {
          resolve(window.TMap);
        };

        const script = document.createElement('script');

        script.type = 'text/javascript';
        script.src = `https://map.qq.com/api/gljs?v=${version}&key=${key}&libraries=${libs}&callback=tMapCallback`;
        document.body.appendChild(script);
      });
    },
    fetchService (service, params) {
      const jsonpCallback = service + 'Callback';
      const api = MAP_SERVICE_API_IP[service];
      const obj = {
        // callback: jsonpCallback,
        output: 'jsonp',
        key,
        ...params
      };

      return new Promise(function (resolve) {
        // eslint-disable-next-line no-undef
        $.ajax({
          type: 'get',
          url: 'https://apis.map.qq.com' + api,
          data: {
            ...obj,
            sig: signParams(api, { ...obj, callback: jsonpCallback }, sk)
          },
          cache: true,
          dataType: 'jsonp',
          jsonp: 'callback',
          jsonpCallback: jsonpCallback,
          headers: {
            'Content-Type': 'application/json'
          },
          success: (result) => {
            if (result.status === 0) {
              resolve(result);
            }
          }
        });
      });
    }
  };
}
