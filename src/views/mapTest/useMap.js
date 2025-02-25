export default function useMap (option) {
  const { ak } = option || {};

  return {
    fetchSDK (libraries = []) {
      // const version = '1.exp';
      // const libs = ['visualization', 'tools', 'geometry', 'service', ...libraries].join(',');

      return new Promise((resolve) => {
        if (window.BMapGL) {
          resolve(window.BMapGL);
          return;
        }

        window.tMapCallback = function tMapCallback () {
          resolve(window.BMapGL);
        };

        const script = document.createElement('script');

        script.type = 'text/javascript';
        script.src = `https://api.map.baidu.com/api?v=1.0&type=webgl&ak=${ak}&callback=tMapCallback`;
        document.body.appendChild(script);
      });
    },
    fetchSearchService (query, region = '中国') {
      return new Promise(function (resolve) {
        // eslint-disable-next-line no-undef
        const url = `https://api.map.baidu.com/place/v2/suggestion?query=${query}&region=${region}&city_limit=true&output=json&ak=${ak}`;
        $.ajax({
          type: 'get',
          url: url,
          cache: true,
          dataType: 'jsonp',
          jsonp: 'callback',
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
