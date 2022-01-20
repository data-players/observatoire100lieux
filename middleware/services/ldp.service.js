const { LdpService } = require('@semapps/ldp');
const urlJoin = require('url-join');
const ontologies = require('../ontologies.json');
const CONFIG = require('../config');
const containers = require('../containers');
const {LDPNavigator,FetchAdapter} = require('fix-esm').require('ldp-navigator')
const context = require('../public/context.json');


module.exports = {
  mixins: [LdpService],
  settings: {
    baseUrl: CONFIG.SEMAPPS_HOME_URL,
    ontologies,
    containers,
    defaultContainerOptions: {
      jsonContext: urlJoin(CONFIG.SEMAPPS_HOME_URL, 'context.json')
    }
  },
  hooksResource: {
        after: {
            "get":async (ctx, res)=>{
              for ( let container of containers){
                if (ctx.params.resourceUri.includes(container.path) && container.ldpDereferencePlan){
                  let ldpNavigator=new LDPNavigator();
                  ldpNavigator.setAdapters([
                    new FetchAdapter({
                      headers:{
                        'accept': 'application/ld+json'
                      }
                    })
                  ])
                  const oldContext= JSON.parse(JSON.stringify(res['@context']));
                  //context have to be replce because jsonld librairy don't support url with localhost
                  res['@context']=context['@context'];
                  await ldpNavigator.init(res);
                  res= await ldpNavigator.dereference(res,container.ldpDereferencePlan);
                  res['@context']=oldContext;
                }
              }
              return res;
            }

        }
      }
};
