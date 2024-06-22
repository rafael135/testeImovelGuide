const Ziggy = {"url":"http:\/\/localhost","port":null,"defaults":{},"routes":{"sanctum.csrf-cookie":{"uri":"sanctum\/csrf-cookie","methods":["GET","HEAD"]},"api.getCorretor":{"uri":"api\/corretor\/{id}","methods":["GET","HEAD"],"parameters":["id"]},"api.updateCorretor":{"uri":"api\/corretor\/{id}","methods":["PUT"],"parameters":["id"]},"api.deleteCorretor":{"uri":"api\/corretor\/{id}","methods":["DELETE"],"parameters":["id"]},"home":{"uri":"\/","methods":["GET","HEAD"]},"cadastrarAction":{"uri":"corretor","methods":["POST"]}}};
if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
    Object.assign(Ziggy.routes, window.Ziggy.routes);
}
export { Ziggy };
