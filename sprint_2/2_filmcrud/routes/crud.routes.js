const Router = require('express');

function makeCRUDRouter(controller) {
  const router = new Router();

  router.post('/', controller.create);
  router.get('/', controller.list);
  router.get('/:pk', controller.retrieve);
  router.put('/', controller.update);
  router.delete('/:pk', controller.destroy);

  return router;
}

module.exports = makeCRUDRouter;
