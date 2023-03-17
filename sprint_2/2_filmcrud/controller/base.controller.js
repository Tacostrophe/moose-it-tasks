class Controller {
  containUndefined(...args) {
    return args.includes(undefined);
  }
}

module.exports = Controller;
