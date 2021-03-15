const slugify = require('slugify');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */


 module.exports = {
   /**
    * Triggered before user creation.
    */
   lifecycles: {
     async beforeCreate(data) {
       if (data.Title) {
         data.Slug = slugify(data.Title, {lower: true});
       }
     },
     async beforeUpdate(params, data) {
       if (data.Title) {
         data.Slug = slugify(data.Title, {lower: true});
       }
     },
   },
 };