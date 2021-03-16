'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    findOneByTags: async (ctx) =>{
      let entity;

      const { tag } = ctx.params;
      
      entity = await strapi.query('post').find({"tags.Name": tag });
      

      return sanitizeEntity(entity, { model: strapi.models.post });

    },
    async find(ctx){
      let entity = await strapi.query('post').find({
        _sort: 'created_at:desc'
      });
      return sanitizeEntity(entity, { model: strapi.models.post });
    }
    ,
    /**
     * Create a record.
     *
     * @return {Object}
     */
    async create(ctx) {
        let entity;
        const user = ctx.state.user.id 
        console.log(ctx.request.body);

        if (ctx.is('multipart')) {
          const { data, files } = parseMultipartData(ctx);

          entity = await strapi.services.post.create({...data, user}, { files });
        } else {
          entity = await strapi.services.post.create({...ctx.request.body, user});
        }
        return sanitizeEntity(entity, { model: strapi.models.post });
      },
};
